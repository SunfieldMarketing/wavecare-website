import type { CollectionConfig } from 'payload';
import { allBlocks } from '../blocks';
import { adminOrEditor, publishedOrAuthenticated } from '../access';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate';

/**
 * Pages — the block-based page builder.
 *
 * Every route on the site is a Page document whose `layout` is an ordered list
 * of blocks. Editors can reorder, add, duplicate and remove sections without a
 * developer, and build entirely new pages.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Content',
    description: 'Every page on the website. Sections can be reordered by dragging.',
    livePreview: {
      url: ({ data }) => buildPreviewURL(typeof data?.slug === 'string' ? data.slug : ''),
      breakpoints: [
        { name: 'mobile', label: 'Mobile', width: 390, height: 844 },
        { name: 'tablet', label: 'Tablet', width: 768, height: 1024 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
      ],
    },
    preview: ({ slug }) => buildPreviewURL(typeof slug === 'string' ? slug : ''),
  },
  versions: {
    drafts: {
      autosave: { interval: 375 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  access: {
    read: publishedOrAuthenticated,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOrEditor,
  },
  hooks: {
    // Pages are statically generated - see src/cms/hooks/revalidate.ts for
    // why a save here doesn't reach the public site on its own.
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Used in the admin list and as the default SEO title.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          description: 'The sections that make up this page, top to bottom.',
          fields: [
            {
              name: 'layout',
              label: 'Sections',
              type: 'blocks',
              blocks: allBlocks,
              admin: {
                initCollapsed: true,
                description: 'Drag to reorder. Click a section to edit it.',
              },
            },
          ],
        },
        {
          label: 'Settings',
          fields: [
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              admin: {
                position: 'sidebar',
                description: 'The URL path. Use "home" for the homepage.',
              },
            },
            {
              name: 'hideFromSitemap',
              type: 'checkbox',
              defaultValue: false,
              label: 'Hide from sitemap & search engines',
            },
            {
              name: 'changeFrequency',
              type: 'select',
              defaultValue: 'monthly',
              options: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].map(
                (v) => ({ label: v, value: v }),
              ),
              admin: { description: 'Hint for search engines in the sitemap.' },
            },
            {
              name: 'priority',
              type: 'number',
              defaultValue: 0.7,
              min: 0,
              max: 1,
              admin: { description: 'Sitemap priority, 0 to 1.' },
            },
          ],
        },
      ],
    },
  ],
};

function buildPreviewURL(slug: string): string {
  // NEXT_PUBLIC_SERVER_URL was never set in production, so this always fell
  // through to the localhost default -- the admin's live-preview iframe and
  // "Preview" button both tried to load http://localhost:3000 from whatever
  // machine the editor was on, which (correctly) refused to connect. Only
  // fall back to localhost when actually running a local dev server;
  // anywhere else, default to the real domain.
  const base =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.NODE_ENV === 'production' ? 'https://wavecare.io' : 'http://localhost:3000');
  const path = !slug || slug === 'home' ? '/' : `/${slug}`;
  return `${base}${path}?preview=true`;
}
