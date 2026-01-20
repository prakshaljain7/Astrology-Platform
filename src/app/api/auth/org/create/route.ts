import { NextRequest, NextResponse } from 'next/server';

const AUTH_API_URL = 'http://72.61.224.232:5003';

export async function POST(request: NextRequest) {
  try {
    // Get the Authorization header (Bearer token)
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return NextResponse.json(
        { message: 'Missing Authorization Header' },
        { status: 401 }
      );
    }

    // Get the request body
    const body = await request.json();

    // Forward the request to the external API
    const response = await fetch(`${AUTH_API_URL}/api/org/create`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[API Route] Create org error:', error);
    return NextResponse.json(
      { message: 'Unable to connect to authentication server' },
      { status: 500 }
    );
  }
}
