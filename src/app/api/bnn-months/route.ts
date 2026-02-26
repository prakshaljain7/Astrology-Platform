import { NextRequest, NextResponse } from 'next/server';

// BNN Months API uses port 5004
const BNN_CASCADE_API_URL = 'http://72.61.224.232:8000';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    const response = await fetch(
      `${BNN_CASCADE_API_URL}/months?${queryString}`,
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
    console.error('[API Route] BNN Months error:', error);
    return NextResponse.json(
      { message: 'Unable to connect to BNN Months server' },
      { status: 500 },
    );
  }
}
