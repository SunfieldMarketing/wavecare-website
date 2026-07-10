'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (typeof window !== 'undefined') {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

    if (key && !posthog.__loaded) {
      posthog.init(key, {
        api_host: host,
        capture_pageview: false, // we handle this manually via PostHogPageview
        capture_pageleave: true,
        person_profiles: 'identified_only', 
      });
    }
  }

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
