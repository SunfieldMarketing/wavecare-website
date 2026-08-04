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

  // Do NOT wrap draftMode() in try/catch. Next.js signals dynamic-rendering
  // bailouts by throwing, and swallowing those breaks streaming — the Suspense
  // boundary never resolves and loading.tsx stays on screen forever.
  const { isEnabled: isDraft } = await draftMode();

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft: isDraft,
    overrideAccess: isDraft,
  });

  const doc = result.docs[0] ?? null;
  if (!doc) await assertContentExists(slug);
  return doc;
}

/**
 * Guards against deploying a site whose CMS is empty.
 *
 * The database is not committed, so a fresh environment (Vercel, CI, a new
 * clone) starts with no content. Every CMS-backed page would then call
 * notFound() and ship as a 404 — a silent failure you would only notice by
 * visiting each URL. Failing the build instead makes it obvious and fixable.
 *
 * Only triggers when the pages collection is entirely empty, i.e. unseeded.
 * A single missing slug is a genuine 404 and still behaves normally.
 */
async function assertContentExists(slug: string): Promise<void> {
  const payload = await payloadClient();
  const { totalDocs } = await payload.find({
    collection: 'pages',
    limit: 0,
    depth: 0,
    overrideAccess: true,
  });

  if (totalDocs > 0) return;

  const message =
    `CMS has no pages, so "/${slug}" would deploy as a 404.\n` +
    `The database is not committed to git, so a fresh environment starts empty.\n\n` +
    `Fix: point DATABASE_URI at a persistent database, then run:\n` +
    `  npm run migrate:create && npm run migrate && npm run seed\n`;

  if (process.env.NODE_ENV === 'production') throw new Error(message);
  console.warn(`\n[cms] ${message}`);
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

const SETUP_HELP =
  'The CMS database is empty or has no schema, so this build would ship broken pages.\n' +
  'The database is not committed to git, so a fresh environment starts empty.\n\n' +
  'Fix: point DATABASE_URI at a persistent database, then run:\n' +
  '  npm run migrate:create && npm run migrate && npm run seed\n';

/**
 * Turns the raw driver error you get from an unseeded database
 * ("no such table: case_studies") into something actionable.
 */
function explainDbFailure(err: unknown): never {
  const raw = err instanceof Error ? err.message : String(err);
  throw new Error(`${SETUP_HELP}\nUnderlying error: ${raw}`);
}

/** Slugs for generateStaticParams and the sitemap. */
export async function getAllCaseStudySlugs(): Promise<string[]> {
  try {
    const payload = await payloadClient();
    const result = await payload.find({
      collection: 'case-studies',
      limit: 200,
      depth: 0,
      where: { _status: { equals: 'published' } },
    });
    return result.docs.map((d: any) => d.slug).filter(Boolean);
  } catch (err) {
    if (process.env.NODE_ENV === 'production') explainDbFailure(err);
    console.warn(`\n[cms] ${SETUP_HELP}`);
    return [];
  }
}

/** All published page slugs, for the sitemap. */
export async function getAllPageSlugs(): Promise<
  Array<{ slug: string; updatedAt?: string; changeFrequency?: any; priority?: number }>
> {
  const payload = await payloadClient();
  const result = await payload.find({
    collection: 'pages',
    limit: 500,
    depth: 0,
    where: { _status: { equals: 'published' }, hideFromSitemap: { not_equals: true } },
  });
  return result.docs.map((d: any) => ({
    slug: d.slug,
    updatedAt: d.updatedAt,
    changeFrequency: d.changeFrequency,
    priority: d.priority,
  }));
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
