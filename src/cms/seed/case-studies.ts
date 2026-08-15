import type { Payload } from 'payload';
import { richText } from './lexical';

/**
 * Case studies, migrated verbatim from the hardcoded `cases` record that used
 * to live in src/app/case-studies/[slug]/page.tsx.
 */
const CASES = [
  {
    slug: 'oakwood',
    client: 'Oakwood Senior Living',
    title: 'How a modern website and facility tour video increased bookings by *42%*',
    services: ['Web Design', 'Video Production'],
    result: '42%',
    resultLabel: 'Increase in qualified tours',
    body: [
      "Oakwood was losing out to newer competitors despite offering better care. Their existing website was slow, outdated, and didn't communicate the warmth and professionalism of their team.",
      'We completely overhauled their digital presence, starting with a conversion-first website built around the Google 3-Pack, and pairing it with a cinematic facility tour video that gave prospective families a real feel for the community.',
      'Within three months of launch, qualified tour bookings had increased by 42%, and their Google Business profile moved from page 3 to position 2 in local search.',
    ],
    meta: {
      title: 'Oakwood Senior Living Case Study — 42% More Tours',
      description:
        'How a conversion-first website and a cinematic facility tour video increased qualified tour bookings by 42% for Oakwood Senior Living.',
    },
  },
  {
    slug: 'pinnacle',
    client: 'The Pinnacle',
    title: 'Elevating a luxury memory care brand through *premium visuals*',
    services: ['Photography', 'Print Collateral'],
    result: '3X',
    resultLabel: 'Higher engagement on ads',
    body: [
      "The Pinnacle offered luxury memory care but their marketing materials didn't reflect that promise. Stock imagery and dated brochures were costing them family trust at first glance.",
      'We ran a full-day HIPAA-conscious photoshoot capturing staff, residents (with consent), amenities, and the unique atmosphere of their community. The resulting image library powered new brochures, welcome packets, and a complete social media refresh.',
      'Ad campaigns using real photography saw 3x higher engagement compared to the previous stock imagery, and the new brochure is now cited by families as a key reason they scheduled a tour.',
    ],
    meta: {
      title: 'The Pinnacle Case Study — 3x Ad Engagement',
      description:
        'A HIPAA-conscious photoshoot and refreshed print collateral tripled ad engagement for a luxury memory care community.',
    },
  },
  {
    slug: 'harmony',
    client: 'Harmony Care',
    title: 'A ground-up rebrand for a *growing regional provider*',
    services: ['Branding', 'Web Design', 'Print', 'Photography'],
    result: '15',
    resultLabel: 'Facilities launched under the new brand',
    body: [
      "Harmony Care was expanding rapidly across the region, but their brand hadn't kept pace. Each facility looked different, messaging was inconsistent, and their website couldn't handle their multi-location growth.",
      'We designed a scalable brand system from the ground up, logo, color palette, typography, and voice, then built a unified website architecture that let each location maintain its personality while presenting a cohesive parent brand.',
      'Within 18 months, 15 facilities had launched under the new Harmony Care brand, with a standardized marketing playbook that made each opening smoother than the last.',
    ],
    meta: {
      title: 'Harmony Care Case Study — 15 Facilities Rebranded',
      description:
        'A scalable brand system and multi-location website architecture that carried Harmony Care through 15 facility launches.',
    },
  },
  {
    slug: 'mercy',
    client: 'Mercy Health Partners',
    title: 'Dominating local search with a *conversion-first* medical site',
    services: ['Web Design', 'SEO', 'Google Business Optimization'],
    result: '+210%',
    resultLabel: 'Organic search traffic',
    body: [
      "Mercy Health Partners had five locations but almost no organic visibility. Their website was a single-page template that couldn't compete in local search, and their Google Business profiles were incomplete.",
      'We restructured their website into a proper multi-location architecture, dedicated pages for each practice, schema markup, and deep SEO foundations. We also audited and optimized all five Google Business profiles with new photos, correct categories, and review response templates.',
      'Within six months, organic search traffic had grown by 210%, and three of the five locations now appear in the Google 3-Pack for their target search terms.',
    ],
    meta: {
      title: 'Mercy Health Partners Case Study — +210% Organic Traffic',
      description:
        'A multi-location site architecture, schema markup and Google Business Profile optimisation grew organic traffic 210% across five locations.',
    },
  },
];

// Closing CTA — verbatim from the original hand-written page, which hardcoded
// the same copy for every case study. Now a `finalCta` block in each study's
// `layout` field instead of fixed JSX, so it's per-study editable and gets the
// shared FinalCTABlock's container/z-index handling for free.
const CLOSING_CTA = {
  blockType: 'finalCta',
  eyebrow: 'Ready for results like this?',
  title: "Let's build your success story.",
  subtitle: "Book a free discovery call and we'll map out exactly what we'd build for your facility.",
  waveAnimation: true,
  buttons: [{ link: { label: 'Book a Demo', type: 'external', url: '/contact#calendar', style: 'primary' } }],
};

export async function seedCaseStudies(payload: Payload): Promise<void> {
  payload.logger.info('→ Seeding case studies…');

  for (const c of CASES) {
    const existing = await payload.find({
      collection: 'case-studies',
      where: { slug: { equals: c.slug } },
      limit: 1,
      overrideAccess: true,
    });

    const data: any = {
      client: c.client,
      title: c.title,
      slug: c.slug,
      services: c.services.map((name) => ({ name })),
      result: c.result,
      resultLabel: c.resultLabel,
      body: richText(c.body),
      layout: [CLOSING_CTA],
      _status: 'published',
      meta: c.meta,
    };

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'case-studies',
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      });
    } else {
      await payload.create({ collection: 'case-studies', data, overrideAccess: true });
    }
  }

  payload.logger.info(`→ ${CASES.length} case studies ready.`);
}
