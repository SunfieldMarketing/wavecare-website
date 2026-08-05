import type { Payload } from 'payload';

/**
 * /commercial — migrated verbatim from the hardcoded page.
 * Uses the landing-page block kit, which renders the wc-* styles in
 * commercial.css rather than the main site design system.
 */
export async function seedCommercial(payload: Payload): Promise<void> {
  // `style: 'text'` keeps CMSLink from prefixing the generic .btn class, so the
  // wc- button classes apply cleanly on their own.
  const link = (label: string, url: string) => ({ label, type: 'external', url, style: 'text' });

  const layout: any[] = [
    {
      blockType: 'landingHero',
      eyebrow: 'For Senior Care Facilities',
      title: "Families Decide in Seconds.\nHere's How _500+ Facilities_ Become the Obvious Choice",
      trustItems: [
        { text: 'Healthcare-focused since 2019' },
        { text: 'Trusted by senior care communities nationwide' },
      ],
    },
    {
      blockType: 'videoFeature',
      contextLine: 'Watch the overview as Jake explains the family-first approach',
      vimeoId: '1187767005',
      videoTitle: 'Wavecare Commercial',
      subhead:
        'See the exact approach helping senior care facilities turn more website visitors into calls, tours, and move-ins.',
      cta: link("Show Me What's Costing Me Inquiries", '/contact'),
      ctaNote: '15 minutes · No obligation · No credit card',
    },
    {
      blockType: 'statsBar',
      stats: [
        { value: '500+', label: 'Facilities Served' },
        { value: '4,000+', label: 'Resident Placements Supported' },
        { value: 'Since 2019', label: 'Healthcare-Only Focus' },
      ],
    },
    {
      blockType: 'pillBand',
      label: 'We work with',
      pills: [
        { text: 'Assisted Living' },
        { text: 'Memory Care' },
        { text: 'Independent Living' },
        { text: 'Skilled Nursing' },
        { text: 'Home Health' },
      ],
      showTransition: true,
    },
    {
      blockType: 'auditCta',
      tag: 'Free and No Obligation',
      title: 'See exactly what families see when they land on your website',
      subtitle: "In 15 minutes we'll walk through your entire marketing presence and deliver:",
      items: [
        { text: 'A page-by-page walkthrough of what families see on Google and your site' },
        { text: 'The 3–5 specific drop-off points where inquiries are slipping away' },
        { text: 'A 90-day priority fix list with effort vs. impact estimates' },
      ],
      cta: link('Get Your Free Marketing Audit', '/contact'),
      ctaNote: '15 minutes · No credit card · No sales pressure',
    },
  ];

  const data: any = {
    title: 'Commercial',
    slug: 'commercial',
    layout,
    changeFrequency: 'monthly',
    priority: 0.6,
    _status: 'published',
    meta: {
      title: 'Senior Care Marketing That Wins Families in Seconds',
      description:
        'Watch how 500+ senior care facilities become the obvious choice for families. Book a free 15-minute marketing audit — no obligation.',
    },
  };

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'commercial' } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, overrideAccess: true });
    payload.logger.info('→ Updated /commercial.');
  } else {
    await payload.create({ collection: 'pages', data, overrideAccess: true });
    payload.logger.info('→ Created /commercial.');
  }
}
