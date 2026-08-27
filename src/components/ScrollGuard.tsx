'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Three jobs.
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
 * 2. THE SINGLE OWNER OF LENIS ITSELF
 *    Found 2026-08-26, during the integrations audit: nothing actually called
 *    `new Lenis()` anywhere live. The only reference implementation
 *    (GlobalScripts.tsx's initLenis) was confirmed dead code, never mounted —
 *    this file's own job description above ("each hand-written page starts
 *    its own Lenis") describes a past reality this singleton wrapper was
 *    built to defend against, but at some point every one of those callers
 *    was removed and nothing replaced them. The CDN script in layout.tsx
 *    loaded Lenis for nothing; Theme's "Smooth scrolling (Lenis)" toggle
 *    (enableSmoothScroll, default on) had nothing to toggle. This effect is
 *    now that missing single owner — it creates the one Lenis instance the
 *    wrapper above defends, synced to GSAP's ticker and ScrollTrigger the
 *    same way the dead reference implementation did, and tears it down
 *    cleanly on every route change so client-side navigation can never stack
 *    a second instance on top of it.
 *
 *    Found immediately after shipping the above (same day): with Lenis
 *    dead, the browser/Next.js App Router's own default "scroll to top on
 *    navigation" just worked untouched - clicking Contact in the navbar
 *    always landed on the hero. With Lenis alive, a brand-new instance is
 *    created on every pathname change, but nothing told it (or the native
 *    scroll position) to actually go to 0 first - it just adopts whatever
 *    scroll position happened to be on screen at creation time, which on a
 *    same-tab client-side nav is wherever the PREVIOUS page was scrolled
 *    to. `isFirstRun` below skips this on initial mount/hard reload (so it
 *    doesn't fight the browser's own scroll-restoration on refresh) and
 *    only forces the reset on a genuine route change - and checks for a
 *    URL hash first, so `/contact#calendar` (the header's "Book a Demo"
 *    button) still lands on the calendar instead of being forced to 0.
 *
 * 3. CONTENT IS NEVER LEFT INVISIBLE
 *    The pages hide content up front and reveal it with animation — e.g.
 *    `gsap.set('[data-hero]', { opacity: 0 })` on the homepage, and CSS that
 *    keeps `[data-reveal]` transparent until `.in` is added. If GSAP fails to
 *    load, is blocked, or its tween loop never runs, the page renders as a blank
 *    coloured rectangle. The failsafe below forces everything visible shortly
 *    after load, so a broken animation degrades to "not animated" rather than
 *    "not there".
 */
export default function ScrollGuard({ enabled }: { enabled?: boolean } = {}) {
  const pathname = usePathname();
  const isFirstRun = useRef(true);

  // ── 1. Lenis singleton wrapper (installed once) ─────────────────────────
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

  // ── 2. Own the one Lenis instance, per navigation ───────────────────────
  useEffect(() => {
    // enabled === false is an explicit editor opt-out (Theme ->
    // enableSmoothScroll). Undefined (Site Settings unreachable) defaults to
    // on, matching the field's own defaultValue: true.
    if (enabled === false) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Capture-then-flip once per effect run, synchronously - `create()` can
    // fire later (via the poll below), so this can't be read from inside it.
    const isNav = !isFirstRun.current;
    isFirstRun.current = false;

    const w = window as any;
    let cancelled = false;
    let lenis: any = null;
    let tick: ((t: number) => void) | null = null;
    let anchorCleanup: (() => void) | null = null;
    let pollId: number | null = null;
    let pollStop: number | null = null;
    const resetTimeouts: number[] = [];

    const create = () => {
      if (cancelled || !w.Lenis) return;
      lenis = new w.Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        infinite: false,
        syncTouch: false,
      });

      if (w.gsap) {
        if (w.ScrollTrigger) lenis.on('scroll', w.ScrollTrigger.update);
        tick = (t: number) => lenis.raf(t * 1000);
        w.gsap.ticker.add(tick);
        w.gsap.ticker.lagSmoothing(0);
      } else {
        // GSAP hasn't loaded (or failed to) — drive Lenis off rAF directly
        // rather than not scrolling smoothly at all.
        let alive = true;
        const raf = (t: number) => {
          if (!alive) return;
          lenis.raf(t);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
        anchorCleanup = () => {
          alive = false;
        };
      }

      // In-page anchor links (e.g. Contact's "#calendar") scroll smoothly
      // through Lenis instead of the browser's instant jump.
      const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
      const onClick = (e: MouseEvent, a: HTMLAnchorElement) => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, {
          offset: -20,
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      };
      const handlers = anchors.map((a) => {
        const handler = (e: Event) => onClick(e as MouseEvent, a);
        a.addEventListener('click', handler);
        return { a, handler };
      });
      const removeAnchors = () => handlers.forEach(({ a, handler }) => a.removeEventListener('click', handler));
      anchorCleanup = anchorCleanup
        ? (() => {
            const stopRaf = anchorCleanup!;
            return () => {
              stopRaf();
              removeAnchors();
            };
          })()
        : removeAnchors;

      // A brand-new Lenis instance otherwise just adopts whatever scroll
      // position is on screen when it's created - on a client-side route
      // change that's wherever the PREVIOUS page happened to be scrolled to,
      // not the top of the new one. Skip on first mount/hard reload (don't
      // fight the browser's own scroll-restoration on refresh); on a real
      // navigation, honour a URL hash (e.g. Book a Demo -> /contact#calendar)
      // if present, otherwise force both native scroll and Lenis's own
      // tracked position to 0.
      //
      // Found 2026-08-26: a single reset right here wasn't enough - reported
      // (repeatedly, on real navigation, not reproducible through scripted
      // clicks) as "works, then lands at the bottom" - the signature of
      // something running AFTER this point and moving scroll again, not of
      // this reset failing outright. Re-asserts the target on several short
      // delays through the page's settling window (late web-font swaps,
      // images resolving and reflowing, Next's own post-navigation
      // handling) instead of trusting one synchronous call to be the final
      // word. Each call is cheap and a no-op if scroll is already correct.
      //
      // Re-queries the hash target FRESH on every call rather than reusing
      // one captured element - a first version captured it once and reused
      // that reference for all four delayed calls, which broke Book a Demo:
      // if the calendar section's DOM node gets replaced by a re-render
      // anywhere in this window, the stale (now-detached) reference's
      // getBoundingClientRect() reads as {top:0,...}, so a LATER call was
      // overwriting the correct calendar scroll with 0. Caught by testing
      // this exact fix before shipping it, not left for a second live regression.
      if (isNav) {
        const hash = window.location.hash;
        const apply = () => {
          if (cancelled) return;
          const target = hash ? document.querySelector(hash) : null;
          if (target) {
            // Computed from live, native values (not Lenis's own element-
            // relative math) so this stays correct regardless of whether
            // Lenis's internal position tracking is in sync.
            const absoluteTop = target.getBoundingClientRect().top + window.scrollY - 20;
            const computed = Math.max(0, Math.round(absoluteTop));
            // Diagnosed via temporary instrumentation 2026-08-26: without
            // this, a correctly-computed target got silently clamped down
            // to whatever the page's height was AT THE MOMENT this Lenis
            // instance was constructed (its cached `limit`) - which, this
            // early in navigation, is the height BEFORE the calendar
            // section's booking widget has mounted and made the page
            // taller. resize() forces a remeasure of the current (by-then
            // correct) document height before scrolling, so the clamp
            // uses an up-to-date limit instead of a stale one. Confirmed
            // via repeated testing: without this call, roughly half of
            // attempts landed at the stale limit instead of the calendar.
            lenis.resize();
            lenis.scrollTo(computed, { immediate: true });
          } else {
            window.scrollTo(0, 0);
            lenis.scrollTo(0, { immediate: true });
          }
        };
        apply();
        [50, 150, 350, 700].forEach((delay) => {
          const id = window.setTimeout(apply, delay);
          resetTimeouts.push(id);
        });
      }
    };

    if (w.Lenis) {
      create();
    } else {
      // First load: the CDN <script strategy="afterInteractive"> may not have
      // finished yet. Poll rather than skip smooth scroll for the whole
      // session. Bookkept on the outer scope (not returned as its own
      // cleanup) so the single cleanup below always tears down whichever of
      // "still polling" / "instance created" actually happened — an early
      // return here previously meant a Lenis created via this poll never got
      // destroyed on route change, exactly the instance-stacking bug this
      // file exists to prevent.
      pollId = window.setInterval(() => {
        if (w.Lenis) {
          if (pollId !== null) window.clearInterval(pollId);
          pollId = null;
          create();
        }
      }, 10);
      pollStop = window.setTimeout(() => {
        if (pollId !== null) window.clearInterval(pollId);
        pollId = null;
      }, 8000);
    }

    return () => {
      cancelled = true;
      if (pollId !== null) window.clearInterval(pollId);
      if (pollStop !== null) window.clearTimeout(pollStop);
      resetTimeouts.forEach((id) => window.clearTimeout(id));
      try {
        if (tick && w.gsap) w.gsap.ticker.remove(tick);
        anchorCleanup?.();
        lenis?.destroy?.();
      } catch {
        /* teardown must never throw */
      }
    };
  }, [pathname, enabled]);

  // ── 3. Visibility failsafe + orphaned-trigger prune, per navigation ────
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
