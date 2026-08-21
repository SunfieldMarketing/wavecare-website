import { config as loadEnv } from 'dotenv';
import path from 'path';
loadEnv({ path: path.resolve(process.cwd(), '.env.local') });

import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { createClient } from '@libsql/client';
import fs from 'fs';

const MIME_BY_EXT: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};
const mimeFor = (name: string) => MIME_BY_EXT[path.extname(name).toLowerCase()] || 'application/octet-stream';

const stripSuffix = (name: string) => name.replace(/^(.+?)-\d+(\.[^.]+)$/, '$1$2');

/**
 * Uploads every Media doc's file directly to S3 via the AWS SDK under its
 * clean key, then patches only the `filename` DB column via raw SQL -
 * deliberately bypassing Payload's Local API for the upload itself, since
 * its collision-avoidance always bumps a same-filename re-upload (even
 * against a doc's own current value, with no way to opt out), which makes
 * it unusable for re-syncing existing docs. The site only ever reads
 * doc.url (computed from `filename` at request time) through Next's own
 * image optimizer - Payload's pre-generated `sizes.*` fields aren't
 * referenced anywhere, so they're left alone.
 *
 * Source file resolution per doc: public/media-fallback (if present) ->
 * public/media (Payload's local upload dir) -> public/images (legacy
 * static folder). Safe to re-run - it's idempotent (same bytes, same key).
 * Use this for any future bulk re-sync; for a single new upload just use
 * the admin UI once the S3 adapter is live.
 */
async function main() {
  const s3 = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  });
  const bucket = process.env.S3_BUCKET!;
  const prefix = 'wavecare';
  const PUBLIC = path.resolve(process.cwd(), 'public');

  const db = createClient({
    url: process.env.DATABASE_URI!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });

  const rows = await db.execute('SELECT id, filename FROM media');
  console.log(`${rows.rows.length} media rows`);

  let ok = 0;
  const failed: string[] = [];

  for (const row of rows.rows) {
    const id = row.id as number;
    const currentFn = row.filename as string;
    const cleanFn = stripSuffix(currentFn);
    const key = `${prefix}/${cleanFn}`;

    const src = [
      path.join(PUBLIC, 'media-fallback', cleanFn),
      path.join(PUBLIC, 'media', cleanFn),
      path.join(PUBLIC, 'images', cleanFn),
    ].find((p) => fs.existsSync(p));

    if (!src) {
      failed.push(`${currentFn} - no local source for ${cleanFn}`);
      continue;
    }

    try {
      const body = fs.readFileSync(src);
      const contentType = mimeFor(cleanFn);
      await s3.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      }));

      // Confirm it actually landed before touching the DB.
      await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));

      if (currentFn !== cleanFn) {
        await db.execute({
          sql: 'UPDATE media SET filename = ? WHERE id = ?',
          args: [cleanFn, id],
        });
      }

      ok++;
      console.log(`  ok: ${cleanFn} (${body.length} bytes)`);
    } catch (e: any) {
      failed.push(`${currentFn} - ${e?.name || e?.message || String(e)}`);
    }
  }

  console.log(`\nOK: ${ok}/${rows.rows.length}, failed: ${failed.length}`);
  if (failed.length) {
    console.log('Failed:');
    for (const f of failed) console.log(' -', f);
  }
  process.exit(failed.length ? 1 : 0);
}
main().catch((e) => { console.error(e); process.exit(1); });
