import type { Block } from 'payload';
import { linkField } from '../fields/link';

/**
 * /services blocks.
 *
 * services.css defines its own class system, separate from globals.css: .split
 * rather than a generic split, .stats-row/.stat-num rather than .stats/.num,
 * .final-cta rather than .final. Emitting the globals classes here would render
 * unstyled sections, so these blocks are deliberately not shared with the
 * general set.
 */

const sectionTone = {
  name: 'tone',
  type: 'select' as const,
  enumName: 'enum_svc_tone',
  defaultValue: 'dark',
  label: 'Section background',
  options: [
    { label: 'Dark (primary teal)', value: 'dark' },
    { label: 'Deeper', value: 'deeper' },
    { label: 'Light', value: 'light' },
    { label: 'Invert', value: 'invert' },
  ],
};

/** .services-grid > .service-card — numbered service cards. */
export const ServicesGrid: Block = {
  slug: 'servicesGrid',
  labels: { singular: 'Services grid', plural: 'Services grids' },
  imageAltText: 'Numbered grid of service cards',
  fields: [
    sectionTone,
    { name: 'anchorId', type: 'text', label: 'Anchor id', admin: { description: 'e.g. "services"' } },
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading', admin: { description: 'Line breaks preserved.' } },
    { name: 'lead', type: 'textarea', label: 'Lead paragraph' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'number', type: 'text', admin: { description: 'e.g. 01. Blank auto-numbers.' } },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
};

/** .split (+ .flipped/.on-dark/.on-light) — alternating media and copy rows. */
export const SplitRow: Block = {
  slug: 'splitRow',
  labels: { singular: 'Split row', plural: 'Split rows' },
  imageAltText: 'Media beside copy with a bullet list',
  fields: [
    sectionTone,
    {
      name: 'wrapSection',
      type: 'checkbox',
      defaultValue: false,
      label: 'Start a new section here',
      admin: {
        description:
          'Tick on the first split of a run. Consecutive splits sharing a background should leave this off.',
      },
    },
    {
      name: 'flipped',
      type: 'checkbox',
      label: 'Media on the left',
    },
    {
      name: 'textTone',
      type: 'select',
      enumName: 'enum_svc_split_tone',
      defaultValue: 'on-dark',
      label: 'Text colour',
      options: [
        { label: 'On dark', value: 'on-dark' },
        { label: 'On light', value: 'on-light' },
      ],
    },
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', required: true, label: 'Heading' },
    { name: 'body', type: 'textarea', label: 'Paragraph' },
    {
      name: 'bullets',
      type: 'array',
      label: 'Feature list',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'buttons', type: 'array', maxRows: 2, label: 'Buttons', fields: [linkField()] },
    {
      name: 'mediaType',
      type: 'select',
      enumName: 'enum_svc_media',
      defaultValue: 'video',
      options: [
        { label: 'Video file', value: 'video' },
        { label: 'Image', value: 'image' },
      ],
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video file URL',
      admin: {
        condition: (_, s) => s?.mediaType === 'video',
        description: 'e.g. /videos/Website video .mp4 — plays muted and loops when scrolled into view.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, s) => s?.mediaType === 'image' },
    },
  ],
};

/** .feature-row > .feature-card — the "why teams choose us" cards. */
export const FeatureRow: Block = {
  slug: 'featureRow',
  labels: { singular: 'Feature row', plural: 'Feature rows' },
  imageAltText: 'Row of reasons or differentiators',
  fields: [
    sectionTone,
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
};

/** .marquee > .marquee-row > .m-logo — scrolling client logos. */
export const LogoStrip: Block = {
  slug: 'logoStrip',
  labels: { singular: 'Logo strip', plural: 'Logo strips' },
  imageAltText: 'Continuously scrolling client logos',
  fields: [
    sectionTone,
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    {
      name: 'logos',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'name', type: 'text', label: 'Client name (alt text)' },
        {
          name: 'scaleUp',
          type: 'checkbox',
          defaultValue: false,
          label: 'Scale up 1.5x',
          admin: { description: 'For logos that render visually smaller than the rest of the row.' },
        },
      ],
    },
  ],
};

/** .testimonial-section > .testimonial-grid > .testimonial-card */
export const ServiceTestimonials: Block = {
  slug: 'serviceTestimonials',
  labels: { singular: 'Testimonials (services style)', plural: 'Testimonials (services style)' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    {
      name: 'quotes',
      type: 'array',
      minRows: 1,
      label: 'Quotes',
      admin: {
        description:
          'Held on the page rather than the Testimonials collection — these are different people from the ones on /testimonials.',
      },
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'author', type: 'text', required: true },
        { name: 'role', type: 'text', label: 'Role and facility' },
      ],
    },
  ],
};

/** .stats-row > .stat > .stat-num + .stat-label (not globals' .stats/.num/.cap). */
export const StatsRow: Block = {
  slug: 'statsRow',
  labels: { singular: 'Stats row (services style)', plural: 'Stats rows (services style)' },
  fields: [
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 50+, 1M+, 100%' } },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
};

/** .final-cta — the services-page closing CTA (not globals' .final). */
export const ServiceFinalCTA: Block = {
  slug: 'serviceFinalCta',
  labels: { singular: 'Final CTA (services style)', plural: 'Final CTAs (services style)' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', required: true, label: 'Heading' },
    { name: 'subtitle', type: 'textarea', label: 'Supporting paragraph' },
    { name: 'buttons', type: 'array', maxRows: 2, label: 'Buttons', fields: [linkField()] },
  ],
};

export const serviceBlocks = [
  ServicesGrid,
  SplitRow,
  FeatureRow,
  StatsRow,
  LogoStrip,
  ServiceTestimonials,
  ServiceFinalCTA,
];
