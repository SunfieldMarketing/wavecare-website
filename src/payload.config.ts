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
    },
    livePreview: {
      breakpoints: [
        { name: 'mobile', label: 'Mobile', width: 390, height: 844 },
        { name: 'tablet', label: 'Tablet', width: 768, height: 1024 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
      ],
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
     * S3 (Cloudflare R2 or actual AWS S3, both speak the same API) is
     * preferred when configured: Vercel Blob's free-tier quota ran out in
     * production (confirmed 8/20 - every media doc's file started 204ing,
     * not just newly-uploaded ones; see src/proxy.ts for the interim fix
     * that shipped while this was pending). S3_BUCKET is the switch - set
     * it and its adapter takes over; leave it unset and Blob (if configured)
     * still works exactly as before, so this is a drop-in, no-migration-
     * required swap either direction.
     *
     * disablePayloadAccessControl serves media directly from the bucket's
     * own public URL instead of proxying through /payload-api/media/file/*
     * - that route is what was silently returning empty responses once
     * Blob's quota ran out, so bypassing it removes that failure mode
     * entirely rather than just working around it.
     *
     * Locally, neither token is normally set, so this whole block is a
     * no-op and uploads keep going to public/media.
     */
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: {
              media: {
                prefix: 'wavecare',
                // NOT disablePayloadAccessControl: true - that serves doc
                // URLs straight from S3's own domain, which needs its own
                // URL-computation path working correctly (couldn't get it
                // to reliably resolve). Leaving this off means media still
                // goes through /payload-api/media/file/:filename exactly
                // like it did on Blob - the adapter's staticHandler proxies
                // that request to S3 behind the scenes - so every existing
                // <Image> reference on the site keeps working unchanged,
                // no next.config.ts remotePatterns dependency either.
              },
            },
            bucket: process.env.S3_BUCKET,
            config: {
              region: process.env.S3_REGION,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
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
