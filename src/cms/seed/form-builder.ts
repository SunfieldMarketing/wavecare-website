import type { Payload } from 'payload';

/**
 * Registers the site's one real form ("Contact Form") with the
 * @payloadcms/plugin-form-builder collections (Forms / Form Submissions),
 * so every submission from the live contact form lands in the CMS as a real,
 * queryable document — visible to admins the moment it happens, no polling
 * or export step involved.
 *
 * This is deliberately NOT the thing that renders the form on the frontend.
 * ContactForm.tsx keeps its own hand-built UI and posts to /api/contact ->
 * GoHighLevel exactly as before (see cms/blocks/contact.ts for why: editable
 * wording, but submit logic fixed in code so an edit can never break lead
 * capture). This "forms" document exists purely as the record that
 * /api/contact's form-submissions write references, so Payload's Form
 * Submissions list in the dashboard shows real field names instead of a
 * dangling relationship.
 */
export async function seedContactFormRecord(payload: Payload): Promise<string> {
  payload.logger.info('→ Registering Contact Form with the form-builder…');

  const data: any = {
    title: 'Contact Form',
    fields: [
      { blockType: 'text', name: 'name', label: 'Name', required: true, width: 100 },
      { blockType: 'email', name: 'email', label: 'Email', required: true, width: 100 },
      { blockType: 'text', name: 'company', label: 'Facility / Company', width: 100 },
      {
        blockType: 'text',
        name: 'services',
        label: 'Services requested',
        width: 100,
      },
      { blockType: 'textarea', name: 'message', label: 'Message', width: 100 },
    ],
    submitButtonLabel: 'Send Message',
    confirmationType: 'message',
    confirmationMessage: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Thanks for reaching out.', version: 1 }],
            version: 1,
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    },
  };

  const existing = await payload.find({
    collection: 'forms',
    where: { title: { equals: 'Contact Form' } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    await payload.update({ collection: 'forms', id: existing.docs[0].id, data, overrideAccess: true });
    payload.logger.info('→ Contact Form record already present — updated.');
    return String(existing.docs[0].id);
  }

  const created = await payload.create({ collection: 'forms', data, overrideAccess: true });
  payload.logger.info('→ Contact Form record created.');
  return String(created.id);
}
