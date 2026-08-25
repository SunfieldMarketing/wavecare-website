import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Enables Live Preview.
 *
 * getPageBySlug/getCaseStudyBySlug/getGlobal (src/lib/cms.ts) all correctly
 * read draftMode().isEnabled and thread it through as `draft`/`overrideAccess`
 * — but until this route existed, nothing ever called draftMode().enable() in
 * the first place. Pages.ts/CaseStudies.ts's preview URLs pointed straight at
 * the real page with a `?preview=true` query string that nothing consumed:
 * confirmed by grepping the whole app for `.enable()` and finding zero
 * matches. Every editor's "Preview" button and Live Preview iframe has been
 * showing the last PUBLISHED state since those fields were added, never the
 * draft in progress - the same root cause documented for Slate Cinema in
 * CMS-PARITY-HANDOFF.md 1.4, just not yet wired up here.
 *
 * A query param can't do this itself: only page.tsx receives searchParams,
 * not layout.tsx, so a page-level check can never enable draft mode in time
 * for the root layout's own CMS reads (Nav, Footer, Site Settings all render
 * there) - the same reasoning Slate Cinema's doc gives for using this exact
 * redirect-through-a-route-handler shape instead. draftMode().enable() sets
 * a signed cookie readable from anywhere, including layout.tsx.
 *
 * Deliberately ungated - no shared secret, no auth check. Enabling draft mode
 * only changes what this one visiting browser sees (the cookie is
 * per-visitor); the content behind it is unpublished marketing copy, not
 * user data. `path` is restricted to a same-site-relative string so this
 * can't be turned into an open redirect.
 *
 * GET /api/preview?path=/services
 */
export async function GET(request: Request) {
  const requested = new URL(request.url).searchParams.get('path') || '/';

  // Same-site-relative only: must start with exactly one `/`, never `//` or
  // `/\` (both browser-interpreted as protocol-relative, i.e. a redirect off
  // this domain) and never contain a scheme.
  const safePath =
    /^\/(?!\/|\\)[^\s]*$/.test(requested) ? requested : '/';

  const draft = await draftMode();
  draft.enable();

  redirect(safePath);
}
