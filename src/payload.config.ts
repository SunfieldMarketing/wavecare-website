import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { s3Storage } from '@payloadcms/storage-s3';
import sharp from 'sharp';

import { Users } from './cms/collections/Users';
import { Media } from './cms/collections/Media';
import { Pages } from './cms/collections/Pages';
import { CaseStudies } from './cms/collections/CaseStudies';
import { Testimonials } from './cms/collections/Testimonials';
import { Theme } from './cms/globals/Theme';
import { Navigation, Footer } from './cms/globals/Navigation';
import { SiteSettings } from './cms/globals/SiteSettings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Picks the database adapter from DATABASE_URI.
 *
 *   postgres://... / postgresql://...  -> Postgres (Neon, Supabase, RDS, ...)
 *   libsql://... (Turso)               -> hosted SQLite, needs DATABASE_AUTH_TOKEN
 *   file:./...                         -> local SQLite file
 *
 * Why this matters: SQLite's `push` cannot ALTER existing tables, so every
 * schema change means dropping and re-seeding the database. That is fine while
 * all content is script-generated, but it destroys real editor work. Postgres
 * uses generated migrations instead, so edits survive schema changes.
 *
 * Switching is therefore just a matter of setting DATABASE_URI — no code change:
 *   1. create a Postgres database (Neon's free tier is enough)
 *   2. put its connection string in DATABASE_URI
 *   3. npm run migrate:create  (generates a migration from the current schema)
 *   4. npm run seed
 *
 * `push` is only ever enabled outside production. Pushing against live data can
 * drop columns without warning.
 */
function databaseAdapter() {
  const uri = process.env.DATABASE_URI || 'file:./wavecare-cms.db';
  const isPostgres = /^postgres(ql)?:\/\//.test(uri);
  const isLocalFile = uri.startsWith('file:');

  // Push ONLY against a throwaway local file. Against any hosted database it
  // races the migration history: push applies schema directly, then `payload
  // migrate` sees a dev-pushed database, warns about data loss and refuses to
  // run — leaving migrations permanently un-applied and the two out of sync.
  // Hosted databases go through migrations, which is also what production does.
  const allowPush = isLocalFile && process.env.NODE_ENV !== 'production';

  if (isPostgres) {
    return postgresAdapter({
      pool: { connectionString: uri },
      push: allowPush,
      migrationDir: path.resolve(dirname, 'migrations'),
    });
  }

  // Turso is libSQL over the network and needs an auth token; a local file
  // does not. Passing an undefined token to a file: URL is harmless, but
  // failing loudly on a missing one saves a confusing 401 at build time.
  const isRemote = uri.startsWith('libsql://') || uri.startsWith('https://');
  const authToken = process.env.DATABASE_AUTH_TOKEN;

  if (isRemote && !authToken) {
    throw new Error(
      `DATABASE_URI points at a remote libSQL database (${uri.split('?')[0]}) but ` +
        `DATABASE_AUTH_TOKEN is not set.\n` +
        `Create one with:  turso db tokens create <database-name>`,
    );
  }

  return sqliteAdapter({
    client: isRemote ? { url: uri, authToken } : { url: uri },
    push: allowPush,
    migrationDir: path.resolve(dirname, 'migrations'),
  });
}

/**
 * Live Preview target for Navigation, Footer, Theme, and Site Settings.
 *
 * Found 2026-08-27, cross-checked against Slate Cinema's own
 * payload.config.ts (see CMS-PARITY-HANDOFF.md 7.3, which flagged this
 * gap explicitly rather than assuming it away): these four globals had no
 * `admin.livePreview` config anywhere, and - the part that actually
 * matters, confirmed by reading @payloadcms/ui/dist/utilities/
 * handleLivePreview.js directly the same way Slate Cinema's own comment
 * describes - setting `admin.livePreview` at the root only supplies
 * shared defaults (breakpoints, this url function). It does NOT turn Live
 * Preview on for anything by itself. Payload's own isLivePreviewEnabled()
 * only returns true for a global/collection whose slug appears in the
 * `globals`/`collections` arrays below (Pages and CaseStudies already
 * satisfy this a different way - each sets `admin.livePreview` directly on
 * itself - which is why they're not repeated in the arrays below).
 *
 * All four globals render on every single page (nav, footer, theme
 * variables, and title/meta defaults all apply sitewide), so unlike
 * Pages/CaseStudies there's no single "this document's own page" to
 * preview against - home is the representative target for all of them,
 * same reasoning Slate Cinema's own livePreviewURL uses for its
 * equivalent shared globals (Navigation/Footer/SiteSettings there too).
 */
function globalsLivePreviewURL(): string {
  const base =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.NODE_ENV === 'production' ? 'https://wavecare.io' : 'http://localhost:3000');
  // Routed through /api/preview so this actually enables the draftMode()
  // cookie before landing on the homepage - see that route's own comment.
  return `${base}/api/preview?path=${encodeURIComponent('/')}`;
}

