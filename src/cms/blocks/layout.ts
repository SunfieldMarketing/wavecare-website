import type { Block } from 'payload';
import { sectionSettings, headingFields } from '../fields/sectionSettings';
import { linkField } from '../fields/link';

/** Free-form rich text — used by /privacy-policy and /terms-of-service. */
export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Rich text', plural: 'Rich text' },
  fields: [
    headingFields,
    { name: 'content', type: 'richText', label: 'Body' },
    sectionSettings,
  ],
};

/**
 * Legal document — numbered sections of prose, used by /privacy-policy and
 * /terms-of-service. Kept as one block so the whole document stays a single
 * editable unit rather than a long chain of rich-text sections.
 */
export const LegalDocument: Block = {
  slug: 'legalDocument',
  labels: { singular: 'Legal document', plural: 'Legal documents' },
  imageAltText: 'Long-form legal text',
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Document title' },
    {
      name: 'effectiveDate',
      type: 'text',
      label: 'Effective date line',
      admin: { description: 'e.g. "Effective Date: June 15, 2026". Shown in bold under the title.' },
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      minRows: 1,
      admin: { description: 'Drag to reorder. Numbering is part of the heading text.' },
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'content', type: 'richText', required: true },
      ],
    },
    {
      name: 'backLink',
      type: 'group',
      label: 'Back link',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'label', type: 'text', defaultValue: '← Back to Home' },
        { name: 'url', type: 'text', defaultValue: '/' },
      ],
    },
    sectionSettings,
  ],
};

/** Card grid — .shoot-grid, .deliv, feature cards. */
export const CardGrid: Block = {
  slug: 'cardGrid',
  labels: { singular: 'Card grid', plural: 'Card grids' },
  imageAltText: 'Grid of titled cards',
  fields: [
    headingFields,
    {
      name: 'columns',
      type: 'select',
      defaultValue: '4',
      options: [
        { label: '2 across', value: '2' },
        { label: '3 across', value: '3' },
        { label: '4 across', value: '4' },
      ],
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'bordered',
      options: [
        { label: 'Bordered card', value: 'bordered' },
        { label: 'Plain (icon + text)', value: 'plain' },
        { label: 'Numbered', value: 'numbered' },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      fields: [
        { name: 'icon', type: 'text', label: 'Icon', admin: { description: 'Optional symbol or emoji.' } },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Image (optional)' },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        linkField({ name: 'link', label: 'Card link (optional)' }),
      ],
    },
    sectionSettings,
  ],
};

/** Split media + text — alternating image/video beside copy. */
export const SplitMedia: Block = {
  slug: 'splitMedia',
  labels: { singular: 'Split media + text', plural: 'Split media + text' },
  imageAltText: 'Media on one side, text on the other',
  fields: [
    {
      name: 'mediaSide',
      type: 'select',
      defaultValue: 'right',
      label: 'Media on the',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
    },
    {
      name: 'mediaType',
      type: 'select',
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video file', value: 'video' },
        { label: 'Vimeo', value: 'vimeo' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, s) => s?.mediaType === 'image' },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video file URL',
      admin: {
        condition: (_, s) => s?.mediaType === 'video',
        description: 'e.g. /videos/Website video .mp4',
      },
    },
    {
      name: 'vimeoId',
      type: 'text',
      label: 'Vimeo ID',
      admin: { condition: (_, s) => s?.mediaType === 'vimeo' },
    },
    headingFields,
    { name: 'body', type: 'richText', label: 'Body copy' },
    {
      name: 'bullets',
      type: 'array',
      label: 'Bullet points',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'buttons', type: 'array', maxRows: 2, label: 'Buttons', fields: [linkField()] },
    sectionSettings,
  ],
};

/** Stats row — the big gradient numbers. */
export const Stats: Block = {
  slug: 'stats',
  labels: { singular: 'Stats row', plural: 'Stats rows' },
  imageAltText: 'Row of large numbers',
  fields: [
    headingFields,
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 42%, 3X, +210%' } },
        { name: 'label', type: 'text', required: true },
      ],
    },
    sectionSettings,
  ],
};

/** Accordion / FAQ. Also emits FAQPage schema when marked as FAQ. */
export const Accordion: Block = {
  slug: 'accordion',
  labels: { singular: 'Accordion / FAQ', plural: 'Accordions' },
  fields: [
    headingFields,
    {
      name: 'isFaq',
      type: 'checkbox',
      label: 'This is an FAQ',
      defaultValue: false,
      admin: { description: 'Adds FAQ structured data so questions can appear in Google results.' },
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'richText', required: true },
      ],
    },
    sectionSettings,
  ],
};
