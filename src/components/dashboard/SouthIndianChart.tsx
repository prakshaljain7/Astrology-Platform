"use client";

import { Planet } from "@/types/kundali";
import { 
  colors, 
  planetColors, 
  planetShort, 
  zodiacSigns, 
  zodiacSymbols,
  zodiacShort,
  chartTheme,
  cssVars 
} from "@/lib/theme";

interface SouthIndianChartProps {
  planets: Planet[];
  ascendantSign: string;
}

// South Indian chart - Signs are FIXED at positions
// Pisces starts at top-left, going clockwise
const SOUTH_INDIAN_SIGN_POSITIONS: Record<string, number> = {
  Pisces: 0, Aries: 1, Taurus: 2, Gemini: 3,
  Cancer: 4, Leo: 5, Virgo: 6, Libra: 7,
  Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11
};

// Grid positions (row, col) for each of the 12 boxes
const GRID_POSITIONS = [
  { row: 0, col: 0 }, // 0 - Pisces
  { row: 0, col: 1 }, // 1 - Aries
  { row: 0, col: 2 }, // 2 - Taurus
  { row: 0, col: 3 }, // 3 - Gemini
  { row: 1, col: 3 }, // 4 - Cancer
  { row: 2, col: 3 }, // 5 - Leo
  { row: 3, col: 3 }, // 6 - Virgo
  { row: 3, col: 2 }, // 7 - Libra
  { row: 3, col: 1 }, // 8 - Scorpio
  { row: 3, col: 0 }, // 9 - Sagittarius
  { row: 2, col: 0 }, // 10 - Capricorn
  { row: 1, col: 0 }, // 11 - Aquarius
];

export function SouthIndianChart({ planets, ascendantSign }: SouthIndianChartProps) {
  const cellSize = 90;
  const padding = 10;
  const totalSize = cellSize * 4 + padding * 2;
  
  // Get ascendant index
  const ascIndex = zodiacSigns.indexOf(ascendantSign as typeof zodiacSigns[number]);
  
  // Get house number for a sign based on ascendant
  const getHouseForSign = (sign: string) => {
    const signIndex = zodiacSigns.indexOf(sign as typeof zodiacSigns[number]);
    if (signIndex === -1 || ascIndex === -1) return 1;
    return ((signIndex - ascIndex + 12) % 12) + 1;
  };
  
  // Get planets in a sign using house_no from API
  const getPlanetsInSign = (sign: string): Planet[] => {
    const houseNo = getHouseForSign(sign);
    return planets.filter(p => p.house_no === houseNo);
  };
  
  // Check if this sign is the ascendant
  const isAscendant = (sign: string) => sign === ascendantSign;

  return (
    <div 
      className="backdrop-blur-sm rounded-2xl p-6 shadow-xl"
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        border: `1px solid ${colors.border.soft}`,
        boxShadow: `0 25px 50px ${colors.shadow.soft}`
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 
          className="text-lg font-semibold flex items-center gap-2"
          style={{ color: colors.text.primary, fontFamily: cssVars.fontPlayfair }}
        >
          <span style={{ color: colors.brand.accent }}>▣</span>
          South Indian Chart
        </h3>
        <span 
          className="text-xs px-2 py-1 rounded-full"
          style={{ color: colors.text.secondary, backgroundColor: colors.background.hover }}
        >
          Lagna: {ascendantSign} {zodiacSymbols[ascendantSign] || ""}
        </span>
      </div>
      
      <div className="flex justify-center">
        <svg viewBox={`0 0 ${totalSize} ${totalSize}`} className="w-full max-w-[400px] h-auto">
          {/* Background */}
          <rect x="0" y="0" width={totalSize} height={totalSize} fill={chartTheme.background} rx="8" />
          
          {/* Outer border */}
          <rect
            x={padding}
            y={padding}
            width={cellSize * 4}
            height={cellSize * 4}
            fill="none"
            stroke={chartTheme.borderPrimary}
            strokeWidth="2"
            rx="4"
          />
          
          {/* Draw each sign box */}
          {zodiacSigns.map((sign) => {
            const posIndex = SOUTH_INDIAN_SIGN_POSITIONS[sign];
            const gridPos = GRID_POSITIONS[posIndex];
            const x = padding + gridPos.col * cellSize;
            const y = padding + gridPos.row * cellSize;
            const houseNo = getHouseForSign(sign);
            const signPlanets = getPlanetsInSign(sign);
            const isAsc = isAscendant(sign);
            
            return (
              <g key={sign}>
                {/* Cell background */}
                <rect
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  fill={chartTheme.cardBg}
                  stroke={chartTheme.borderSecondary}
                  strokeWidth="1"
                />
                
                
                {/* Sign symbol and abbreviation */}
                <text
                  x={x + 8}
                  y={y + 16}
                  fontSize="14"
                  fill={chartTheme.signColor}
                >
                  {zodiacSymbols[sign] || ""}
                </text>
                
                {/* House number */}
                <text
                  x={x + cellSize - 12}
                  y={y + 14}
                  textAnchor="end"
                  fontSize="10"
                  fontWeight="500"
                  fill={chartTheme.houseNumberColor}
                >
                  {houseNo}
                </text>
                
                {/* Planets - using house_no from API */}
                <g>
                  {signPlanets.map((planet, idx) => {
                    const col = idx % 3;
                    const row = Math.floor(idx / 3);
                    return (
                      <text
                        key={planet.planet}
                        x={x + 10 + col * 28}
                        y={y + 38 + row * 18}
                        fill={planetColors[planet.planet] || colors.text.primary}
                        fontSize="12"
                        fontWeight="600"
                      >
                        {planetShort[planet.planet] || planet.planet.slice(0, 2)}
                      </text>
                    );
                  })}
                </g>
              </g>
            );
          })}
          
          {/* Center area */}
          <rect
            x={padding + cellSize}
            y={padding + cellSize}
            width={cellSize * 2}
            height={cellSize * 2}
            fill={colors.background.secondary}
            stroke={chartTheme.borderPrimary}
            strokeWidth="1"
          />
          
          {/* Center diagonal lines */}
          <line
            x1={padding + cellSize}
            y1={padding + cellSize}
            x2={padding + cellSize * 3}
            y2={padding + cellSize * 3}
            stroke={chartTheme.borderSecondary}
            strokeWidth="1"
          />
          <line
            x1={padding + cellSize * 3}
            y1={padding + cellSize}
            x2={padding + cellSize}
            y2={padding + cellSize * 3}
            stroke={chartTheme.borderSecondary}
            strokeWidth="1"
          />
        </svg>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-[10px]">
        {planets.slice(0, 9).map((planet) => (
          <span
            key={planet.planet}
            className="px-2 py-1 rounded-full"
            style={{ 
              backgroundColor: colors.background.hover,
              color: planetColors[planet.planet] || colors.text.primary 
            }}
          >
            {planetShort[planet.planet] || planet.planet.slice(0, 2)} = {planet.planet}
          </span>
        ))}
      </div>
    </div>
  );
}
