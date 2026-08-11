'use client';

import { useEffect } from 'react';

interface Props {
  slug: string;
  client: string;
  services: string[];
}

export default function CaseStudyTracker({ slug, client, services }: Props) {
  useEffect(() => {
    // window.posthog (not a posthog-js import) — see ContactForm.tsx: that's
    // the instance the root layout's snippet actually initializes with a
    // real token. Importing posthog-js directly here used to route this
    // capture through a second, uninitialized instance that silently failed.
    (window as any).posthog?.capture('case_study_viewed', {
      slug,
      client,
      services,
    });
  }, [slug, client, services]);

  return null;
}
