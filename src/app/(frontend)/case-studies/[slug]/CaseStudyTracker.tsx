'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

interface Props {
  slug: string;
  client: string;
  services: string[];
}

export default function CaseStudyTracker({ slug, client, services }: Props) {
  useEffect(() => {
    posthog.capture('case_study_viewed', {
      slug,
      client,
      services,
    });
  }, [slug, client, services]);

  return null;
}
