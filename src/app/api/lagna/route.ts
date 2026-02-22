import { NextRequest, NextResponse } from 'next/server';

// Lagna API uses port 8000
const LAGNA_API_URL = 'http://72.61.224.232:8000';

// New API response format for natal houses
interface NewApiNatalHouse {
  House: number;
  Planets: string;
  SignName: string;
  SignNo: number;
}

// New API response format for transit houses
interface NewApiTransitHouse {
  House: number;
  SignName: string;
  SignNo: number;
  Transit: string;
}

// Full API response
interface NewApiResponse {
  natal: NewApiNatalHouse[];
  transit_today: NewApiTransitHouse[];
}

// Parse planet string like "Sun (29.58°), Mars (28.47°)" into individual planets
function parsePlanets(
  planetsString: string,
  houseNo: number,
  signName: string,
): Array<{
  planet: string;
  sign: string;
  degree: number;
  house_no: number;
}> {
  if (planetsString === '—' || planetsString === '-' || !planetsString.trim()) {
    return [];
  }

  const planets: Array<{
    planet: string;
    sign: string;
    degree: number;
    house_no: number;
  }> = [];

  // Split by comma and parse each planet
  const planetParts = planetsString.split(',').map((p) => p.trim());

  for (const part of planetParts) {
    // Match pattern like "Sun (29.58°)" or "Jupiter (25.4°)"
    const match = part.match(/^(\w+)\s*\(([0-9.]+)°?\)$/);
    if (match) {
      planets.push({
        planet: match[1],
        sign: signName,
        degree: parseFloat(match[2]),
        house_no: houseNo,
      });
    }
  }

  return planets;
}

// Transform new API response to old format for compatibility
function transformResponse(newData: NewApiResponse, ayanamsa: string) {
  const natalData = newData.natal;
  const transitData = newData.transit_today;

  // House 1 contains the ascendant sign
  const house1 = natalData.find((h) => h.House === 1);
  const ascendantSign = house1?.SignName || 'Aries';

  // Build natal planets array
  const planets: Array<{
    planet: string;
    sign: string;
    degree: number;
    house_no: number;
  }> = [];

  // Build houses array from natal data
  const houses = natalData.map((h) => {
    const housePlanets = parsePlanets(h.Planets, h.House, h.SignName);
    planets.push(...housePlanets);

    return {
      house_no: h.House,
      sign: h.SignName,
      cusp_degree: 0,
      planets: housePlanets.map((p) => ({ planet: p.planet })),
    };
  });

  // Build transit planets array
  const transitPlanets: Array<{
    planet: string;
    sign: string;
    degree: number;
    house_no: number;
  }> = [];

  // Build transit houses array
  const transitHouses = transitData.map((h) => {
    const housePlanets = parsePlanets(h.Transit, h.House, h.SignName);
    transitPlanets.push(...housePlanets);

    return {
      house_no: h.House,
      sign: h.SignName,
      planets: housePlanets.map((p) => ({ planet: p.planet })),
    };
  });

  return {
    ascendant: {
      sign: ascendantSign,
      degree: 0,
    },
    ayanamsa: ayanamsa,
    houses: houses,
    planets: planets,
    transit: {
      houses: transitHouses,
      planets: transitPlanets,
    },
  };
}

export async function GET(request: NextRequest) {
  try {
    // Get query parameters from the incoming request
    const { searchParams } = new URL(request.url);
    const ayanamsa = searchParams.get('ayanamsa') || 'lahiri';

    // Build the query string
    const queryString = searchParams.toString();

    // Forward the request to the external API
    const response = await fetch(`${LAGNA_API_URL}/api/kundli?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: NewApiResponse = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // Transform the new API response to match old format
    const transformedData = transformResponse(data, ayanamsa);

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('[API Route] Lagna error:', error);
    return NextResponse.json(
      { message: 'Unable to connect to lagna server' },
      { status: 500 },
    );
  }
}
