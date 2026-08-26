import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { payloadClient } from '@/lib/cms';

/**
 * Applies redirects created through the CMS (Settings -> Redirects, from
 * @payloadcms/plugin-redirects, registered in payload.config.ts).
 *
 * Found 2026-08-26, during an end-to-end "is everything actually editable
 * AND working" audit: the plugin was registered and fully functional in
 * admin - editors could create a redirect, save it, see it in the list -
 * but nothing on the actual site ever consumed the `redirects` collection.
 * A prior proxy.ts existed for an unrelated reason (the 2026-08-20 Vercel
 * Blob outage's media-fallback rewrite) and was deleted once that was
 * resolved (b26f5ac), taking the *only* file that could have done this
 * with it - the redirects feature was never actually wired to begin with,
 * confirmed by grepping the whole app for any other reader of this
 * collection (none) and confirming zero redirect docs existed yet, so this
 * had not silently failed on a real editor - it just would have the first
 * time anyone used it.
 *
 * This version this project is on renamed middleware.ts to proxy.ts, and -
 * unlike training-data Next.js, where Middleware defaults to the Edge
 * runtime - Proxy defaults to the Node.js runtime as of v16 (see
 * node_modules/next/dist/docs/.../file-conventions/proxy.md's version
 * history). That's what makes it safe to call Payload's Local API
 * (payloadClient(), same DB-driver-dependent client every server component
 * uses) directly here, no HTTP round-trip through /payload-api needed.
 *
 * Redirects are cached in module scope for 60s - a real redirect need
 * (renamed/removed page) is not latency-sensitive to the minute, and
 * without this every single page request would otherwise cost an extra DB
 * round-trip even when zero redirects exist.
 */
let cache: { docs: any[]; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 60_000;

async function getRedirects(): Promise<any[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) return cache.docs;

  const payload = await payloadClient();
  const result = await payload.find({
    collection: 'redirects',
    limit: 1000,
    depth: 1,
    // Only the slug is needed off the populated `reference` page - without
    // this, depth:1 pulls that page's ENTIRE layout (every block, fully
    // resolved) on every cache refresh, for no reason.
    populate: { pages: { slug: true } },
    overrideAccess: true,
  });

  cache = { docs: result.docs, fetchedAt: Date.now() };
  return cache.docs;
}

function normalize(path: string): string {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path;
}

export default async function proxy(request: NextRequest) {
  const pathname = normalize(request.nextUrl.pathname);

  let redirects: any[];
  try {
    redirects = await getRedirects();
  } catch {
    // A DB hiccup here must not take the whole site down - fail open.
    return NextResponse.next();
  }

  const match = redirects.find((r) => normalize(r.from) === pathname);
  if (!match) return NextResponse.next();

  const target =
    match.to?.type === 'custom'
      ? match.to.url
      : match.to?.reference?.value?.slug
        ? match.to.reference.value.slug === 'home'
          ? '/'
          : `/${match.to.reference.value.slug}`
        : null;

  if (!target) return NextResponse.next();

  return NextResponse.redirect(new URL(target, request.url), 308);
}

export const config = {
  matcher: [
    // Everything except API/admin routes, static assets, and files with an
    // extension (images, fonts, etc.) - a redirect only ever targets a real
    // page path.
    '/((?!api|admin|payload-api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
