import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { payloadClient } from '@/lib/cms';

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

  if (new URL(request.url).searchParams.get('debug') === '1') {
    const payload = await payloadClient();
    const media = await payload.find({
      collection: 'media',
      where: { filename: { equals: 'logo2.png' } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });
    return NextResponse.json({
      hasS3Bucket: !!process.env.S3_BUCKET,
      s3BucketValue: process.env.S3_BUCKET ? `${process.env.S3_BUCKET.slice(0, 3)}...` : null,
      hasS3Region: !!process.env.S3_REGION,
      s3RegionValue: process.env.S3_REGION || null,
      logo2Doc: media.docs[0] || null,
      now: Date.now(),
    });
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
