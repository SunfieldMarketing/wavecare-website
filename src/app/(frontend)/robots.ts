import { MetadataRoute } from 'next';
import { getGlobal } from '@/lib/cms';

/**
 * Found 2026-08-26 during the integrations audit: sitemap.ts already reads
 * Site Settings' `siteUrl` (admin-only, "changing this affects every
 * canonical URL" per its own field description) so the sitemap always
 * points at the correct domain - this file had the domain hardcoded
 * instead, so an admin changing siteUrl would silently leave robots.txt
 * advertising a sitemap on the old domain. Same source of truth now.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings: any = await getGlobal('site-settings').catch(() => null);
  const base = (settings?.siteUrl || 'https://wavecare.io').replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
