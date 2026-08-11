import type { Payload } from 'payload';

/**
 * /digital-marketing — Ad Management, SEO & Paid Search page.
 *
 * This page is the landing target for all Wavecare Google Ads campaigns —
 * three ad groups point at this exact URL, so the slug must never change
 * without telling Wavecare's media buyer first.
 *
 * Copy below is a direct port of the original hand-written page (dm.css),
 * now flowing through the dmHero/dmAccordion/dmSplitMockup/dmFeatureRow/
 * dmStatsRow/dmFinalCta block set so it's fully editable in the CMS, with
 * pixel-identical output to the original.
 */
export async function seedDigitalMarketing(payload: Payload): Promise<void> {
  payload.logger.info('→ Seeding /digital-marketing…');

  const link = (label: string, url: string, style = 'primary') => ({
    link: { label, type: 'external', url, style },
  });

  const layout: any[] = [
    {
      blockType: 'dmHero',
      eyebrow: 'Ad Management · SEO · Paid Search',
      title: 'Be Found *First*\nWhen Families\n_Start Searching_',
      subtitle:
        'Families choose a community long before they ever call, and the search bar is where it starts. Wavecare manages your Google Ads, paid search, and SEO with the same healthcare-specific care we bring to everything else, built for senior living, assisted living, skilled nursing, and memory care.',
      buttons: [link('Book a Call', '/contact', 'light'), link('See What We Manage', '#what-we-do', 'ghost')],
    },
    {
      blockType: 'dmAccordion',
      anchorId: 'what-we-do',
      eyebrow: 'What We Do',
      title: 'Multiple ways to be found.\nOne team manages it all.',
      lead:
        'Ad management, SEO, paid search, and social media work best when they run as one plan. Wavecare builds and manages them together, tuned to the way families actually search for senior care, so you always know which campaign, keyword, or post produced the inquiry.',
      items: [
        {
          number: '01',
          title: 'Ad Management',
          openByDefault: true,
          coverType: 'shuffle',
          coverTag: 'Live Optimization',
          heading: 'Your campaigns, managed end to end.',
          body: 'Strategy, budgets, ad copy, creative, and week-by-week optimization. We keep testing, rearranging, and improving what runs, so the strongest message is always the one families see, and we report it all in plain English.',
          pills: [
            { text: 'Strategy + Budgets' },
            { text: 'Ad Copy + Creative' },
            { text: 'Weekly Optimization' },
            { text: 'Plain-English Reporting' },
          ],
        },
        {
          number: '02',
          title: 'Paid Search & SEO',
          coverType: 'typewriter',
          coverTag: 'Search Coverage',
          heading: 'Own the search, paid and organic.',
          body: 'Google Ads reaches families at the exact moment they look for a community like yours, while local SEO, your Google Business Profile, and content keep you ranking long after a campaign ends. We speak the language of senior care, whether a family types it or an operator does.',
          pills: [
            { text: 'Google Ads + Keywords' },
            { text: 'Negative Keywords' },
            { text: 'Local SEO + GBP' },
            { text: 'Content + Rankings' },
          ],
        },
        {
          number: '03',
          title: 'Social Media Marketing',
          coverType: 'calendar',
          coverTag: 'Batch Content',
          heading: 'Shoot one month of content in one day.',
          body: 'An automated batch content system and collector, with tracked analytics, flexible content production, and ongoing strategy and optimization. Have ongoing content needs? Think of us as your in-house content distributor.',
          pills: [
            { text: 'Batch Shoot Days' },
            { text: 'Scheduling + Distribution' },
            { text: 'Tracked Analytics' },
            { text: 'Strategy + Optimization' },
          ],
        },
        {
          number: '04',
          title: 'Proof Before Spend',
          coverType: 'proof',
          coverTag: 'Attribution',
          heading: 'Every dollar accounted for.',
          body: 'Tracking comes first. Every call, form fill, and tour request ties back to the ad or search that produced it. Before we spend a dollar of your budget, we make sure we can prove what it did.',
          pills: [
            { text: 'Call Tracking' },
            { text: 'Form + Tour Attribution' },
            { text: 'Monthly Reporting' },
          ],
        },
      ],
    },
    {
      blockType: 'dmSplitMockup',
      tone: 'deeper',
      wrapSection: true,
      textTone: 'on-dark',
      eyebrow: 'The Difference',
      title: 'Show up when it matters most.',
      body: 'Most agencies run senior living ads the way they would run ads for a gym or a law firm. Wavecare works only in healthcare. We know the difference between a family researching care and a job seeker clicking the wrong ad, and we build every campaign around real senior care searches: assisted living, skilled nursing, memory care, and everything in between.',
      bullets: [
        { text: 'Keywords built from real senior care searches, not templates' },
        { text: 'Negative keywords that filter out job seekers and wasted clicks' },
        { text: 'Ad copy written with the sensitivity healthcare requires' },
        { text: 'Landing pages matched to every ad group, so clicks convert' },
      ],
      buttons: [link('Request a Marketing Review', '/contact')],
      mockup: 'adPreview',
    },
    {
      blockType: 'dmSplitMockup',
      tone: 'dark',
      wrapSection: true,
      flipped: true,
      textTone: 'on-dark',
      eyebrow: 'Why This Works',
      title: 'Your team stays in control. We run the engine.',
      body: 'Plenty of communities already have someone handling marketing, and that is a good thing. Wavecare plugs in as the paid media and search layer alongside them. We manage the campaigns, the keywords, and the rankings while your team keeps ownership of the brand, the budget, and the message. No black boxes and no jargon.',
      bullets: [
        { text: 'Your team approves every budget and every message' },
        { text: 'Campaigns tuned weekly, not set and forgotten' },
        { text: 'Plain-English reporting your leadership can actually read' },
        { text: 'One point of contact who knows senior care' },
      ],
      buttons: [link('Talk With Wavecare', '/contact')],
      mockup: 'performanceBars',
    },
    {
      blockType: 'dmFeatureRow',
      tone: 'deeper',
      eyebrow: 'What Is Included',
      title: 'Four services. One plan. Zero guesswork.',
      lead: 'Start with one service or run them all together. Everything is handled by the same team that already builds websites, photography, video, and print for senior living communities, so your marketing finally speaks with one voice.',
      cards: [
        {
          title: 'Ad Management',
          body: 'Campaign strategy, budget planning, ad creative, copywriting, testing, and ongoing optimization. Weekly attention, monthly reporting, and a clear read on what each inquiry costs.',
        },
        {
          title: 'SEO',
          body: 'Local SEO, Google Business Profile optimization, on-page structure, content, review strategy, and technical cleanup. Built so families searching for senior care in your area find you first.',
        },
        {
          title: 'Paid Search',
          body: 'Google Ads search campaigns aimed at families actively looking for care: keyword research, negative keyword management, ad copy, landing page matching, and bidding that protects your budget.',
        },
        {
          title: 'Social Media Marketing',
          body: 'Batch shoot days, an automated content system and collector, tracked analytics, and flexible production. One day of shooting covers a month of posts, scheduled and distributed for you.',
        },
      ],
    },
    {
      blockType: 'dmStatsRow',
      eyebrow: 'How It Works',
      title: 'Clear steps. Measured spend. No mystery.',
      lead: 'You do not need to become a digital marketing expert. We handle the platforms, the keywords, and the optimization, then hand you reporting that makes sense, so your team can stay focused on families and tours.',
      steps: [
        { number: '01', label: 'We audit your visibility and build the plan' },
        { number: '02', label: 'We launch and manage the campaigns' },
        { number: '03', label: 'Your team gets the inquiries' },
      ],
    },
    {
      blockType: 'dmFinalCta',
      eyebrow: 'Ad Management · SEO · Paid Search',
      title: 'Ready to be the community families find first?',
      subtitle:
        'Tell us where you are and what you are working with. We will look at your current visibility, show you exactly where the opportunities are, and give you a plan in plain English. No pressure and no jargon.',
      buttons: [link('Book a Call', '/contact', 'light')],
    },
  ];

  const data: any = {
    title: 'Ad Management, SEO & Paid Search',
    slug: 'digital-marketing',
    layout,
    changeFrequency: 'monthly',
    priority: 0.9,
    _status: 'published',
    meta: {
      title: 'Ad Management, SEO & Paid Search | Wavecare',
      description:
        'Healthcare-specific ad management, SEO, and paid search for senior living, assisted living, skilled nursing, and memory care communities. Show up first when families search, with reporting that proves what every dollar did.',
    },
  };

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'digital-marketing' } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, overrideAccess: true });
  } else {
    await payload.create({ collection: 'pages', data, overrideAccess: true });
  }

  payload.logger.info('→ /digital-marketing ready.');
}
