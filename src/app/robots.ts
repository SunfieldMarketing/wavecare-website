import { MetadataRoute } from 'next';

/**
 * Lives at the bare app root, NOT inside (frontend) - this is the actual
 * fix for a genuine, pre-existing production bug found 2026-08-26 while
 * auditing integrations: /robots.txt had been 404ing in production
 * regardless of anything in this file's own code (confirmed via runtime
 * logs on a deployment from hours before this was ever touched today).
 *
 * Root cause, traced through Next's own source
 * (node_modules/next/dist/lib/metadata/get-metadata-route.js,
 * getMetadataRouteSuffix): when a metadata-route file sits inside a
 * parenthesized route group like (frontend), Next appends a hashed
 * filename suffix to disambiguate it from same-named files in sibling
 * groups - e.g. `/robots-a1b2c3.txt` instead of `/robots.txt`. sitemap.ts
 * is explicitly exempted from this ("Sitemap is an exception, it should
 * not have a suffix" - Next's own comment, because a sitemap already
 * covers every sub-route so there's no duplicate-path case to disambiguate
 * against), which is exactly why sitemap.ts kept working perfectly at
 * /sitemap.xml from inside (frontend) while robots.ts silently compiled to
 * a hashed path nobody was ever requesting. Not a Proxy issue, not an
 * async-vs-sync issue (both were tried and ruled out first) - purely
 * about this file's location. Moving it to the bare app root (no group
 * segment in its parent path) means no suffix is ever computed, so it
 * compiles to the literal /robots.txt the Robots Exclusion Standard
 * requires. Verified via `next build`'s output manifests
 * (.next/server/app-paths-manifest.json) before shipping.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://wavecare.io/sitemap.xml',
  };
}
