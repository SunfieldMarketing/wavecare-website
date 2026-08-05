import type { Block } from 'payload';
import { linkField } from '../fields/link';
import { sectionSettings } from '../fields/sectionSettings';

/** Homepage-specific blocks. Confirmed against globals.css before writing. */

/** .showreel — text column beside a single framed Vimeo embed. */
export const ShowreelBlock: Block = {
  slug: 'showreelBlock',
  labels: { singular: 'Showreel (text + video)', plural: 'Showreels' },
  imageAltText: 'Paragraphs beside a framed video',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'text', required: true, label: 'Heading' },
    {
      name: 'paragraphs',
      type: 'array',
      minRows: 1,
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    { name: 'button', type: 'group', label: 'Button', fields: [linkField()] },
    { name: 'vimeoId', type: 'text', required: true, label: 'Vimeo ID' },
    sectionSettings,
  ],
};

/**
 * .svc-viewport/.svc-track/.svc-card — the draggable, wheel-scrollable,
 * arrow-navigable services carousel. Interactive; rendered by
 * ServiceCarouselInner.tsx.
 */
export const ServiceCarousel: Block = {
  slug: 'serviceCarousel',
  labels: { singular: 'Service carousel', plural: 'Service carousels' },
  imageAltText: 'Draggable horizontal card carousel',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    { name: 'hint', type: 'text', defaultValue: 'Drag, scroll, or use the arrows, tap a card for details', label: 'Hint text' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'number', type: 'text', admin: { description: 'e.g. 01. Blank auto-numbers.' } },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        {
          name: 'imageFit',
          type: 'select',
          enumName: 'enum_svc_card_fit',
          defaultValue: 'cover',
          options: [
            { label: 'Cover (fill, crop)', value: 'cover' },
            { label: 'Contain (fit, no crop)', value: 'contain' },
          ],
        },
        { name: 'title', type: 'text', required: true },
        { name: 'tag', type: 'text', label: 'Short description' },
        {
          name: 'detail',
          type: 'array',
          label: 'Detail list',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        { name: 'link', type: 'group', label: 'Button', fields: [linkField()] },
      ],
    },
    sectionSettings,
  ],
};

/** .features > .feature > .fn — numbered feature cards with a top-border hover sweep. */
export const NumberedFeatureGrid: Block = {
  slug: 'numberedFeatureGrid',
  labels: { singular: 'Numbered feature grid', plural: 'Numbered feature grids' },
  imageAltText: 'Numbered feature cards',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    {
      name: 'leads',
      type: 'array',
      label: 'Lead paragraphs',
      maxRows: 2,
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'number', type: 'text', admin: { description: 'e.g. 01. Blank auto-numbers.' } },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    sectionSettings,
  ],
};

export const homeBlocks = [ShowreelBlock, ServiceCarousel, NumberedFeatureGrid];
