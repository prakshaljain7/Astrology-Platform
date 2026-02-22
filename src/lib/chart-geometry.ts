/**
 * Chart Geometry - Single Source of Truth
 * ========================================
 * All positions are normalized (0-1) and scaled at render time.
 * This allows charts to be rendered at any size while maintaining proportions.
 */

// ============================================
// NORTH INDIAN CHART GEOMETRY
// ============================================

/**
 * North Indian Chart Layout (Diamond pattern)
 * House 1 (Ascendant) at TOP CENTER
 * Houses proceed COUNTER-CLOCKWISE
 * 
 *         [2]   [1]   [12]
 *        ┌─────────────────┐
 *   [3]  │  ╲    1    ╱    │  [11]
 *        │    ╲     ╱      │
 *   [4]  │ 2   ╲   ╱   12  │  [10]
 *        │      ╲ ╱        │
 *        │   3   ╳   11    │
 *        │      ╱ ╲        │
 *   [5]  │ 4   ╱   ╲   10  │  [9]
 *        │    ╱     ╲      │
 *   [6]  │  ╱    7    ╲    │  [8]
 *        └─────────────────┘
 *         [5]   [7]   [9]
 */

// Sign symbol positions (normalized 0-1)
// Original pixel positions: base size 400, margin 20, inner 360
// Formula: normalized = (pixel - margin) / innerSize
export const NORTH_SIGN_POSITIONS: Record<number, { x: number; y: number }> = {
  1:  { x: 0.500, y: 0.444 },  // Top center (200, 180)
  2:  { x: 0.250, y: 0.194 },  // Top left (110, 90)
  3:  { x: 0.194, y: 0.250 },  // Left upper (90, 110)
  4:  { x: 0.250, y: 0.306 },  // Left lower (110, 130)
  5:  { x: 0.194, y: 0.750 },  // Bottom left (90, 290)
  6:  { x: 0.250, y: 0.806 },  // Bottom left-center (110, 310)
  7:  { x: 0.500, y: 0.556 },  // Bottom center (200, 220)
  8:  { x: 0.750, y: 0.806 },  // Bottom right-center (290, 310)
  9:  { x: 0.806, y: 0.750 },  // Bottom right (310, 290)
  10: { x: 0.750, y: 0.306 },  // Right lower (290, 130)
  11: { x: 0.806, y: 0.250 },  // Right upper (310, 110)
  12: { x: 0.750, y: 0.194 },  // Top right (290, 90)
};

// Planet center positions for each house (normalized 0-1)
// Original pixel positions: base size 400, margin 20, inner 360
export const NORTH_PLANET_POSITIONS: Record<number, { x: number; y: number }> = {
  1:  { x: 0.500, y: 0.250 },  // Top center triangle (200, 110)
  2:  { x: 0.250, y: 0.097 },  // Top left triangle (110, 55)
  3:  { x: 0.097, y: 0.250 },  // Left upper triangle (55, 110)
  4:  { x: 0.250, y: 0.500 },  // Left middle triangle (110, 200)
  5:  { x: 0.097, y: 0.750 },  // Bottom left corner (55, 290)
  6:  { x: 0.250, y: 0.903 },  // Bottom left-center (110, 345)
  7:  { x: 0.500, y: 0.750 },  // Bottom center triangle (200, 290)
  8:  { x: 0.750, y: 0.903 },  // Bottom right-center (290, 345)
  9:  { x: 0.903, y: 0.750 },  // Bottom right corner (345, 290)
  10: { x: 0.750, y: 0.500 },  // Right middle triangle (290, 200)
  11: { x: 0.903, y: 0.250 },  // Right upper triangle (345, 110)
  12: { x: 0.750, y: 0.097 },  // Top right triangle (290, 55)
};

// ============================================
// SOUTH INDIAN CHART GEOMETRY
// ============================================

