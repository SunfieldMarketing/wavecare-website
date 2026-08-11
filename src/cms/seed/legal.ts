import type { Payload } from 'payload';
import { body, type BodyEntry } from './lexical';

/**
 * /privacy-policy and /terms-of-service, migrated verbatim.
 * Both use the legalDocument block so each stays one editable unit.
 */

type Section = { heading: string; content: BodyEntry[] };

const PRIVACY: Section[] = [
  {
    heading: '1. Introduction',
    content: [
      'Welcome to Wavecare Marketing ("Company", "we", "our", "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.',
    ],
  },
  {
    heading: '2. The Data We Collect About You',
    content: [
      'Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:',
      [
        '**Identity Data** includes first name, last name, username or similar identifier, title, and company name.',
        '**Contact Data** includes billing address, delivery address, email address, and telephone numbers.',
        '**Technical Data** includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.',
        '**Usage Data** includes information about how you use our website, products, and services.',
        '**Marketing and Communications Data** includes your preferences in receiving marketing from us and our third parties and your communication preferences.',
      ],
    ],
  },
  {
    heading: '3. How Is Your Personal Data Collected?',
    content: [
      'We use different methods to collect data from and about you including through:',
      [
        {
          item: '**Direct interactions.** You may give us your Identity and Contact data by filling in forms or by corresponding with us by post, phone, email, or otherwise. This includes personal data you provide when you:',
          children: [
            'apply for our products or services;',
            'subscribe to our service or publications;',
            'request marketing to be sent to you;',
            'give us feedback or contact us.',
          ],
        },
        '**Automated technologies or interactions.** As you interact with our website, we will automatically collect Technical Data about your equipment, browsing actions, and patterns. We collect this personal data by using cookies, server logs, and other similar technologies.',
      ],
    ],
  },
  {
    heading: '4. How We Use Your Personal Data',
    content: [
      'We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:',
      [
        'Where we need to perform the contract we are about to enter into or have entered into with you.',
        'Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.',
        'Where we need to comply with a legal obligation.',
      ],
    ],
  },
  {
    heading: '5. Data Security',
    content: [
      'We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.',
    ],
  },
  {
    heading: '6. Data Retention',
    content: [
      'We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.',
    ],
  },
  {
    heading: '7. Your Legal Rights',
    content: [
      'Under certain circumstances, you have rights under data protection laws in relation to your personal data. These include the right to:',
      [
        'Request access to your personal data.',
        'Request correction of your personal data.',
        'Request erasure of your personal data.',
        'Object to processing of your personal data.',
        'Request restriction of processing your personal data.',
        'Request transfer of your personal data.',
        'Right to withdraw consent.',
      ],
      'If you wish to exercise any of the rights set out above, please contact us.',
    ],
  },
  {
    heading: '8. Contact Details',
    content: [
      'If you have any questions about this privacy policy or our privacy practices, please contact us in the following ways:',
      'Email address: [info@wavecare.io](mailto:info@wavecare.io)',
      'Telephone number: [+1 305-902-6682](tel:+13059026682)',
    ],
  },
];

const TERMS: Section[] = [
  {
    heading: '1. Acceptance of Terms',
    content: [
      'By accessing and using the Wavecare Marketing website (the "Site") and services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.',
    ],
  },
  {
    heading: '2. Description of Services',
    content: [
      'Wavecare Marketing is a specialized healthcare marketing agency that provides a range of services including but not limited to brand development, video production, photography, design, print, and web design ("Services"). The specific deliverables and scope of Services will be outlined in a separate Statement of Work (SOW) or Service Agreement signed by both parties.',
    ],
  },
  {
    heading: '3. Client Responsibilities',
    content: [
      'In order for Wavecare Marketing to effectively perform the Services, the Client agrees to:',
      [
        'Provide necessary access to websites, hosting accounts, social media accounts, and other relevant platforms.',
        'Provide timely feedback and approvals on deliverables.',
        'Provide necessary content, assets, and information required for the execution of the Services unless otherwise stated in the SOW.',
        'Ensure that all content provided to Wavecare Marketing does not infringe on the intellectual property rights of any third party.',
      ],
    ],
  },
  {
    heading: '4. Payment Terms',
    content: [
      'Payment terms are determined in the specific Service Agreement or SOW. Generally, invoices are due upon receipt unless otherwise specified. Failure to make payment within the agreed-upon timeframe may result in a suspension of Services or late fees as detailed in the Service Agreement.',
    ],
  },
  {
    heading: '5. Intellectual Property Rights',
    content: [
      "Upon final and full payment, the Client shall retain ownership of all final deliverables created specifically for the Client. Wavecare Marketing retains the right to use the completed project and any preliminary designs for the purpose of design competitions, future publications on design, educational purposes, and the marketing of Wavecare Marketing's business.",
    ],
  },
  {
    heading: '6. Limitation of Liability',
    content: [
      'In no event shall Wavecare Marketing, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.',
    ],
  },
  {
    heading: '7. Termination',
    content: [
      'We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.',
    ],
  },
  {
    heading: '8. Governing Law',
    content: [
      'These Terms shall be governed and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law provisions.',
    ],
  },
  {
    heading: '9. Changes to Terms',
    content: [
      'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.',
    ],
  },
  {
    heading: '10. Contact Us',
    content: [
      'If you have any questions about these Terms, please contact us:',
      'Email address: [info@wavecare.io](mailto:info@wavecare.io)',
      'Telephone number: [+1 305-902-6682](tel:+13059026682)',
    ],
  },
];

async function upsertLegalPage(
  payload: Payload,
  opts: {
    slug: string;
    title: string;
    docTitle: string;
    sections: Section[];
    metaTitle: string;
    metaDescription: string;
  },
) {
  const data: any = {
    title: opts.title,
    slug: opts.slug,
    layout: [
      {
        blockType: 'legalDocument',
        title: opts.docTitle,
        effectiveDate: 'Effective Date: June 15, 2026',
        sections: opts.sections.map((s) => ({
          heading: s.heading,
          content: body(s.content),
        })),
        backLink: { enabled: true, label: '← Back to Home', url: '/' },
        appearance: { background: 'ink', paddingTop: 'default', paddingBottom: 'default', width: 'default' },
      },
    ],
    changeFrequency: 'yearly',
    priority: 0.5,
    _status: 'published',
    meta: { title: opts.metaTitle, description: opts.metaDescription },
  };

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: opts.slug } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, overrideAccess: true });
  } else {
    await payload.create({ collection: 'pages', data, overrideAccess: true });
  }
}

export async function seedLegalPages(payload: Payload): Promise<void> {
  payload.logger.info('→ Seeding legal pages…');

  await upsertLegalPage(payload, {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    docTitle: 'Privacy Policy',
    sections: PRIVACY,
    metaTitle: 'Privacy Policy | Wavecare Marketing',
    metaDescription: 'Privacy Policy for Wavecare Marketing, a healthcare marketing agency.',
  });

  await upsertLegalPage(payload, {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    docTitle: 'Terms of Service',
    sections: TERMS,
    metaTitle: 'Terms of Service | Wavecare Marketing',
    metaDescription: 'Terms of Service for Wavecare Marketing, a healthcare marketing agency.',
  });

  payload.logger.info('→ 2 legal pages ready.');
}
