import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  // Found 2026-08-27: every marketing page here is statically generated, so
  // Next's Client Router Cache (see staleTimes docs) was reusing each page's
  // already-rendered client-side tree for up to 5 minutes (the `static`
  // default) instead of re-rendering it fresh on revisit. That's a
  // deliberate Next.js feature - its own docs say this cache exists
  // specifically "to prevent losing the browser scroll position" - but it's
  // the opposite of what this site wants: a marketing site should always
  // open at the top, not resume wherever a visitor scrolled to last time.
  // It also explains a real bug report: clicking the plain "Contact" nav
  // link would sometimes reuse the exact cached instance last shown for
  // Book a Demo's `/contact#calendar`, hash and mid-page scroll included,
  // depending on whether the cache was still warm - hence "sometimes".
  // Setting both to 0 disables the reuse entirely, so every navigation
  // (including a revisit) is always a genuinely fresh render, matching this
  // site's intended "every page starts at the top" behavior. ScrollGuard's
  // own reset (see its own comment) stays in place as a second layer, in
  // case Lenis's own scroll tracking needs correcting independent of this.
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
  // sharp's actual native binary (libvips) lives in the platform-specific
  // @img/sharp-* optional-dependency packages, not inside node_modules/sharp
  // itself - Next's Output File Tracing was silently failing to include it
  // in the deployed function bundle, so any route that touches Payload's
  // local API at request time (contact form, /admin, /payload-api) crashed
  // with "Could not load the sharp module... libvips-cpp.so: cannot open
  // shared object file" the moment sharp actually got invoked. Confirmed
  // via Vercel's runtime error logs. This is the exact fix Next's own docs
  // give for this exact package (node_modules/next/dist/docs/.../output.md).
  outputFileTracingIncludes: {
    '/*': ['node_modules/sharp/**/*', 'node_modules/@img/**/*'],
  },
  images: {
    // S3 media storage (see payload.config.ts) serves doc URLs straight
    // from the bucket (disablePayloadAccessControl), so next/image needs
    // that host allow-listed or it refuses to optimize them. Harmless to
    // keep even before S3_BUCKET is set - Blob-served media never hits
    // this path since those URLs are same-origin (/payload-api/media/...).
    //
    // Path-style, not virtual-hosted-style: payload.config.ts's S3
    // endpoint is bare `s3.<region>.amazonaws.com` (bucket comes after as
    // a path segment, per how this storage adapter's generateURL always
    // builds `${endpoint}/${bucket}/${key}`) - a `*.s3.*.amazonaws.com`
    // pattern requires a subdomain segment that never exists here and
    // silently never matched (caught locally against a production build,
    // "url parameter is not allowed", before this reached Vercel).
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.*.amazonaws.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/homepage/old-home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/old-home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/array/:path*',
        destination: 'https://us-assets.i.posthog.com/array/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
