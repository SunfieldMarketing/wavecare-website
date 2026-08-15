import type { Payload } from 'payload';
import { ensureMedia } from './media';

/**
 * Homepage — migrated verbatim, with one deliberate exception: the splash
 * preloader (`#preloader`/`#plbar`/`#plnum`, a full-screen logo + progress bar
 * shown before the page reveals) is omitted. It embedded the site logo as a
 * ~40KB base64 data URI directly in the component, and none of the other 5
 * hand-written pages had an equivalent — the shared layout's own preloader
 * element was already removed earlier in this migration (see the
 * GlobalScripts.tsx dead-code fix). Keeping the homepage consistent with
 * every other CMS-managed page rather than reintroducing a one-off splash
 * screen and a large embedded image into a CMS field.
 */
export async function seedHome(payload: Payload): Promise<void> {
  payload.logger.info('→ Seeding / (homepage)…');

  const img = (file: string, alt: string) => ensureMedia(payload, `images/${file}`, alt);

  const heroImg = await img('img_3.jpeg', 'Caregiver with resident at a senior care facility');

  const svcPhotoImg = await img('brand_photoshoots.jpg', 'Brand & photoshoots');
  const svcVideoImg = await img('video_production.jpg', 'Video production');
  const svcPrintImg = await img('design_print_2.jpg', 'Design & print');
  const svcWebImg = await img('img_6.jpeg', 'Web design & management');

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
    const id = await img(`logos/${file}`, `${name} logo`);
    if (id) logos.push({ image: id, name, scaleUp: scaleUp ?? false });
  }

  const link = (label: string, url: string, style = 'primary') => ({ label, type: 'external', url, style });

  const layout: any[] = [
    {
      blockType: 'hero',
      layout: 'left',
      eyebrow: 'Healthcare Marketing Agency',
      title: 'Built for senior living *and skilled nursing.*',
      subtitle:
        'Websites, photography, and video tours for senior living, assisted living, memory care, skilled nursing, independent living, hospice, and home health communities across the U.S. We work with operators of every size and plug in alongside your existing marketing team.',
      buttons: [
        { link: link('Book a Demo', '/contact#calendar') },
        { link: link('See What We Do', '#services', 'ghost') },
      ],
      minHeight: 'full',
      scrollCue: true,
      appearance: { background: 'image', backgroundImage: heroImg, paddingTop: 'none', paddingBottom: 'none', width: 'default' },
    },
    {
      blockType: 'showreelBlock',
      eyebrow: 'Who We Are',
      title: 'Marketing that earns trust before the first tour.',
      paragraphs: [
        { text: 'A youthful, yet experienced healthcare marketing agency with bespoke solutions and tailored strategies. Built around the sensitivity, compliance, and speed that senior care actually requires.' },
        { text: 'See the work for yourself.' },
      ],
      button: { link: link('Book a Demo', '/contact#calendar') },
      vimeoId: '1187767005',
      appearance: { background: 'ink', paddingTop: 'default', paddingBottom: 'default', width: 'default' },
    },
    {
      blockType: 'serviceCarousel',
      eyebrow: 'What We Do',
      title: 'Everything your brand needs.',
      hint: 'Drag, scroll, or use the arrows, tap a card for details',
      cards: [
        {
          number: '01',
          image: svcPhotoImg,
          imageFit: 'cover',
          title: 'Brand & Photoshoots',
          tag: 'Build instant trust with a clean, modern healthcare look.',
          detail: [
            { text: 'Facility interiors, exteriors & amenities' },
            { text: 'Staff portraits & resident lifestyle' },
            { text: 'HIPAA-conscious shoot workflows' },
            { text: 'Edited library for every channel' },
          ],
          link: { link: link('Learn More', '/photoservices') },
        },
        {
          number: '02',
          image: svcVideoImg,
          imageFit: 'cover',
          title: 'Video Production',
          tag: 'Short-form & explainer videos that turn views into booked calls.',
          detail: [
            { text: 'Commercials & facility tour films' },
            { text: 'Testimonial & brand videos' },
            { text: 'Social-ready cuts, every ratio' },
            { text: 'Vimeo-hosted, ad-free playback' },
          ],
          link: { link: link('Learn More', '/videoservices') },
        },
        {
          number: '03',
          image: svcPrintImg,
          imageFit: 'contain',
          title: 'Design & Print',
          tag: 'Patient-ready brochures, banners, menus, and signage.',
          detail: [
            { text: 'Brochures, flyers & welcome packets' },
            { text: 'Interior signage & banners' },
            { text: 'Menus & event collateral' },
            { text: 'Business cards & stationery' },
          ],
          link: { link: link('Learn More', '/design-print') },
        },
        {
          number: '04',
          image: svcWebImg,
          imageFit: 'cover',
          title: 'Web Design & Management',
          tag: 'Fast, conversion-first websites that generate inquiries daily.',
          detail: [
            { text: 'Mobile-first, accessible builds' },
            { text: 'SEO + Google Business optimization' },
            { text: 'Most projects launch in ~2 weeks' },
            { text: 'Ongoing management & updates' },
          ],
          link: { link: link('Learn More', '/webdesign') },
        },
      ],
      appearance: { background: 'deep', paddingTop: 'default', paddingBottom: 'default', width: 'default', anchorId: 'services' },
    },
    {
      blockType: 'logoStrip',
      variant: 'home',
      tone: 'light',
      eyebrow: 'Trusted by Clients Across the Country',
      title: 'Join the leaders working with us.',
      logos,
    },
    {
      blockType: 'stats',
      heading: { eyebrow: 'Wavecare in Numbers', title: 'Results that speak for themselves.', align: 'center' },
      stats: [
        { value: '95', countTo: 95, label: 'Happy Clients' },
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
      blockType: 'numberedFeatureGrid',
      eyebrow: 'Why Wavecare',
      title: 'Built for the way\nhealthcare actually works.',
      leads: [
        { text: "Sensitivity, compliance, and decision-makers who don't have time for back-and-forth. We built our workflows around the realities of senior care." },
        { text: 'Already have a marketing team? Perfect. We support the team you already trust, we do not replace it.' },
      ],
      features: [
        { number: '01', title: 'HIPAA-Conscious by Default', body: 'Every photoshoot, video, and webpage is planned with privacy and resident dignity at the front. No second-guessing what you can publish.' },
        { number: '02', title: 'Fast Response, Real Humans', body: 'Customer service from 8 AM to 8 PM daily. Most projects launch in about two weeks. No drawn-out timelines.' },
        { number: '03', title: 'Built for Decision-Makers', body: 'Executive director, marketing manager, or owner: we communicate the way healthcare leaders work. Clear scopes, zero filler.' },
      ],
      appearance: { background: 'ink', paddingTop: 'default', paddingBottom: 'default', width: 'default' },
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
        background: 'deep',
        paddingTop: 'default',
        paddingBottom: 'default',
        width: 'default',
        glow: { enabled: true, color: 'accent', size: 500, opacity: 28, position: 'top-right' },
      },
    },
    {
      blockType: 'finalCta',
      eyebrow: 'Get Started',
      title: 'Ready to look as good as\nthe *care* you provide?',
      subtitle:
        "Tell us about your facility and we'll show you exactly what we'd build, capture, or design to start bringing in more qualified inquiries.",
      waveAnimation: true,
      buttons: [{ link: link('Book a Demo', '/contact#calendar', 'light') }],
      appearance: { background: 'deep', width: 'default' },
    },
  ];

  const data: any = {
    title: 'Home',
    slug: 'home',
    layout,
    changeFrequency: 'weekly',
    priority: 1,
    _status: 'published',
    meta: {
      title: 'Marketing for Senior Living & Skilled Nursing | Wavecare',
      description:
        'Websites, photography, video tours, and branding for senior living, assisted living, and skilled nursing providers nationwide. Book a free audit.',
    },
  };

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, overrideAccess: true });
  } else {
    await payload.create({ collection: 'pages', data, overrideAccess: true });
  }

  payload.logger.info('→ / (homepage) ready.');
}
