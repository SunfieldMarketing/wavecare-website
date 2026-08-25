/**
 * One-off correction for a bug seed-branding-media.ts's use of ensureMedia
 * just hit: ensureMedia's collision-suffix LIKE match (`${stem}-%${ext}`)
 * is meant to catch Payload's own generated suffixes (wavecare-marketing-
 * logo-1.png, -abc123.png, ...) but can't distinguish those from a
 * genuinely different, intentionally-named file that happens to share the
 * same hyphenated-prefix convention - wavecare-marketing-logo-white.png
 * matched it, so ensureMedia('wavecare-marketing-logo.png', ...) returned
 * that existing doc instead of creating one for the actual file. Worth
 * knowing this bug exists in src/cms/seed/media.ts generally (any
 * `base-descriptiveword.ext` / `base.ext` pair in the same collection can
 * collide the same way) - not fixed here, that needs more thought than a
 * same-session patch; this script only corrects the one field it broke.
 *
 * Creates the correct Media doc via an EXACT-filename check only (no fuzzy
 * suffix match), then repoints Site Settings' defaultOgImage at it.
 */
import { config as loadEnv } from 'dotenv';
import path from 'path';
loadEnv({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
  if (!process.env.DATABASE_URI?.startsWith('libsql://')) {
    throw new Error(`DATABASE_URI is not the production libsql:// URL. Refusing to run.`);
  }

  const { getPayload } = await import('payload');
  const { default: config } = await import('../src/payload.config');
  const fs = await import('fs');

  const payload = await getPayload({ config });

  const filename = 'wavecare-marketing-logo.png';
  const filePath = path.resolve(process.cwd(), 'public', filename);
  if (!fs.existsSync(filePath)) throw new Error(`missing file: ${filePath}`);

  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } }, // exact match only, no fuzzy suffix guess
    limit: 1,
    overrideAccess: true,
  });

  const id =
    existing.docs[0]?.id ??
    (
      await payload.create({
        collection: 'media',
        data: { alt: 'Wavecare Marketing logo' },
        filePath,
        overrideAccess: true,
      })
    ).id;

  payload.logger.info(`wavecare-marketing-logo.png -> media id ${id}`);

  await payload.updateGlobal({
    slug: 'site-settings',
    data: { defaultOgImage: id as any },
    overrideAccess: true,
  });
  payload.logger.info('SiteSettings.defaultOgImage corrected.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
