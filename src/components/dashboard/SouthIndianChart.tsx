"use client";

import { House, Planet } from "@/types/kundali";

interface SouthIndianChartProps {
  houses: House[];
  planets: Planet[];
  ascendantSign: string;
}

// Zodiac signs in order
const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

// Short sign names
const SIGN_SHORT: Record<string, string> = {
  Aries: "Ar", Taurus: "Ta", Gemini: "Ge", Cancer: "Ca",
  Leo: "Le", Virgo: "Vi", Libra: "Li", Scorpio: "Sc",
  Sagittarius: "Sg", Capricorn: "Cp", Aquarius: "Aq", Pisces: "Pi"
};

// Zodiac symbols
const ZODIAC_SYMBOLS: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
  Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
  Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓"
};

// Planet abbreviations
const PLANET_SHORT: Record<string, string> = {
  Sun: "Su", Moon: "Mo", Mars: "Ma", Mercury: "Me",
  Jupiter: "Ju", Venus: "Ve", Saturn: "Sa", Rahu: "Ra", Ketu: "Ke",
  Uranus: "Ur", Neptune: "Ne", Pluto: "Pl"
};

// Planet colors
const PLANET_COLORS: Record<string, string> = {
  Sun: "#d97706", Moon: "#64748b", Mars: "#dc2626", Mercury: "#059669",
  Jupiter: "#ca8a04", Venus: "#db2777", Saturn: "#2563eb", Rahu: "#7c3aed", Ketu: "#ea580c"
};

// South Indian chart - Signs are FIXED at positions
// Pisces starts at top-left, going clockwise
const SOUTH_INDIAN_SIGN_POSITIONS: Record<string, number> = {
  Pisces: 0, Aries: 1, Taurus: 2, Gemini: 3,
  Cancer: 4, Leo: 5, Virgo: 6, Libra: 7,
  Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11
};

// Grid positions (row, col) for each of the 12 boxes
// Layout: 4x4 grid with center 2x2 empty
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

export function SouthIndianChart({ houses, planets, ascendantSign }: SouthIndianChartProps) {
  const cellSize = 90;
  const padding = 10;
  const totalSize = cellSize * 4 + padding * 2;
  
  // Get ascendant index
  const ascIndex = ZODIAC_SIGNS.indexOf(ascendantSign);
  
  // Get house number for a sign
  const getHouseForSign = (sign: string) => {
    const signIndex = ZODIAC_SIGNS.indexOf(sign);
    // House number = (signIndex - ascIndex + 12) % 12 + 1
    return ((signIndex - ascIndex + 12) % 12) + 1;
  };
  
  // Get planets in a sign
  const getPlanetsInSign = (sign: string) => {
    const house = houses.find(h => h.sign === sign);
    if (!house) return [];
    return planets.filter(p => p.house_no === house.house_no);
  };
  
  // Check if this sign is the ascendant
  const isAscendant = (sign: string) => sign === ascendantSign;

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-[rgba(0,0,0,0.08)] rounded-2xl p-6 shadow-xl shadow-black/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#2b2e38] flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair)' }}>
          <span className="text-[#7c3aed]">▣</span>
          South Indian Chart
        </h3>
        <span className="text-xs text-[#6b7280] bg-[#f3f4f6] px-2 py-1 rounded-full">
          Lagna: {ascendantSign}
        </span>
      </div>
      
      <div className="flex justify-center">
        <svg viewBox={`0 0 ${totalSize} ${totalSize}`} className="w-full max-w-[400px] h-auto">
          {/* Background */}
          <rect x="0" y="0" width={totalSize} height={totalSize} fill="#fffdf8" rx="8" />
          
          {/* Outer border */}
          <rect
            x={padding}
            y={padding}
            width={cellSize * 4}
            height={cellSize * 4}
            fill="none"
            stroke="#d4af37"
            strokeWidth="2"
            rx="4"
          />
          
          {/* Draw each sign box */}
          {ZODIAC_SIGNS.map((sign) => {
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
                  fill={isAsc ? "#f7e7b4" : "#ffffff"}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                
                {/* Ascendant diagonal line */}
                {isAsc && (
                  <line
                    x1={x}
                    y1={y}
                    x2={x + 20}
                    y2={y + 20}
                    stroke="#d4af37"
                    strokeWidth="2"
                  />
                )}
                
                {/* Sign symbol and abbreviation */}
                <text
                  x={x + 8}
                  y={y + 16}
                  className="text-[14px] fill-[#d4af37]"
                >
                  {ZODIAC_SYMBOLS[sign]}
                </text>
                <text
                  x={x + 24}
                  y={y + 16}
                  className="text-[10px] fill-[#9ca3af]"
                >
                  {SIGN_SHORT[sign]}
                </text>
                
                {/* House number */}
                <text
                  x={x + cellSize - 12}
                  y={y + 14}
                  textAnchor="end"
                  className="text-[10px] fill-[#7c3aed] font-medium"
                >
                  {houseNo}
                </text>
                
                {/* Planets */}
                <g>
                  {signPlanets.map((planet, idx) => {
                    const col = idx % 3;
                    const row = Math.floor(idx / 3);
                    return (
                      <text
                        key={planet.planet}
                        x={x + 10 + col * 28}
                        y={y + 38 + row * 18}
                        style={{ fill: PLANET_COLORS[planet.planet] || "#2b2e38" }}
                        className="text-[12px] font-semibold"
                      >
                        {PLANET_SHORT[planet.planet] || planet.planet.slice(0, 2)}
                      </text>
                    );
                  })}
                </g>
              </g>
            );
          })}
          
          {/* Center area - can show additional info */}
          <rect
            x={padding + cellSize}
            y={padding + cellSize}
            width={cellSize * 2}
            height={cellSize * 2}
            fill="#fafaf9"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          
          {/* Center text */}
          <text
            x={totalSize / 2}
            y={totalSize / 2 - 20}
            textAnchor="middle"
            className="text-[12px] fill-[#6b7280]"
          >
            South Indian
          </text>
          <text
            x={totalSize / 2}
            y={totalSize / 2}
            textAnchor="middle"
            className="text-[14px] fill-[#d4af37] font-semibold"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Kundali
          </text>
          <text
            x={totalSize / 2}
            y={totalSize / 2 + 20}
            textAnchor="middle"
            className="text-[11px] fill-[#7c3aed]"
          >
            Asc: {ZODIAC_SYMBOLS[ascendantSign]} {ascendantSign}
          </text>
        </svg>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-[10px]">
        {planets.slice(0, 9).map((planet) => (
          <span
            key={planet.planet}
            className="px-2 py-1 rounded-full bg-[#f3f4f6]"
            style={{ color: PLANET_COLORS[planet.planet] || "#2b2e38" }}
          >
            {PLANET_SHORT[planet.planet]} = {planet.planet}
          </span>
        ))}
      </div>
    </div>
  );
}

