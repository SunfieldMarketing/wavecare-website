import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let body: any = {};

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, email, company, services, message } = body;

  // Always respond success to the user — GHL errors are logged server-side only
  const respond = () => NextResponse.json({ success: true });

  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!token || !locationId) {
    console.warn('[GHL] Missing GHL_API_TOKEN or GHL_LOCATION_ID. Set these in Vercel Environment Variables.');
    return respond();
  }

  try {
    const [firstName, ...lastNameParts] = (name || '').trim().split(' ');
    const lastName = lastNameParts.join(' ');

    const tags: string[] = ['Website Lead'];
    if (services && services.length > 0) {
      services.forEach((s: string) => tags.push(s));
    }

    const contactPayload = {
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      companyName: company || '',
      tags,
      source: 'Website Contact Form',
      locationId,
    };

    const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(contactPayload),
    });

    const contactData = await contactRes.json();

    if (!contactRes.ok) {
      console.error('[GHL] Contact creation failed:', JSON.stringify(contactData));
      return respond(); // Still show success to user
    }

    const contactId = contactData?.contact?.id;

    // Add message as a note if present
    if (contactId && message && message.trim()) {
      const noteBody = `--- Message from Website ---\n\nServices: ${services?.join(', ') || 'Not specified'}\n\n${message.trim()}`;
      try {
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
        console.error('[GHL] Note creation failed:', noteErr);
      }
    }

    console.log('[GHL] Contact created successfully:', contactId);
    return respond();

  } catch (err: any) {
    console.error('[GHL] Unexpected error:', err?.message || err);
    return respond(); // Always succeed for the user
  }
}
