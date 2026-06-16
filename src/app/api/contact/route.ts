import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, services, message } = body;

    const [firstName, ...lastNameParts] = (name || '').trim().split(' ');
    const lastName = lastNameParts.join(' ');

    const token = process.env.GHL_API_TOKEN;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!token) {
      console.warn('GHL_API_TOKEN is missing in environment variables. Lead will not be sent to GHL.');
      return NextResponse.json({ success: true, warning: 'GHL_API_TOKEN missing' });
    }

    if (!locationId) {
      console.warn('GHL_LOCATION_ID is missing in environment variables. Lead will not be sent to GHL.');
      return NextResponse.json({ success: true, warning: 'GHL_LOCATION_ID missing' });
    }

    // Format tags based on services requested
    const tags = services && services.length > 0 ? services.map((s: string) => s.replace(/[^a-zA-Z0-9 ]/g, '').trim()) : [];
    tags.push('Website Lead');

    const ghlPayload = {
      firstName: firstName || '',
      lastName: lastName || '',
      email: email,
      companyName: company || '',
      tags: tags,
      source: 'Website Contact Form',
      locationId: locationId,
      customFields: [
        // You can map the message to a custom field here if you have the customField ID in GHL
        // { id: "custom_field_id", field_value: message }
      ]
    };

    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(ghlPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('GHL API Error:', data);
      return NextResponse.json({ success: false, error: data.message || 'Error sending lead to GHL' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
