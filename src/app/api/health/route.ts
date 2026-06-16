import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  return NextResponse.json({
    hasToken: !!token,
    tokenLength: token?.length ?? 0,
    tokenPrefix: token ? token.substring(0, 8) + '...' : 'MISSING',
    hasLocationId: !!locationId,
    locationIdLength: locationId?.length ?? 0,
    locationIdPreview: locationId ? locationId.substring(0, 6) + '...' : 'MISSING',
    nodeEnv: process.env.NODE_ENV,
  });
}
