import type { GlobalConfig } from 'payload';
import { adminOnly, adminOrEditor } from '../access';
import { revalidateGlobalAfterChange } from '../hooks/revalidate';

/**
 * Design tokens.
 *
 * These are injected as CSS custom properties on <html>, overriding the
 * defaults in globals.css. Defaults below are the exact values the site ships
 * with today, so nothing changes visually until someone edits them.
 */
export const Theme: GlobalConfig = {
  slug: 'theme',
  label: 'Design & Colours',
  admin: {
    group: 'Settings',
    description: 'Site-wide colours, fonts and spacing. Changes apply everywhere.',
  },
  versions: { drafts: false, max: 20 },
  access: { read: () => true, update: adminOrEditor },
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Colours',
          fields: [
            {
              type: 'collapsible',
              label: 'Brand teals',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'tealDeep', type: 'text', defaultValue: '#0A4339', label: 'Deep', admin: { width: '33%' } },
                    { name: 'tealPrimary', type: 'text', defaultValue: '#0E5A50', label: 'Primary', admin: { width: '33%' } },
                    { name: 'tealSecondary', type: 'text', defaultValue: '#1B7A6E', label: 'Secondary', admin: { width: '33%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'tealAccent', type: 'text', defaultValue: '#2A9D8F', label: 'Accent', admin: { width: '33%' } },
                    { name: 'tealBright', type: 'text', defaultValue: '#5FD0BF', label: 'Bright', admin: { width: '33%' } },
                    { name: 'tealLight', type: 'text', defaultValue: '#E8F5F3', label: 'Light', admin: { width: '33%' } },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Neutrals',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'ink', type: 'text', defaultValue: '#062A24', label: 'Ink', admin: { width: '33%' } },
                    { name: 'navy', type: 'text', defaultValue: '#1A2332', label: 'Navy', admin: { width: '33%' } },
                    { name: 'white', type: 'text', defaultValue: '#FFFFFF', label: 'White', admin: { width: '33%' } },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Text on dark backgrounds',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'onDark', type: 'text', defaultValue: 'rgba(255,255,255,0.82)', label: 'Body', admin: { width: '33%' } },
                    { name: 'muted', type: 'text', defaultValue: 'rgba(255,255,255,0.5)', label: 'Muted', admin: { width: '33%' } },
                    { name: 'labelColor', type: 'text', defaultValue: 'rgba(255,255,255,0.62)', label: 'Eyebrow labels', admin: { width: '33%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'soft', type: 'text', defaultValue: 'rgba(255,255,255,0.10)', label: 'Soft border', admin: { width: '50%' } },
                    { name: 'borderTeal', type: 'text', defaultValue: 'rgba(42,157,143,0.4)', label: 'Teal border', admin: { width: '50%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Typography',
          fields: [
            {
              name: 'fontDisplay',
              type: 'text',
              defaultValue: "'DM Serif Display',Georgia,serif",
              label: 'Headings font stack',
            },
            {
              name: 'fontBody',
              type: 'text',
              defaultValue: "'DM Sans',system-ui,sans-serif",
              label: 'Body font stack',
            },
            {
              name: 'googleFontsHref',
              type: 'text',
              label: 'Google Fonts URL',
              defaultValue:
                'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap',
              access: { update: ({ req: { user } }) => user?.role === 'admin' },
              admin: { description: 'Admins only. Must match the font stacks above.' },
            },
          ],
        },
        {
          label: 'Layout',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'sectionPadding',
                  type: 'text',
                  defaultValue: 'clamp(80px,9vw,140px)',
                  label: 'Vertical section padding',
                  admin: { width: '50%' },
                },
                {
                  name: 'containerWidth',
                  type: 'text',
                  defaultValue: '1320px',
                  label: 'Max content width',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        {
          label: 'Motion',
          fields: [
            {
              name: 'enableAnimations',
              type: 'checkbox',
              defaultValue: true,
              label: 'Scroll reveal animations',
            },
            {
              name: 'enableSmoothScroll',
              type: 'checkbox',
              defaultValue: true,
              label: 'Smooth scrolling (Lenis)',
            },
            {
              name: 'enableCustomCursor',
              type: 'checkbox',
              defaultValue: true,
              label: 'Custom cursor',
            },
            {
              name: 'enableGrain',
              type: 'checkbox',
              defaultValue: true,
              label: 'Film grain overlay',
            },
          ],
        },
      ],
    },
  ],
};
