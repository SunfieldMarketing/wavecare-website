import type { Payload } from 'payload';

/**
 * /testimonials — migrated verbatim.
 *
 * Quotes go into the Testimonials collection rather than being typed into the
 * page, so the same record can be reused anywhere on the site. The page layout
 * then references them.
 */

const TESTIMONIALS = [
  {
    key: 'sarah-m',
    type: 'video',
    vimeoId: '1187758900',
    quote:
      'Within six weeks our tour requests doubled, and the families coming through were the right fit, not tire-kickers.',
    author: 'Sarah M.',
    role: 'Executive Director',
    organisation: 'Assisted Living Community · 84 beds · Tampa, FL',
    rating: 5,
  },
  {
    key: 'david-r',
    type: 'video',
    vimeoId: '1187761002',
    quote:
      "They understood memory care from day one. I didn't have to teach them what dignity looks like in our marketing.",
    author: 'David R.',
    role: 'Facility Director',
    organisation: 'Memory Care Community · 56 residents · Princeton, NJ',
    rating: 5,
  },
  {
    key: 'jennifer-f',
    type: 'quote',
    quote:
      'From the first call, their team understood our facility, our audience, and the sensitivity required in healthcare. The visuals, website updates, and overall branding helped us look more professional and trustworthy. We started receiving better-quality inquiries within weeks.',
    author: 'Jennifer F.',
    role: 'Facility Administrator',
    organisation: 'Independent Living · Charleston, SC',
    outcome: 'Better-fit inquiries in under 30 days',
    initials: 'JF',
    rating: 5,
  },
  {
    key: 'michael-t',
    type: 'quote',
    quote:
      'What stood out most was their attention to detail and communication. They handled everything from creative direction to execution smoothly. The final results exceeded our expectations, especially the photos and website presentation.',
    author: 'Michael T.',
    role: 'Facility Director',
    organisation: 'Skilled Nursing · Cherry Hill, NJ',
    outcome: 'New site & photography in 5 weeks',
    initials: 'MT',
    rating: 5,
  },
  {
    key: 'angela-l',
    type: 'quote',
    quote:
      'Wavecare feels more like a partner than a vendor. They took time to understand our goals and delivered solutions that actually made an impact. Their experience in healthcare marketing really shows.',
    author: 'Angela L.',
    role: 'Marketing Administrator',
    organisation: 'Continuing Care Retirement · Atlanta, GA',
    outcome: 'Ongoing partnership, year two',
    initials: 'AL',
    rating: 5,
  },
];

export async function seedTestimonials(payload: Payload): Promise<void> {
  payload.logger.info('→ Seeding testimonials…');

  const ids: Record<string, number | string> = {};

  for (const t of TESTIMONIALS) {
    const { key, ...fields } = t;
    const existing = await payload.find({
      collection: 'testimonials',
      where: { author: { equals: t.author } },
      limit: 1,
      overrideAccess: true,
    });

    const data: any = { ...fields, _status: 'published' };

    if (existing.docs.length > 0) {
      const doc = await payload.update({
        collection: 'testimonials',
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      });
      ids[key] = doc.id;
    } else {
      const doc = await payload.create({ collection: 'testimonials', data, overrideAccess: true });
      ids[key] = doc.id;
    }
  }

  const link = (label: string, url: string) => ({ label, type: 'external', url, style: 'text' });

  const layout: any[] = [
    {
      blockType: 'landingHero',
      variant: 'wct',
      eyebrow: 'Real Facilities · Real Results',
      title: 'Hear what happens when _facilities like yours_ work with Wavecare',
      subtitle:
        'Senior care administrators tell you, in their own words, what changed after partnering with us.',
      trustItems: [
        { text: 'Healthcare-focused since 2019' },
        { text: '40+ senior care facilities served' },
      ],
    },
    {
      blockType: 'statsBar',
      variant: 'wct',
      stats: [
        { value: '0.0×', countTo: '3.4', suffix: '×', decimals: 1, label: 'Avg. lift in qualified family inquiries' },
        { value: '0 days', countTo: '30', suffix: ' days', decimals: 0, label: 'Typical time to first measurable results' },
        {
          value: '0%',
          countTo: '100',
          suffix: '%',
          decimals: 0,
          label: 'Healthcare & senior care focus with no other verticals',
        },
      ],
      showTransition: true,
    },
    {
      blockType: 'videoTestimonials',
      label: 'Watch the conversations',
      title: 'Administrators on what _actually changed_',
      testimonials: [ids['sarah-m'], ids['david-r']].filter(Boolean),
    },
    {
      blockType: 'inlineCta',
      lead: 'Curious where you stand?',
      text: "We'll show you exactly what families see when they search for your facility, free.",
      cta: link('Book My Audit', '/contact'),
    },
    { blockType: 'dividerLabel', text: 'More from our clients' },
    {
      blockType: 'testimonialCards',
      testimonials: [ids['jennifer-f'], ids['michael-t'], ids['angela-l']].filter(Boolean),
    },
    {
      blockType: 'auditCta',
      variant: 'wct',
      tag: 'Free · No Obligation',
      title: 'Ready to see what _your facility_ could look like?',
      subtitle:
        "In 15 minutes we'll walk through your entire marketing presence and show you exactly what families see, where you're losing inquiries, and what we'd fix first.",
      cta: link('Get Your Free Marketing Audit', '/contact'),
      ctaNote: '15 minutes · No credit card · No sales pressure',
    },
  ];

  const data: any = {
    title: 'Testimonials',
    slug: 'testimonials',
    layout,
    changeFrequency: 'monthly',
    priority: 0.6,
    _status: 'published',
    meta: {
      title: 'Senior Care Marketing Testimonials & Client Results',
      description:
        'Senior care administrators on what changed after working with Wavecare — doubled tour requests, better-fit inquiries, and measurable results within 30 days.',
    },
  };

  const existingPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'testimonials' } },
    limit: 1,
    overrideAccess: true,
  });

  if (existingPage.docs.length > 0) {
    await payload.update({ collection: 'pages', id: existingPage.docs[0].id, data, overrideAccess: true });
  } else {
    await payload.create({ collection: 'pages', data, overrideAccess: true });
  }

  payload.logger.info(`→ ${TESTIMONIALS.length} testimonials + /testimonials page ready.`);
}
