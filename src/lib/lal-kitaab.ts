// Lal Kitaab House Transformation Matrix
// 121 rows (years 0-120 from birth), 12 columns (houses 1-12)
// Value at [yearIndex][houseIndex] indicates the new house position

export const LAL_KITAAB_HOUSE_MATRIX: number[][] = [
  [1,2,3,4,5,6,7,8,9,10,11,12],
  [1,9,10,3,5,2,11,7,6,12,4,8],
  [4,1,12,9,3,7,5,6,2,8,10,11],
  [9,4,1,2,8,3,10,5,7,11,12,6],
  [3,8,4,1,10,9,6,11,5,7,2,12],
  [11,3,8,4,1,5,9,2,12,6,7,10],
  [5,12,3,8,4,11,2,9,1,10,6,7],
  [7,6,9,5,12,4,1,10,11,2,8,3],
  [2,7,6,12,9,10,3,1,8,5,11,4],
  [12,2,7,6,11,1,8,4,10,3,5,9],
  [10,11,2,7,6,12,4,8,3,1,9,5],
  [8,5,11,10,7,6,12,3,9,4,1,2],
  [6,10,5,11,2,8,7,12,4,9,3,1],
  [1,5,10,8,11,6,7,2,12,3,9,4],
  [4,1,3,2,5,7,8,11,6,12,10,9],
  [9,4,1,6,8,5,2,7,11,10,12,3],
  [3,9,4,1,12,8,6,5,2,7,11,10],
  [11,3,9,4,1,10,5,6,7,8,2,12],
  [5,11,6,9,4,1,12,8,10,2,3,7],
  [7,10,11,3,9,4,1,12,8,5,6,2],
  [2,7,5,12,3,9,10,1,4,6,8,11],
  [12,2,8,5,10,3,9,4,1,11,7,6],
  [10,12,2,7,6,11,3,9,5,1,4,8],
  [8,6,12,10,7,2,11,3,9,4,1,5],
  [6,8,7,11,2,12,4,10,3,9,5,1],
  [1,6,10,3,2,8,7,4,11,5,12,9],
  [4,1,3,8,6,7,2,11,12,9,5,10],
  [9,4,1,5,10,11,12,7,6,8,2,3],
  [3,9,4,1,11,5,6,8,7,2,10,12],
  [11,3,9,4,1,6,8,2,10,12,7,5],
  [5,11,8,9,4,1,3,12,2,10,6,7],
  [7,5,11,12,9,4,1,10,8,6,3,2],
  [2,7,5,11,3,12,10,6,4,1,9,8],
  [12,2,6,10,8,3,9,1,5,7,4,11],
  [10,12,2,7,5,9,11,3,1,4,8,6],
  [8,10,12,6,7,2,4,5,9,3,11,1],
  [6,8,7,2,12,10,5,9,3,11,1,4],
  [1,3,10,6,9,12,7,5,11,2,4,8],
  [4,1,3,8,6,5,2,7,12,10,11,9],
  [9,4,1,12,8,2,10,11,6,3,5,7],
  [3,9,4,1,11,8,6,12,2,5,7,10],
  [11,7,9,4,1,6,8,2,10,12,3,5],
  [5,11,8,9,12,1,3,4,7,6,10,2],
  [7,5,11,2,3,4,1,10,8,9,12,6],
  [2,10,5,3,4,9,12,8,1,7,6,11],
  [12,2,6,5,10,7,9,1,3,11,8,4],
  [10,12,2,7,5,3,11,6,4,8,9,1],
  [8,6,12,10,7,11,4,9,5,1,2,3],
  [6,8,7,11,2,10,5,3,9,4,1,12],
  [1,7,10,6,12,2,8,4,11,9,3,5],
  [4,1,8,3,6,12,5,11,2,7,10,9],
  [9,4,1,2,8,3,12,6,7,10,5,11],
  [3,9,4,1,11,7,2,12,5,8,6,10],
  [11,10,7,4,1,6,3,9,12,5,8,2],
  [5,10,3,9,4,1,6,2,10,12,7,8],
  [7,5,11,8,3,9,1,10,6,4,2,12],
  [2,3,5,11,9,4,10,1,8,6,12,7],
  [12,2,6,5,10,8,9,7,4,11,1,3],
  [10,12,2,7,5,11,4,8,3,1,9,6],
  [8,6,12,10,7,5,11,3,9,2,4,1],
  [6,8,9,12,2,10,7,5,1,3,11,4],
  [1,11,10,6,12,2,4,7,8,9,5,3],
  [4,1,6,8,3,12,2,10,9,5,7,11],
  [9,4,1,2,8,6,12,11,7,3,10,5],
  [3,9,4,1,6,8,7,12,5,2,11,10],
  [11,2,9,4,1,5,8,3,10,12,6,7],
  [5,10,3,9,2,1,6,8,11,7,12,4],
  [7,5,11,3,10,4,1,9,12,6,8,2],
  [2,3,5,11,9,7,10,1,6,8,4,12],
  [12,8,7,5,11,3,9,4,1,10,2,6],
  [10,12,2,7,5,11,3,6,4,1,9,8],
  [8,6,12,10,7,9,11,5,2,4,3,1],
  [6,7,8,12,4,10,5,2,3,11,1,9],
  [1,4,10,6,12,11,7,8,2,5,9,3],
  [4,2,3,8,6,12,1,11,7,8,5,9],
  [9,10,1,3,8,6,2,7,5,4,12,11],
  [3,9,6,1,2,8,5,12,11,7,10,4],
  [11,3,9,4,1,2,8,10,12,6,7,5],
  [5,11,4,9,7,1,6,2,10,12,3,8],
  [7,5,11,2,9,4,12,6,3,1,8,10],
  [2,8,5,11,4,7,10,3,1,9,6,12],
  [12,1,7,5,11,10,9,4,8,3,2,6],
  [10,12,2,7,5,3,4,9,6,8,11,1],
  [8,6,12,10,3,5,11,1,9,2,4,7],
  [6,7,8,12,10,9,3,5,4,11,1,2],
  [1,3,10,6,12,2,8,11,5,4,9,7],
  [4,1,8,3,6,12,11,2,7,9,10,5],
  [9,4,1,7,3,8,12,5,2,6,11,10],
  [3,9,4,1,8,10,2,7,12,5,6,11],
  [11,10,9,4,1,6,7,12,3,8,5,2],
  [5,11,6,9,4,1,3,8,10,2,7,12],
  [7,5,11,2,10,4,6,9,8,3,12,1],
  [2,7,5,11,9,3,10,4,1,12,8,6],
  [12,8,7,5,2,11,9,1,6,10,3,4],
  [10,12,2,8,11,5,4,6,9,7,1,3],
  [8,6,12,10,5,7,1,3,4,11,2,9],
  [6,2,3,12,7,9,5,10,11,1,4,8],
  [1,9,10,6,12,2,7,5,3,4,8,11],
  [4,1,6,8,10,12,11,2,9,7,3,5],
  [9,4,1,2,6,8,12,11,5,3,10,7],
  [3,10,8,1,5,7,6,12,2,9,11,4],
  [11,3,9,4,1,6,8,10,7,5,12,2],
  [5,11,3,9,4,1,2,6,8,12,7,10],
  [7,5,11,3,9,4,1,8,12,10,2,6],
  [2,7,5,11,3,9,10,1,6,8,4,12],
  [12,2,4,5,11,3,9,7,10,6,1,8],
  [10,12,2,7,8,5,3,9,4,11,6,1],
  [8,6,12,10,7,11,4,3,1,2,5,9],
  [6,8,7,12,2,10,5,4,11,1,9,3],
  [1,9,10,6,12,2,7,11,5,3,4,8],
  [4,1,6,8,10,12,3,5,7,2,11,9],
  [9,4,1,2,5,8,12,10,6,7,3,11],
  [3,10,8,9,11,7,4,1,2,12,6,5],
  [11,3,9,4,1,6,2,7,10,5,8,12],
  [5,11,3,1,4,10,6,8,12,9,7,2],
  [7,5,11,3,9,4,1,12,8,10,2,6],
  [2,7,5,11,3,9,10,6,4,8,12,1],
  [12,2,4,5,6,1,8,9,3,11,10,7],
  [10,12,2,7,8,11,9,3,1,6,5,4],
  [8,6,12,10,7,5,11,2,9,4,1,3],
  [6,8,7,12,2,3,5,4,11,1,9,10],
];

