import { PostHog } from 'posthog-node';

let posthogClient: PostHog | null = null;

/**
 * Found 2026-08-26 during the integrations audit: this read
 * NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, a name that exists nowhere else in the
 * codebase or .env.local/.env.example - the actual configured variable
 * (used by the client-side snippet's hardcoded token and every env file) is
 * NEXT_PUBLIC_POSTHOG_KEY. posthog-node's constructor doesn't throw on an
 * empty key (normalizeApiKey coerces undefined to ''), so this never
 * crashed anything - it silently sent every server-side event
 * (identify()/capture('lead_created') in /api/contact) with no API key,
 * meaning the lead_created event has never actually landed in PostHog. GHL
 * and the CMS Form Submissions record were unaffected either way, since
 * both happen before this client is ever touched.
 */
export function getPostHogClient(): PostHog {
  if (!posthogClient) {
    posthogClient = new PostHog(
      process.env.NEXT_PUBLIC_POSTHOG_KEY!,
      {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        flushAt: 1,
        flushInterval: 0,
      }
    );
  }
  return posthogClient;
}
