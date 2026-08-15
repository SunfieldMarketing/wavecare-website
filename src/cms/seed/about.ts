import type { Payload } from 'payload';
import { ensureMedia } from './media';

/** /about — migrated verbatim. Uses only globals.css. */
export async function seedAbout(payload: Payload): Promise<void> {
  payload.logger.info('→ Seeding /about…');

  const img = (file: string, alt: string) => ensureMedia(payload, `images/${file}`, alt);

  const heroImg = await img('img_3.jpeg', 'Caregiver with resident at a senior care facility');
  const storyImg = await img('video_production.jpg', 'Video production and storytelling');
  const accPhotoImg = await img('brand_photoshoots.jpg', 'Brand & photoshoots');
  const accVideoImg = await img('video_production.jpg', 'Video production');
  const accPrintImg = await img('design_print_2.jpg', 'Design & print');
  const accWebImg = await img('img_6.jpeg', 'Web design & management');

  const link = (label: string, url: string, style = 'primary') => ({ label, type: 'external', url, style });

  const layout: any[] = [
    {
      blockType: 'hero',
      layout: 'left',
      eyebrow: 'About Wavecare',
      title: 'Your facility gets judged in seconds.\n*We make them count.*',
      subtitle:
        "For over a decade we've helped hundreds of nursing homes and healthcare operators get seen the way they deserve to be seen. This is why we built Wavecare.",
      buttons: [
        { link: link('Book a Demo', '/contact#calendar') },
        { link: link('Our Story', '#story', 'ghost') },
      ],
      minHeight: 'full',
      scrollCue: true,
      appearance: { background: 'image', backgroundImage: heroImg, paddingTop: 'none', paddingBottom: 'none', width: 'default' },
    },
    {
      blockType: 'storyBlock',
      eyebrow: 'Why We Exist',
      title: 'Ten years. Hundreds of facilities. One problem.',
      paragraphs: [
        { text: "Over the past ten years, we've worked with hundreds of nursing homes and healthcare operators across the country. And honestly, most of them had the same problem, they weren't being seen the way they deserved to be seen." },
        { text: 'From a broken website to a video from the 90s, we\'ve seen it all. Nothing says "we\'ll take great care of your loved one" like an online experience that feels clear, trustworthy, and easy from start to finish.' },
        { text: 'So we built Wavecare, to showcase quality of care in the light it deserves.' },
      ],
      button: { link: link('What We Do', '#services') },
      image: storyImg,
      appearance: {
        background: 'ink',
        paddingTop: 'default',
        paddingBottom: 'default',
        width: 'default',
        anchorId: 'story',
        glow: { enabled: true, color: 'primary', size: 520, opacity: 100, position: 'top-left' },
      },
    },
    {
      blockType: 'insightQuote',
      eyebrow: 'The Stakes',
      statement:
        'Families are making one of the biggest decisions of their lives, and your facility gets judged in seconds. We make those seconds count.',
      footer:
        "When families come across your community, it's about trust. It's about confidence. It's about that moment where they say: yeah, this feels right.",
      appearance: {
        background: 'deep',
        paddingTop: 'default',
        paddingBottom: 'default',
        width: 'default',
        glow: { enabled: true, color: 'accent', size: 560, opacity: 30, position: 'bottom-right' },
      },
    },
    {
      blockType: 'valuesGrid',
      eyebrow: 'What We Optimize For',
      title: 'Trust. Confidence.\nThat "this feels right" moment.',
      values: [
        { number: '01', title: 'Trust', body: 'Every visual, page, and frame is built to make a family feel safe handing you one of the biggest decisions of their lives.' },
        { number: '02', title: 'Confidence', body: 'We showcase your quality of care in the light it deserves, branding, video, and high-converting websites that hold up to scrutiny.' },
        { number: '03', title: 'The Right Fit', body: 'We optimize the entire journey to get more suitable residents through your doors, not just clicks, but the right families saying yes.' },
      ],
      appearance: { background: 'ink', paddingTop: 'default', paddingBottom: 'default', width: 'default' },
    },
    {
      blockType: 'stats',
      heading: { eyebrow: 'A Decade of Results', title: 'The numbers behind the work.', align: 'center' },
      stats: [
        { value: '10', countTo: 10, label: 'Years Experience' },
        { value: '500+', countTo: 500, suffix: '+', label: 'Facilities Served' },
        { value: '700', countTo: 700, label: 'Assisted Placements' },
        { value: '2,400', countTo: 2400, comma: true, label: 'Smiles Captured' },
      ],
      appearance: {
        background: 'deep',
        paddingTop: 'default',
        paddingBottom: 'default',
        width: 'default',
        glow: { enabled: true, color: 'primary', size: 600, opacity: 30, position: 'center' },
      },
    },
    {
      blockType: 'accordionShowcase',
      eyebrow: 'What We Do',
      title: 'Everything your brand needs.',
      hint: 'Hover or tap a panel to explore',
      panels: [
        {
          image: accPhotoImg,
          title: 'Brand & Photoshoots',
          tag: 'Build instant trust with a clean, modern healthcare look.',
          detail: [{ text: 'Facility & lifestyle' }, { text: 'Staff portraits' }, { text: 'HIPAA-conscious' }],
          link: { link: link('Learn More', '/photoservices') },
        },
        {
          image: accVideoImg,
          title: 'Video Production',
          tag: 'Short-form & explainer videos that turn views into booked calls.',
          detail: [{ text: 'Commercials' }, { text: 'Facility tours' }, { text: 'Social cuts' }],
          link: { link: link('Learn More', '/videoservices') },
        },
        {
          image: accPrintImg,
          title: 'Design & Print',
          tag: 'Patient-ready brochures, banners, menus, and signage.',
          detail: [{ text: 'Brochures' }, { text: 'Signage' }, { text: 'Stationery' }],
          link: { link: link('Learn More', '/design-print') },
        },
        {
          image: accWebImg,
          title: 'Web Design & Management',
          tag: 'Fast, conversion-first websites that generate inquiries daily.',
          detail: [{ text: 'Mobile-first' }, { text: 'SEO + GBP' }, { text: '~2-week launch' }],
          link: { link: link('Learn More', '/webdesign') },
        },
      ],
      appearance: { background: 'ink', paddingTop: 'default', paddingBottom: 'default', width: 'default', anchorId: 'services' },
    },
    {
      blockType: 'videoReel',
      eyebrow: 'See For Yourself',
      title: 'Our story, in our own words.',
      vimeoId: '1187767005',
      appearance: { background: 'deep', paddingTop: 'default', paddingBottom: 'default', width: 'default' },
    },
    {
      blockType: 'simpleQuoteGrid',
      eyebrow: 'What Our Clients Say',
      title: "Don't just take\nour word for it.",
      lead: "See how we've helped healthcare providers grow, in their own words.",
      quotes: [
        {
          quote: 'From the first call, their team understood our facility, our audience, and the sensitivity required in healthcare. The visuals, website updates, and overall branding helped us look more professional and trustworthy. We started receiving better-quality inquiries within weeks.',
          role: 'Director',
          organisation: 'Senior Care Facility',
        },
        {
          quote: 'What stood out most was their attention to detail and communication. They handled everything from creative direction to execution smoothly. The final results exceeded our expectations, especially the photos and website presentation.',
          role: 'Marketing Manager',
          organisation: 'Healthcare Practice',
        },
        {
          quote: 'Wavecare feels more like a partner than a vendor. They took time to understand our goals and delivered solutions that actually made an impact. Their experience in healthcare marketing really shows.',
          role: 'Operations Lead',
          organisation: 'Medical Services Provider',
        },
      ],
      appearance: {
        background: 'ink',
        paddingTop: 'default',
        paddingBottom: 'default',
        width: 'default',
        glow: { enabled: true, color: 'accent', size: 500, opacity: 22, position: 'top-right' },
      },
    },
    {
      blockType: 'finalCta',
      eyebrow: 'Get Started',
      title: "Let's make your\nseconds *count.*",
      subtitle:
        "Tell us about your facility and we'll show you exactly what we'd build, capture, or design to start bringing the right families through your doors.",
      waveAnimation: true,
      buttons: [{ link: link('Book a Demo', '/contact#calendar', 'light') }],
      appearance: { background: 'deep', width: 'default' },
    },
  ];

  const data: any = {
    title: 'About',
    slug: 'about',
    layout,
    changeFrequency: 'monthly',
    priority: 0.8,
    _status: 'published',
    meta: {
      title: 'About Wavecare — Healthcare Marketing Agency',
      description:
        'For over a decade Wavecare has helped hundreds of nursing homes and healthcare operators get seen the way they deserve to be seen.',
    },
  };

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, overrideAccess: true });
  } else {
    await payload.create({ collection: 'pages', data, overrideAccess: true });
  }

  payload.logger.info('→ /about ready.');
}
