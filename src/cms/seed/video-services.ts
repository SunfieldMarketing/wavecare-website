import type { Payload } from 'payload';
import { ensureMedia } from './media';

/** /videoservices — migrated verbatim. Uses subservices.css. */
export async function seedVideoServices(payload: Payload): Promise<void> {
  payload.logger.info('→ Seeding /videoservices…');

  const img = (file: string, alt: string) => ensureMedia(payload, `images/${file}`, alt);

  const wallImgs = await Promise.all([
    img('gallery/Caregiver with elderly man playing game.jpeg', 'Behind the scenes video production'),
    img('gallery/Employees smiling.jpeg', 'Healthcare video production'),
    img('gallery/Caregiver with elderly women.jpeg', 'Senior care video production'),
    img('gallery/Two women with notepads smiling.jpg', 'Medical video production'),
  ]);

  const procImgs = await Promise.all([
    img('vid_proc_1.png', 'Strategy and Scripting'),
    img('vid_proc_2.png', 'Pre-Production'),
    img('vid_proc_3.png', 'Production Day'),
    img('vid_proc_4.png', 'Post and Delivery'),
  ]);

  const icon = (d: string) =>
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${d}</svg>`;

  const link = (label: string, url: string, style = 'primary') => ({ label, type: 'external', url, style });

  const layout: any[] = [
    {
      blockType: 'printHero',
      title: 'Healthcare *Video Production*',
      subtitle:
        'Strategic healthcare video that highlights your team, facility, services, and resident experience, built to earn trust before families ever walk through your doors.',
      subtitleStyle: 'phero-sub',
      checklist: [
        { text: 'Full Production' },
        { text: 'Scripting & Creative' },
        { text: 'Multi-Format Delivery' },
      ],
      buttons: [{ link: link('Book a Demo', '/contact#calendar') }],
      images: wallImgs.filter(Boolean).map((id) => ({ image: id })),
    },
    {
      blockType: 'socialProofBanner',
      text: 'Senior Care & Skilled Nursing  •  Assisted Living  •  Rehabilitation Centers  •  Memory Care  •  Medical Practices',
      background: '#062A24',
      fontWeight: '400',
    },
    {
      blockType: 'commercialPlayer',
      eyebrow: 'OUR COMMERCIAL',
      title: 'The work, _in motion._',
      vimeoId: '1187767005',
    },
    {
      blockType: 'stats',
      stats: [
        { value: '80%', countTo: 80, suffix: '%', label: 'of families watch a video before touring' },
        { value: '3x', countTo: 3, suffix: 'x', label: 'higher conversion on pages with video' },
        { value: '2.5x', countTo: 2, suffix: '.5x', label: 'more engagement on social media' },
      ],
      appearance: { background: 'custom', customBackground: '#062A24', paddingTop: 'sm', paddingBottom: 'lg', width: 'default' },
    },
    {
      blockType: 'twoColumnText',
      tone: 'light',
      eyebrow: 'WHY VIDEO MATTERS',
      title: 'Families decide\n*before* they ever\nvisit.',
      body: [
        {
          text: "Most families have already formed an opinion before they pick up the phone. Professional video lets them experience your environment, meet your team, and feel the level of care you provide, in the same seconds they'd otherwise spend scrolling past you.",
        },
        { text: "Done right, video doesn't just market the facility. It pre-qualifies the inquiry." },
      ],
    },
    {
      blockType: 'process',
      heading: {
        eyebrow: 'Production Process',
        title: 'We manage the *entire production.*',
        subtitle: 'From the first script to the final delivery, we handle every detail so your team can stay focused on care.',
        align: 'left',
      },
      layout: 'screen',
      steps: [
        { label: '01', title: 'Strategy & Scripting', body: 'We align on goals, identify key messaging, and develop scripts and storyboards that speak directly to families.', image: procImgs[0] },
        { label: '02', title: 'Pre-Production', body: 'Location scouting, scheduling, talent coordination, and detailed call sheets. Everything is planned.', image: procImgs[1] },
        { label: '03', title: 'Production Day', body: 'Our experienced crew arrives ready. We direct the talent, manage the schedule, and capture cinematic footage.', image: procImgs[2] },
        { label: '04', title: 'Post & Delivery', body: 'Editing, color grading, sound design, and delivery of final assets formatted for every platform.', image: procImgs[3] },
      ],
      appearance: { background: 'ink', paddingTop: 'default', paddingBottom: 'default', width: 'default' },
    },
    {
      blockType: 'iconFeatureGrid',
      eyebrow: 'WHAT WE PRODUCE',
      title: 'Four kinds of video, _one standard._',
      subtitle: "Every project is shot, edited, and delivered to the same standard whether it's a 90-second hero film or a 15-second cut for Instagram.",
      cards: [
        { icon: icon('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>'), title: 'Facility Films', body: 'Hero videos for homepages, virtual tours, and admissions packets are the front families watch before booking a visit.' },
        { icon: icon('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>'), title: 'Family-Facing Stories', body: 'Resident videos, resident testimonials, and care journeys that turn the abstract into the personal.' },
        { icon: icon('<rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline>'), title: 'Recruitment Films', body: 'Culture and career videos that help you win the staffing battle by showing what it is really like to work with you.' },
        { icon: icon('<rect x="7" y="2" width="10" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>'), title: 'Social-First Cuts', body: 'Short, vertical, sound-off-friendly edits built for the feed, not repurposed as an afterthought.' },
      ],
    },
    {
      blockType: 'videoGrid',
      heading: {
        eyebrow: 'Types of Videos',
        title: 'What we _produce._',
        subtitle: 'Every video is purpose-built for the place it will actually be seen, the website, the tour, the inbox, the feed.',
        align: 'center',
      },
      enableFilters: true,
      filters: [
        { label: 'Family & Facility', key: 'family' },
        { label: 'Recruitment', key: 'recruit' },
        { label: 'Testimonials', key: 'testimonial' },
        { label: 'Social Media', key: 'social' },
      ],
      videos: [
        { title: 'Waterview Nursing & Rehab', description: 'Discover our newly redesigned Flushing facility featuring panoramic Manhattan skyline views and state-of-the-art care.', vimeoId: '1183669641', category: 'Virtual Tour', filterKey: 'family' },
        { title: 'Park Gardens', description: 'Explore our beautifully renovated Bronx facility offering private, semi-private, and suite accommodations in Riverdale.', vimeoId: '1183056612', category: 'Virtual Tour', filterKey: 'family' },
        { title: 'Link Homecare', description: 'A personal story of family-provided in-home care, highlighting the comfort of having a loved one as a certified home attendant.', vimeoId: '906115435', category: 'Commercial', filterKey: 'social' },
        { title: 'River Ridge Living Center', description: 'Take a tranquil virtual tour of our Amsterdam facility, nestled on beautifully manicured private grounds with cozy room options.', vimeoId: '930394765', category: 'Virtual Tour', filterKey: 'family' },
        { title: 'The Pines at Bristol', description: 'Experience our commitment to compassion and excellence with 24/7 professional care and comfortable private recovery rooms.', vimeoId: '856155374', category: 'Virtual Tour', filterKey: 'family' },
        { title: 'New York Congregational', description: 'A guided walkthrough of our Brooklyn center, highlighting cozy amenities, private rooms, and a welcoming environment in Flatbush.', vimeoId: '856155997', category: 'Virtual Tour', filterKey: 'family' },
        { title: 'Cascades Assisted Living', description: 'Tour our quaint, country-style assisted living community in Bethel, featuring 42 comfortable studio and apartment residences.', vimeoId: '856154806', category: 'Virtual Tour', filterKey: 'family' },
        { title: 'Complete Care Green Acres', description: 'An inside look at our 5-star rated skilled nursing facility in Toms River, NJ, featuring 162 beds and 33 private suites.', vimeoId: '856153642', category: 'Virtual Tour', filterKey: 'family' },
      ],
    },
    {
      blockType: 'featuredVideoWork',
      heading: {
        eyebrow: 'Featured Work',
        title: 'Recent *healthcare* films.',
      },
      hero: {
        vimeoId: '906115435',
        posterUrl: 'https://i.vimeocdn.com/video/1787724682-99c5f028f168e64a7c91d011cf8d19a16d4453e95b0911be06e755c443218d36-d_1280',
        tag: 'Commercial',
        title: 'Link Homecare - Zsanet & Terry',
      },
      side: [
        {
          vimeoId: '1183056612',
          posterUrl: 'https://i.vimeocdn.com/video/2145807255-3028a1cb240082c2500af287b5f93ca2c503d1d0c131602574bc88e4976ed1f5-d_1280',
          tag: 'Virtual Tour',
          title: 'Park Gardens Tour',
        },
        {
          vimeoId: '930394765',
          posterUrl: 'https://i.vimeocdn.com/video/1827081869-f1d75fd0450accdafec4e7b7c8368040ea48a3450daf1cd9b6f636ef56ec7e39-d_1280',
          tag: 'Virtual Tour',
          title: 'River Ridge Tour',
        },
      ],
    },
    {
      blockType: 'cardGrid',
      style: 'plain',
      columns: '4',
      heading: {
        eyebrow: "What You'll Receive",
        title: 'Finished, formatted, _ready to use._',
        subtitle: 'Every project ships with the cuts and formats you actually need with nothing left for you to figure out in post.',
        align: 'left',
      },
      cards: [
        { icon: '▮', title: 'Master 16:9 Cuts', body: 'Web, YouTube, presentations.' },
        { icon: '▯', title: 'Vertical Social Cuts', body: '9:16 for Reels, TikTok, Stories.' },
        { icon: 'cc', title: 'Captioned Versions', body: 'Burned-in and SRT for accessibility.' },
        { icon: '↻', title: 'Raw Footage Archive', body: 'Organized and delivered for future use.' },
      ],
      appearance: { background: 'ink', paddingTop: 'default', paddingBottom: 'default', width: 'default' },
    },
    {
      blockType: 'finalCta',
      eyebrow: 'Your facility, seen the right way',
      title: 'Let families see the\n*care* behind your facility.',
      subtitle:
        'From planning and scripting to filming and final delivery, we manage the entire production process to create polished videos that build trust and support admissions growth.',
      waveAnimation: true,
      buttons: [{ link: link('Book a Demo', '/contact#calendar', 'light') }],
      appearance: { background: 'deep', width: 'default' },
    },
  ];

  const data: any = {
    title: 'Video Production',
    slug: 'videoservices',
    layout,
    changeFrequency: 'monthly',
    priority: 0.7,
    _status: 'published',
    meta: {
      title: 'Healthcare Video Production Services | Wavecare',
      description:
        'Strategic healthcare video production — facility films, virtual tours, testimonials, and social-first cuts that earn trust before families ever visit.',
    },
  };

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'videoservices' } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, overrideAccess: true });
  } else {
    await payload.create({ collection: 'pages', data, overrideAccess: true });
  }

  payload.logger.info('→ /videoservices ready.');
}
