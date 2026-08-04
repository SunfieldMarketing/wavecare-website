import type { Payload } from 'payload';
import { ensureMedia } from './media';

/**
 * /webdesign — migrated verbatim, with one deliberate exception: the
 * "Featured Website Showcase" section was `style={{ display: 'none' }}` in
 * the original and its content was unfinished placeholder text
 * ("[REPLACE Facility name]", "[REPLACE - project URL]"). It is invisible on
 * the live site today, so this migration omits it rather than publish
 * placeholder copy. Add a caseStudyCards or videoGrid block here if a real
 * showcase is wanted later.
 */
export async function seedWebDesign(payload: Payload): Promise<void> {
  payload.logger.info('→ Seeding /webdesign…');

  const beforeImg = await ensureMedia(payload, 'images/evolve-before.png', 'Evolve Therapy Services, before website');
  const afterImg = await ensureMedia(payload, 'images/evolve-after.png', 'Evolve Therapy Services, after website');

  const icon = (d: string) =>
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

  const link = (label: string, url: string, style = 'primary') => ({ label, type: 'external', url, style });

  const layout: any[] = [
    {
      blockType: 'webDesignHero',
      title: 'Websites that earn trust and drive *admissions.*',
      subtitle:
        'Modern healthcare websites designed specifically for nursing homes, assisted living communities, rehabilitation centers, and healthcare organizations.',
      buttons: [
        { link: link('Get a Website Audit →', '/contact') },
        { link: link('View Website Examples →', '/case-studies') },
      ],
      respTag: 'Responsive',
    },
    {
      blockType: 'noticeBar',
      text: 'Trusted by healthcare providers improving their online presence, increasing inquiries, and modernizing their brand experience.',
      appearance: {
        background: 'custom',
        customBackground: '#051A16',
        paddingTop: 'none',
        paddingBottom: 'none',
      },
    },
    {
      blockType: 'revealBeforeAfter',
      eyebrow: 'Why Your Website Matters',
      title: 'Families decide in\n_seconds._',
      lead: 'An outdated website creates uncertainty. A professional one builds confidence before the first phone call because it should build trust immediately, communicate services clearly, showcase your team, improve search visibility, and generate more inquiries.',
      beforeImage: beforeImg,
      afterImage: afterImg,
      caption: 'Drag. Left is a typical dated healthcare site, right is a modern Wavecare build.',
      appearance: { background: 'custom', customBackground: 'transparent', paddingTop: 'default', paddingBottom: 'default', width: 'default' },
    },
    {
      blockType: 'capabilitiesGrid',
      eyebrow: 'Capabilities',
      title: 'Everything your site needs, _handled._',
      cards: [
        { visual: 'design', title: 'Website Design', body: 'Custom healthcare-focused design built around your brand and goals.' },
        { visual: 'dev', title: 'Website Development', body: 'Fast, responsive websites optimized for desktop, tablet, and mobile.' },
        { visual: 'manage', title: 'Website Management', body: 'Ongoing updates, content changes, maintenance, and support.' },
        { visual: 'seo', title: 'SEO Foundations', body: 'Technical setup and optimization to help improve search visibility.' },
        { visual: 'content', title: 'Content Strategy', body: 'Clear messaging that helps families quickly find what they need.' },
        { visual: 'hosting', title: 'Hosting & Performance', body: 'Reliable hosting and monitoring to keep your site running smoothly.' },
      ],
      appearance: { background: 'deep', paddingTop: 'default', paddingBottom: 'default', width: 'wide' },
    },
    {
      blockType: 'simpleIconGrid',
      eyebrow: 'WHAT MAKES A GREAT HEALTHCARE WEBSITE',
      title: 'Five things we never _skip._',
      cards: [
        { icon: icon('<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>'), title: 'Easy Navigation', body: 'Families can quickly find important information.' },
        { icon: icon('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>'), title: 'Thoughtful Design', body: 'Creates confidence and credibility.' },
        { icon: icon('<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>'), title: 'Mobile Friendly', body: 'Works seamlessly across all devices.' },
        { icon: icon('<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>'), title: 'Clear Calls-to-Action', body: 'Encourages visitors to contact your team.' },
        { icon: icon('<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>'), title: 'Search Optimized', body: 'Helps residents and families find you online.' },
      ],
      appearance: { background: 'transparent', paddingTop: 'default', paddingBottom: 'default', width: 'default' },
    },
    {
      blockType: 'stats',
      compact: true,
      stats: [
        { value: '3.5x', countTo: 3, suffix: '.5x', label: 'more organic traffic after a professional rebuild' },
        { value: '72%', countTo: 72, suffix: '%', label: 'of tours start from a mobile device' },
        { value: '<2s', countTo: 2, prefix: '<', suffix: 's', label: 'load time optimization across the board' },
      ],
      appearance: { background: 'transparent', paddingTop: 'none', paddingBottom: 'default', width: 'default' },
    },
    {
      blockType: 'process',
      heading: {
        eyebrow: 'Our Process',
        title: 'From audit to *always-on.*',
        subtitle: "We don't just hand you a website and disappear. We manage the entire lifecycle.",
        align: 'left',
      },
      layout: 'browser',
      browserUrl: 'yourfacility.org',
      steps: [
        { label: '01', title: 'Audit', body: 'We review your current website, identify opportunities and problems, and create a strategic plan.' },
        { label: '02', title: 'Design', body: 'We create a modern website experience tailored to your facility and audience.' },
        { label: '03', title: 'Build', body: 'Our team develops and launches your website with performance and usability in mind.' },
        { label: '04', title: 'Manage', body: 'We provide ongoing support, updates, and improvements after launch so it keeps performing.' },
      ],
      appearance: { background: 'ink', paddingTop: 'default', paddingBottom: 'default', width: 'default' },
    },
    {
      blockType: 'finalCta',
      eyebrow: 'Are you losing tours online?',
      title: 'See how your website really *performs.*',
      subtitle:
        "Let's look at your current site. We'll show you where you're losing traffic, how families perceive your brand online, and exactly how we'd fix it.",
      waveAnimation: true,
      buttons: [{ link: link('Get Your Free Website Audit', '/contact', 'light') }],
      appearance: { background: 'deep', width: 'default' },
    },
  ];

  const data: any = {
    title: 'Web Design',
    slug: 'webdesign',
    layout,
    changeFrequency: 'monthly',
    priority: 0.8,
    _status: 'published',
    meta: {
      title: 'Healthcare Website Design & Development | Wavecare',
      description:
        'Modern, conversion-first websites for nursing homes, assisted living communities, and healthcare organizations. Audit, design, build, and ongoing management.',
    },
  };

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'webdesign' } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, overrideAccess: true });
  } else {
    await payload.create({ collection: 'pages', data, overrideAccess: true });
  }

  payload.logger.info('→ /webdesign ready.');
}
