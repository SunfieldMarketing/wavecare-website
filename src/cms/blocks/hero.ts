import type { Block } from 'payload';
import { sectionSettings } from '../fields/sectionSettings';
import { linkField } from '../fields/link';

/**
 * Hero — covers every hero variant currently on the site:
 *  - video background (home, /services)
 *  - photo mosaic  (/photoservices)
 *  - plain gradient (/case-studies/[slug], /commercial)
 */
export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  imageAltText: 'Full-width page header',
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'centered',
      options: [
        { label: 'Centred', value: 'centered' },
        { label: 'Left aligned', value: 'left' },
        { label: 'Photo mosaic behind', value: 'mosaic' },
      ],
      admin: { description: 'Mosaic tiles the photo library behind the text.' },
    },
    { name: 'eyebrow', type: 'text', label: 'Small label above heading' },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      label: 'Heading',
      admin: {
        description:
          'Wrap words in *asterisks* to highlight them in the accent colour. Use line breaks where you want the heading to wrap.',
      },
    },
    { name: 'subtitle', type: 'textarea', label: 'Supporting paragraph' },
    {
      name: 'mosaicImages',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Mosaic photos',
      admin: {
        condition: (_, s) => s?.layout === 'mosaic',
        description: 'Tiled and repeated to fill the background.',
      },
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Buttons',
      maxRows: 3,
      fields: [linkField()],
    },
    {
      name: 'minHeight',
      type: 'select',
      defaultValue: 'full',
      options: [
        { label: 'Full screen', value: 'full' },
        { label: 'Tall (60%)', value: 'tall' },
        { label: 'Compact', value: 'compact' },
      ],
    },
    sectionSettings,
  ],
};

/**
 * Notice bar — the thin bordered "Trusted by ..." strip that sits directly
 * under the hero on the four service pages.
 */
export const NoticeBar: Block = {
  slug: 'noticeBar',
  labels: { singular: 'Notice bar', plural: 'Notice bars' },
  imageAltText: 'Thin single-line banner',
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Text',
    },
    sectionSettings,
  ],
};
