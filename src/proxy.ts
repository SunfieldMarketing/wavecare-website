import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import fallbackFiles from './media-fallback-list.json';

const FALLBACK_SET = new Set<string>(fallbackFiles);
const PREFIX = '/payload-api/media/file/';

/**
 * Interim fix while Vercel Blob storage is out of quota (confirmed: new
 * uploads fail, and even previously-working files have started returning
 * 204/404). Every filename in media-fallback-list.json has a known-good
 * copy committed at public/media-fallback/ - recovered from public/media
 * and public/images, the two places the seed/admin-upload flow actually
 * wrote real bytes to on disk (the production DB row always saved fine;
 * only the Blob upload silently failed once quota ran out - see
 * src/cms/hooks/revalidate.ts's neighboring diagnostics for how this list
 * was built).
 *
 * Proxy runs before Payload's own /payload-api/media/file/:filename route,
 * so for exactly these known-broken filenames it rewrites to the static
 * fallback copy instead of ever reaching the broken storage lookup.
 * Everything else (working files, all other routes) passes through
 * untouched. Remove this once media storage is migrated off Blob and
 * every doc has been re-uploaded to the new adapter.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith(PREFIX)) return NextResponse.next();

  const filename = decodeURIComponent(pathname.slice(PREFIX.length));
  if (!FALLBACK_SET.has(filename)) return NextResponse.next();

  return NextResponse.rewrite(
    new URL(`/media-fallback/${encodeURIComponent(filename)}`, request.url),
  );
}

export const config = {
  matcher: '/payload-api/media/file/:path*',
};
