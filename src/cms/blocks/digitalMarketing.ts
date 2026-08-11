import type { Block } from 'payload';
import { linkField } from '../fields/link';

/**
 * /digital-marketing blocks.
 *
 * dm.css is its own class system (`.hero`, `.acc`, `.split`, `.feature-row`,
 * `.stats-row`, `.final-cta` scoped under `.dm-page`) — visually identical to
 * services.css's vocabulary in several places, but NOT the same stylesheet,
 * so these blocks are deliberately separate from serviceBlocks rather than
 * reused. The page's decorative chrome (the accordion's four animated
 * "cover" mockups, and the WebGL wave on the final CTA) is fixed markup in
 * the block renderer, same as CameraCursor/ProcessShowcase/WebDesignProcess
 * Mockup elsewhere — only real copy is editable.
 */

const dmTone = {
  name: 'tone',
  type: 'select' as const,
  enumName: 'enum_dm_tone',
  defaultValue: 'dark',
  label: 'Section background',
  options: [
    { label: 'Dark (primary teal)', value: 'dark' },
    { label: 'Deeper', value: 'deeper' },
    { label: 'Light', value: 'light' },
  ],
};

/** .hero — matches services.css/subservices.css's own hero shape, dm.css class names. */
export const DMHero: Block = {
  slug: 'dmHero',
  labels: { singular: 'DM: Hero', plural: 'DM: Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      label: 'Heading',
      admin: {
        description:
          'Line breaks preserved. Wrap a word in *asterisks* for the accent colour, or _underscores_ for the light italic treatment.',
      },
    },
    { name: 'subtitle', type: 'textarea', label: 'Sub-paragraph' },
    { name: 'buttons', type: 'array', maxRows: 2, label: 'Buttons', fields: [linkField()] },
  ],
};

/** .acc > .acc-item — the 4-row "what we do" accordion with an animated cover per row. */
export const DMAccordion: Block = {
  slug: 'dmAccordion',
  labels: { singular: 'DM: Services accordion', plural: 'DM: Services accordions' },
  fields: [
    { name: 'anchorId', type: 'text', label: 'Anchor id', admin: { description: 'e.g. "what-we-do"' } },
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading', admin: { description: 'Line breaks preserved.' } },
    { name: 'lead', type: 'textarea', label: 'Lead paragraph' },
    {
      name: 'items',
      type: 'array',
      label: 'Accordion rows',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'number', type: 'text', admin: { description: 'e.g. 01. Blank auto-numbers.' } },
        { name: 'title', type: 'text', required: true, label: 'Row title (collapsed state)' },
        {
          name: 'openByDefault',
          type: 'checkbox',
          defaultValue: false,
          label: 'Open by default',
          admin: { description: 'Tick on exactly one row — the one shown expanded on page load.' },
        },
        {
          name: 'coverType',
          type: 'select',
          enumName: 'enum_dm_cover_type',
          defaultValue: 'shuffle',
          label: 'Cover animation',
          options: [
            { label: 'Shuffling ad windows', value: 'shuffle' },
            { label: 'Search typewriter', value: 'typewriter' },
            { label: 'Content calendar fill', value: 'calendar' },
            { label: 'Proof / attribution bars', value: 'proof' },
          ],
        },
        { name: 'coverTag', type: 'text', label: 'Cover badge text', admin: { description: 'e.g. "Live Optimization"' } },
        { name: 'heading', type: 'text', required: true, label: 'Detail heading' },
        { name: 'body', type: 'textarea', label: 'Detail paragraph' },
        {
          name: 'pills',
          type: 'array',
          label: 'Pills',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
  ],
};

/**
 * .split (+ .flipped/.on-dark/.on-light) with a fixed decorative mockup panel
 * instead of video/image media — dm.css's split-image never holds real media
 * on this page, only the panel-stack mockups.
 */
export const DMSplitMockup: Block = {
  slug: 'dmSplitMockup',
  labels: { singular: 'DM: Split row (mockup)', plural: 'DM: Split rows (mockup)' },
  fields: [
    dmTone,
    {
      name: 'wrapSection',
      type: 'checkbox',
      defaultValue: true,
      label: 'Start a new section here',
    },
    { name: 'flipped', type: 'checkbox', label: 'Media on the left' },
    {
      name: 'textTone',
      type: 'select',
      enumName: 'enum_dm_split_tone',
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
      name: 'mockup',
      type: 'select',
      enumName: 'enum_dm_mockup',
      defaultValue: 'adPreview',
      label: 'Mockup panel',
      options: [
        { label: 'Ad + search-result preview', value: 'adPreview' },
        { label: 'Performance bars', value: 'performanceBars' },
      ],
    },
  ],
};

/** .healthcare-head + .feature-row.four — the "what's included" 4-card row. */
export const DMFeatureRow: Block = {
  slug: 'dmFeatureRow',
  labels: { singular: 'DM: Feature row', plural: 'DM: Feature rows' },
  fields: [
    dmTone,
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    { name: 'lead', type: 'textarea', label: 'Lead paragraph' },
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

/** .trusted-head + .stats-row — the 3-step "how it works" row (light section). */
export const DMStatsRow: Block = {
  slug: 'dmStatsRow',
  labels: { singular: 'DM: Steps row', plural: 'DM: Steps rows' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    { name: 'lead', type: 'textarea', label: 'Lead paragraph' },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'number', type: 'text', required: true, admin: { description: 'e.g. 01' } },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
};

/** .final-cta.wavecare-final-wave-section — the WebGL-wave closing CTA. */
export const DMFinalCTA: Block = {
  slug: 'dmFinalCta',
  labels: { singular: 'DM: Final CTA (wave)', plural: 'DM: Final CTAs (wave)' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', required: true, label: 'Heading' },
    { name: 'subtitle', type: 'textarea', label: 'Supporting paragraph' },
    { name: 'buttons', type: 'array', maxRows: 2, label: 'Buttons', fields: [linkField()] },
  ],
};

export const digitalMarketingBlocks = [
  DMHero,
  DMAccordion,
  DMSplitMockup,
  DMFeatureRow,
  DMStatsRow,
  DMFinalCTA,
];
