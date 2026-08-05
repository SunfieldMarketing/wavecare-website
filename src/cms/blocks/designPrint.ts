import type { Block } from 'payload';
import { linkField } from '../fields/link';

/**
 * /design-print blocks.
 *
 * All classes below (.phero-wall, .ba-slider, .ds-grid, .ip-tabs, .rx-grid,
 * .sig-wrapper) are already defined in subservices.css — the same sheet
 * /photoservices uses — just not by any block built so far. Confirmed against
 * the stylesheet before building, not assumed.
 */

/** Breadcrumb + heading + trust checklist + fixed 4-cell photo wall. */
export const PrintHero: Block = {
  slug: 'printHero',
  labels: { singular: 'Print hero (photo wall)', plural: 'Print heroes' },
  imageAltText: 'Heading beside a fixed 4-photo collage',
  fields: [
    {
      name: 'breadcrumb',
      type: 'array',
      label: 'Breadcrumb',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text' , admin: { description: 'Leave blank for the current page.' }},
      ],
    },
    { name: 'title', type: 'textarea', required: true, label: 'Heading' },
    { name: 'subtitle', type: 'textarea', label: 'Supporting paragraph' },
    {
      name: 'subtitleStyle',
      type: 'select',
      enumName: 'enum_print_hero_sub',
      defaultValue: 'sub',
      options: [
        { label: 'Standard', value: 'sub' },
        { label: 'Wide hero (max-width 480px)', value: 'phero-sub' },
      ],
    },
    {
      name: 'checklist',
      type: 'array',
      label: 'Checkmark list',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'buttons', type: 'array', maxRows: 2, label: 'Buttons', fields: [linkField()] },
    {
      name: 'images',
      type: 'array',
      label: 'Photo wall (4 images)',
      minRows: 4,
      maxRows: 4,
      admin: { description: 'Fixed layout: wide, wide, square, wide-short.' },
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
  ],
};

/** Heading + draggable before/after + caption + optional stat row, one section. */
export const PrintIntro: Block = {
  slug: 'printIntro',
  labels: { singular: 'Intro + before/after + stats', plural: 'Intro sections' },
  imageAltText: 'Heading, a drag-to-compare image and supporting stats',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', required: true, label: 'Heading' },
    { name: 'lead', type: 'textarea', label: 'Lead paragraph' },
    { name: 'beforeImage', type: 'upload', relationTo: 'media', required: true, label: 'Before' },
    { name: 'afterImage', type: 'upload', relationTo: 'media', required: true, label: 'After' },
    { name: 'caption', type: 'text' },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats below the caption',
      maxRows: 3,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'suffix', type: 'text', admin: { description: 'e.g. % or x — animates counting up to value+suffix' } },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
};

/** .ds-grid > .ds-card — icon, number, title, description. */
export const IconCardGrid: Block = {
  slug: 'iconCardGrid',
  labels: { singular: 'Icon card grid', plural: 'Icon card grids' },
  imageAltText: 'Numbered cards with an icon',
  fields: [
    {
      name: 'tone',
      type: 'select',
      enumName: 'enum_icg_tone',
      defaultValue: 'deep',
      options: [
        { label: 'Deep teal', value: 'deep' },
        { label: 'Ink', value: 'ink' },
      ],
    },
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    { name: 'subtitle', type: 'textarea', label: 'Sub-paragraph' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'icon', type: 'textarea', label: 'Icon SVG', admin: { description: 'Paste inline SVG markup.' } },
        { name: 'number', type: 'text', admin: { description: 'e.g. 01. Blank auto-numbers.' } },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
};

/** .rx-grid > .rx-item — plain icon+title+desc, no number badge. */
export const ReceiveGrid: Block = {
  slug: 'receiveGrid',
  labels: { singular: 'Deliverables grid', plural: 'Deliverables grids' },
  imageAltText: 'Icon, title and description cards',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    {
      name: 'items',
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

/** .sig-wrapper — copy beside a looping showcase video. */
export const SignatureProduct: Block = {
  slug: 'signatureProduct',
  labels: { singular: 'Signature product (video)', plural: 'Signature products' },
  imageAltText: 'Copy beside a looping product video',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'text', required: true, label: 'Heading' },
    { name: 'body', type: 'textarea', label: 'Description' },
    { name: 'button', type: 'group', label: 'Button', fields: [linkField()] },
    {
      name: 'videoUrl',
      type: 'text',
      required: true,
      label: 'Video file URL',
      admin: { description: 'e.g. /videos/1 Wavecare Photo Ad (HQ).mp4' },
    },
  ],
};

/**
 * .ip-tabs / .ip-panel / .viz-doc — interactive print-process mockup that
 * morphs through Wireframe -> Flat Comp -> Revision -> Press-Ready. Bespoke to
 * this page; rendered by a dedicated client component (PrintProcess.tsx).
 */
export const PrintProcess: Block = {
  slug: 'printProcess',
  labels: { singular: 'Print process (mockup)', plural: 'Print process' },
  imageAltText: 'Interactive document mockup cycling through production phases',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    { name: 'subtitle', type: 'text', label: 'Sub-paragraph' },
    {
      name: 'phases',
      type: 'array',
      minRows: 4,
      maxRows: 4,
      admin: {
        description:
          'Exactly 4, in order: Wireframe, Flat Comp, Revision, Press-Ready. The visual mockup for each phase is fixed in code.',
      },
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Tab name' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'badge', type: 'text', required: true, label: 'Badge shown on the mockup' },
      ],
    },
  ],
};

export const designPrintBlocks = [
  PrintHero,
  PrintIntro,
  IconCardGrid,
  PrintProcess,
  ReceiveGrid,
  SignatureProduct,
];
