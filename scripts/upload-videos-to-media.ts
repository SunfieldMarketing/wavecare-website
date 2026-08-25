/**
 * One-off (2026-08-25): registers the 4 video files that live Pages content
 * still references by raw /public/videos/ path — 3 on /services (splitRow
 * blocks), 1 on /design-print (signatureProduct) — as real Media docs, then
 * repoints those blocks' new `video` upload field at them.
 *
 * Uses Payload's normal Local API (payload.create/update), not the direct
 * AWS-SDK-bypass pattern the old scripts/sync-media-to-s3.ts used — that
 * bypass was only needed for RE-uploading to an EXISTING doc (Payload's
 * collision-avoidance treats a doc's own current filename as colliding with
 * itself). These are brand-new docs with filenames that don't exist in the
 * Media collection yet, so a plain payload.create({ filePath }) works fine
 * and lets the S3 storage plugin do its normal thing.
 *
 * Run once via: npx tsx scripts/upload-videos-to-media.ts
 * Delete after running — this is not a repeatable utility like
 * src/cms/seed/media.ts's ensureMedia, which this script imports and reuses.
 */
import { config as loadEnv } from 'dotenv';
import path from 'path';
loadEnv({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
  // Dynamic imports, not static ones: ESM hoists static `import` statements
  // above ALL other top-level code regardless of source order, so a static
  // `import config from '../src/payload.config'` above would have already
  // run databaseAdapter() — reading process.env.DATABASE_URI as undefined,
  // before loadEnv() on the previous line ever executed. That's exactly
  // what happened on the first run of this script: it silently connected to
  // the `file:./wavecare-cms.db` default instead of production and crashed
  // trying to push schema against it. Payload's own CLI avoids this by
  // calling @next/env's loadEnvConfig before importing anything else
  // (node_modules/payload/dist/bin/loadEnv.js) - dynamic imports here do
  // the same thing by construction, since they only evaluate when awaited.
  // Fail loudly rather than silently hitting the wrong database again.
  if (!process.env.DATABASE_URI?.startsWith('libsql://')) {
    throw new Error(
      `DATABASE_URI is not the production libsql:// URL (got: ${process.env.DATABASE_URI ?? 'undefined'}). ` +
        `Refusing to run against anything else.`,
    );
  }

  const { getPayload } = await import('payload');
  const { default: config } = await import('../src/payload.config');
  const { ensureMedia } = await import('../src/cms/seed/media');

  const payload = await getPayload({ config });

  const videos = [
    { relPath: 'videos/Website video .mp4', alt: 'Wavecare services hero video' },
    { relPath: 'videos/country_lane_720p.mp4', alt: 'Senior living community exterior video' },
    { relPath: 'videos/Brochure wavecare video.mp4', alt: 'Wavecare brochure showcase video' },
    { relPath: 'videos/1 Wavecare Photo Ad (HQ).mp4', alt: 'Wavecare photo ad showcase video' },
  ];

  const ids: Record<string, number | string | null> = {};
  for (const v of videos) {
    payload.logger.info(`Uploading ${v.relPath} ...`);
    const id = await ensureMedia(payload, v.relPath, v.alt);
    ids[v.relPath] = id;
    payload.logger.info(`  -> media id ${id}`);
  }

  // ── Repoint /services (splitRow blocks) ──
  const servicesRes = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'services' } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const servicesDoc = servicesRes.docs[0];
  if (!servicesDoc) throw new Error('services page not found');

  const servicesLayout = (servicesDoc.layout as any[]).map((block) => {
    if (block.blockType === 'splitRow' && block.videoUrl && ids[`videos/${block.videoUrl.replace(/^\/videos\//, '')}`]) {
      const key = `videos/${block.videoUrl.replace(/^\/videos\//, '')}`;
      return { ...block, video: ids[key] };
    }
    return block;
  });

  await payload.update({
    collection: 'pages',
    id: servicesDoc.id,
    data: { layout: servicesLayout as any },
    overrideAccess: true,
  });
  payload.logger.info('services page repointed.');

  // ── Repoint /design-print (signatureProduct block) ──
  const dpRes = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'design-print' } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const dpDoc = dpRes.docs[0];
  if (!dpDoc) throw new Error('design-print page not found');

  const dpLayout = (dpDoc.layout as any[]).map((block) => {
    if (block.blockType === 'signatureProduct' && block.videoUrl) {
      const key = `videos/${block.videoUrl.replace(/^\/videos\//, '')}`;
      if (ids[key]) return { ...block, video: ids[key] };
    }
    return block;
  });

  await payload.update({
    collection: 'pages',
    id: dpDoc.id,
    data: { layout: dpLayout as any },
    overrideAccess: true,
  });
  payload.logger.info('design-print page repointed.');

  payload.logger.info('Done.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
