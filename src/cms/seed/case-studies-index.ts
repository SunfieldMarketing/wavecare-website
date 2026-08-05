import type { Payload } from 'payload';
import { ensureMedia } from './media';

/**
 * /case-studies — the index page, migrated verbatim.
 *
 * Its cards carry their own headlines, client descriptions and results, which
 * differ from the full case-study records, so they are stored on the page as
 * caseStudyCards rather than pulled from the collection.
 */
export async function seedCaseStudiesIndex(payload: Payload): Promise<void> {
  payload.logger.info('→ Seeding /case-studies index…');

  const img = async (file: string, alt: string) => ensureMedia(payload, `images/${file}`, alt);

  const cards = [
    {
      image: await img('cs_medical_group.png', 'Healthcare network rebrand'),
      tags: [{ text: 'Full Service' }],
      client: 'A national healthcare network',
      title: 'A ground-up rebrand for a growing regional provider',
      description:
        'From fresh media assets to physical print marketing assets, we rebuilt their online presence through impactful branding and a new website video.',
      result: { value: '48', label: 'Facilities launched' },
    },
    {
      image: await img('cs_nursing_home.png', 'Skilled nursing facility NYC'),
      tags: [{ text: 'Web Design' }, { text: 'SEO' }],
      client: 'A skilled nursing facility in New York City',
      title: 'Dominating local search with clear and consistent messaging and visuals',
      description:
        'We restructured their entire online brand and messaging through cohesive storytelling, marketing assets, and paid search.',
      result: {},
    },
    {
      image: await img('cs_assisted_living.png', 'Healthcare facility Queens'),
      tags: [{ text: 'Video' }, { text: 'Photo' }],
      client: 'A healthcare facility in Queens, New York',
      title:
        'Creating a high-level production for a prominent healthcare brand, boosting visibility by 42%',
      description:
        'This group of facilities benefited from cohesive brand messaging and cinematic high-level video production through real testimonials and stories.',
      result: { value: '56%', label: 'Increased and qualified tours' },
    },
    {
      image: await img('cs_rehab_center.png', 'Rehabilitation center New Jersey'),
      tags: [{ text: 'Web Design' }, { text: 'Photo' }],
      client: 'A rehabilitation center in New Jersey',
      title: 'Transforming online perception to match their quality of care',
      description:
        'By combining high-quality facility photography with a modern, conversion-focused website, we helped this facility increase their online inquiries significantly.',
      result: { value: '72%', label: 'Increase in web inquiries' },
    },
  ].filter((c) => c.image);

  const layout: any[] = [
    {
      blockType: 'caseStudyCards',
      heading: {
        eyebrow: 'Our Work',
        title: 'Real facilities. Real families finding the right care.',
        subtitle: 'See how we help healthcare brands look as good as the care they provide.',
        align: 'left',
      },
      cards,
      appearance: {
        background: 'ink',
        paddingTop: 'default',
        paddingBottom: 'default',
        width: 'default',
      },
    },
    {
      blockType: 'stats',
      heading: {
        eyebrow: 'BY THE NUMBERS',
        title: 'A decade of *getting it right.*',
        align: 'center',
      },
      stats: [
        { value: '10', countTo: 10, label: 'Years in Healthcare' },
        { value: '500+', countTo: 500, suffix: '+', label: 'Facilities Served' },
        { value: '700', countTo: 700, label: 'Assisted Placements' },
        { value: '2,400', countTo: 2400, comma: true, label: 'Smiles Captured' },
      ],
      appearance: {
        background: 'deep',
        paddingTop: 'default',
        paddingBottom: 'default',
        width: 'default',
      },
    },
    {
      blockType: 'finalCta',
      eyebrow: 'YOUR FACILITY, SEEN THE RIGHT WAY',
      title: 'Ready to be the next *case study?*',
      subtitle:
        "Tell us about your facility. We'll show you exactly what a Wavecare rebuild could look like, and what it could do for your inquiries.",
      waveAnimation: true,
      buttons: [{ link: { label: 'Book a Demo', type: 'external', url: '/contact', style: 'light' } }],
      appearance: { background: 'deep', width: 'default' },
    },
  ];

  const data: any = {
    title: 'Case Studies',
    slug: 'case-studies',
    layout,
    changeFrequency: 'weekly',
    priority: 0.8,
    _status: 'published',
    meta: {
      title: 'Healthcare Marketing Case Studies & Client Results',
      description:
        'Real senior care facilities, real results — rebrands, web design, photography and video production that increased tours and inquiries.',
    },
  };

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'case-studies' } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, overrideAccess: true });
  } else {
    await payload.create({ collection: 'pages', data, overrideAccess: true });
  }

  payload.logger.info('→ /case-studies index ready.');
}
