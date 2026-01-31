import { NextRequest, NextResponse } from 'next/server';

// Lagna API uses port 8000
const LAGNA_API_URL = 'http://72.61.224.232:8000';

// New API response format
interface NewApiHouse {
  House: number;
  Planets: string;
  SignName: string;
  SignNo: number;
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
function transformResponse(newData: NewApiHouse[], ayanamsa: string) {
  // House 1 contains the ascendant sign
  const house1 = newData.find((h) => h.House === 1);
  const ascendantSign = house1?.SignName || 'Aries';

  // Build planets array
  const planets: Array<{
    planet: string;
    sign: string;
    degree: number;
    house_no: number;
  }> = [];

  // Build houses array
  const houses = newData.map((h) => {
    const housePlanets = parsePlanets(h.Planets, h.House, h.SignName);
    planets.push(...housePlanets);

    return {
      house_no: h.House,
      sign: h.SignName,
      cusp_degree: 0, // Not provided by new API
      planets: housePlanets.map((p) => ({ planet: p.planet })),
    };
  });

  return {
    ascendant: {
      sign: ascendantSign,
      degree: 0, // Not provided by new API
    },
    ayanamsa: ayanamsa,
    houses: houses,
    planets: planets,
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

    const data = await response.json();

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
