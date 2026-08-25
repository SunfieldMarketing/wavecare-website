import type { CollectionConfig } from 'payload';
import { adminOrEditor } from '../access';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate';

/**
 * Media library.
 *
 * New uploads land in /public/media. The remaining /public/videos files that
 * live pages still reference by raw path (SplitRow on /services, SplitMedia,
 * SignatureProduct on /design-print — see each block's `video` field) were
 * registered into this library on 2026-08-25, matching the plan this
 * collection's own comment used to describe: mimeTypes widened from
 * `image/*` to also accept video, then those 4 files were uploaded through
 * to S3 directly (scripts/sync-media-to-s3.ts's pattern) and the live Pages
 * docs repointed at the new Media docs. `imageSizes` below only apply to
 * image uploads — Payload skips deriving them for a non-image mimetype.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'File', plural: 'Media' },
  admin: {
    group: 'Content',
    description: 'Photos and graphics used across the site.',
  },
  access: {
    read: () => true,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOrEditor,
  },
  hooks: {
    // Media doc URLs (S3 direct links) are baked into static pages at
    // build/revalidation time - without this, replacing a file through
    // admin (same doc, new upload) would silently keep serving the old
    // image everywhere until the next full deploy.
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*', 'video/*'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'wide', width: 1600, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt text',
      admin: {
        description:
          'Describe the image for screen readers and search engines. Required — this is an accessibility and SEO requirement.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Optional caption shown under the image in galleries.' },
    },
    {
      name: 'credit',
      type: 'text',
      admin: { description: 'Photographer or source, if attribution is needed.' },
    },
  ],
};
