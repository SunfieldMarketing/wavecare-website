import { NextResponse } from 'next/server';

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
  if (services && services.length > 0) {
    services.forEach((s: string) => tags.push(s));
  }

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
    contactRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
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
    console.error('[GHL] Token prefix used:', token.substring(0, 8), '| LocationId used:', locationId);
    return NextResponse.json({ 
      success: false, 
      error: `Submission failed (GHL error ${contactRes.status}). Please email us directly at hello@wavecare.io.` 
    }, { status: 500 });
  }

  const contactId = contactData?.contact?.id;

  // Add message as a note — non-critical, don't fail if this errors
  if (contactId && message && message.trim()) {
    try {
      const noteBody = `--- Message from Website ---\n\nServices: ${services?.join(', ') || 'Not specified'}\n\n${message.trim()}`;
      await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ body: noteBody, contactId }),
      });
    } catch (noteErr) {
      console.warn('[GHL] Note creation failed (non-critical):', noteErr);
    }
  }

  console.log('[GHL] Contact created successfully:', contactId);
  return NextResponse.json({ success: true });
}
