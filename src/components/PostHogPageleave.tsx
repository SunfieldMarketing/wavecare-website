'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Next.js uses client-side navigation — pages never "unload" on route changes,
// so posthog's built-in capture_pageleave (which uses beforeunload) only fires
// when the user closes the tab. This component fills the gap for SPA navigation.
export function PostHogPageleave() {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    const ph = (window as any).posthog;
    if (!ph) return;

    // Fire $pageleave for the previous route whenever the path changes
    if (prevPathname.current !== null && prevPathname.current !== pathname) {
      ph.capture('$pageleave', {
        $current_url: window.location.origin + prevPathname.current,
      });
    }
    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}
