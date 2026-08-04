import type { Block } from 'payload';
import { linkField } from '../fields/link';

/**
 * Testimonial-page blocks.
 *
 * These render the `wct-*` design system in testimonials.css. Quotes come from
 * the Testimonials collection rather than being typed into the block, so the
 * same record can be reused on any page.
 */

export const VideoTestimonials: Block = {
  slug: 'videoTestimonials',
  labels: { singular: 'Video testimonials', plural: 'Video testimonials' },
  imageAltText: 'Alternating rows of video and quote',
  fields: [
    { name: 'label', type: 'text', label: 'Small label above heading' },
    {
      name: 'title',
      type: 'textarea',
      label: 'Heading',
      admin: { description: 'Wrap words in _underscores_ to italicise them.' },
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      required: true,
      label: 'Which testimonials?',
      admin: { description: 'Rows alternate left/right automatically. Use video testimonials here.' },
    },
  ],
};

export const TestimonialCards: Block = {
  slug: 'testimonialCards',
  labels: { singular: 'Testimonial cards', plural: 'Testimonial cards' },
  imageAltText: 'Grid of quote cards',
  fields: [
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      required: true,
      label: 'Which testimonials?',
    },
  ],
};

export const DividerLabel: Block = {
  slug: 'dividerLabel',
  labels: { singular: 'Divider with label', plural: 'Dividers' },
  imageAltText: 'Horizontal rule with centred text',
  fields: [{ name: 'text', type: 'text', required: true, label: 'Text' }],
};

export const InlineCTA: Block = {
  slug: 'inlineCta',
  labels: { singular: 'Inline call to action', plural: 'Inline calls to action' },
  imageAltText: 'Slim banner with a button',
  fields: [
    { name: 'lead', type: 'text', label: 'Bold lead-in', admin: { description: 'e.g. "Curious where you stand?"' } },
    { name: 'text', type: 'textarea', label: 'Supporting text' },
    linkField({ name: 'cta', label: 'Button' }),
  ],
};

export const testimonialBlocks = [VideoTestimonials, TestimonialCards, DividerLabel, InlineCTA];
