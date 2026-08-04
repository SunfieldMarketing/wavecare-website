import type { Block } from 'payload';
import { sectionSettings, headingFields } from '../fields/sectionSettings';
import { linkField } from '../fields/link';

/** Scrolling logo / text marquee. */
export const LogoMarquee: Block = {
  slug: 'logoMarquee',
  labels: { singular: 'Logo marquee', plural: 'Logo marquees' },
  imageAltText: 'Continuously scrolling row',
  fields: [
    {
      name: 'mode',
      type: 'select',
      defaultValue: 'logos',
      options: [
        { label: 'Logos', value: 'logos' },
        { label: 'Text items', value: 'text' },
      ],
    },
    {
      name: 'logos',
      type: 'array',
      admin: { condition: (_, s) => s?.mode === 'logos' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'name', type: 'text', label: 'Client name (alt text)' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      admin: { condition: (_, s) => s?.mode === 'text' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'speed',
      type: 'number',
      defaultValue: 0.6,
      admin: { description: 'Pixels per frame. Higher is faster. Respects reduced-motion.' },
    },
    sectionSettings,
  ],
};

/** Photo gallery with lightbox. */
export const Gallery: Block = {
  slug: 'gallery',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  imageAltText: 'Grid of photos',
  fields: [
    headingFields,
    {
      name: 'items',
      type: 'array',
      required: true,
      label: 'Photos',
      admin: { description: 'Drag to reorder. Categories drive the filter buttons.' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        {
          name: 'categories',
          type: 'text',
          hasMany: true,
          label: 'Categories',
          admin: { description: 'e.g. Facility, Staff & Team. Leave blank to show only under "All".' },
        },
        {
          name: 'aspect',
          type: 'text',
          label: 'Aspect ratio',
          admin: { description: 'Optional, e.g. 4/5 or 16/9. Leave blank for the image’s own ratio.' },
        },
        {
          name: 'tag',
          type: 'text',
          label: 'Corner label',
          admin: { description: 'Optional small overlay label, e.g. "Brochure" or "Signage".' },
        },
      ],
    },
    {
      name: 'showFilters',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show category filter buttons',
    },
    {
      name: 'layout',
      type: 'select',
      enumName: 'enum_gallery_layout',
      defaultValue: 'masonry',
      options: [
        { label: 'Masonry', value: 'masonry' },
        { label: 'Even grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    {
      name: 'lightbox',
      type: 'checkbox',
      defaultValue: true,
      label: 'Click to enlarge',
    },
    {
      name: 'buttons',
      type: 'array',
      maxRows: 2,
      label: 'Buttons below the gallery',
      fields: [linkField()],
    },
    sectionSettings,
  ],
};

/** Before / after drag slider. */
export const BeforeAfter: Block = {
  slug: 'beforeAfter',
  labels: { singular: 'Before / after slider', plural: 'Before / after sliders' },
  imageAltText: 'Draggable image comparison',
  fields: [
    headingFields,
    { name: 'beforeImage', type: 'upload', relationTo: 'media', required: true, label: 'Before' },
    { name: 'afterImage', type: 'upload', relationTo: 'media', required: true, label: 'After' },
    { name: 'caption', type: 'text' },
    sectionSettings,
  ],
};

/** Single Vimeo embed. */
export const VideoEmbed: Block = {
  slug: 'videoEmbed',
  labels: { singular: 'Video', plural: 'Videos' },
  fields: [
    headingFields,
    {
      name: 'source',
      type: 'select',
      defaultValue: 'vimeo',
      options: [
        { label: 'Vimeo', value: 'vimeo' },
        { label: 'Video file', value: 'file' },
      ],
    },
    {
      name: 'vimeoId',
      type: 'text',
      label: 'Vimeo ID',
      admin: {
        condition: (_, s) => s?.source === 'vimeo',
        description: 'Just the number from the Vimeo URL, e.g. 906115435',
      },
    },
    {
      name: 'url',
      type: 'text',
      label: 'Video file URL',
      admin: { condition: (_, s) => s?.source === 'file' },
    },
    { name: 'poster', type: 'upload', relationTo: 'media', label: 'Poster image (optional)' },
    {
      name: 'aspect',
      type: 'select',
      defaultValue: '16/9',
      options: [
        { label: '16:9', value: '16/9' },
        { label: '9:16 (vertical)', value: '9/16' },
        { label: '1:1', value: '1/1' },
      ],
    },
    sectionSettings,
  ],
};

/** Grid of video cards that open in a lightbox — /videoservices tours + featured work. */
export const VideoGrid: Block = {
  slug: 'videoGrid',
  labels: { singular: 'Video grid', plural: 'Video grids' },
  imageAltText: 'Grid of playable video cards',
  fields: [
    headingFields,
    {
      name: 'enableFilters',
      type: 'checkbox',
      label: 'Show category filter buttons',
      defaultValue: false,
    },
    {
      name: 'videos',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Video', plural: 'Videos' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'vimeoId', type: 'text', required: true, label: 'Vimeo ID' },
        {
          name: 'poster',
          type: 'upload',
          relationTo: 'media',
          label: 'Thumbnail',
          admin: { description: 'Leave empty to use the Vimeo thumbnail automatically.' },
        },
        { name: 'category', type: 'text', label: 'Category', admin: { description: 'e.g. Virtual Tour, Commercial' } },
        { name: 'featured', type: 'checkbox', label: 'Show large' },
      ],
    },
    sectionSettings,
  ],
};

/**
 * Tabbed showcase — the interactive "Where your photos are used" panel on
 * /photoservices and the browser-mockup process tabs on /webdesign.
 */
export const TabsShowcase: Block = {
  slug: 'tabsShowcase',
  labels: { singular: 'Tabbed showcase', plural: 'Tabbed showcases' },
  imageAltText: 'Tabs beside a changing visual',
  fields: [
    headingFields,
    {
      name: 'tabs',
      type: 'array',
      minRows: 1,
      admin: { description: 'Each tab can show its visual inside a different mockup frame.' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        {
          name: 'icon',
          type: 'textarea',
          label: 'Icon SVG',
          admin: { description: 'Paste inline SVG markup, or leave blank.' },
        },
        {
          name: 'frame',
          type: 'select',
          enumName: 'enum_tab_frame',
          defaultValue: 'browser',
          label: 'Mockup frame',
          options: [
            { label: 'Browser window', value: 'browser' },
            { label: 'Brochure spread (two pages)', value: 'brochure' },
            { label: 'Google Business Profile', value: 'google' },
            { label: 'No frame — plain image', value: 'none' },
          ],
        },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Visual' },
        {
          name: 'image2',
          type: 'upload',
          relationTo: 'media',
          label: 'Second page',
          admin: { condition: (_, s) => s?.frame === 'brochure' },
        },
        {
          name: 'businessName',
          type: 'text',
          label: 'Business name',
          admin: { condition: (_, s) => s?.frame === 'google' },
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Star rating',
          min: 1,
          max: 5,
          defaultValue: 5,
          admin: { condition: (_, s) => s?.frame === 'google' },
        },
      ],
    },
    { name: 'buttons', type: 'array', maxRows: 2, label: 'Buttons', fields: [linkField()] },
    sectionSettings,
  ],
};
