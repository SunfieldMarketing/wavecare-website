import type { GlobalConfig } from 'payload';
import { linkField } from '../fields/link';
import { adminOrEditor, publishedOrAuthenticated } from '../access';
import { revalidateGlobalAfterChange } from '../hooks/revalidate';

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: {
    group: 'Settings',
    description: 'The header menu, including dropdowns.',
  },
  // Found 2026-08-27: Navigation/Footer/Theme/Site Settings had no
  // draft/publish distinction at all (drafts: false) - every save went
  // live immediately, with nothing for Live Preview to show "in progress".
  // Matches Slate Cinema's own model (see CMS-PARITY-HANDOFF.md 7.3, which
  // flagged this explicitly as "a decision for whoever owns this content,
  // not something to assume" - decided now: bring these four to parity).
  versions: { drafts: true, max: 20 },
  // Was `read: () => true` - unconditionally public, with no published/
  // draft distinction possible even after enabling versions above. Same
  // fix Slate Cinema needed for its own globals: an anonymous visitor only
  // ever sees the published version; a logged-in editor sees their own
  // draft too, which is what makes Live Preview show an in-progress edit
  // instead of silently falling back to published (see CaseStudies.ts's
  // access for the identical pattern already proven on this project).
  access: { read: publishedOrAuthenticated, update: adminOrEditor },
  hooks: { afterChange: [revalidateGlobalAfterChange] },
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
  // See Navigation's own comment above (same file) for why this changed
  // from drafts: false and a bare `read: () => true`.
  versions: { drafts: true, max: 20 },
  access: { read: publishedOrAuthenticated, update: adminOrEditor },
  // Found 2026-08-25: this was the one collection/global missing its
  // revalidation hook (Navigation, right above, has always had it) --
  // same class of gap this repo already hit once for Media (see commit
  // 79ad78d: "Media collection missing revalidation hook"). Without it, a
  // footer edit saves fine but never reaches the live site until some
  // other, unrelated save happens to revalidate the whole app anyway.
  hooks: { afterChange: [revalidateGlobalAfterChange] },
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
