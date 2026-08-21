import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * Manual escape hatch for exactly the class of bug hit on 2026-08-21: data
 * changed via a path that bypasses Payload's own afterChange hooks (a raw
 * DB write, or the AWS SDK directly), so nothing ever called revalidatePath
 * from within this app's own running instance - and only a call that
 * actually executes THERE (not from a local script, which only affects
 * that script's own process) can invalidate whatever cache layer Vercel
 * is holding onto. Hooked collections/globals already do this
 * automatically on every normal edit; this route exists for the rare case
 * something was changed outside that path and the live site needs to be
 * told to catch up without waiting on a full redeploy.
 *
 * (This route briefly carried a `?debug=1` mode that reported whether the
 * S3_* env vars were present in the live runtime - that's how the actual
 * root cause of the 2026-08-21 media outage was found: the vars were never
 * saved to Vercel's Production scope, so payload.config.ts's S3 block never
 * activated. Removed now that it's confirmed fixed; the env-var-presence
 * check pattern is worth remembering for any future "works locally, not in
 * production" investigation - it should be step one, not a last resort.)
 *
 * GET /api/revalidate?secret=<REVALIDATE_SECRET>
 */
const KNOWN_PATHS = [
  '/', '/about', '/services', '/contact', '/case-studies', '/digital-marketing',
  '/photoservices', '/videoservices', '/webdesign', '/commercial', '/design-print',
  '/testimonials', '/privacy-policy', '/terms-of-service',
];

export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get('secret');
  const expected = process.env.REVALIDATE_SECRET || 'wavecare-revalidate-2026';

  if (secret !== expected) {
    return NextResponse.json({ revalidated: false, error: 'Invalid secret' }, { status: 401 });
  }

  const path = new URL(request.url).searchParams.get('path');
  // revalidatePath('/', 'layout') alone was called and reported success but
  // had no observable effect on any of the specific pages that needed it -
  // revalidating every known static path individually instead, in case the
  // root/layout form doesn't walk every nested static route the way its
  // docs suggest it should.
  const targets = path ? [path] : KNOWN_PATHS;
  for (const p of targets) revalidatePath(p);
  revalidatePath('/', 'layout');

  return NextResponse.json({ revalidated: true, targets, now: Date.now() });
}
