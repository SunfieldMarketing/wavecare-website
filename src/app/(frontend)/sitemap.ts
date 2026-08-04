import { MetadataRoute } from 'next';
import { getAllPageSlugs, getAllCaseStudySlugs, getGlobal } from '@/lib/cms';

/**
 * Sitemap, driven by the CMS.
 *
 * Pages and case studies come from Payload, so anything an editor publishes is
 * listed automatically and anything they tick "hide from sitemap" on is not.
 *
 * Every page (including the homepage, slug `home`) is now CMS-managed, so
 * there are no hardcoded fallback routes left. Keeping the array (typed,
 * empty) rather than deleting the mechanism entirely — if a future page is
 * ever added outside the CMS, or the CMS is briefly unreachable and the
 * catch below swallows the error, this is the place to list it.
 */
const ROUTES_NOT_YET_IN_CMS: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings: any = await getGlobal('site-settings').catch(() => null);
  const base = (settings?.siteUrl || 'https://wavecare.io').replace(/\/$/, '');

  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  const push = (
    path: string,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: number,
    lastModified: Date = new Date(),
  ) => {
    const url = path === '/' ? base : `${base}${path}`;
    if (seen.has(url)) return;
    seen.add(url);
    entries.push({ url, lastModified, changeFrequency, priority });
  };

  // CMS-managed entries first, so an editor's settings win over the fallbacks.
  try {
    for (const p of await getAllPageSlugs()) {
      if (!p.slug) continue;
      push(
        p.slug === 'home' ? '/' : `/${p.slug}`,
        (p.changeFrequency as any) ?? 'monthly',
        p.priority ?? 0.7,
        p.updatedAt ? new Date(p.updatedAt) : new Date(),
      );
    }
    for (const slug of await getAllCaseStudySlugs()) {
      push(`/case-studies/${slug}`, 'monthly', 0.6);
    }
  } catch {
    // A CMS or database hiccup must not produce an empty sitemap.
  }

  for (const r of ROUTES_NOT_YET_IN_CMS) push(r.path, r.changeFrequency, r.priority);

  return entries;
}
