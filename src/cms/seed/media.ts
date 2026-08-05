import path from 'path';
import fs from 'fs';
import type { Payload } from 'payload';

const PUBLIC = path.resolve(process.cwd(), 'public');

/**
 * Registers a file from /public into the Media library, reusing the existing
 * record if one already has that filename.
 *
 * Returns the raw id — SQLite uses integer ids, so it must not be stringified
 * or Payload's upload-relationship validation rejects it. Returns null when the
 * file is missing so a seed can skip it rather than fail outright.
 *
 * BUG THIS GUARDS AGAINST: if a prior run ever collided on filename (any
 * interrupted seed, or running seed twice concurrently), Payload appends a
 * "-1" suffix to the stored filename. An exact-match lookup for the original
 * basename then never finds that record again, so every subsequent run
 * creates ANOTHER doc, ANOTHER collision, ANOTHER suffix — compounding forever.
 * That silently exhausted the Vercel Blob free-tier quota after repeated reseeds
 * across this session (308 rows for 51 real images). Matching on a "starts
 * with basename" prefix finds the record regardless of what suffix Payload
 * gave it, so re-runs stay idempotent even after a collision already happened.
 */
export async function ensureMedia(
  payload: Payload,
  relPath: string,
  alt: string,
): Promise<number | string | null> {
  const filePath = path.join(PUBLIC, relPath);
  if (!fs.existsSync(filePath)) {
    payload.logger.warn(`  ! missing file, skipped: ${relPath}`);
    return null;
  }

  const filename = path.basename(relPath);
  const ext = path.extname(filename);
  const stem = filename.slice(0, -ext.length || undefined);

  const existing = await payload.find({
    collection: 'media',
    where: {
      or: [
        { filename: { equals: filename } },
        // Matches "stem.png", "stem-1.png", "stem-abc123.png", ...
        { filename: { like: `${stem}-%${ext}` } },
      ],
    },
    sort: 'createdAt',
    limit: 1,
    overrideAccess: true,
  });
  if (existing.docs.length > 0) return existing.docs[0].id;

  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    filePath,
    overrideAccess: true,
  });
  return doc.id;
}
