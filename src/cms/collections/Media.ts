import type { CollectionConfig } from 'payload';
import { adminOrEditor } from '../access';

/**
 * Media library.
 *
 * New uploads land in /public/media. The existing /public/images and
 * /public/videos folders are deliberately left untouched — blocks that already
 * point at those paths keep working, and they can be registered into this
 * library later without moving a single file.
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
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*'],
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
