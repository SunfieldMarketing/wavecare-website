'use client';

import { useEffect } from 'react';

/**
 * Drives the #cdot/#cring elements rendered in layout.tsx.
 *
 * Ported from GlobalScripts.tsx's initCursor — that file is never mounted
 * post-CMS-migration, so these elements existed in the DOM (with their
 * pointer-events:none, mix-blend-mode:difference styling) but were never
 * positioned. Since their base CSS is `top:0;left:0;transform:translate(-50%,-50%)`,
 * that left a small dot + ring permanently pinned in the viewport's top-left
 * corner on every desktop pageview, sitewide.
 *
 * Skips touch/coarse-pointer devices — same as the CSS's own
 * `@media (hover:none),(pointer:coarse){ display:none }` rule, so there's no
 * work to do (or an event listener to leak) on a device that will never see
 * these elements anyway.
 */
export default function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById('cdot');
    const ring = document.getElementById('cring');
    if (!dot || !ring) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    };
    window.addEventListener('mousemove', onMove);

    let raf = 0;
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Delegated on document (mount once in the root layout, never remounted
    // on client-side navigation) so [data-cursor] elements added by whatever
    // page is currently showing are covered without re-querying per route.
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.('[data-cursor]')) ring.classList.add('hot');
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.('[data-cursor]')) ring.classList.remove('hot');
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return null;
}
