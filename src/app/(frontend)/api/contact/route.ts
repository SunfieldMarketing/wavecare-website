import { NextResponse } from 'next/server';
import { getPostHogClient } from '@/lib/posthog-server';
import { payloadClient, getContactFormId } from '@/lib/cms';

export async function POST(request: Request) {
  let body: any = {};

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'We could not read your submission. Please try again.' }, { status: 400 });
  }

  const { name, email, company, services, message } = body;

  if (!email) {
    return NextResponse.json({ success: false, error: 'An email address is required to submit this form.' }, { status: 400 });
  }

  const token = (process.env.GHL_API_TOKEN || '').trim();
  const locationId = (process.env.GHL_LOCATION_ID || '').trim();

  if (!token || !locationId) {
    console.error('[GHL] Missing GHL_API_TOKEN or GHL_LOCATION_ID — set these in Vercel Environment Variables.');
    return NextResponse.json({ success: false, error: 'Our contact system is temporarily unavailable. Please email us directly at info@wavecare.io.' }, { status: 503 });
  }

  const [first, ...lastParts] = (name || '').trim().split(' ');
  const last = lastParts.join(' ');

  const tags: string[] = ['Website Lead'];

  const contactPayload: any = {
    email: email,
    tags,
    source: 'Website Contact Form',
    locationId,
  };

  if (first) contactPayload.firstName = first;
  if (last) contactPayload.lastName = last;
  if (company) contactPayload.companyName = company;


  let contactRes: Response;
  let contactData: any;

  try {
    contactRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(contactPayload),
    });
    contactData = await contactRes.json();
  } catch (err: any) {
    console.error('[GHL] Network error reaching GHL API:', err?.message);
    return NextResponse.json({ success: false, error: 'We could not reach our contact system. Please try again in a moment or email us at info@wavecare.io.' }, { status: 502 });
  }

  if (!contactRes.ok) {
    console.error('[GHL] Contact creation failed. Status:', contactRes.status, 'Body:', JSON.stringify(contactData));
    console.error('[GHL] LocationId used:', locationId);
    const ghlError = contactData?.message || contactData?.error || JSON.stringify(contactData);
    return NextResponse.json({ 
      success: false, 
      error: `GHL Error ${contactRes.status}: ${ghlError}` 
    }, { status: 500 });
  }

  const contactId = contactData?.contact?.id || contactData?.id;

  // Add message as a note — non-critical, don't fail if this errors
  if (contactId && (message?.trim() || (services && services.length > 0))) {
    try {
      const formattedServices = services?.length > 0 ? services.join(', ') : 'Not specified';
      const userMessage = message?.trim() ? `\n\nMessage:\n${message.trim()}` : '';
      const noteBody = `Services Requested: ${formattedServices}${userMessage}`;
      
      const noteRes = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ body: noteBody }),
      });
      
      if (!noteRes.ok) {
        const errText = await noteRes.text();
        console.warn('[GHL] Note creation failed:', noteRes.status, errText);
      } else {
        console.log('[GHL] Note attached successfully to contact:', contactId);
      }
    } catch (noteErr) {
      console.warn('[GHL] Note creation network error:', noteErr);
    }
  }

  console.log('[GHL] Contact created successfully:', contactId);

  // Mirror the submission into the CMS itself (Payload's Form Submissions
  // collection) — non-critical, never blocks or fails the response. This is
  // what makes every real lead show up live in the dashboard, not just in
  // GoHighLevel: the write below is a normal synchronous database insert,
  // so it's visible to an admin refreshing Form Submissions the instant
  // this request completes.
  try {
    const formId = await getContactFormId();
    if (formId) {
      const payload = await payloadClient();
      await payload.create({
        collection: 'form-submissions',
        data: {
          form: formId,
          submissionData: [
            { field: 'name', value: name || '' },
            { field: 'email', value: email },
            { field: 'company', value: company || '' },
            { field: 'services', value: services?.length > 0 ? services.join(', ') : '' },
            { field: 'message', value: message || '' },
          ],
        } as any,
        overrideAccess: true,
      });
    } else {
      console.warn('[CMS] "Contact Form" record not found — run the seed to enable Form Submissions.');
    }
  } catch (cmsErr) {
    console.warn('[CMS] Failed to record form submission in Payload:', cmsErr);
  }

  const posthog = getPostHogClient();
  const distinctId = contactId || email;
  posthog.identify({ distinctId, properties: { email, name: name || undefined, companyName: company || undefined } });
  posthog.capture({
    distinctId,
    event: 'lead_created',
    properties: {
      services: services && services.length > 0 ? services : [],
      has_message: !!(message?.trim()),
      has_company: !!company,
      source: 'website_contact_form',
    },
  });
  await posthog.flush();

  return NextResponse.json({ success: true });
}
