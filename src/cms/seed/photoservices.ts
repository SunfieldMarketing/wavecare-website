import path from 'path';
import fs from 'fs';
import type { Payload } from 'payload';

const PUBLIC = path.resolve(process.cwd(), 'public');

/**
 * Uploads a file from /public into the Media library, reusing it if already
 * there. Returns the raw id — SQLite uses integer ids, so it must not be
 * stringified or Payload's upload-relationship validation rejects it.
 */
async function ensureMedia(payload: Payload, relPath: string, alt: string): Promise<number | string | null> {
  const filePath = path.join(PUBLIC, relPath);
  if (!fs.existsSync(filePath)) {
    payload.logger.warn(`  ! missing file, skipped: ${relPath}`);
    return null;
  }

  const filename = path.basename(relPath);
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    overrideAccess: true,
  });
  if (existing.docs.length > 0) return existing.docs[0].id;

  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    filePath,
    overrideAccess: true,
  });
  return doc.id;
}

const GALLERY = [
  { f: 'Balloon activity photo.jpeg', alt: 'Residents enjoying a balloon activity', cats: ['Resident Lifestyle'] },
  { f: 'Caregiver with elderly man playing game.jpeg', alt: 'Caregiver playing a game with a resident', cats: ['Resident Lifestyle', 'Staff & Team'] },
  { f: 'Caregiver with elderly women 2.jpeg', alt: 'Caregiver assisting a resident', cats: ['Staff & Team'] },
  { f: 'Caregiver with elderly women.jpeg', alt: 'Caregiver with a resident', cats: ['Staff & Team'] },
  { f: 'Catherdral Health Center Front Photo.jpeg', alt: 'Cathedral Health Center exterior', cats: ['Facility'] },
  { f: 'Elderly doing puzzles photo.jpg', alt: 'Residents working on a puzzle together', cats: ['Resident Lifestyle'] },
  { f: 'Elders cooking.jpg', alt: 'Residents cooking together', cats: ['Resident Lifestyle'] },
  { f: 'Employees laughing photo.jpeg', alt: 'Staff members laughing together', cats: ['Staff & Team'] },
  { f: 'Employees smiling.jpeg', alt: 'Smiling staff members', cats: ['Staff & Team', 'Marketing'] },
  { f: 'Two women with notepads smiling.jpg', alt: 'Two team members reviewing notes', cats: ['Staff & Team', 'Marketing'] },
  { f: 'Yorktown front.jpg', alt: 'Yorktown facility exterior', cats: ['Facility'] },
  { f: 'Yorktown landscape aerial photo 2.jpeg', alt: 'Aerial view of the Yorktown grounds', cats: ['Facility'] },
  { f: 'Yorktown landscape aerial photo.jpeg', alt: 'Aerial photograph of the Yorktown campus', cats: ['Facility', 'Marketing'] },
];

const deep = (over: Record<string, any> = {}) => ({
  background: 'deep',
  textColor: 'auto',
  paddingTop: 'default',
  paddingBottom: 'default',
  width: 'default',
  ...over,
});
const ink = (over: Record<string, any> = {}) => deep({ background: 'ink', ...over });

