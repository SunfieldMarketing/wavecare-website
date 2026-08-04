import type { Payload } from 'payload';
import { ensureMedia } from './media';

/** /design-print — migrated verbatim. Uses subservices.css. */
export async function seedDesignPrint(payload: Payload): Promise<void> {
  payload.logger.info('→ Seeding /design-print…');

  const img = (file: string, alt: string) => ensureMedia(payload, `images/${file}`, alt);

  const wallImgs = await Promise.all([
    img('harvest_acres_brochure.jpg', 'Brochure'),
    img('Woodland manor signage.jpg', 'Signage'),
    img('inner roots business card.png', 'Business Card'),
    img('Athens roadside billboard style print ad.jpg', 'Billboard'),
  ]);

  const beforeImg = await img('harvest_acres_brochure.jpg', 'Typical flyer, before');
  const afterImg = await img('brochure_inside.png', 'Professionally designed piece, after');

  const galleryFiles: Array<[string, string, string]> = [
    ['River ridge tri fold brochure.png', 'Tri-Fold', 'Tri-Fold'],
    ['harvest_acres_brochure.jpg', 'Brochure', 'Brochure'],
    ['Athens roadside billboard style print ad.jpg', 'Billboard', 'Billboard'],
    ['harvest acres pull up banner.png', 'Banner', 'Banner'],
    ['Neffsville postcard.png', 'Postcard', 'Postcard'],
    ['Woodland manor signage.jpg', 'Signage', 'Signage'],
    ['Kendallville manor signage.png', 'Outdoor Signage', 'Signage'],
    ['inner roots business card.png', 'Business Card', 'Business Card'],
  ];
  const galleryItems: any[] = [];
  for (const [file, alt, tag] of galleryFiles) {
    const id = await img(file, alt);
    if (id) galleryItems.push({ image: id, tag });
  }

  const icon = (d: string, size = 24) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${d}</svg>`;
  const docIcon = icon(
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>',
    28,
  );

  const link = (label: string, url: string, style = 'primary') => ({ label, type: 'external', url, style });

  const layout: any[] = [
    {
      blockType: 'printHero',
      breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Design & Print' }],
      title: 'Healthcare\n*Design & Print*',
      subtitle:
        'Professional design and print for senior care facilities and medical practices. Brochures, admissions packets, signage, and branded materials that build trust at every touchpoint.',
      checklist: [
        { text: 'ADMISSIONS MATERIALS' },
        { text: 'FACILITY SIGNAGE' },
        { text: 'VIDEO BROCHURES' },
      ],
      buttons: [{ link: link('Start a Design Project →', '/contact') }],
      images: wallImgs.filter(Boolean).map((id) => ({ image: id })),
    },
    {
      blockType: 'noticeBar',
      text: 'Healthcare-Focused Design  •  Print-Ready Files  •  Custom Branding  •  Premium Materials',
      appearance: {
        background: 'custom',
        customBackground: '#062A24',
        paddingTop: 'none',
        paddingBottom: 'none',
      },
    },
    {
      blockType: 'printIntro',
      eyebrow: 'Why Design & Print Matters',
      title: 'First impressions are physical.',
      lead: 'Families often form opinions about your facility before they ever speak with your team. Professional design creates confidence, improves communication, and makes sure every touchpoint reflects the quality of care you provide.',
      beforeImage: beforeImg,
      afterImage: afterImg,
      caption: 'Drag, left is a typical flyer, right is a professionally designed piece.',
      stats: [
        { value: '60', suffix: '%', label: 'of families judge care quality by marketing materials' },
        { value: '2', suffix: 'x', label: 'higher conversion with professional admissions packets' },
        { value: '100', suffix: '%', label: 'tailored to senior care and medical practices' },
      ],
    },
    {
      blockType: 'iconCardGrid',
      tone: 'deep',
      eyebrow: 'Design & Print Services',
      title: 'Everything your facility hands over.',
      subtitle: 'We design and format all the essential marketing collateral and operational materials your team needs to succeed.',
      cards: [
        { icon: docIcon, number: '01', title: 'Brochures & Marketing', body: 'Professionally designed brochures, flyers, postcards, and promotional pieces.' },
        { icon: icon('<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>', 28), number: '02', title: 'Admissions Packets', body: 'Custom folders and insert sheets to cleanly organize intake forms, facility amenities, and rules.' },
        { icon: icon('<rect x="4" y="5" width="16" height="14" rx="2" ry="2"></rect><line x1="12" y1="19" x2="12" y2="22"></line><line x1="8" y1="22" x2="16" y2="22"></line><line x1="8" y1="5" x2="8" y2="19"></line>', 28), number: '03', title: 'Banners & Signage', body: 'Pull-up banners, event signage, and facility posters that align perfectly with your brand identity.' },
        { icon: icon('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="18"></line><line x1="12" y1="14" x2="12" y2="14"></line><line x1="12" y1="10" x2="12" y2="10"></line>', 28), number: '04', title: 'Menus & Activities', body: 'Elevate your dining and recreation experience with beautifully formatted and easy-to-read daily or weekly layouts.' },
        { icon: icon('<rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line>', 28), number: '05', title: 'Stationery & Cards', body: 'Business cards for your liaisons and leadership, letterheads, and custom envelopes.' },
        { icon: icon('<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>', 28), number: '06', title: 'Event Collateral', body: 'Invitations, schedules, and custom promo items designed specifically for your community events or open houses.' },
      ],
    },
    {
      blockType: 'printProcess',
      eyebrow: 'Our Process',
      title: 'From blank page to *press-ready.*',
      subtitle: 'Hover a phase, watch a piece go from wireframe to a print-ready proof.',
      phases: [
        { name: 'Discovery', title: 'Discovery', description: 'We review your goals, audience, and existing materials, and define exactly what each piece needs to do.', badge: 'Wireframe' },
        { name: 'Design', title: 'Design', description: 'We create concepts aligned with your brand and messaging, turning the brief into real layouts.', badge: 'Flat Comp' },
        { name: 'Refine', title: 'Refine', description: 'We collaborate on revisions and finalize the design, every edit marked and resolved.', badge: 'Revision' },
        { name: 'Print & Deliver', title: 'Print & Deliver', description: 'We prepare production-ready files or coordinate printing and delivery, press marks, bleeds, and CMYK all handled.', badge: 'Press-Ready' },
      ],
    },
    {
      blockType: 'receiveGrid',
      eyebrow: "What You'll Receive",
      title: 'Finished, formatted, _ready to print._',
      items: [
        { icon: docIcon.replace('width="28" height="28"', 'width="24" height="24"'), title: 'Print-Ready Files', body: 'Delivered with proper bleeds, crop marks, and CMYK color profiles.' },
        { icon: icon('<polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line>'), title: 'Reliable Source', body: 'We supply source files so you always have access to your assets.' },
        { icon: icon('<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>'), title: 'Stock & Finish Specs', body: 'Recommendations for paper weight, coating, and bindings.' },
        { icon: icon('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>'), title: 'Production Coordination', body: 'We can work directly with your print vendor to ensure flawless execution.' },
      ],
    },
    {
      blockType: 'signatureProduct',
      eyebrow: 'Signature Product',
      title: 'The Video Brochure',
      body: "Combine the impact of our cinematic video production with the tangibility of a premium print piece. A physical brochure that opens to reveal an embedded HD screen automatically playing your facility's film.",
      button: { link: link('Get a Quote', '/contact') },
      videoUrl: '/videos/1 Wavecare Photo Ad (HQ).mp4',
    },
    {
      blockType: 'gallery',
      heading: {
        eyebrow: 'Recent Print Projects',
        title: 'A look at the collateral.',
        subtitle: "A look at the collateral and materials we've designed and printed.",
        align: 'center',
      },
      items: galleryItems,
      layout: 'masonry',
      lightbox: false,
      showFilters: false,
      appearance: { background: 'deep', paddingTop: 'default', paddingBottom: 'default', width: 'default' },
    },
    {
      blockType: 'finalCta',
      eyebrow: 'Print that speaks for you',
      title: 'Leave families with a\n*lasting* impression.',
      subtitle:
        'When a family finishes a tour, the materials they take home represent your facility. Make sure they say the right thing.',
      waveAnimation: true,
      buttons: [{ link: link('Start a Design Project', '/contact', 'light') }],
      appearance: { background: 'deep', width: 'default' },
    },
  ];

  const data: any = {
    title: 'Design & Print',
    slug: 'design-print',
    layout,
    changeFrequency: 'monthly',
    priority: 0.7,
    _status: 'published',
    meta: {
      title: 'Healthcare Design & Print Services | Wavecare',
      description:
        'Brochures, admissions packets, signage, and branded materials for senior care facilities. Print-ready design that builds trust at every touchpoint.',
    },
  };

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'design-print' } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, overrideAccess: true });
  } else {
    await payload.create({ collection: 'pages', data, overrideAccess: true });
  }

  payload.logger.info('→ /design-print ready.');
}
