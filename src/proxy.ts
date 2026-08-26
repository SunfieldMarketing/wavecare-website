import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
 * resolved (b26f5ac), taking the only file that could have done this with
 * it - the redirects feature was never actually wired to begin with.
 *
 * FIRST ATTEMPT (8229196) called payloadClient() directly here, which
 * pulls in the entire payload.config.ts - including `sharp`, used by the
 * Media collection's imageSizes processing. Proxy/Middleware compiles as
 * its own serverless bundle, separate from the main app's route handlers -
 * the outputFileTracingIncludes fix in next.config.ts (from the earlier
 * sharp/libvips incident, scoped to '/*') does not cover that bundle, and
 * every single request 500'd with "Could not load the sharp module" the
 * moment that deployment went live. Took production down for ~20 minutes
 * before being reverted (8d95dee). This version fetches from the deployed
 * /payload-api/redirects REST endpoint instead - a plain HTTP GET, same as
 * a browser would make, with zero dependency on Payload's Node.js config
 * (sharp included) at all. Slower per-request than a direct DB call would
 * be, but this only runs at most once per 60s (see the cache below), and
 * correctness/not-taking-the-site-down matters far more than shaving
 * milliseconds off a rarely-exercised code path.
 *
 * This version this project is on renamed middleware.ts to proxy.ts, and -
 * unlike training-data Next.js, where Middleware defaults to the Edge
 * runtime - Proxy defaults to the Node.js runtime as of v16 (see
 * node_modules/next/dist/docs/.../file-conventions/proxy.md's version
 * history). Doesn't change the fetch-based approach here, but worth
 * knowing Proxy *could* call the Local API directly in principle - it's
 * specifically pulling in sharp via the full Payload config that breaks
 * the bundle, not Node.js APIs in general.
 *
 * Redirects are cached in module scope for 60s - a real redirect need
 * (renamed/removed page) is not latency-sensitive to the minute, and
 * without this every single page request would otherwise cost an extra
 * network round-trip even when zero redirects exist.
 */
let cache: { docs: any[]; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 60_000;

async function getRedirects(origin: string): Promise<any[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) return cache.docs;

  const url = `${origin}/payload-api/redirects?limit=1000&depth=1&populate%5Bpages%5D%5Bslug%5D=true`;
  // cache: 'no-store' is required, not optional - Next.js instruments the
  // global fetch() inside Route Handlers/Proxy for its own caching, and
  // without this a fetch with no explicit cache option can get cached
  // effectively indefinitely underneath the manual 60s TTL cache above,
  // which is exactly what happened here: the first fetch (before any
  // redirect existed) returned an empty list, and every fetch after that -
  // regardless of how long later, past any TTL - kept getting that same
  // stale empty response back from Next's own fetch cache. Confirmed via
  // direct curl to the same URL always returning current data correctly;
  // only the in-Proxy fetch() call was affected.
  const res = await fetch(url, { headers: { accept: 'application/json' }, cache: 'no-store' });
  if (!res.ok) throw new Error(`redirects fetch failed: ${res.status}`);
  const data = (await res.json()) as { docs?: any[] };

  cache = { docs: data.docs ?? [], fetchedAt: Date.now() };
  return cache.docs;
}

function normalize(path: string): string {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path;
}

// Skip prefixes that are never a redirect target - handled here instead of
// in `matcher` below. A previous version relied entirely on a complex
// negative-lookahead regex string in `matcher` and every request silently
// never reached this function at all in a genuine `next build` + `next
// start` (confirmed via temporary debug logging: zero log lines for the
// excluded-looking test path, despite it matching none of the exclusions
// under a plain JS RegExp test) - `matcher` compiles through path-to-regexp,
// which does not reliably support this exact regex-in-parens negative-
// lookahead form the way a native RegExp does, even though Next's own docs
// show it as an example. `matcher` now stays permissive and simple (every
// non-underscore, non-file path) and the real exclusion logic lives here as
// plain string checks - correctness first, this only runs a cheap array
// scan against a handful of prefixes.
const SKIP_PREFIXES = ['/api', '/admin', '/payload-api'];

export default async function proxy(request: NextRequest) {
  const pathname = normalize(request.nextUrl.pathname);

  if (SKIP_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  let redirects: any[];
  try {
    redirects = await getRedirects(request.nextUrl.origin);
  } catch {
    // A fetch hiccup here must not take the whole site down - fail open.
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
    // Every request except Next's own static/image-optimizer internals.
    // Everything else (including favicon.ico, sitemap.xml, and any file
    // with an extension) is cheap to check against zero-to-few redirects
    // in SKIP_PREFIXES/getRedirects above, and simple beats clever here -
    // see this file's own history for why.
    '/((?!_next/static|_next/image).*)',
  ],
};
