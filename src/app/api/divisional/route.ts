import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API_BASE = 'http://72.61.224.232:8000/api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const chart = searchParams.get('chart'); // e.g., 'd2', 'd9', etc.
    const dob = searchParams.get('dob');
    const tob = searchParams.get('tob');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const tz = searchParams.get('tz');
    const ayanamsa = searchParams.get('ayanamsa');

    if (!chart || !dob || !tob || !lat || !lon || !tz || !ayanamsa) {
      return NextResponse.json(
        { error: 'Missing required parameters: chart, dob, tob, lat, lon, tz, ayanamsa' },
        { status: 400 }
      );
    }

    const url = `${EXTERNAL_API_BASE}/${chart}?dob=${dob}&tob=${encodeURIComponent(tob)}&lat=${lat}&lon=${lon}&tz=${tz}&ayanamsa=${ayanamsa}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Divisional chart API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch divisional chart data' },
      { status: 500 }
    );
  }
}