export default buildConfig({
  admin: {
    user: Users.slug,
    // Locked to light — the CMS is themed against the site's light-mode
    // teal palette (see custom.css); Payload's dark-mode elevation ramp
    // would otherwise fight those overrides depending on the visitor's
    // system preference.
    theme: 'light',
    meta: {
      titleSuffix: ' — Wavecare CMS',
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo#Logo',
        Icon: '/components/admin/Logo#Icon',
      },
      beforeLogin: ['/components/admin/LoginRobotBackground'],
      // Click a section in Live Preview -> jump to and expand its block in
      // the Blocks field. See ClickToEditListener's own comment.
      providers: ['/components/admin/ClickToEditListener#ClickToEditListener'],
    },
    livePreview: {
      breakpoints: [
        { name: 'mobile', label: 'Mobile', width: 390, height: 844 },
        { name: 'tablet', label: 'Tablet', width: 768, height: 1024 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
      ],
      url: globalsLivePreviewURL,
      // Pages/CaseStudies aren't listed here - each already sets its own
      // admin.livePreview.url directly (see Pages.ts/CaseStudies.ts),
      // which independently satisfies isLivePreviewEnabled() for them.
      // This array is what's actually missing for the four shared globals.
      globals: [Navigation.slug, Footer.slug, Theme.slug, SiteSettings.slug],
    },
  },

  // NOTE: Payload's REST API is moved off /api so it does not collide with the
  // existing /api/contact route that posts leads into GoHighLevel.
  routes: {
    api: '/payload-api',
  },

  collections: [Pages, CaseStudies, Testimonials, Media, Users],
  globals: [Navigation, Footer, Theme, SiteSettings],

  editor: lexicalEditor({}),

  db: databaseAdapter(),

  secret: process.env.PAYLOAD_SECRET || 'CHANGE_ME_BEFORE_DEPLOY',

  /**
   * Explicit origin allow-list rather than relying on NEXT_PUBLIC_SERVER_URL
   * alone. A single env var can only ever match one exact origin, and this
   * app is legitimately reachable on several: the bare domain, www, the
   * .vercel.app project fallback, the stable git-branch alias, and whatever
   * this specific deployment's own unique preview URL is (Vercel injects
   * that per-build as VERCEL_URL — useful when checking a deployment
   * directly by its own URL rather than through the wavecare.io alias, e.g.
   * while diagnosing whether a fix actually shipped). This is the exact gap
   * documented for Slate Cinema in CMS-PARITY-HANDOFF.md 1.8: admin saves
   * failed with a generic "not allowed" 403 (Payload's CSRF origin check)
   * for weeks there until the allow-list was widened from a single env var
   * to an explicit list like this one.
   */
  cors: [
    'https://wavecare.io',
    'https://www.wavecare.io',
    'https://wavecare-gold.vercel.app',
    'https://wavecare-sunfieldmarketings-projects.vercel.app',
    'https://wavecare-git-master-sunfieldmarketings-projects.vercel.app',
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:3000'] : []),
  ],
  csrf: [
    'https://wavecare.io',
    'https://www.wavecare.io',
    'https://wavecare-gold.vercel.app',
    'https://wavecare-sunfieldmarketings-projects.vercel.app',
    'https://wavecare-git-master-sunfieldmarketings-projects.vercel.app',
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:3000'] : []),
  ],

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  sharp,

  plugins: [
    seoPlugin({
      collections: ['pages', 'case-studies'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }: any) => doc?.title || doc?.client || '',
      generateDescription: ({ doc }: any) => doc?.subtitle || '',
      generateURL: ({ doc, collectionSlug }: any) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL || 'https://wavecare.io';
        if (collectionSlug === 'case-studies') return `${base}/case-studies/${doc?.slug ?? ''}`;
        const slug = doc?.slug ?? '';
        return slug === 'home' ? base : `${base}/${slug}`;
      },
    }),

    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        state: true,
        country: true,
        checkbox: true,
        number: true,
        message: true,
        payment: false,
      },
      formOverrides: {
        admin: { group: 'Content' },
      },
      formSubmissionOverrides: {
        admin: { group: 'Content' },
      },
    }),

    redirectsPlugin({
      collections: ['pages'],
      overrides: {
        admin: { group: 'Settings' },
      },
    }),

    /**
     * Media storage.
     *
     * Vercel's filesystem is ephemeral — anything written to public/media is
     * lost on the next deploy or cold start, so CMS uploads would silently
     * disappear without an external store taking over.
     *
     * S3 is preferred when S3_BUCKET is set (Vercel Blob's free-tier quota
     * ran out in production - see git history around 2026-08-20/21 for the
     * full incident). disablePayloadAccessControl: true serves doc URLs
     * straight from the bucket's own domain instead of proxying through
     * /payload-api/media/file/:filename - a prior attempt WITHOUT this
     * option (relying on the proxy route + a ?prefix=... query param)
     * worked correctly in `next dev` but threw "Cannot find field for path
     * at prefix" on every request once actually deployed to Vercel - a
     * genuine dev-vs-production-build discrepancy in how the query-param
     * lookup resolves the field, never fully root-caused. Serving directly
     * from S3 sidesteps that whole mechanism: no app-server round trip for
     * bytes at all, so there's nothing left to diverge between dev and
     * prod. Verify any future change to this against an actual
     * `next build` + `next start`, not just `next dev` - that gap is
     * exactly what let the prior regression reach production undetected.
     */
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: {
              media: {
                prefix: 'wavecare',
                disablePayloadAccessControl: true,
                // Belt-and-suspenders on top of disablePayloadAccessControl:
                // some live production requests were observed computing
                // doc.url as the old /payload-api/media/file/:filename
                // proxy path instead of an S3 URL, inconsistently - some
                // routes/pages correct, others not, no config difference
                // found, never fully root-caused (possibly a Vercel
                // function-bundle staleness issue, possibly something in
                // the plugin's own internal adapter-closure state). An
                // explicit generateFileURL is a pure function with no
                // dependency on that internal state - it always wins over
                // the plugin's own generateURL (see getAfterReadHook in
                // node_modules/@payloadcms/plugin-cloud-storage), so this
                // guarantees a correct URL regardless of what's causing
                // the inconsistency.
                generateFileURL: ({ filename, prefix }) =>
                  `https://s3.${process.env.S3_REGION}.amazonaws.com/${process.env.S3_BUCKET}/${prefix || 'wavecare'}/${encodeURIComponent(filename)}`,
              },
            },
            bucket: process.env.S3_BUCKET,
            config: {
              region: process.env.S3_REGION,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
              // The AWS SDK resolves this internally for actual API calls
              // without it being set, but Payload's generateURL() (used for
              // disablePayloadAccessControl's public doc.url) just does
              // `${endpoint}/${bucket}/${fileKey}` - with no endpoint
              // configured that rendered as the literal string "undefined"
              // in every image URL (caught locally against a production
              // build before this ever reached Vercel).
              endpoint: `https://s3.${process.env.S3_REGION}.amazonaws.com`,
            },
          }),
        ]
      : process.env.BLOB_READ_WRITE_TOKEN
        ? [
            vercelBlobStorage({
              enabled: true,
              collections: { media: true },
              token: process.env.BLOB_READ_WRITE_TOKEN,
              clientUploads: true,
            }),
          ]
        : []),
  ],
});
