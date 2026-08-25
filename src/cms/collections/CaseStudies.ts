import type { CollectionConfig } from 'payload';
import { allBlocks } from '../blocks';
import { adminOrEditor, publishedOrAuthenticated } from '../access';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate';

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case study', plural: 'Case studies' },
  admin: {
    useAsTitle: 'client',
    defaultColumns: ['client', 'title', '_status', 'updatedAt'],
    group: 'Content',
    description: 'Client success stories. Each one gets its own page at /case-studies/<slug>.',
    livePreview: {
      // Same fix as Pages.ts's buildPreviewURL: without NEXT_PUBLIC_SERVER_URL
      // set in production, this always fell back to localhost, which the
      // editor's own browser correctly refuses to connect to. Also routed
      // through /api/preview (see that route) so the draftMode() cookie
      // actually gets enabled - the old `?preview=true` on the real page was
      // never read by anything.
      url: ({ data }) => {
        const base =
          process.env.NEXT_PUBLIC_SERVER_URL ||
          (process.env.NODE_ENV === 'production' ? 'https://wavecare.io' : 'http://localhost:3000');
        const path = `/case-studies/${data?.slug ?? ''}`;
        return `${base}/api/preview?path=${encodeURIComponent(path)}`;
      },
      breakpoints: [
        { name: 'mobile', label: 'Mobile', width: 390, height: 844 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
      ],
    },
  },
  versions: { drafts: { autosave: { interval: 375 } }, maxPerDoc: 25 },
  access: {
    read: publishedOrAuthenticated,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOrEditor,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    { name: 'client', type: 'text', required: true, label: 'Client name' },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      label: 'Headline',
      admin: { description: 'Wrap words in *asterisks* to highlight them.' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'URL path, e.g. "oakwood".' },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
    {
      name: 'services',
      type: 'array',
      label: 'Services delivered',
      admin: { description: 'Shown as tags under the headline.' },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'result',
          type: 'text',
          required: true,
          label: 'Headline result',
          admin: { width: '40%', description: 'e.g. 42%, 3X, +210%' },
        },
        {
          name: 'resultLabel',
          type: 'text',
          required: true,
          label: 'What it measures',
          admin: { width: '60%', description: 'e.g. Increase in qualified tours' },
        },
      ],
    },
    { name: 'body', type: 'richText', label: 'The story' },
    {
      name: 'layout',
      label: 'Extra sections',
      type: 'blocks',
      blocks: allBlocks,
      admin: {
        initCollapsed: true,
        description: 'Optional additional sections below the story.',
      },
    },
  ],
};
