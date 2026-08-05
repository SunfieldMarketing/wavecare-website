'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Two jobs, both defensive.
 *
 * 1. ONE LENIS AT A TIME
 *    Each hand-written page starts its own Lenis inside a `useEffect` with no
 *    cleanup:
 *
 *        const lenis = new Lenis({ ... });
 *        gsap.ticker.add((t) => lenis.raf(t * 1000));
 *
 *    Navigating away leaves it running; coming back creates another. Measured
 *    over one / -> /photoservices -> / round trip: gsap.ticker callbacks 2 -> 4,
 *    ScrollTriggers 3 -> 9. Competing instances fight over the scroll position
 *    every frame and scrolling stops working.
 *
 *    `window.Lenis` is replaced with a singleton wrapper that destroys the
 *    previous instance before creating a new one.
 *
 *    NOTE: an earlier version also wrapped `gsap.ticker.add` to remove orphaned
 *    callbacks. That was too blunt — the ticker is shared with GSAP core and
 *    ScrollTrigger, so it risked removing callbacks that drive every tween on
 *    the page. Destroying the Lenis instance is enough: `destroy()` detaches its
 *    listeners, so a leftover callback calling `raf()` on it is inert.
 *
 * 2. CONTENT IS NEVER LEFT INVISIBLE
 *    The pages hide content up front and reveal it with animation — e.g.
 *    `gsap.set('[data-hero]', { opacity: 0 })` on the homepage, and CSS that
 *    keeps `[data-reveal]` transparent until `.in` is added. If GSAP fails to
 *    load, is blocked, or its tween loop never runs, the page renders as a blank
 *    coloured rectangle. The failsafe below forces everything visible shortly
 *    after load, so a broken animation degrades to "not animated" rather than
 *    "not there".
 */
export default function ScrollGuard() {
  const pathname = usePathname();

  // ── 1. Lenis singleton ────────────────────────────────────────────────
  useEffect(() => {
    const w = window as any;

    const install = (): boolean => {
      if (w.__scrollGuardInstalled) return true;
      if (!w.Lenis) return false;

      const OriginalLenis = w.Lenis;

      function LenisSingleton(this: any, options: any) {
        try {
          w.__activeLenis?.destroy?.();
        } catch {
          /* teardown must never throw */
        }
        const instance = new OriginalLenis(options);
        w.__activeLenis = instance;
        // Legacy pages keep Lenis in a local const; expose it so it is reachable.
        w._lenis = instance;
        return instance;
      }

      LenisSingleton.prototype = OriginalLenis.prototype;
      w.Lenis = LenisSingleton;
      w.__scrollGuardInstalled = true;
      return true;
    };

    if (install()) return;

    // Lenis loads with strategy="afterInteractive"; poll so the wrapper is in
    // place before a page effect constructs an instance.
    const id = window.setInterval(() => {
      if (install()) window.clearInterval(id);
    }, 10);
    const stop = window.setTimeout(() => window.clearInterval(id), 8000);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(stop);
    };
  }, []);

  // ── 2. Visibility failsafe + orphaned-trigger prune, per navigation ────
  useEffect(() => {
    const w = window as any;

    const reveal = () => {
      document
        .querySelectorAll('[data-reveal], .reveal, .stagger')
        .forEach((el) => el.classList.add('in'));

      // Anything still fully transparent after the animation window is
      // treated as a failed reveal and forced visible.
      document.querySelectorAll<HTMLElement>('[data-hero], .hero-inner').forEach((el) => {
        if (parseFloat(getComputedStyle(el).opacity) === 0) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
    };

    const prune = () => {
      try {
        w.ScrollTrigger?.getAll?.().forEach((t: any) => {
          const el = t?.trigger;
          if (el && !document.body.contains(el)) t.kill();
        });
        w.ScrollTrigger?.refresh?.();
      } catch {
        /* ignore */
      }
    };

    const pruneId = window.setTimeout(prune, 600);
    // Long enough that a healthy GSAP intro has finished on its own.
    const revealId = window.setTimeout(reveal, 2500);

    return () => {
      window.clearTimeout(pruneId);
      window.clearTimeout(revealId);
    };
  }, [pathname]);

  return null;
}
