import type { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { draftMode } from 'next/headers';

// NOTE (2026-08-21): several media docs were updated directly via raw SQL/
// the AWS SDK (bypassing Payload's Local API and its afterChange hooks -
// necessary to work around a Payload collision-avoidance bug, see git log)
// during the S3 migration. Local production-build tests against the same
// DB picked up the changes correctly every time, but Vercel kept serving
// stale HTML with the old /payload-api/media/file/... URLs on several
// routes for hours across three redeploys - Vercel's own remote build
// cache reuses a route's previous static output when it doesn't detect a
// code-level dependency change, and a raw DB write isn't one. Touching
// this file (imported by every page that fetches CMS content) forces
// Vercel to treat every dependent route as changed and fully regenerate
// it. If media/content ever looks stale again after a data-only change
// (no code edited), this is almost certainly why - bump this file, or
// trigger a "Redeploy without Build Cache" from the Vercel dashboard.

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

  // Fixed 2026-08-25: this used to call payload.find() with neither `draft`
  // nor `overrideAccess` set. Payload's Local API defaults overrideAccess to
  // true for collection reads when it's omitted, which bypasses this
  // collection's own `publishedOrAuthenticated` access function entirely —
  // a case study saved as a draft (not yet published) was visible on the
  // live public site immediately, the same class of bug documented for
  // Slate Cinema in CMS-PARITY-HANDOFF.md. Matches getPageBySlug's
  // already-correct pattern above: do NOT wrap draftMode() in try/catch,
  // Next.js signals dynamic-rendering bailouts by throwing.
  const { isEnabled: isDraft } = await draftMode();

  const result = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft: isDraft,
    overrideAccess: isDraft,
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

  // Fixed 2026-08-25: this used to call findGlobal() with neither `draft`
  // nor `overrideAccess` set, so it could never be told to return a draft
  // version — an editor previewing an in-progress change to Navigation,
  // Footer, Theme, or Site Settings always saw the last PUBLISHED state in
  // the live-preview iframe, never the edit they were making. Not a leak
  // (the opposite problem), but a real editor-facing bug — same class of
  // gap documented for Slate Cinema in CMS-PARITY-HANDOFF.md. Reads
  // draftMode() itself, matching getPageBySlug/getCaseStudyBySlug's
  // pattern, so every existing call site picks up the fix with no changes
  // needed at the call sites themselves.
  const { isEnabled: isDraft } = await draftMode();

  return payload.findGlobal({ slug, depth: 2, draft: isDraft, overrideAccess: isDraft });
}

/**
 * ID of the "Contact Form" record registered with the form-builder plugin
 * (see cms/seed/form-builder.ts) — /api/contact looks this up to attach
 * every real submission to it as a form-submissions document, so leads show
 * up live in the CMS dashboard alongside GoHighLevel, not just in it.
 *
 * Memoized per server instance: the record's ID never changes once seeded,
 * so there is no reason to re-query it on every single form submission.
 */
let contactFormIdCache: string | null = null;

export async function getContactFormId(): Promise<string | null> {
  if (contactFormIdCache) return contactFormIdCache;

  const payload = await payloadClient();
  const result = await payload.find({
    collection: 'forms',
    where: { title: { equals: 'Contact Form' } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  const id = result.docs[0]?.id;
  if (!id) return null;

  contactFormIdCache = String(id);
  return contactFormIdCache;
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
