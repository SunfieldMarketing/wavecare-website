'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

    if (key) {
      posthog.init(key, {
        api_host: host,
        defaults: '2026-05-30',
        capture_pageview: true,
        capture_pageleave: true,
        person_profiles: 'identified_only',
      });
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
