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
      defaultValue: 'timeline',
      options: [
        { label: 'Vertical timeline', value: 'timeline' },
        { label: 'Horizontal row', value: 'row' },
        { label: 'Tabs with visual', value: 'tabs' },
      ],
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
