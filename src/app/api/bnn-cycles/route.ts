import { NextRequest, NextResponse } from 'next/server';

// BNN Cycles API uses port 8000
const BNN_CYCLES_API_URL = 'http://72.61.224.232:8000';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    const response = await fetch(`${BNN_CYCLES_API_URL}/cycles?${queryString}`, {
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
    console.error('[API Route] BNN Cycles error:', error);
    return NextResponse.json(
      { message: 'Unable to connect to BNN Cycles server' },
      { status: 500 },
    );
  }
}
