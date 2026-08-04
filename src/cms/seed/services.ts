import type { Payload } from 'payload';
import { ensureMedia } from './media';

/** /services — migrated verbatim. Uses the services.css class system. */
export async function seedServices(payload: Payload): Promise<void> {
  payload.logger.info('→ Seeding /services…');

  // Third element mirrors the original's per-image class: Enclave at Rye's
  // logo renders visually smaller than the rest of the row, so it gets a
  // 1.5x scale-up (`.m-logo img.scale-up`, a real rule in globals.css).
  // Link Homecare's original `invert` class is intentionally NOT carried
  // over — its CSS rule is dead in the original too (`.m-logo img.invert{
  // /* removed invert to keep original color */ }`), so applying it here
  // would be a no-op either way.
  const logoFiles: Array<[string, string, boolean?]> = [
    ['logo2.png', 'The Enclave at Rye', true],
    ['logo3.png', 'Heart Shield'],
    ['logo4.png', 'Silverstream'],
    ['logo5.png', 'Nyack Ridge'],
    ['logo6.png', 'Galloway'],
    ['logo7.png', 'South Shore'],
    ['logo8.png', 'Link Homecare'],
  ];

  const logos: any[] = [];
  for (const [file, name, scaleUp] of logoFiles) {
    const id = await ensureMedia(payload, `images/logos/${file}`, `${name} logo`);
    if (id) logos.push({ image: id, name, scaleUp: scaleUp ?? false });
  }

  const btn = (label: string, url: string, style = 'primary') => ({
    link: { label, type: 'external', url, style },
  });

  const layout: any[] = [
    {
      blockType: 'hero',
      layout: 'centered',
      eyebrow: 'Services',
      title: 'Healthcare Marketing\nThat Earns *Trust*\nBefore the First Tour',
      subtitle:
        'From branding and photography to video and conversion-first web design, we help senior care facilities and healthcare practices look as professional online as they are in person.',
      minHeight: 'full',
      buttons: [btn('Book a Demo', '/contact', 'light'), btn('See Our Services', '#services', 'ghost')],
      appearance: {
        background: 'video',
        backgroundVideo: { source: 'vimeo', vimeoId: '1187767005' },
        paddingTop: 'none',
        paddingBottom: 'none',
        width: 'default',
      },
    },
    {
      blockType: 'servicesGrid',
      tone: 'dark',
      anchorId: 'services',
      eyebrow: 'Services',
      title: 'Everything your healthcare brand\nneeds, under one roof.',
      lead: 'We work with senior living communities, memory care, assisted living, and healthcare practices to handle every piece of your marketing. Photography, video, print, and web, built with HIPAA-conscious workflows and the kind of turnaround healthcare decision-makers actually need.',
      cards: [
        {
          number: '01',
          title: 'Brand & Photoshoots',
          body: 'Professional photography that builds instant trust. Facility shots, staff portraits, resident moments, and brand imagery, captured with sensitivity and ready for every channel.',
        },
        {
          number: '02',
          title: 'Video Production',
          body: 'Short-form, explainer, and facility tour videos that turn page views into booked tours and qualified inquiries. Built to perform on every channel.',
        },
        {
          number: '03',
          title: 'Design & Print',
          body: 'Patient-ready materials your team uses every day: brochures, signage, menus, banners, business cards, designed to match your brand and built to last.',
        },
        {
          number: '04',
          title: 'Web Design & Management',
          body: 'Fast, conversion-first websites built for healthcare. SEO-ready, mobile-first, and connected to Google Business so families find you when they search.',
        },
      ],
    },
    {
      blockType: 'splitRow',
      wrapSection: true,
      tone: 'deeper',
      textTone: 'on-dark',
      eyebrow: 'Websites',
      title: 'Conversion-first websites built for healthcare.',
      body: 'Most healthcare websites are stuck in 2015. We build fast, mobile-first sites that load quickly, rank locally, and turn visitors into inquiries , optimized for the Google 3-Pack and integrated with Google Business so families find you the moment they start looking.',
      bullets: [
        { text: 'Mobile-first, accessibility-conscious build' },
        { text: 'SEO foundations + Google Business optimization' },
        { text: 'Most projects launch in about two weeks' },
        { text: 'Ongoing management, we work with existing sites too' },
      ],
      buttons: [btn('Learn More', '/webdesign')],
      mediaType: 'video',
      videoUrl: '/videos/Website video .mp4',
    },
    {
      blockType: 'splitRow',
      wrapSection: true,
      tone: 'dark',
      flipped: true,
      textTone: 'on-dark',
      eyebrow: 'Photo & Video',
      title: 'Visuals that earn trust before the first tour.',
      body: "Stock photos don't book tours. Families want to see the real care, the real staff, and the real environment. We handle both photography and video production with a single, efficient footprint to minimize disruption to your community.",
      bullets: [
        { text: 'Facility interiors, exteriors & amenities' },
        { text: 'Staff portraits & resident lifestyle' },
        { text: 'HIPAA-conscious shoot workflows' },
        { text: 'Commercials & facility tour films' },
      ],
      buttons: [btn('Photo Services', '/photoservices'), btn('Video Services', '/videoservices', 'ghost')],
      mediaType: 'video',
      videoUrl: '/videos/country_lane_720p.mp4',
    },
    {
      blockType: 'splitRow',
      wrapSection: true,
      tone: 'light',
      textTone: 'on-light',
      eyebrow: 'Print & Collateral',
      title: 'Tangible touchpoints for a digital world.',
      body: 'When a family leaves a tour, what do they take with them? We design premium, patient-ready materials that feel as good as they look, ensuring your brand stands out when the decision is made at the kitchen table.',
      bullets: [
        { text: 'Brochures, flyers & welcome packets' },
        { text: 'Interior signage & banners' },
        { text: 'Menus & event collateral' },
        { text: 'Business cards & stationery' },
      ],
      buttons: [btn('View Print Work', '/design-print')],
      mediaType: 'video',
      videoUrl: '/videos/Brochure wavecare video.mp4',
    },
    {
      blockType: 'featureRow',
      tone: 'dark',
      eyebrow: 'The Difference',
      title: 'Why senior care teams choose Wavecare.',
      cards: [
        {
          title: 'We Speak Your Language',
          body: "We know the difference between AL and IL. We know what HIPAA compliance looks like on a shoot. You don't have to train us on your industry.",
        },
        {
          title: 'Fast, Transparent Timelines',
          body: 'Healthcare moves fast, and so do we. Most websites launch in two weeks. Photos and videos are delivered quickly, without the agency runaround.',
        },
        {
          title: 'Everything Under One Roof',
          body: 'Stop managing five different freelancers. We handle the web, the photo, the video, and the print, ensuring your brand is consistent everywhere.',
        },
      ],
    },
    {
      blockType: 'statsRow',
      stats: [
        { value: '50+', label: 'Facilities Served' },
        { value: '1M+', label: 'Video Views' },
        { value: '100%', label: 'HIPAA Compliant' },
      ],
    },
    {
      blockType: 'logoStrip',
      tone: 'dark',
      eyebrow: 'Trusted by the Best',
      title: 'Join the leaders working with us.',
      logos,
    },
    {
      blockType: 'serviceTestimonials',
      eyebrow: 'Testimonials',
      title: 'What our healthcare clients say.',
      quotes: [
        {
          quote:
            'They completely transformed our digital presence. The new website books tours while we sleep, and the video captures exactly who we are.',
          author: 'Sarah Jenkins',
          role: 'Marketing Director, Oakwood Senior Living',
        },
        {
          quote:
            "Fast, professional, and they actually understand healthcare. The photo shoot was completely seamless and didn't disrupt our residents at all.",
          author: 'David Chen',
          role: 'Executive Director, The Pinnacle',
        },
        {
          quote:
            'We tried three other agencies before finding Wavecare. They are the only ones who delivered on time and exceeded our expectations on quality.',
          author: 'Elena Rostova',
          role: 'VP of Operations, Harmony Care',
        },
      ],
    },
    {
      blockType: 'serviceFinalCta',
      eyebrow: 'Ready to Start?',
      title: "Let's build a brand that books tours.",
      subtitle:
        "Schedule a free discovery call to see how we can transform your facility's marketing.",
      buttons: [btn('Book a Demo', '/contact', 'light')],
    },
  ];

  const data: any = {
    title: 'Services',
    slug: 'services',
    layout,
    changeFrequency: 'monthly',
    priority: 0.8,
    _status: 'published',
    meta: {
      title: 'Healthcare Marketing Services for Senior Care | Wavecare',
      description:
        'Photography, video production, design and print, and conversion-first web design for senior living and skilled nursing — HIPAA-conscious, all under one roof.',
    },
  };

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'services' } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, overrideAccess: true });
  } else {
    await payload.create({ collection: 'pages', data, overrideAccess: true });
  }

  payload.logger.info('→ /services ready.');
}
