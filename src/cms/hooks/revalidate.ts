import { revalidatePath } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload';

/**
 * Pages/case studies are statically generated (no `revalidate` export, no
 * dynamic APIs on the public request path) - Next prerenders their HTML once
 * at build/deploy time and keeps serving that exact snapshot to every normal
 * visitor. draftMode() in getPageBySlug only forces a fresh, request-time
 * fetch for requests carrying the preview cookie (the admin's own live
 * preview/iframe), which is why editors always see their change immediately
 * while the public site does not - it's not a bug in the CMS write itself,
 * the page the public gets is just frozen until something tells Next to
 * regenerate it.
 *
 * revalidatePath('/', 'layout') purges the *entire* app's cached/prerendered
 * output (root layout wraps every route), so any save here - a page, a case
 * study, or a shared global like Navigation/SiteSettings - makes the very
 * next visit to any affected page regenerate from the current DB content.
 * Blunter than revalidating one exact path, but correct by construction:
 * nothing needs to know which pages a given collection or global happens to
 * affect (globals in particular render on every route), and the cost is one
 * cheap on-demand regenerate per page on its next visit, not a rebuild.
 */
function revalidateSite(label: string) {
  try {
    revalidatePath('/', 'layout');
  } catch (err) {
    // Never let a revalidation failure block the actual content save.
    console.error(`[revalidate] failed after ${label} change:`, err);
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ collection }) => {
  revalidateSite(collection.slug);
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ collection }) => {
  revalidateSite(collection.slug);
};

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ global }) => {
  revalidateSite(global.slug);
};
