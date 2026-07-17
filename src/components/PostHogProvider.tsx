'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

// NEXT_PUBLIC_ vars are baked in at build time and require Vercel env var setup.
// We hardcode the public project key here to ensure it always works in production.
// This key is NOT secret — it's exposed in every page's HTML source anyway.
const POSTHOG_KEY = 'phc_BJhLsyCjeo8rMhDNLkBCbuTTg95tFwW54crcZLXcvokZ';
const POSTHOG_HOST = 'https://us.i.posthog.com';

if (typeof window !== 'undefined') {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    defaults: '2026-05-30',
    capture_pageview: true,
    capture_pageleave: true,
  });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
