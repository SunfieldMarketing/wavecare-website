import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
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
    // Media stays same-origin (payload.config.ts doesn't set
    // disablePayloadAccessControl, so S3 is proxied through Payload's own
    // /payload-api/media/file/:filename route, same URL shape it always
    // had on Blob) - kept here in case direct-from-bucket URLs are ever
    // turned on later.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.s3.*.amazonaws.com',
      },
    ],
    // Next 16 requires local (same-origin) image URLs with a query string
    // to be explicitly allow-listed, to prevent cache-poisoning via
    // arbitrary params. The S3 adapter appends exactly one - ?prefix=... -
    // to identify which bucket folder to proxy from.
    localPatterns: [
      {
        pathname: '/payload-api/media/file/**',
        search: '?prefix=wavecare',
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
