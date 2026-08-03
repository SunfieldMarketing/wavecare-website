import type { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { draftMode } from 'next/headers';

/** Cached Payload instance for server components. */
export async function payloadClient() {
  return getPayload({ config });
}

/**
 * Fetch a page by slug. Depth 2 resolves upload + relationship fields
 * (images, linked pages) into full objects so blocks can render them directly.
 */
export async function getPageBySlug(slug: string) {
  const payload = await payloadClient();

  let isDraft = false;
  try {
    isDraft = (await draftMode()).isEnabled;
  } catch {
    isDraft = false;
  }

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft: isDraft,
    overrideAccess: isDraft,
  });

  return result.docs[0] ?? null;
}

export async function getCaseStudyBySlug(slug: string) {
  const payload = await payloadClient();
  const result = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });
  return result.docs[0] ?? null;
}

export async function getGlobal(slug: 'navigation' | 'footer' | 'theme' | 'site-settings') {
  const payload = await payloadClient();
  return payload.findGlobal({ slug, depth: 2 });
}

/**
 * Builds Next.js metadata from a page's SEO fields, falling back to Site
 * Settings. This is the fix for every content page previously inheriting the
 * same generic root title.
 */
export async function buildMetadata(page: any, path: string): Promise<Metadata> {
  const settings: any = await getGlobal('site-settings').catch(() => null);

  const siteUrl = settings?.siteUrl || 'https://wavecare.io';
  const template: string = settings?.titleTemplate || '%s | Wavecare';

  const rawTitle: string | undefined = page?.meta?.title || page?.title;
  const siteName: string = settings?.siteName || 'Wavecare';

  // Only apply the template when the editor hasn't already typed the brand
  // into the title — otherwise you get "… | Wavecare | Wavecare".
  const alreadyBranded =
    !!rawTitle && rawTitle.toLowerCase().includes(siteName.split(' ')[0].toLowerCase());

  const title = rawTitle
    ? template.includes('%s') && !alreadyBranded
      ? template.replace('%s', rawTitle)
      : rawTitle
    : settings?.defaultTitle || 'Wavecare Marketing';

  const description = page?.meta?.description || settings?.defaultDescription || undefined;

  const ogImage = page?.meta?.image?.url || settings?.defaultOgImage?.url;
  const canonical = `${siteUrl}${path === '/home' ? '' : path}`;

  const noIndex = page?.hideFromSitemap === true;

  return {
    title,
    description,
    alternates: { canonical },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: settings?.siteName || 'Wavecare Marketing',
      type: 'website',
      locale: 'en_US',
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}
