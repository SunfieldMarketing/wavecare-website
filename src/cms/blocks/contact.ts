import type { Block } from 'payload';
import { sectionSettings, headingFields } from '../fields/sectionSettings';

/**
 * Contact-page blocks.
 *
 * The lead form's submit logic is deliberately NOT configurable — it posts to
 * /api/contact which upserts into GoHighLevel. Only its labels, placeholders,
 * service chips and success copy are editable, so an edit can never break lead
 * capture.
 */

export const ContactHero: Block = {
  slug: 'contactHero',
  labels: { singular: 'Contact hero + form', plural: 'Contact heroes' },
  imageAltText: 'Split hero with trust points and the enquiry form',
  fields: [
    { name: 'backgroundImage', type: 'upload', relationTo: 'media', label: 'Background photo' },
    { name: 'eyebrow', type: 'text', label: 'Small label above heading' },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      label: 'Heading',
      admin: { description: 'Wrap words in *asterisks* for the accent colour. Line breaks preserved.' },
    },
    { name: 'subtitle', type: 'textarea', label: 'Supporting paragraph' },
    {
      name: 'trustItems',
      type: 'array',
      label: 'Trust points',
      fields: [
        {
          name: 'icon',
          type: 'textarea',
          label: 'Icon SVG',
          admin: { description: 'Paste inline SVG markup, or leave blank.' },
        },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    {
      name: 'directLinks',
      type: 'array',
      label: 'Direct contact links',
      admin: { description: 'Email and phone shown under the trust points.' },
      fields: [
        { name: 'icon', type: 'text', label: 'Icon character', admin: { description: 'e.g. ✉ or ☎' } },
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true, admin: { description: 'mailto: or tel:' } },
      ],
    },
    {
      name: 'form',
      type: 'group',
      label: 'Enquiry form',
      admin: { description: 'Wording only — where submissions go is fixed in code.' },
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Send us a message' },
        { name: 'subheading', type: 'text', defaultValue: 'Prefer to talk?' },
        { name: 'subheadingLinkLabel', type: 'text', defaultValue: 'Book a demo instead →' },
        { name: 'subheadingLinkHref', type: 'text', defaultValue: '#calendar' },
        {
          type: 'row',
          fields: [
            { name: 'nameLabel', type: 'text', defaultValue: 'Name', admin: { width: '50%' } },
            { name: 'namePlaceholder', type: 'text', defaultValue: 'John Doe', admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'emailLabel', type: 'text', defaultValue: 'Email', admin: { width: '50%' } },
            { name: 'emailPlaceholder', type: 'text', defaultValue: 'john@example.com', admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'companyLabel', type: 'text', defaultValue: 'Facility / Company', admin: { width: '50%' } },
            {
              name: 'companyPlaceholder',
              type: 'text',
              defaultValue: 'Oakwood Senior Living',
              admin: { width: '50%' },
            },
          ],
        },
        { name: 'chipsLabel', type: 'text', defaultValue: 'What do you need help with?' },
        {
          name: 'chips',
          type: 'array',
          label: 'Service options',
          admin: { description: 'Selections are attached to the CRM record as a note.' },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'messageLabel',
              type: 'text',
              defaultValue: 'Tell us about your facility (Optional)',
              admin: { width: '50%' },
            },
            {
              name: 'messagePlaceholder',
              type: 'text',
              defaultValue: "A sentence or two about what you're working on...",
              admin: { width: '50%' },
            },
          ],
        },
        { name: 'submitLabel', type: 'text', defaultValue: 'Send Message' },
        { name: 'retryLabel', type: 'text', defaultValue: 'Try Again' },
        {
          name: 'note',
          type: 'text',
          defaultValue: 'Your information is secure and will never be shared.',
        },
        { name: 'successTitle', type: 'text', defaultValue: 'Message Sent!' },
        {
          name: 'successBody',
          type: 'textarea',
          defaultValue:
            'Thanks for reaching out. We will get back to you within one business day.',
        },
      ],
    },
  ],
};

/** Numbered steps — .steps > .step > .sn + h3 + p */
export const StepsBlock: Block = {
  slug: 'steps',
  labels: { singular: 'Numbered steps', plural: 'Numbered steps' },
  imageAltText: 'Row of numbered steps',
  fields: [
    headingFields,
    {
      name: 'headingIcon',
      type: 'textarea',
      label: 'Icon SVG beside the eyebrow',
      admin: { description: 'Optional inline SVG, e.g. the wave mark.' },
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'number', type: 'text', admin: { description: 'e.g. 01. Leave blank to auto-number.' } },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    sectionSettings,
  ],
};

/** Embedded booking calendar (GoHighLevel widget). */
export const CalendarEmbed: Block = {
  slug: 'calendarEmbed',
  labels: { singular: 'Booking calendar', plural: 'Booking calendars' },
  imageAltText: 'Embedded scheduling widget',
  fields: [
    headingFields,
    {
      name: 'widgetId',
      type: 'text',
      required: true,
      label: 'Booking widget ID',
      admin: {
        description:
          'The id from your GoHighLevel booking link, e.g. BihxiP7RLvybBcV9yUHJ. The full URL is built from it.',
      },
    },
    {
      name: 'minHeight',
      type: 'number',
      defaultValue: 600,
      label: 'Minimum height (px)',
    },
    sectionSettings,
  ],
};

export const contactBlocks = [ContactHero, StepsBlock, CalendarEmbed];