/**
 * South Indian Chart Layout (4x4 grid with hollow center)
 * Signs are FIXED at positions (Pisces at top-left, clockwise)
 * Houses are determined by ascendant position
 * 
 *   ┌────┬────┬────┬────┐
 *   │ Pi │ Ar │ Ta │ Ge │  Row 0
 *   ├────┼────┴────┼────┤
 *   │ Aq │         │ Ca │  Row 1
 *   ├────┤  CENTER ├────┤
 *   │ Cp │         │ Le │  Row 2
 *   ├────┼────┬────┼────┤
 *   │ Sg │ Sc │ Li │ Vi │  Row 3
 *   └────┴────┴────┴────┘
 *     0    1    2    3
 */

// Fixed sign positions in South Indian chart (sign -> grid position)
export const SOUTH_SIGN_GRID: Record<string, { row: number; col: number }> = {
  Pisces:      { row: 0, col: 0 },
  Aries:       { row: 0, col: 1 },
  Taurus:      { row: 0, col: 2 },
  Gemini:      { row: 0, col: 3 },
  Cancer:      { row: 1, col: 3 },
  Leo:         { row: 2, col: 3 },
  Virgo:       { row: 3, col: 3 },
  Libra:       { row: 3, col: 2 },
  Scorpio:     { row: 3, col: 1 },
  Sagittarius: { row: 3, col: 0 },
  Capricorn:   { row: 2, col: 0 },
  Aquarius:    { row: 1, col: 0 },
};

// Sign number to grid position (for divisional charts)
export const SOUTH_SIGN_NUMBER_GRID: Record<number, { row: number; col: number }> = {
  12: { row: 0, col: 0 }, // Pisces
  1:  { row: 0, col: 1 }, // Aries
  2:  { row: 0, col: 2 }, // Taurus
  3:  { row: 0, col: 3 }, // Gemini
  4:  { row: 1, col: 3 }, // Cancer
  5:  { row: 2, col: 3 }, // Leo
  6:  { row: 3, col: 3 }, // Virgo
  7:  { row: 3, col: 2 }, // Libra
  8:  { row: 3, col: 1 }, // Scorpio
  9:  { row: 3, col: 0 }, // Sagittarius
  10: { row: 2, col: 0 }, // Capricorn
  11: { row: 1, col: 0 }, // Aquarius
};

// ============================================
// CHART DATA TYPES
// ============================================

export interface ChartPlanetData {
  name: string;
  degree?: number;
  house: number;
}

export interface ChartHouseData {
  house: number;
  sign: string;
  signNumber: number;
  planets: ChartPlanetData[];
}

// ============================================
// SCALING UTILITIES
// ============================================

export interface ScaleConfig {
  size: number;
  margin: number;
}

export function scalePosition(
  normalized: { x: number; y: number },
  config: ScaleConfig
): { x: number; y: number } {
  const innerSize = config.size - 2 * config.margin;
  return {
    x: config.margin + normalized.x * innerSize,
    y: config.margin + normalized.y * innerSize,
  };
}

export function getScaledFontSize(baseSize: number, scale: number): number {
  return Math.round(baseSize * scale);
}

// ============================================
// ZODIAC CONSTANTS
// ============================================

export const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
] as const;

export type ZodiacSign = typeof ZODIAC_SIGNS[number];

export function getSignIndex(sign: string): number {
  return ZODIAC_SIGNS.indexOf(sign as ZodiacSign);
}

export function getSignForHouse(ascendantSign: string, houseNumber: number): string {
  const ascIndex = getSignIndex(ascendantSign);
  if (ascIndex === -1) return '';
  const signIndex = (ascIndex + houseNumber - 1) % 12;
  return ZODIAC_SIGNS[signIndex];
}

export function getHouseForSign(ascendantSign: string, sign: string): number {
  const ascIndex = getSignIndex(ascendantSign);
  const signIndex = getSignIndex(sign);
  if (ascIndex === -1 || signIndex === -1) return 1;
  return ((signIndex - ascIndex + 12) % 12) + 1;
}
