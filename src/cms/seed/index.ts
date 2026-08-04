import dotenv from 'dotenv';

// Next.js reads .env.local automatically, but a standalone tsx script does not.
// Load it explicitly, then fall back to .env, so `npm run seed` sees the same
// variables the dev server does.
dotenv.config({ path: '.env.local' });
dotenv.config();

import { getPayload } from 'payload';
import config from '../../payload.config';
import { seedPhotoservices } from './photoservices';
import { seedCaseStudies } from './case-studies';
import { seedCommercial } from './commercial';
import { seedLegalPages } from './legal';
import { seedTestimonials } from './testimonials';
import { seedAdminUser } from './admin';

/**
 * Content migration.
 *
 * Pulls the copy that currently lives inline in the page components into the
 * CMS, so nothing has to be retyped by hand. Safe to run more than once —
 * every step upserts rather than duplicating.
 *
 *   npm run seed
 */
async function run() {
  const payload = await getPayload({ config });

  payload.logger.info('── Wavecare content migration ──');

  await seedAdminUser(payload);
  await seedNavigation(payload);
  await seedCaseStudies(payload);
  await seedCommercial(payload);
  await seedLegalPages(payload);
  await seedTestimonials(payload);
  await seedPhotoservices(payload);

  payload.logger.info('── Done ──');
  process.exit(0);
}

async function seedNavigation(payload: any) {
  payload.logger.info('→ Seeding navigation & footer…');

  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      logoHeight: 110,
      items: [
        { label: 'Home', link: { label: 'Home', type: 'external', url: '/', style: 'text' } },
        {
          label: 'Services',
          link: { label: 'Services', type: 'external', url: '/services', style: 'text' },
          children: [
            { label: 'Brand & Photoshoots', link: { label: 'Brand & Photoshoots', type: 'external', url: '/photoservices', style: 'text' } },
            { label: 'Video Production', link: { label: 'Video Production', type: 'external', url: '/videoservices', style: 'text' } },
            { label: 'Design & Print', link: { label: 'Design & Print', type: 'external', url: '/design-print', style: 'text' } },
            { label: 'Web Design', link: { label: 'Web Design', type: 'external', url: '/webdesign', style: 'text' } },
          ],
        },
        { label: 'About Us', link: { label: 'About Us', type: 'external', url: '/about', style: 'text' } },
        { label: 'Case Studies', link: { label: 'Case Studies', type: 'external', url: '/case-studies', style: 'text' } },
        // Previously orphaned — reachable from the menu now.
        { label: 'Testimonials', link: { label: 'Testimonials', type: 'external', url: '/testimonials', style: 'text' } },
        { label: 'Contact', link: { label: 'Contact', type: 'external', url: '/contact', style: 'text' } },
      ],
      cta: {
        enabled: true,
        link: { label: 'Book a Demo', type: 'external', url: '/contact', style: 'primary' },
      },
    },
    overrideAccess: true,
  });

  const ext = (label: string, url: string, extra: Record<string, any> = {}) => ({
    label,
    link: { label, type: 'external', url, style: 'text' },
    ...extra,
  });

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      logoHeight: 140,
      blurb:
        'Healthcare marketing that helps facilities look as good as the care they provide. Built for Healthcare.',
      columns: [
        {
          heading: 'Explore',
          links: [
            ext('Services', '/services'),
            ext('Case Studies', '/case-studies'),
            ext('About', '/about'),
            ext('Contact', '/contact'),
          ],
        },
        {
          heading: 'Get In Touch',
          links: [
            ext('info@wavecare.io', 'mailto:info@wavecare.io'),
            ext('+1 732 930 1934', 'tel:+17329301934'),
            ext('Book a Demo →', '/contact', { highlight: true }),
          ],
        },
      ],
      copyright: '© {year} Wavecare Marketing · Miami, FL',
      legalLinks: [
        ext('Terms of Service', '/terms-of-service'),
        ext('Privacy Policy', '/privacy-policy'),
      ],
      bottomNote: 'wavecare.io',
    },
    overrideAccess: true,
  });

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Wavecare Marketing',
      tagline: 'Built for healthcare. Built for trust.',
      email: 'info@wavecare.io',
      defaultTitle: 'Marketing for Senior Living & Skilled Nursing | Wavecare',
      titleTemplate: '%s | Wavecare',
      defaultDescription:
        'Websites, photography, video tours, and branding for senior living, assisted living, and skilled nursing providers nationwide. Book a free audit.',
      siteUrl: 'https://wavecare.io',
      knowsAbout: [
        'senior living', 'assisted living', 'memory care', 'skilled nursing',
        'independent living', 'CCRC', 'rehabilitation', 'long-term care',
        'hospice', 'home health', 'home care',
      ].map((term) => ({ term })),
    },
    overrideAccess: true,
  });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
