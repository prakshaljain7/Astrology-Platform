"use client";

import { Planet } from "@/types/kundali";
import { 
  colors, 
  planetColors, 
  planetShort, 
  zodiacSigns, 
  zodiacSymbols,
  chartTheme,
  cssVars 
} from "@/lib/theme";

interface NorthIndianChartProps {
  planets: Planet[];
  ascendantSign: string;
}

/*
  Traditional North Indian Chart Layout
  =====================================
  
  House 1 (Ascendant/Lagna) is at TOP CENTER
  Houses proceed COUNTER-CLOCKWISE (1 → 2 at top-left → 3 → ... → 12 at top-right)
*/

// Sign positions - where zodiac symbols are displayed (corners/edges)
const SIGN_POSITIONS: Record<number, { x: number; y: number }> = {
  1:  { x: 200, y: 180 },   // Top center
  2:  { x: 110,  y: 90 },   // Top left
  3:  { x: 90,  y: 110 },  // Left upper
  4:  { x: 110,  y: 130 },  // Left lower
  5:  { x: 90,  y: 290 },  // Bottom left
  6:  { x: 110, y: 310 },  // Bottom left-center
  7:  { x: 200, y: 220 },  // Bottom center
  8:  { x: 290, y: 310 },  // Bottom right-center
  9:  { x: 310, y: 290 },  // Bottom right
  10: { x: 290, y: 130 },  // Right lower
  11: { x: 310, y: 110 },  // Right upper
  12: { x: 290, y: 90 },   // Top right
};

// Planet positions - center of each triangular house
const PLANET_CENTER_POSITIONS: Record<number, { x: number; y: number }> = {
  1:  { x: 200, y: 110 },  // Top center triangle
  2:  { x: 110, y: 55 },  // Top left triangle
  3:  { x: 55,  y: 110 },  // Left upper triangle
  4:  { x: 110,  y: 200 },  // Left lower triangle
  5:  { x: 55, y: 290 },  // Bottom left corner
  6:  { x: 110, y: 345 },  // Bottom left-center
  7:  { x: 200, y: 290 },  // Bottom center triangle
  8:  { x: 290, y: 345 },  // Bottom right-center
  9:  { x: 345, y: 290 },  // Bottom right corner
  10: { x: 290, y: 200 },  // Right lower triangle
  11: { x: 345, y: 110 },  // Right upper triangle
  12: { x: 290, y: 55 },  // Top right triangle
};

export function NorthIndianChart({ planets, ascendantSign }: NorthIndianChartProps) {
  const size = 400;
  const margin = 20;
  const inner = size - 2 * margin;
  const mid = size / 2;

  // Get ascendant index in zodiac
  const ascendantIndex = zodiacSigns.indexOf(ascendantSign as typeof zodiacSigns[number]);

  // Calculate sign for a given house number based on ascendant
  const getSignForHouse = (houseNo: number): string => {
    if (ascendantIndex === -1) return "";
    const signIndex = (ascendantIndex + houseNo - 1) % 12;
    return zodiacSigns[signIndex];
  };

  // Get planets in a house using planet.house_no from API
  const getPlanetsInHouse = (houseNo: number): Planet[] => {
    return planets.filter(p => p.house_no === houseNo);
  };

  // Render signs for all houses
  const renderSigns = () => {
    return (
      <g className="signs-group">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((houseNo) => {
          const pos = SIGN_POSITIONS[houseNo];
          const sign = getSignForHouse(houseNo);
          
          return (
            <text
              key={`sign-${houseNo}`}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fill={chartTheme.signColor}
            >
              {zodiacSymbols[sign] || ""}
            </text>
          );
        })}
      </g>
    );
  };
  // Render planets for all houses
  const renderPlanets = () => {
    return (
      <g className="planets-group">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((houseNo) => {
          const centerPos = PLANET_CENTER_POSITIONS[houseNo];
    const housePlanets = getPlanetsInHouse(houseNo);
    
    if (housePlanets.length === 0) return null;
    
          return (
            <g key={`planets-house-${houseNo}`}>
              {housePlanets.map((planet, idx) => {
                // Arrange planets in a grid around the center
                const totalPlanets = housePlanets.length;
                const cols = Math.min(totalPlanets, 3);
                const col = idx % cols;
                const row = Math.floor(idx / cols);
                
                // Calculate offset from center
                const colOffset = (col - (cols - 1) / 2) * 22;
                const rowOffset = (row - (Math.ceil(totalPlanets / cols) - 1) / 2) * 14;
      
      return (
        <text
                    key={`planet-${houseNo}-${planet.planet}`}
                    x={centerPos.x + colOffset}
                    y={centerPos.y + rowOffset}
          textAnchor="middle"
          dominantBaseline="middle"
                    fill={planetColors[planet.planet] || colors.text.primary}
                    fontSize="11"
                    fontWeight="600"
                  >
                    {planetShort[planet.planet] || planet.planet.slice(0, 2)}
        </text>
      );
              })}
            </g>
          );
        })}
      </g>
    );
  };

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
          <span style={{ color: colors.brand.accent }}>◇</span>
          North Indian Chart
        </h3>
        <span 
          className="text-xs px-2 py-1 rounded-full"
          style={{ color: colors.text.secondary, backgroundColor: colors.background.hover }}
        >
          Lagna: {ascendantSign} {zodiacSymbols[ascendantSign] || ""}
        </span>
      </div>
      
      <div className="flex justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[400px] h-auto">
          {/* Background */}
          <rect x="0" y="0" width={size} height={size} fill={chartTheme.background} rx="8" />
          
          {/* Main chart area - white background */}
          <rect
            x={margin}
            y={margin}
            width={inner}
            height={inner}
            fill={chartTheme.cardBg}
          />
          
          {/* Outer square border */}
          <rect
            x={margin}
            y={margin}
            width={inner}
            height={inner}
            fill="none"
            stroke={chartTheme.borderPrimary}
            strokeWidth="2"
          />
          
          {/* Diagonal lines from corners (X pattern) */}
          <line 
            x1={margin} y1={margin} 
            x2={size - margin} y2={size - margin} 
            stroke={chartTheme.borderPrimary}
            strokeWidth="1.5" 
          />
          <line 
            x1={size - margin} y1={margin} 
            x2={margin} y2={size - margin} 
            stroke={chartTheme.borderPrimary}
            strokeWidth="1.5" 
          />
          
          {/* Inner diamond connecting midpoints of sides */}
          <polygon
            points={`${mid},${margin} ${size - margin},${mid} ${mid},${size - margin} ${margin},${mid}`}
            fill="none"
            stroke={chartTheme.borderPrimary}
            strokeWidth="1.5"
          />
          
          {/* Render signs separately */}
          {renderSigns()}
          
          {/* Render planets separately */}
          {renderPlanets()}
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
