'use client';

import { useEffect } from 'react';

/**
 * Toggles #nav's .scrolled class past 40px of scroll (swaps in the solid
 * background — see .nav/.nav.scrolled in globals.css) and drives the
 * #progress bar's width. Ported from GlobalScripts.tsx's initChrome, which
 * is never mounted post-CMS-migration; without it the nav was permanently
 * stuck in its transparent, top-of-hero state everywhere on the site, and
 * the progress bar never moved.
 *
 * Mounted once in the root layout — a plain scroll listener needs no
 * per-page re-init, so it isn't tied to pathname like ScrollGuard's effects.
 */
export default function NavScrollChrome() {
  useEffect(() => {
    const nav = document.getElementById('nav');
    const progress = document.getElementById('progress');
    if (!nav) return;

    const onScroll = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      if (progress) progress.style.width = (max > 0 ? (scrollTop / max) * 100 : 0) + '%';
      nav.classList.toggle('scrolled', scrollTop > 40);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
