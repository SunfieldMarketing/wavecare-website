/**
 * One-off (2026-08-25): closes the last content gap found in the "make
 * everything CMS-editable" audit - Navigation.logo and Footer.logo were both
 * `null` in the CMS, silently falling back to hardcoded /public paths in
 * Navbar.tsx/Footer.tsx (the fallback mechanism worked exactly as designed,
 * it just meant nobody could actually change the logo through admin without
 * a code deploy). Same story for Site Settings' defaultOgImage, which
 * layout.tsx now reads (see that file's 2026-08-25 change) but was unset.
 *
 * Registers the two logo files already live on the site as real Media docs,
 * then points those three fields at them - purely additive, does not change
 * what visitors see today (same files, now CMS-owned instead of hardcoded).
 *
 * Run once via: npx tsx scripts/seed-branding-media.ts
 */
import { config as loadEnv } from 'dotenv';
import path from 'path';
loadEnv({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
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

  const whiteLogoId = await ensureMedia(
    payload,
    'wavecare-marketing-logo-white.png',
    'Wavecare Marketing logo (white, for dark backgrounds)',
  );
  const logoId = await ensureMedia(
    payload,
    'wavecare-marketing-logo.png',
    'Wavecare Marketing logo',
  );

  if (!whiteLogoId || !logoId) throw new Error('One or both logo files failed to register.');

  await payload.updateGlobal({
    slug: 'navigation',
    data: { logo: whiteLogoId as any },
    overrideAccess: true,
  });
  payload.logger.info('Navigation.logo set.');

  await payload.updateGlobal({
    slug: 'footer',
    data: { logo: whiteLogoId as any },
    overrideAccess: true,
  });
  payload.logger.info('Footer.logo set.');

  await payload.updateGlobal({
    slug: 'site-settings',
    data: { defaultOgImage: logoId as any },
    overrideAccess: true,
  });
  payload.logger.info('SiteSettings.defaultOgImage set.');

  payload.logger.info('Done.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
