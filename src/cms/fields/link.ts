import type { Field } from 'payload';

/**
 * Reusable link field.
 *
 * Editors pick an internal page (relationship, so slugs stay correct when a page
 * is renamed) or type an external URL. Rendering is handled by <CMSLink />.
 */
export const linkField = (overrides: { name?: string; label?: string } = {}): Field => ({
  name: overrides.name ?? 'link',
  label: overrides.label ?? 'Link',
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button text',
          admin: { width: '50%' },
        },
        {
          name: 'type',
          type: 'select',
          // Explicit name: links nest inside block arrays, so the generated
          // identifier would otherwise approach SQL's 63-char limit.
          enumName: 'enum_link_type',
          defaultValue: 'internal',
          options: [
            { label: 'Page on this site', value: 'internal' },
            { label: 'External URL', value: 'external' },
            { label: 'Anchor on this page', value: 'anchor' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Which page?',
      admin: { condition: (_, siblings) => siblings?.type === 'internal' },
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL',
      admin: {
        condition: (_, siblings) => siblings?.type === 'external',
        description: 'Include https://',
      },
    },
    {
      name: 'anchor',
      type: 'text',
      label: 'Anchor',
      admin: {
        condition: (_, siblings) => siblings?.type === 'anchor',
        description: 'Section id without the #, e.g. "gallery"',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'style',
          type: 'select',
          enumName: 'enum_link_style',
          defaultValue: 'primary',
          options: [
            { label: 'Primary (solid)', value: 'primary' },
            { label: 'Light', value: 'light' },
            { label: 'Ghost (outline)', value: 'ghost' },
            { label: 'Text only', value: 'text' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          admin: { width: '50%' },
        },
      ],
    },
  ],
});

/** An array of links, for button groups. */
export const linksField = (overrides: { name?: string; label?: string; max?: number } = {}): Field => ({
  name: overrides.name ?? 'links',
  label: overrides.label ?? 'Buttons',
  type: 'array',
  maxRows: overrides.max ?? 3,
  fields: linkField().type === 'group' ? (linkField() as any).fields : [],
});
