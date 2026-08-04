'use client';

import { useEffect } from 'react';

/**
 * Scroll-reveal for CMS-rendered pages.
 *
 * Deliberately narrow in scope. It does NOT start Lenis, ScrollTrigger or the
 * custom cursor, because the layout and the remaining hand-written pages each
 * create their own Lenis instance with an anonymous gsap.ticker callback that
 * is never removed. Adding another owner made those stack on every navigation
 * (2 ticker callbacks -> 4, 3 ScrollTriggers -> 6 after one round trip), and
 * competing Lenis instances stop the page scrolling altogether.
 *
 * Everything here is idempotent and fully torn down on unmount.
 */
export default function CMSPageEffects() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal], .reveal, .stagger'));
    if (els.length === 0) return;

    // No IntersectionObserver: show everything rather than hide content.
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((e) => io.observe(e));

    // Safety net: anything already within the viewport is revealed even if the
    // observer has not fired yet (e.g. above-the-fold content on a fast load).
    const timer = window.setTimeout(() => {
      els.forEach((e) => {
        if (e.getBoundingClientRect().top < window.innerHeight) e.classList.add('in');
      });
    }, 400);

    // The final CTA canvas is painted by the global WebGL wave when it is
    // available; give it a matching gradient so it is never a blank rectangle.
    const canvas = document.getElementById('waveCanvas') as HTMLCanvasElement | null;
    if (canvas && !(window as any).THREE) {
      canvas.style.background =
        'radial-gradient(ellipse at center,rgba(42,157,143,0.25),transparent 70%)';
    }

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
