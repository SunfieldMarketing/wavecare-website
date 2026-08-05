import type { Block } from 'payload';

/** /videoservices-specific blocks. Confirmed against subservices.css. */

/** Single large looping/controlled Vimeo embed with a heading above it. */
export const CommercialPlayer: Block = {
  slug: 'commercialPlayer',
  labels: { singular: 'Commercial player', plural: 'Commercial players' },
  imageAltText: 'Large single video player',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading', admin: { description: 'Wrap in _underscores_ for the light italic treatment.' } },
    { name: 'vimeoId', type: 'text', required: true, label: 'Vimeo ID' },
  ],
};

/**
 * Two plain text columns, no media. Distinct from splitRow (services.css only)
 * — this has zero stylesheet dependency, matching the original's inline-only
 * styling, so it is safe on any page.
 */
export const TwoColumnText: Block = {
  slug: 'twoColumnText',
  labels: { singular: 'Two-column text', plural: 'Two-column text' },
  imageAltText: 'Heading beside a block of prose',
  fields: [
    {
      name: 'tone',
      type: 'select',
      enumName: 'enum_2col_tone',
      defaultValue: 'dark',
      options: [
        { label: 'Dark background', value: 'dark' },
        { label: 'Light background', value: 'light' },
      ],
    },
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    { name: 'body', type: 'array', label: 'Paragraphs', fields: [{ name: 'text', type: 'textarea', required: true }] },
  ],
};

/** .fk-card icon grid — "what we produce" style cards, dark background. */
export const IconFeatureGrid: Block = {
  slug: 'iconFeatureGrid',
  labels: { singular: 'Icon feature grid', plural: 'Icon feature grids' },
  imageAltText: 'Icon, title and description cards on a dark background',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    { name: 'subtitle', type: 'textarea', label: 'Sub-paragraph' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'icon', type: 'textarea', label: 'Icon SVG' },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
};

export const videoServiceBlocks = [CommercialPlayer, TwoColumnText, IconFeatureGrid];
