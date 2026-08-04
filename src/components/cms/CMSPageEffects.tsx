'use client';

import { useEffect } from 'react';

/**
 * Effects for CMS-rendered pages: scroll reveals and the [data-count] counter
 * animation used by every stats block.
 *
 * Deliberately narrow in scope otherwise. It does NOT start Lenis,
 * ScrollTrigger or the custom cursor, because the layout and the remaining
 * hand-written pages each create their own Lenis instance with an anonymous
 * gsap.ticker callback that is never removed. Adding another owner made those
 * stack on every navigation (2 ticker callbacks -> 4, 3 ScrollTriggers -> 6
 * after one round trip), and competing Lenis instances stop the page
 * scrolling altogether.
 *
 * Everything here is idempotent and fully torn down on unmount.
 */
export default function CMSPageEffects() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Scroll reveals */
    const els = Array.from(document.querySelectorAll('[data-reveal], .reveal, .stagger'));
    if (els.length) {
      if (!('IntersectionObserver' in window)) {
        els.forEach((e) => e.classList.add('in'));
      } else {
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
        cleanups.push(() => io.disconnect());

        // Safety net: anything already within the viewport is revealed even if
        // the observer has not fired yet (e.g. above-the-fold on a fast load).
        const t = window.setTimeout(() => {
          els.forEach((e) => {
            if (e.getBoundingClientRect().top < window.innerHeight) e.classList.add('in');
          });
        }, 400);
        cleanups.push(() => window.clearTimeout(t));
      }
    }

    /* [data-count] counter animation — ported from GlobalScripts' initCount.
       Drives every stats block across the site (case-studies index, services,
       testimonials, design-print, ...). Missing this left every animated
       number frozen at its initial "0". */
    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
    if (counters.length) {
      const format = (el: HTMLElement, value: number) => {
        const comma = el.getAttribute('data-comma') === '1';
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        return `${prefix}${comma ? value.toLocaleString() : value}${suffix}`;
      };

      if (!('IntersectionObserver' in window)) {
        counters.forEach((el) => {
          const target = +(el.getAttribute('data-count') || 0);
          el.textContent = format(el, target);
        });
      } else {
        const cio = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => {
              if (!en.isIntersecting) return;
              const el = en.target as HTMLElement;
              cio.unobserve(el);
              const target = +(el.getAttribute('data-count') || 0);
              const dur = reduceMotion ? 0 : 1700;
              const t0 = performance.now();
              const step = (now: number) => {
                const k = dur ? Math.min((now - t0) / dur, 1) : 1;
                const eased = 1 - Math.pow(1 - k, 3);
                el.textContent = format(el, Math.floor(target * eased));
                if (k < 1) requestAnimationFrame(step);
                else el.textContent = format(el, target);
              };
              requestAnimationFrame(step);
            });
          },
          { threshold: 0.25 },
        );
        counters.forEach((el) => cio.observe(el));
        cleanups.push(() => cio.disconnect());
      }
    }

    // The final CTA canvas is painted by the global WebGL wave when it is
    // available; give it a matching gradient so it is never a blank rectangle.
    const canvas = document.getElementById('waveCanvas') as HTMLCanvasElement | null;
    if (canvas && !(window as any).THREE) {
      canvas.style.background =
        'radial-gradient(ellipse at center,rgba(42,157,143,0.25),transparent 70%)';
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
