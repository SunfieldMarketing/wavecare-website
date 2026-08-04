import type { Block } from 'payload';
import { linkField } from '../fields/link';
import { sectionSettings } from '../fields/sectionSettings';

/** /webdesign-specific blocks. Uses subservices.css, confirmed before writing. */

/** .hero-device-wrap > .hero-device.laptop — CSS-only laptop mockup, no real content inside. */
export const WebDesignHero: Block = {
  slug: 'webDesignHero',
  labels: { singular: 'Web design hero (laptop mockup)', plural: 'Web design heroes' },
  imageAltText: 'Heading beside a CSS-drawn laptop mockup',
  fields: [
    { name: 'title', type: 'textarea', required: true, label: 'Heading' },
    { name: 'subtitle', type: 'textarea', label: 'Supporting paragraph' },
    { name: 'buttons', type: 'array', maxRows: 2, label: 'Buttons', fields: [linkField()] },
    { name: 'respTag', type: 'text', defaultValue: 'Responsive', label: 'Corner badge on the mockup' },
  ],
};

/**
 * .ba-slider (webdesign variant) — before is the full background, after reveals
 * from the right via clip-path, with a visible circular drag handle. A third
 * distinct before/after system alongside components/BeforeAfterSlider.tsx
 * (/photoservices) and DragBeforeAfter.tsx (/design-print) — confirmed via CSS
 * rather than assumed to be the same as either.
 */
export const RevealBeforeAfter: Block = {
  slug: 'revealBeforeAfter',
  labels: { singular: 'Before/after (reveal handle)', plural: 'Before/after (reveal handle)' },
  imageAltText: 'Draggable comparison with a circular handle',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    { name: 'lead', type: 'textarea', label: 'Lead paragraph' },
    { name: 'beforeImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'afterImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text' },
    sectionSettings,
  ],
};

/**
 * Capability cards with a fixed preset visual per card (design / dev / manage
 * / seo / content / hosting), matching the hand-written animated mini-mockups
 * pixel-for-pixel. The mockups are decorative UI chrome, not content, so they
 * stay fixed in code; title, body and which preset each card uses are editable.
 */
export const CapabilitiesGrid: Block = {
  slug: 'capabilitiesGrid',
  labels: { singular: 'Capabilities grid', plural: 'Capabilities grids' },
  imageAltText: 'Cards with an animated mini browser-window mockup',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'visual',
          type: 'select',
          enumName: 'enum_cap_visual',
          required: true,
          options: [
            { label: 'Design (sidebar layout)', value: 'design' },
            { label: 'Development (code lines)', value: 'dev' },
            { label: 'Management (gear + status)', value: 'manage' },
            { label: 'SEO (bar chart)', value: 'seo' },
            { label: 'Content (text + image)', value: 'content' },
            { label: 'Hosting (server + URL)', value: 'hosting' },
          ],
        },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    sectionSettings,
  ],
};

/** .five-things > .ft-card — plain icon cards, zero CSS dependency (inline-styled in the original). */
export const SimpleIconGrid: Block = {
  slug: 'simpleIconGrid',
  labels: { singular: 'Simple icon grid', plural: 'Simple icon grids' },
  imageAltText: 'Small icon, title and description cards',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label' },
    { name: 'title', type: 'textarea', label: 'Heading' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'icon', type: 'textarea', label: 'Icon SVG' },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    sectionSettings,
  ],
};

export const webDesignBlocks = [
  WebDesignHero,
  RevealBeforeAfter,
  CapabilitiesGrid,
  SimpleIconGrid,
];
