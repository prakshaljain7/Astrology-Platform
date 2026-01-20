import { NextRequest, NextResponse } from 'next/server';

// Lagna API uses port 5001
const LAGNA_API_URL = 'http://72.61.224.232:5001';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters from the incoming request
    const { searchParams } = new URL(request.url);
    
    // Build the query string
    const queryString = searchParams.toString();

    // Forward the request to the external API
    const response = await fetch(`${LAGNA_API_URL}/lagna?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[API Route] Lagna error:', error);
    return NextResponse.json(
      { message: 'Unable to connect to lagna server' },
      { status: 500 }
    );
  }
}