// Interface for house data with planets
export interface HouseData {
  houseNumber: number;
  planets: string[];
  sign?: number;
}

// Interface for Lal Kitaab chart
export interface LalKitaabChart {
  houses: HouseData[];
  year: number;
  yearIndex: number;
}

/**
 * Transform natal chart to Lal Kitaab yearly chart
 * @param natalHouses - Array of 12 houses with their planets
 * @param yearIndex - Year index (0-120) from birth
 * @returns Transformed houses for the yearly chart
 */
export function transformToLalKitaabChart(
  natalHouses: HouseData[],
  yearIndex: number
): HouseData[] {
  // Ensure year index is within bounds (0-120)
  const safeYearIndex = Math.max(0, Math.min(yearIndex, LAL_KITAAB_HOUSE_MATRIX.length - 1));
  
  // Initialize result array with empty houses
  const result: HouseData[] = Array.from({ length: 12 }, (_, i) => ({
    houseNumber: i + 1,
    planets: [],
    sign: undefined,
  }));

  // Transform each house based on the matrix
  for (let i = 0; i < 12; i++) {
    const newHouseIndex = LAL_KITAAB_HOUSE_MATRIX[safeYearIndex][i] - 1;
    const natalHouse = natalHouses[i];
    
    if (natalHouse) {
      result[newHouseIndex].planets = [...(natalHouse.planets || [])];
      result[newHouseIndex].sign = natalHouse.sign;
    }
  }

  return result;
}

