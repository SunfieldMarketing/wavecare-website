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
    // S3 media storage (see payload.config.ts) serves doc URLs straight
    // from the bucket (disablePayloadAccessControl), so next/image needs
    // that host allow-listed or it refuses to optimize them. Harmless to
    // keep even before S3_BUCKET is set - Blob-served media never hits
    // this path since those URLs are same-origin (/payload-api/media/...).
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.s3.*.amazonaws.com',
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
