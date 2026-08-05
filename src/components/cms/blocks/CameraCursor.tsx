'use client';

import { useEffect, useRef } from 'react';

/**
 * Viewfinder cursor for the photography hero.
 *
 * Reproduces the hand-written `initCamCursor`: a bracketed focus box plus an
 * f-stop readout that tracks the pointer while it is over the hero. Uses GSAP
 * when it has loaded (matching the original easing) and falls back to a direct
 * transform so it still works if the CDN script is blocked.
 *
 * Disabled on touch devices and when the visitor prefers reduced motion.
 */
export default function CameraCursor({ fStop = 'F/1.8' }: { fStop?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    if (!cursor) return;
    if ('ontouchstart' in window) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const host = cursor.closest('section') as HTMLElement | null;
    if (!host) return;

    const gsap = (window as any).gsap;
    if (gsap) gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const move = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (gsap) {
        gsap.to(cursor, { x, y, duration: 0.45, ease: 'power3.out' });
      } else {
        cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
    };

    const show = () => {
      if (gsap) gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.3 });
      else cursor.style.opacity = '1';
    };
    const hide = () => {
      if (gsap) gsap.to(cursor, { opacity: 0, scale: 0.8, duration: 0.3 });
      else cursor.style.opacity = '0';
    };

    host.addEventListener('mousemove', move);
    host.addEventListener('mouseenter', show);
    host.addEventListener('mouseleave', hide);

    return () => {
      host.removeEventListener('mousemove', move);
      host.removeEventListener('mouseenter', show);
      host.removeEventListener('mouseleave', hide);
    };
  }, []);

  return (
    <div className="cam-cursor" id="camCursor" ref={ref}>
      <div className="cam-box">
        <div className="bracket tl" />
        <div className="bracket tr" />
        <div className="bracket bl" />
        <div className="bracket br" />
      </div>
      <div className="cam-fstop">{fStop}</div>
    </div>
  );
}
