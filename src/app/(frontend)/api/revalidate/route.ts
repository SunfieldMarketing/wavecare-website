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
 * GET /api/revalidate?secret=<REVALIDATE_SECRET>
 */
export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get('secret');
  const expected = process.env.REVALIDATE_SECRET || 'wavecare-revalidate-2026';

  if (secret !== expected) {
    return NextResponse.json({ revalidated: false, error: 'Invalid secret' }, { status: 401 });
  }

  revalidatePath('/', 'layout');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
