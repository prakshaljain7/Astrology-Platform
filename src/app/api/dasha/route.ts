import { NextRequest, NextResponse } from 'next/server';

// Dasha API uses port 5010
const DASHA_API_URL = 'http://72.61.224.232:5010';

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();

    // Forward the request to the external API
    const response = await fetch(`${DASHA_API_URL}/compute-dasha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(response);
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[API Route] Dasha error:', error);
    return NextResponse.json(
      { message: 'Unable to connect to dasha server' + error },
      { status: 500 },
    );
  }
}
