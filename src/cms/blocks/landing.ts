import type { Block } from 'payload';
import { linkField } from '../fields/link';

/**
 * Landing-page blocks.
 *
 * These render the `wc-*` design system in commercial.css, which is separate
 * from the main site styles. Kept as their own block set so the same kit can be
 * reused for future campaign or client landing pages.
 */

/**
 * Two landing design systems exist: `wc-*` (commercial.css) and `wct-*`
 * (testimonials.css). They share the same content shape, so the blocks below
 * take a variant rather than being duplicated per stylesheet.
 */
const variantField = {
  name: 'variant',
  type: 'select' as const,
  enumName: 'enum_landing_variant',
  defaultValue: 'wc',
  label: 'Design system',
  options: [
    { label: 'Commercial (wc)', value: 'wc' },
    { label: 'Testimonials (wct)', value: 'wct' },
  ],
  admin: { description: 'Must match the stylesheet the page imports.' },
};

export const LandingHero: Block = {
  slug: 'landingHero',
  labels: { singular: 'Landing hero', plural: 'Landing heroes' },
  imageAltText: 'Centred landing-page header',
  fields: [
    variantField,
    { name: 'eyebrow', type: 'text', label: 'Small label above heading' },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      label: 'Heading',
      admin: {
        description: 'Wrap words in _underscores_ to italicise them. Line breaks are preserved.',
      },
    },
    { name: 'subtitle', type: 'textarea', label: 'Supporting paragraph' },
    {
      name: 'trustItems',
      type: 'array',
      label: 'Trust line',
      admin: { description: 'Shown under the heading, separated by dots.' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
};

export const VideoFeature: Block = {
  slug: 'videoFeature',
  labels: { singular: 'Featured video', plural: 'Featured videos' },
  imageAltText: 'Large framed video with a call to action',
  fields: [
    {
      name: 'contextLine',
      type: 'text',
      label: 'Line above the video',
      admin: { description: 'e.g. "Watch the overview as Jake explains the approach"' },
    },
    { name: 'vimeoId', type: 'text', required: true, label: 'Vimeo ID' },
    { name: 'videoTitle', type: 'text', label: 'Video title (accessibility)' },
    { name: 'subhead', type: 'textarea', label: 'Paragraph below the video' },
    linkField({ name: 'cta', label: 'Button' }),
    { name: 'ctaNote', type: 'text', label: 'Small note under the button' },
  ],
};

export const StatsBar: Block = {
  slug: 'statsBar',
  labels: { singular: 'Stats bar', plural: 'Stats bars' },
  imageAltText: 'Full-width band of statistics',
  fields: [
    variantField,
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 500+ or 3.4×' } },
        { name: 'label', type: 'text', required: true },
        {
          name: 'countTo',
          type: 'text',
          label: 'Count up to',
          admin: {
            description:
              'Optional. Set a number here to animate the value counting up, e.g. 3.4. Leave blank to show the value as-is.',
          },
        },
        { name: 'suffix', type: 'text', label: 'Suffix', admin: { condition: (_: any, s: any) => !!s?.countTo } },
        {
          name: 'decimals',
          type: 'number',
          defaultValue: 0,
          label: 'Decimal places',
          admin: { condition: (_: any, s: any) => !!s?.countTo },
        },
      ],
    },
    {
      name: 'showTransition',
      type: 'checkbox',
      label: 'Gradient divider below',
    },
  ],
};

export const PillBand: Block = {
  slug: 'pillBand',
  labels: { singular: 'Pill band', plural: 'Pill bands' },
  imageAltText: 'Row of rounded tags',
  fields: [
    { name: 'label', type: 'text', label: 'Label above the pills' },
    {
      name: 'pills',
      type: 'array',
      minRows: 1,
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'showTransition',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show the gradient divider below',
    },
  ],
};

export const AuditCTA: Block = {
  slug: 'auditCta',
  labels: { singular: 'Offer / audit CTA', plural: 'Offer / audit CTAs' },
  imageAltText: 'Offer block with a checklist and button',
  fields: [
    variantField,
    { name: 'tag', type: 'text', label: 'Tag above the heading' },
    { name: 'title', type: 'textarea', required: true, label: 'Heading' },
    { name: 'subtitle', type: 'textarea', label: 'Intro line above the list' },
    {
      name: 'items',
      type: 'array',
      label: 'Checklist',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    linkField({ name: 'cta', label: 'Button' }),
    { name: 'ctaNote', type: 'text', label: 'Small note under the button' },
  ],
};

export const landingBlocks = [LandingHero, VideoFeature, StatsBar, PillBand, AuditCTA];
