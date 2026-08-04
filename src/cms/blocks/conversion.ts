import type { Block } from 'payload';
import { sectionSettings, headingFields } from '../fields/sectionSettings';
import { linkField } from '../fields/link';

/** Numbered process / timeline steps. */
export const Process: Block = {
  slug: 'process',
  labels: { singular: 'Process steps', plural: 'Process steps' },
  imageAltText: 'Numbered sequence of steps',
  fields: [
    headingFields,
    {
      name: 'layout',
      type: 'select',
      enumName: 'enum_process_layout',
      defaultValue: 'tabs',
      options: [
        { label: 'Interactive tabs + contact sheet', value: 'tabs' },
        { label: 'Simple numbered cards', value: 'cards' },
      ],
    },
    {
      name: 'contactSheet',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Contact sheet photos',
      admin: {
        condition: (_, s) => s?.layout === 'tabs',
        description:
          'Six images work best. They sharpen from blurred proofs to final selects as the visitor moves through the phases.',
      },
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', label: 'Step label', admin: { description: 'e.g. "Step 01" — leave blank to auto-number.' } },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Visual (optional)' },
      ],
    },
    { name: 'buttons', type: 'array', maxRows: 2, label: 'Buttons', fields: [linkField()] },
    sectionSettings,
  ],
};

/** Case study cards. Either hand-picked or the newest N automatically. */
export const CaseStudyGrid: Block = {
  slug: 'caseStudyGrid',
  labels: { singular: 'Case study grid', plural: 'Case study grids' },
  fields: [
    headingFields,
    {
      name: 'mode',
      type: 'select',
      defaultValue: 'auto',
      options: [
        { label: 'Latest automatically', value: 'auto' },
        { label: 'Choose specific ones', value: 'manual' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 4,
      admin: { condition: (_, s) => s?.mode === 'auto' },
    },
    {
      name: 'caseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      admin: { condition: (_, s) => s?.mode === 'manual' },
    },
    { name: 'buttons', type: 'array', maxRows: 2, label: 'Buttons', fields: [linkField()] },
    sectionSettings,
  ],
};

/**
 * Case study showcase cards (.cs-grid > .cs-card).
 *
 * Separate from caseStudyGrid: the index page's cards carry their own headline,
 * client description and result, which differ from the full case-study records,
 * and they are presentational rather than linked.
 */
export const CaseStudyCards: Block = {
  slug: 'caseStudyCards',
  labels: { singular: 'Case study cards', plural: 'Case study cards' },
  imageAltText: 'Grid of image-led project cards',
  fields: [
    headingFields,
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        {
          name: 'tags',
          type: 'array',
          label: 'Tags over the image',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        { name: 'client', type: 'text', label: 'Client description', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        {
          name: 'result',
          type: 'group',
          label: 'Result',
          fields: [
            { name: 'value', type: 'text', admin: { description: 'e.g. 48 or 72%. Leave blank to hide.' } },
            { name: 'label', type: 'text' },
          ],
        },
        linkField({ name: 'link', label: 'Card link (optional)' }),
      ],
    },
    sectionSettings,
  ],
};

/** Testimonials — text quotes or Vimeo video testimonials. */
export const TestimonialGrid: Block = {
  slug: 'testimonialGrid',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    headingFields,
    {
      name: 'mode',
      type: 'select',
      defaultValue: 'auto',
      options: [
        { label: 'Latest automatically', value: 'auto' },
        { label: 'Choose specific ones', value: 'manual' },
      ],
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: { condition: (_, s) => s?.mode === 'manual' },
    },
    sectionSettings,
  ],
};

/** The closing call-to-action with the animated wave canvas. */
export const FinalCTA: Block = {
  slug: 'finalCta',
  labels: { singular: 'Final call to action', plural: 'Final calls to action' },
  imageAltText: 'Closing banner with animated wave',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label above heading' },
    { name: 'title', type: 'textarea', required: true, label: 'Heading' },
    { name: 'subtitle', type: 'textarea', label: 'Supporting paragraph' },
    { name: 'buttons', type: 'array', maxRows: 2, label: 'Buttons', fields: [linkField()] },
    {
      name: 'waveAnimation',
      type: 'checkbox',
      defaultValue: true,
      label: 'Animated wave background',
    },
    sectionSettings,
  ],
};

/** Contact form block — fields are configured in the Forms collection. */
export const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: { singular: 'Contact form', plural: 'Contact forms' },
  fields: [
    headingFields,
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Which form?',
    },
    {
      name: 'sidebar',
      type: 'group',
      label: 'Side panel',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Show side panel' },
        { name: 'title', type: 'text' },
        { name: 'body', type: 'richText' },
        {
          name: 'details',
          type: 'array',
          label: 'Contact details',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
          ],
        },
      ],
    },
    sectionSettings,
  ],
};
