import type { Block } from 'payload';
import { linkField } from '../fields/link';
import { sectionSettings } from '../fields/sectionSettings';

/**
 * /about-specific blocks. This page imports NO dedicated stylesheet — every
 * class below (.story, .insight, .values, .accordion, .reel-wrap, .tcards) is
 * defined in globals.css, confirmed before writing.
 */

/** .story — text column beside a single image, with a mid-paragraph link. */
export const StoryBlock: Block = {
  slug: 'storyBlock',
  labels: { singular: 'Story (text + image)', plural: 'Story blocks' },
  imageAltText: 'Paragraphs beside a single photo',
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
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    sectionSettings,
  ],
};

/** .insight — a single oversized pull-quote statement plus a smaller follow-up line. */
export const InsightQuote: Block = {
  slug: 'insightQuote',
  labels: { singular: 'Insight statement', plural: 'Insight statements' },
  imageAltText: 'Oversized pull-quote statement',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'statement', type: 'textarea', required: true, label: 'Large statement' },
    { name: 'footer', type: 'textarea', label: 'Smaller follow-up line' },
    sectionSettings,
  ],
};

/** .values > .value — numbered value cards, 3 across. */
export const ValuesGrid: Block = {
  slug: 'valuesGrid',
  labels: { singular: 'Values grid', plural: 'Values grids' },
  imageAltText: 'Numbered value cards',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    {
      name: 'values',
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

/**
 * .accordion > .acc-panel — hover/click-to-expand service showcase.
 * Interactive; rendered by AccordionShowcase.tsx.
 */
export const AccordionShowcase: Block = {
  slug: 'accordionShowcase',
  labels: { singular: 'Accordion showcase', plural: 'Accordion showcases' },
  imageAltText: 'Panels that expand on hover or tap',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    { name: 'hint', type: 'text', label: 'Hint text below the panels', defaultValue: 'Hover or tap a panel to explore' },
    {
      name: 'panels',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'tag', type: 'text', label: 'Short description' },
        {
          name: 'detail',
          type: 'array',
          label: 'Detail tags',
          maxRows: 3,
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        { name: 'link', type: 'group', label: 'Button', fields: [linkField()] },
      ],
    },
    sectionSettings,
  ],
};

/** .reel-wrap > .reel-frame — a single framed Vimeo embed with a heading. */
export const VideoReel: Block = {
  slug: 'videoReel',
  labels: { singular: 'Video reel', plural: 'Video reels' },
  imageAltText: 'Single framed video, centred',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'text', label: 'Heading' },
    { name: 'vimeoId', type: 'text', required: true, label: 'Vimeo ID' },
    sectionSettings,
  ],
};

/** .tcards > .tcard — simple attributed quote grid, no photos, no rating. */
export const SimpleQuoteGrid: Block = {
  slug: 'simpleQuoteGrid',
  labels: { singular: 'Simple quote grid', plural: 'Simple quote grids' },
  imageAltText: 'Grid of plain attributed quotes',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    { name: 'lead', type: 'textarea', label: 'Lead paragraph' },
    {
      name: 'quotes',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'role', type: 'text', required: true, label: 'Role' },
        { name: 'organisation', type: 'text', label: 'Company / facility type' },
      ],
    },
    sectionSettings,
  ],
};

export const aboutBlocks = [
  StoryBlock,
  InsightQuote,
  ValuesGrid,
  AccordionShowcase,
  VideoReel,
  SimpleQuoteGrid,
];
