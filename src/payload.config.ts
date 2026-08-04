import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
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

  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./wavecare-cms.db',
    },
    // Auto-sync the schema in development so standalone scripts (e.g. `npm run
    // seed`) pick up field changes without a dev server running. Production
    // must use generated migrations instead — never push against live data.
    push: process.env.NODE_ENV !== 'production',
  }),

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
