'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Keeps smooth-scrolling from breaking during client-side navigation.
 *
 * THE BUG THIS FIXES
 * Each hand-written page starts its own Lenis inside a `useEffect` with no
 * cleanup, and registers an anonymous `gsap.ticker` callback that is never
 * removed:
 *
 *     const lenis = new Lenis({ ... });
 *     gsap.ticker.add((t) => lenis.raf(t * 1000));
 *
 * Navigating away leaves that instance alive; coming back creates another.
 * Measured on a single / -> /photoservices -> / round trip: ticker callbacks
 * 2 -> 4, ScrollTriggers 3 -> 9. Several Lenis instances then fight over the
 * scroll position every frame and scrolling stops working.
 *
 * THE FIX
 * Rather than editing every page, `window.Lenis` is replaced once with a
 * singleton wrapper: constructing a new instance disposes of the previous one
 * and removes the ticker callbacks it left behind. Stale ScrollTriggers whose
 * trigger element is no longer in the document are pruned on each navigation.
 *
 * This is a compatibility shim. As pages move to the CMS they should stop
 * creating their own Lenis, and this can eventually be deleted.
 */
export default function ScrollGuard() {
  const pathname = usePathname();

  // Install the singleton wrapper as soon as the Lenis CDN script appears.
  useEffect(() => {
    const w = window as any;

    const install = (): boolean => {
      if (w.__scrollGuardInstalled) return true;
      if (!w.Lenis) return false;

      const OriginalLenis = w.Lenis;

      // Record every ticker callback so dead ones can be removed later. On this
      // site gsap.ticker.add is only ever used to drive Lenis.
      w.__tickerFns = [];
      if (w.gsap?.ticker && !w.__tickerPatched) {
        const originalAdd = w.gsap.ticker.add.bind(w.gsap.ticker);
        w.gsap.ticker.add = (fn: any, ...rest: any[]) => {
          w.__tickerFns.push(fn);
          return originalAdd(fn, ...rest);
        };
        w.__tickerPatched = true;
      }

      const disposePrevious = () => {
        try {
          if (w.gsap?.ticker && Array.isArray(w.__tickerFns)) {
            w.__tickerFns.forEach((fn: any) => w.gsap.ticker.remove(fn));
          }
        } catch {
          /* teardown must never throw */
        }
        w.__tickerFns = [];
        try {
          w.__activeLenis?.destroy?.();
        } catch {
          /* ignore */
        }
        w.__activeLenis = null;
      };

      function LenisSingleton(this: any, options: any) {
        disposePrevious();
        const instance = new OriginalLenis(options);
        w.__activeLenis = instance;
        // Legacy pages keep Lenis in a local const; expose it so it is reachable.
        w._lenis = instance;
        return instance;
      }

      LenisSingleton.prototype = OriginalLenis.prototype;
      w.Lenis = LenisSingleton;
      w.__disposeLenis = disposePrevious;
      w.__scrollGuardInstalled = true;
      return true;
    };

    if (install()) return;

    // The Lenis script loads with strategy="afterInteractive"; poll briefly so
    // the wrapper is in place before any page effect constructs an instance.
    const id = window.setInterval(() => {
      if (install()) window.clearInterval(id);
    }, 10);
    const stop = window.setTimeout(() => window.clearInterval(id), 8000);

    return () => {
      window.clearInterval(id);
      window.clearTimeout(stop);
    };
  }, []);

  // Prune ScrollTriggers left behind by pages that have unmounted.
  useEffect(() => {
    const w = window as any;
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
    // Run after the incoming page has had a chance to register its own.
    const id = window.setTimeout(prune, 600);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