/**
 * Get year index from birth year and target year
 */
export function getYearIndex(birthYear: number, targetYear: number): number {
  const index = targetYear - birthYear;
  return Math.max(0, Math.min(index, LAL_KITAAB_HOUSE_MATRIX.length - 1));
}

/**
 * Generate year menu items for selection
 * @param birthYear - Birth year
 * @param decades - Number of decades to generate (default 12 = 120 years)
 */
export function generateYearMenu(birthYear: number, decades: number = 12): { decade: number; years: number[] }[] {
  const menu: { decade: number; years: number[] }[] = [];
  
  for (let d = 0; d < decades; d++) {
    const decadeStart = birthYear + d * 10;
    const years: number[] = [];
    
    for (let y = 0; y < 10; y++) {
      years.push(decadeStart + y);
    }
    
    menu.push({ decade: d + 1, years });
  }
  
  return menu;
}

/**
 * Convert planets from kundali format to house data
 */
export function convertPlanetsToHouseData(
  planets: Array<{ name: string; house: number; sign?: number | string }>,
  ascendantSign: number
): HouseData[] {
  const houses: HouseData[] = Array.from({ length: 12 }, (_, i) => ({
    houseNumber: i + 1,
    planets: [],
    sign: ((ascendantSign - 1 + i) % 12) + 1,
  }));

  planets.forEach((planet) => {
    const houseIndex = planet.house - 1;
    if (houseIndex >= 0 && houseIndex < 12) {
      // Use short names for display
      const shortName = getShortPlanetName(planet.name);
      houses[houseIndex].planets.push(shortName);
    }
  });

  return houses;
}

/**
 * Get short planet name for display
 */
export function getShortPlanetName(name: string): string {
  const shortNames: Record<string, string> = {
    Sun: 'Su',
    Moon: 'Mo',
    Mars: 'Ma',
    Mercury: 'Me',
    Jupiter: 'Ju',
    Venus: 'Ve',
    Saturn: 'Sa',
    Rahu: 'Ra',
    Ketu: 'Ke',
    Ascendant: 'Asc',
  };
  return shortNames[name] || name.substring(0, 2);
}

/**
 * Get full planet name from short name
 */
export function getFullPlanetName(shortName: string): string {
  const fullNames: Record<string, string> = {
    Su: 'Sun',
    Mo: 'Moon',
    Ma: 'Mars',
    Me: 'Mercury',
    Ju: 'Jupiter',
    Ve: 'Venus',
    Sa: 'Saturn',
    Ra: 'Rahu',
    Ke: 'Ketu',
    Asc: 'Ascendant',
  };
  return fullNames[shortName] || shortName;
}
