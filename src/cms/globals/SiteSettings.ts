import type { GlobalConfig } from 'payload';
import { adminOnly, adminOrEditor, publishedOrAuthenticated } from '../access';
import { revalidateGlobalAfterChange } from '../hooks/revalidate';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
    description: 'Company details, default SEO, and tracking codes.',
  },
  // See cms/globals/Navigation.ts's Navigation export for the full writeup -
  // same change, same reason, applied to all four shared globals together.
  versions: { drafts: true, max: 20 },
  access: { read: publishedOrAuthenticated, update: adminOrEditor },
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Company',
          fields: [
            { name: 'siteName', type: 'text', defaultValue: 'Wavecare Marketing', required: true },
            { name: 'tagline', type: 'text', defaultValue: 'Built for healthcare. Built for trust.' },
            {
              name: 'description',
              type: 'textarea',
              defaultValue:
                'Wavecare Marketing is a healthcare-focused marketing agency specializing in branding, photography, video production, design, print, and conversion-first web design for senior care facilities and medical practices.',
            },
            { name: 'email', type: 'email', defaultValue: 'info@wavecare.io' },
            { name: 'phone', type: 'text' },
            {
              name: 'address',
              type: 'group',
              fields: [
                { name: 'street', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'city', type: 'text', admin: { width: '40%' } },
                    { name: 'state', type: 'text', admin: { width: '30%' } },
                    { name: 'zip', type: 'text', admin: { width: '30%' } },
                  ],
                },
              ],
            },
            {
              name: 'knowsAbout',
              type: 'array',
              label: 'Specialisms',
              admin: {
                description:
                  'Feeds the Organization structured data that tells Google what you do.',
              },
              fields: [{ name: 'term', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Default SEO',
          fields: [
            {
              name: 'defaultTitle',
              type: 'text',
              defaultValue: 'Marketing for Senior Living & Skilled Nursing | Wavecare',
            },
            {
              name: 'titleTemplate',
              type: 'text',
              defaultValue: '%s | Wavecare',
              admin: { description: '%s is replaced by the page title.' },
            },
            {
              name: 'defaultDescription',
              type: 'textarea',
              defaultValue:
                'Websites, photography, video tours, and branding for senior living, assisted living, and skilled nursing providers nationwide. Book a free audit.',
            },
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Default social share image',
            },
            {
              name: 'siteUrl',
              type: 'text',
              defaultValue: 'https://wavecare.io',
              access: { update: ({ req: { user } }) => user?.role === 'admin' },
              admin: { description: 'Admins only. Changing this affects every canonical URL.' },
            },
          ],
        },
        {
          label: 'Tracking',
          fields: [
            {
              name: 'tracking',
              type: 'group',
              label: false,
              access: { update: ({ req: { user } }) => user?.role === 'admin' },
              admin: { description: 'Admins only. Leave blank to disable a service.' },
              fields: [
                { name: 'ga4Id', type: 'text', label: 'Google Analytics 4 ID' },
                { name: 'googleAdsId', type: 'text', label: 'Google Ads ID' },
                { name: 'metaPixelId', type: 'text', label: 'Meta Pixel ID' },
                { name: 'posthogKey', type: 'text', label: 'PostHog project key' },
              ],
            },
            {
              name: 'cookieBanner',
              type: 'group',
              label: 'Cookie banner',
              fields: [
                { name: 'enabled', type: 'checkbox', defaultValue: true },
                { name: 'text', type: 'textarea' },
                { name: 'acceptLabel', type: 'text', defaultValue: 'Accept' },
                { name: 'declineLabel', type: 'text', defaultValue: 'Decline' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
