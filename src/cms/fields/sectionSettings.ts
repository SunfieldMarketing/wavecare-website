import type { Field } from 'payload';

/**
 * Appearance controls attached to EVERY block.
 *
 * This is what makes background / foreground / spacing / width editable from the
 * admin panel instead of being frozen in globals.css. Values map onto the
 * existing class names (.panel.deep, .panel.ink, .sec-pad ...) so the rendered
 * output is identical to the hand-written site unless an editor changes it.
 *
 * NOTE ON `enumName`: this group is nested inside every block of every
 * collection, so Payload's auto-generated enum names (collection_blocks_block_
 * group_field) run past SQL's 63-character identifier limit. Naming each enum
 * explicitly keeps identifiers short and — because the options are identical
 * everywhere — lets all blocks share one enum instead of duplicating it.
 */
export const sectionSettings: Field = {
  name: 'appearance',
  label: 'Appearance',
  type: 'group',
  admin: {
    description: 'Background, text colour, spacing and width for this section.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'background',
          label: 'Background',
          type: 'select',
          enumName: 'enum_appr_bg',
          defaultValue: 'deep',
          options: [
            { label: 'Deep teal', value: 'deep' },
            { label: 'Ink (near-black)', value: 'ink' },
            { label: 'Primary teal', value: 'primary' },
            { label: 'Light', value: 'light' },
            { label: 'White', value: 'white' },
            { label: 'Transparent', value: 'transparent' },
            { label: 'Custom colour', value: 'custom' },
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'textColor',
          label: 'Text colour',
          type: 'select',
          enumName: 'enum_appr_txt',
          defaultValue: 'auto',
          options: [
            { label: 'Auto (match background)', value: 'auto' },
            { label: 'Light text', value: 'light' },
            { label: 'Dark text', value: 'dark' },
            { label: 'Custom', value: 'custom' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'customBackground',
      type: 'text',
      label: 'Background colour',
      admin: {
        condition: (_, s) => s?.background === 'custom',
        description: 'Any CSS colour or gradient, e.g. #0A4339 or linear-gradient(...)',
      },
    },
    {
      name: 'customTextColor',
      type: 'text',
      label: 'Text colour',
      admin: { condition: (_, s) => s?.textColor === 'custom' },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background image',
      admin: { condition: (_, s) => s?.background === 'image' },
    },
    {
      name: 'backgroundVideo',
      type: 'group',
      label: 'Background video',
      admin: { condition: (_, s) => s?.background === 'video' },
      fields: [
        {
          name: 'source',
          type: 'select',
          enumName: 'enum_appr_bgvid_src',
          defaultValue: 'vimeo',
          options: [
            { label: 'Vimeo', value: 'vimeo' },
            { label: 'File URL', value: 'file' },
          ],
        },
        {
          name: 'vimeoId',
          type: 'text',
          label: 'Vimeo ID',
          admin: {
            condition: (_, s) => s?.source === 'vimeo',
            description: 'Just the number, e.g. 1187767005',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Video URL',
          admin: {
            condition: (_, s) => s?.source === 'file',
            description: 'e.g. /videos/Website video .mp4',
          },
        },
      ],
    },
    {
      name: 'overlay',
      type: 'group',
      label: 'Overlay',
      admin: {
        condition: (_, s) => s?.background === 'image' || s?.background === 'video',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Darken behind text',
              defaultValue: true,
              admin: { width: '50%' },
            },
            {
              name: 'opacity',
              type: 'number',
              label: 'Strength (0-100)',
              defaultValue: 60,
              min: 0,
              max: 100,
              admin: { width: '50%', condition: (_, s) => s?.enabled },
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'paddingTop',
          label: 'Space above',
          type: 'select',
          enumName: 'enum_appr_pt',
          defaultValue: 'default',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'sm' },
            { label: 'Default', value: 'default' },
            { label: 'Large', value: 'lg' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'paddingBottom',
          label: 'Space below',
          type: 'select',
          enumName: 'enum_appr_pb',
          defaultValue: 'default',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'sm' },
            { label: 'Default', value: 'default' },
            { label: 'Large', value: 'lg' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'width',
          label: 'Content width',
          type: 'select',
          enumName: 'enum_appr_w',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Wide', value: 'wide' },
            { label: 'Narrow', value: 'narrow' },
            { label: 'Full bleed', value: 'full' },
          ],
          admin: { width: '33%' },
        },
      ],
    },
    {
      name: 'anchorId',
      type: 'text',
      label: 'Anchor id',
      admin: {
        description:
          'Lets buttons jump here, e.g. "gallery" makes this section reachable at #gallery.',
      },
    },
  ],
};

/**
 * Standard section heading (eyebrow label + heading + sub-paragraph).
 * Used by most blocks — matches the existing .sec-head markup.
 */
export const headingFields: Field = {
  name: 'heading',
  label: 'Heading',
  type: 'group',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label above heading' },
    {
      name: 'title',
      type: 'text',
      label: 'Heading',
      admin: {
        description: 'Wrap words in *asterisks* to highlight them in the accent colour.',
      },
    },
    { name: 'subtitle', type: 'textarea', label: 'Sub-paragraph' },
    {
      name: 'align',
      type: 'select',
      enumName: 'enum_head_align',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Centre', value: 'center' },
      ],
    },
  ],
};
