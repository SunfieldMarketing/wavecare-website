'use client';

import { useEffect } from 'react';

/**
 * Effects for the services-style pages.
 *
 * Ported from the hand-written page's useEffect. Deliberately does NOT start
 * Lenis or ScrollTrigger — ScrollGuard owns smooth scrolling globally, and
 * adding another owner is what previously stacked Lenis instances and killed
 * scrolling.
 *
 * Everything here is idempotent and torn down on unmount.
 */
export default function ServicesPageEffects() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Scroll reveals */
    const els = Array.from(document.querySelectorAll('.reveal, [data-reveal], .stagger'));
    if (els.length) {
      if (!('IntersectionObserver' in window)) {
        els.forEach((e) => e.classList.add('in'));
      } else {
        const io = new IntersectionObserver(
          (entries) =>
            entries.forEach((en) => {
              if (en.isIntersecting) {
                en.target.classList.add('in');
                io.unobserve(en.target);
              }
            }),
          { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
        );
        els.forEach((e) => io.observe(e));
        cleanups.push(() => io.disconnect());

        // Above-the-fold safety net.
        const t = window.setTimeout(() => {
          els.forEach((e) => {
            if (e.getBoundingClientRect().top < window.innerHeight) e.classList.add('in');
          });
        }, 400);
        cleanups.push(() => window.clearTimeout(t));
      }
    }

    /* Logo marquee — duplicate the row once, then translate it continuously */
    const row = document.getElementById('marqueeRow');
    if (row && !reduceMotion && !row.dataset.marqueeReady) {
      row.dataset.marqueeReady = '1';
      row.innerHTML += row.innerHTML;
      let x = 0;
      const half = row.scrollWidth / 2;
      let raf = 0;
      const tick = () => {
        x -= 0.6;
        if (-x >= half) x += half;
        row.style.transform = `translateX(${x}px)`;
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      cleanups.push(() => cancelAnimationFrame(raf));
    }

    /* Split-row videos play only while visible, to avoid decoding all of them */
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('.split-image video'));
    if (videos.length) {
      if (!('IntersectionObserver' in window)) {
        videos.forEach((v) => v.play().catch(() => {}));
      } else {
        const vio = new IntersectionObserver(
          (entries) =>
            entries.forEach((en) => {
              const v = en.target as HTMLVideoElement;
              if (en.isIntersecting) v.play().catch(() => {});
              else v.pause();
            }),
          { threshold: 0.2 },
        );
        videos.forEach((v) => vio.observe(v));
        cleanups.push(() => vio.disconnect());
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
