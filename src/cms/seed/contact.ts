import type { Payload } from 'payload';
import { ensureMedia } from './media';

/**
 * /contact — migrated verbatim.
 *
 * The form's submit path stays in code (posts to /api/contact -> GoHighLevel).
 * Only its wording is seeded here, so an editor cannot break lead capture.
 */
const svg = (d: string, size = 16) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

export async function seedContact(payload: Payload): Promise<void> {
  payload.logger.info('→ Seeding /contact…');

  const heroImage = await ensureMedia(
    payload,
    'images/img_3.jpeg',
    'Care team member with a resident',
  );

  const layout: any[] = [
    {
      blockType: 'contactHero',
      backgroundImage: heroImage,
      eyebrow: 'GET IN TOUCH',
      title: "Let's make your\n*seconds count.*",
      subtitle:
        "Tell us about your facility and we'll show you exactly what we'd build, capture, or design to bring the right families through your doors.",
      trustItems: [
        {
          icon: svg('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),
          title: 'Reply within one business day',
          body: 'Real humans, 8 AM – 8 PM daily. No bots, no runaround.',
        },
        {
          icon: svg(
            '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
          ),
          title: 'HIPAA-conscious from day one',
          body: 'Privacy and resident dignity built into everything we produce.',
        },
        {
          icon: svg('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
          title: 'Most projects launch in ~2 weeks',
          body: 'From the first call to live, without the drawn-out timeline.',
        },
      ],
      directLinks: [
        { icon: '✉', label: 'info@wavecare.io', href: 'mailto:info@wavecare.io' },
        { icon: '☎', label: '+1 732 930 1934', href: 'tel:+17329301934' },
      ],
      form: {
        heading: 'Send us a message',
        subheading: 'Prefer to talk?',
        subheadingLinkLabel: 'Book a demo instead →',
        subheadingLinkHref: '#calendar',
        nameLabel: 'Name',
        namePlaceholder: 'John Doe',
        emailLabel: 'Email',
        emailPlaceholder: 'john@example.com',
        companyLabel: 'Facility / Company',
        companyPlaceholder: 'Oakwood Senior Living',
        chipsLabel: 'What do you need help with?',
        chips: [
          { text: 'Brand & Photos' },
          { text: 'Video' },
          { text: 'Design & Print' },
          { text: 'Web Design' },
          { text: 'Not sure yet' },
        ],
        messageLabel: 'Tell us about your facility (Optional)',
        messagePlaceholder: "A sentence or two about what you're working on...",
        submitLabel: 'Send Message',
        retryLabel: 'Try Again',
        note: 'Your information is secure and will never be shared.',
        successTitle: 'Message Sent!',
        successBody: 'Thanks for reaching out. We will get back to you within one business day.',
      },
    },
    {
      blockType: 'steps',
      heading: {
        eyebrow: 'WHAT HAPPENS NEXT',
        title: "From hello to live, here's the path.",
        align: 'center',
      },
      headingIcon:
        '<svg width="24" height="6" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3C3 1 5 1 7 3C9 5 11 5 13 3C15 1 17 1 19 3C21 5 23 5 23 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      steps: [
        {
          number: '01',
          title: 'We listen & audit',
          body: "We learn about your facility, your audience, and review your current online presence, what's working and what's costing you tours.",
        },
        {
          number: '02',
          title: 'We map the plan',
          body: "You get a clear, no-filler plan for exactly what we'd build, capture, or design, with honest timelines and scope.",
        },
        {
          number: '03',
          title: 'We make it count',
          body: 'We produce the work and optimize the journey, so the right families come across your community and say "yeah, this feels right."',
        },
      ],
      appearance: {
        background: 'ink',
        paddingTop: 'default',
        paddingBottom: 'default',
        width: 'default',
      },
    },
    {
      blockType: 'calendarEmbed',
      heading: {
        title: 'Rather Just Grab a Time?',
        subtitle:
          "Book a demo that fits your schedule. Pick a slot and we'll come prepared with ideas specific to your facility.",
        align: 'center',
      },
      widgetId: 'BihxiP7RLvybBcV9yUHJ',
      minHeight: 600,
      appearance: {
        background: 'deep',
        paddingTop: 'default',
        paddingBottom: 'default',
        width: 'default',
        anchorId: 'calendar',
      },
    },
  ];

  const data: any = {
    title: 'Contact',
    slug: 'contact',
    layout,
    changeFrequency: 'yearly',
    priority: 0.8,
    _status: 'published',
    meta: {
      title: 'Contact Wavecare — Free Senior Care Marketing Audit',
      description:
        'Tell us about your facility and we will show you exactly what we would build, capture or design. Reply within one business day, HIPAA-conscious from day one.',
    },
  };

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact' } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, overrideAccess: true });
  } else {
    await payload.create({ collection: 'pages', data, overrideAccess: true });
  }

  payload.logger.info('→ /contact ready.');
}
