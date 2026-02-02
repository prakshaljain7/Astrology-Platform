import { NextRequest, NextResponse } from 'next/server';

// Mahadasha API uses port 8000
const DASHA_API_URL = 'http://72.61.224.232:8000';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters from the incoming request
    const { searchParams } = new URL(request.url);

    // Build the query string
    const queryString = searchParams.toString();

    // Forward the request to the external API
    const response = await fetch(
      `${DASHA_API_URL}/api/mahadasha?${queryString}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[API Route] Mahadasha error:', error);
    return NextResponse.json(
      { message: 'Unable to connect to mahadasha server' },
      { status: 500 },
    );
  }
}
