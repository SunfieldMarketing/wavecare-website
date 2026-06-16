import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, services, message } = body;

    const token = process.env.GHL_API_TOKEN;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!token || !locationId) {
      console.error('Missing GHL_API_TOKEN or GHL_LOCATION_ID environment variables.');
      return NextResponse.json({ success: false, error: 'Server configuration error.' }, { status: 500 });
    }

    const [firstName, ...lastNameParts] = (name || '').trim().split(' ');
    const lastName = lastNameParts.join(' ');

    // Build tags from selected services + source tag
    const tags: string[] = ['Website Lead'];
    if (services && services.length > 0) {
      services.forEach((s: string) => tags.push(s));
    }

    // 1. Create or update the contact
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
      console.error('GHL Contact Creation Error:', contactData);
      return NextResponse.json({ success: false, error: contactData.message || 'Error creating contact in GHL.' }, { status: 400 });
    }

    const contactId = contactData?.contact?.id;

    // 2. If there is a message, add it as a note on the contact
    if (contactId && message && message.trim()) {
      const notePayload = {
        body: `--- Message from Website ---\n\nServices Interested In: ${services && services.length > 0 ? services.join(', ') : 'Not specified'}\n\n${message.trim()}`,
        contactId,
        userId: contactId, // GHL requires userId; use contactId as fallback
      };

      await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(notePayload),
      });
    }

    return NextResponse.json({ success: true, contactId });
  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
