import type { GlobalConfig } from 'payload';
import { linkField } from '../fields/link';
import { adminOrEditor } from '../access';

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: {
    group: 'Settings',
    description: 'The header menu, including dropdowns.',
  },
  versions: { drafts: false, max: 20 },
  access: { read: () => true, update: adminOrEditor },
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media', label: 'Header logo' },
    {
      name: 'logoHeight',
      type: 'number',
      defaultValue: 110,
      label: 'Logo height (px)',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Menu items',
      admin: { description: 'Drag to reorder.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        linkField({ name: 'link', label: 'Destination' }),
        {
          name: 'children',
          type: 'array',
          label: 'Dropdown items',
          admin: { description: 'Leave empty for a plain link.' },
          fields: [
            { name: 'label', type: 'text', required: true },
            linkField({ name: 'link', label: 'Destination' }),
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Header button',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        linkField({ name: 'link', label: 'Button' }),
      ],
    },
  ],
};

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Settings' },
  versions: { drafts: false, max: 20 },
  access: { read: () => true, update: adminOrEditor },
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media', label: 'Footer logo' },
    { name: 'blurb', type: 'textarea', label: 'Short description' },
    {
      name: 'columns',
      type: 'array',
      label: 'Link columns',
      maxRows: 4,
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            linkField({ name: 'link', label: 'Destination' }),
            {
              name: 'highlight',
              type: 'checkbox',
              label: 'Emphasise this link',
              admin: { description: 'Styles it like the "Book a Demo →" call to action.' },
            },
          ],
        },
      ],
    },
    {
      name: 'social',
      type: 'array',
      label: 'Social links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: ['Facebook', 'Instagram', 'LinkedIn', 'YouTube', 'Vimeo', 'X'].map((v) => ({
            label: v,
            value: v.toLowerCase(),
          })),
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright line',
      admin: { description: 'Use {year} to insert the current year automatically.' },
      defaultValue: '© {year} Wavecare Marketing · Miami, FL',
    },
    {
      name: 'bottomNote',
      type: 'text',
      label: 'Bottom-right note',
      admin: { description: 'Shown after the legal links, e.g. the domain name.' },
    },
    {
      name: 'logoHeight',
      type: 'number',
      defaultValue: 140,
      label: 'Logo height (px)',
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal links',
      fields: [
        { name: 'label', type: 'text', required: true },
        linkField({ name: 'link', label: 'Destination' }),
      ],
    },
  ],
};
