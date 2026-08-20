import type { CollectionConfig } from 'payload';
import { adminOrEditor, publishedOrAuthenticated } from '../access';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'organisation', 'type', '_status'],
    group: 'Content',
    description: 'Written quotes and video testimonials, reusable on any page.',
  },
  versions: { drafts: true },
  access: {
    read: publishedOrAuthenticated,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOrEditor,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'quote',
      options: [
        { label: 'Written quote', value: 'quote' },
        { label: 'Video', value: 'video' },
      ],
    },
    {
      name: 'quote',
      type: 'textarea',
      label: 'What they said',
      admin: { condition: (_, s) => s?.type === 'quote' },
    },
    {
      name: 'vimeoId',
      type: 'text',
      label: 'Vimeo ID',
      admin: { condition: (_, s) => s?.type === 'video' },
    },
    { name: 'author', type: 'text', required: true, label: 'Name' },
    { name: 'role', type: 'text', label: 'Job title' },
    {
      name: 'organisation',
      type: 'text',
      label: 'Facility / location',
      admin: { description: 'e.g. "Assisted Living Community · 84 beds · Tampa, FL"' },
    },
    {
      name: 'outcome',
      type: 'text',
      label: 'Outcome badge',
      admin: { description: 'Short result shown under the quote, e.g. "Better-fit inquiries in under 30 days".' },
    },
    {
      name: 'initials',
      type: 'text',
      label: 'Initials',
      maxLength: 3,
      admin: { description: 'Shown in the avatar circle when there is no photo.' },
    },
    { name: 'avatar', type: 'upload', relationTo: 'media', label: 'Photo' },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: { description: 'Optional star rating, 1 to 5.' },
    },
  ],
};
