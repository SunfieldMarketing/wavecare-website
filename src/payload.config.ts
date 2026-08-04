import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';
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
 *   anything else (or unset)           -> local SQLite file
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
  const allowPush = process.env.NODE_ENV !== 'production';

  if (isPostgres) {
    return postgresAdapter({
      pool: { connectionString: uri },
      push: allowPush,
      migrationDir: path.resolve(dirname, 'migrations'),
    });
  }

  return sqliteAdapter({
    client: { url: uri },
    push: allowPush,
    migrationDir: path.resolve(dirname, 'migrations'),
  });
}

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — Wavecare CMS',
    },
    components: {
      graphics: {},
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
  ],
});