export async function seedPhotoservices(payload: Payload): Promise<void> {
  payload.logger.info('→ Uploading photoservices media…');

  const galleryIds: Array<{ id: number | string; cats: string[] }> = [];
  for (const g of GALLERY) {
    const id = await ensureMedia(payload, `images/gallery/${g.f}`, g.alt);
    if (id) galleryIds.push({ id, cats: g.cats });
  }

  const beforeId = await ensureMedia(payload, 'images/gallery/Yorktown_front_before.jpg', 'Yorktown entrance photographed on a phone');
  const afterId = await ensureMedia(payload, 'images/gallery/Yorktown front.jpg', 'Yorktown entrance photographed professionally');
  const websiteId = await ensureMedia(payload, 'images/website.png', 'Facility website showing professional photography');
  const brochureId = await ensureMedia(payload, 'images/brochure_inside.png', 'Printed brochure spread');
  const brochureCoverId = await ensureMedia(payload, 'images/brochure_cover.jpg', 'Printed brochure cover');
  const gmbPhotoId = await ensureMedia(
    payload,
    'images/gallery/Caregiver with elderly women.jpeg',
    'Caregiver with a resident, used on the Google Business Profile',
  );

  // Contact-sheet proofs for the interactive process panel.
  const sheetIds: Array<number | string> = [];
  for (let i = 1; i <= 6; i++) {
    const id = await ensureMedia(payload, `images/proc_${i}.png`, `Process contact sheet proof ${i}`);
    if (id) sheetIds.push(id);
  }

  payload.logger.info(`→ Media ready (${galleryIds.length} gallery photos).`);

  const icon = (d: string) =>
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

  const layout: any[] = [
    {
      blockType: 'hero',
      layout: 'mosaic',
      title: 'Professional photography that *builds trust.*',
      subtitle:
        'Showcase your facility, staff, residents, and care environment with authentic imagery built for websites, social media, admissions materials, and marketing campaigns.',
      mosaicImages: galleryIds.map((g) => g.id),
      cameraCursor: { enabled: true, fStop: 'F/1.8' },
      minHeight: 'full',
      buttons: [
        { link: { label: 'Book a Photoshoot', type: 'internal', page: null, url: '/contact', style: 'primary' } },
        { link: { label: 'View Photo Work', type: 'anchor', anchor: 'gallery', style: 'light' } },
      ],
      appearance: deep({ paddingTop: 'none', paddingBottom: 'none' }),
    },
    {
      blockType: 'noticeBar',
      text: 'Trusted by healthcare facilities improving their online presence, admissions marketing, and brand perception.',
      appearance: deep({ paddingTop: 'none', paddingBottom: 'none' }),
    },
    {
      blockType: 'beforeAfter',
      heading: {
        eyebrow: 'WHY PROFESSIONAL PHOTOGRAPHY MATTERS',
        title: 'Families form their first *impression online.*',
        subtitle:
          'Outdated, inconsistent, or stock photography can make even the best facility feel untrustworthy. Drag to see the difference real photography makes.',
        align: 'center',
      },
      beforeImage: beforeId,
      afterImage: afterId,
      caption: 'Drag the handle. Left is a typical phone photo, right is professional photography.',
      appearance: deep(),
    },
    {
      blockType: 'cardGrid',
      heading: {
        eyebrow: 'WHAT WE PHOTOGRAPH',
        title: 'Everything that tells your *story.*',
        subtitle:
          'Showcase your facility, staff, and resident lifestyle with authentic, professional imagery that families can trust.',
        align: 'center',
      },
      columns: '4',
      style: 'bordered',
      cards: [
        {
          title: 'Facility Photography',
          body: 'Common areas, resident rooms, amenities, dining spaces, and exterior views are the spaces families judge first.',
        },
        {
          title: 'Staff & Team Photography',
          body: 'Professional portraits and candid team moments that put real faces to your culture and care.',
        },
        {
          title: 'Resident Lifestyle',
          body: 'Authentic moments of daily life, activities, and community are the proof that people are happy here.',
        },
        {
          title: 'Marketing Content',
          body: 'Images shaped for websites, social, brochures, ads, and recruitment are shot with the end user in mind.',
        },
      ],
      appearance: ink(),
    },
    {
      blockType: 'tabsShowcase',
      heading: {
        eyebrow: 'WHERE YOUR PHOTOS ARE USED',
        title: 'One shoot. *Everywhere* it counts.',
        subtitle:
          'The same professional image earns its keep across every place families and referral partners find you.',
        align: 'left',
      },
      tabs: [
        {
          title: 'Website',
          body: 'Stronger first impression, instant trust.',
          icon: icon('<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="20" x2="22" y2="20"></line>'),
          frame: 'browser',
          image: websiteId,
        },
        {
          title: 'Brochures & Packets',
          body: 'Polished materials for tours and admissions.',
          icon: icon('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>'),
          frame: 'brochure',
          image: brochureId,
          image2: brochureCoverId,
        },
        {
          title: 'Google Business Profile',
          body: 'Better local visibility with real imagery.',
          icon: icon('<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>'),
          frame: 'google',
          image: gmbPhotoId,
          businessName: 'Park Gardens · Senior Living',
          rating: 5,
        },
      ],
      appearance: deep(),
    },
    {
      blockType: 'process',
      heading: {
        eyebrow: 'Our Process',
        title: 'From shot list to *final gallery.*',
        subtitle:
          'Hover a phase to watch the contact sheet develop from raw proofs to the final selects.',
        align: 'left',
      },
      layout: 'tabs',
      contactSheet: sheetIds,
      steps: [
        {
          label: '01',
          title: 'Planning',
          body: 'We identify goals, locations, and the exact shot list so nothing is missed and your staff knows what to expect.',
        },
        {
          label: '02',
          title: 'Photoshoot Day',
          body: 'Our team captures everything planned, efficiently and respectfully, working around residents and daily routines.',
        },
        {
          label: '03',
          title: 'Editing',
          body: 'Images are professionally edited, color-corrected, and optimized for every marketing use.',
        },
        {
          label: '04',
          title: 'Delivery',
          body: 'You receive organized, ready-to-use files for web, print, social, and advertising that are named and sized correctly.',
        },
      ],
      appearance: ink(),
    },
    {
      blockType: 'gallery',
      heading: {
        eyebrow: 'THE WORK',
        title: 'Real facilities, *real moments.*',
        subtitle: 'Filter by what you need to see. Every image is shot on location. We use no stock, ever.',
        align: 'center',
      },
      items: galleryIds.map((g) => ({ image: g.id, categories: g.cats })),
      showFilters: true,
      layout: 'masonry',
      lightbox: true,
      buttons: [
        { link: { label: 'View More Work', type: 'external', url: '/case-studies', style: 'ghost' } },
      ],
      appearance: deep({ anchorId: 'gallery' }),
    },
    {
      blockType: 'finalCta',
      eyebrow: 'A clearer picture of your care',
      title: 'Give families a clearer *picture* of your care.',
      subtitle:
        'We capture the spaces, people, and moments that make your facility feel professional, welcoming, and trustworthy.',
      waveAnimation: true,
      buttons: [{ link: { label: 'Book a Photoshoot', type: 'external', url: '/contact', style: 'primary' } }],
      appearance: deep(),
    },
  ];

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'photoservices' } },
    limit: 1,
    overrideAccess: true,
  });

  const data: any = {
    title: 'Brand & Photoshoots',
    slug: 'photoservices',
    layout,
    changeFrequency: 'monthly',
    priority: 0.7,
    _status: 'published',
    meta: {
      title: 'Healthcare & Senior Living Photography | Wavecare',
      description:
        'Professional facility, staff, and resident photography for senior living and skilled nursing. Authentic imagery for websites, brochures, and Google Business Profiles.',
    },
  };

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
    });
    payload.logger.info('→ Updated existing /photoservices page.');
  } else {
    await payload.create({ collection: 'pages', data, overrideAccess: true });
    payload.logger.info('→ Created /photoservices page.');
  }
}
