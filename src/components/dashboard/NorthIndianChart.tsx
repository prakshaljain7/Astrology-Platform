"use client";

import { Planet } from "@/types/kundali";

interface NorthIndianChartProps {
  houses: { house_no: number; sign: string; planets: { planet: string }[] }[];
  planets: Planet[];
  ascendantSign: string;
}

// Planet abbreviations
const PLANET_SHORT: Record<string, string> = {
  Sun: "Su", Moon: "Mo", Mars: "Ma", Mercury: "Me",
  Jupiter: "Ju", Venus: "Ve", Saturn: "Sa", Rahu: "Ra", Ketu: "Ke",
  Uranus: "Ur", Neptune: "Ne", Pluto: "Pl"
};

// Planet colors (darker for light background)
const PLANET_COLORS: Record<string, string> = {
  Sun: "#b45309", Moon: "#374151", Mars: "#b91c1c", Mercury: "#047857",
  Jupiter: "#a16207", Venus: "#be185d", Saturn: "#1e40af", Rahu: "#6d28d9", Ketu: "#c2410c"
};

/*
  North Indian Chart - Traditional Diamond Layout
  ================================================
  
  Based on reference image structure:
  - Outer square border
  - X from corners (diagonal lines meeting at center)
  - Diamond connecting midpoints of sides
  
  Creates 12 house regions:
  
         ┌─────────────────────────────┐
         │╲    12    │      1      ╱  2│
         │  ╲        │           ╱    │
         │    ╲   11 │  Ma    ╱   3  │
         │      ╲    │      ╱        │
         │  10    ╲  │    ╱    4     │
         │──────────╲│╱──────────────│
         │            ╳              │
         │──────────╱│╲──────────────│
         │   9    ╱  │  ╲     5      │
         │      ╱    │    ╲          │
         │    ╱   8  │  Mo  ╲   6    │
         │  ╱        │        ╲      │
         │╱    7     │          ╲    │
         └─────────────────────────────┘
*/

// House position configuration matching reference image exactly
const HOUSE_CONFIG: Record<number, { 
  labelX: number; labelY: number;     // House number position
  planetX: number; planetY: number;   // Planet text center position
}> = {
  // House 1: Top center large triangle (Ascendant)
  1:  { labelX: 200, labelY: 95, planetX: 200, planetY: 60 },
  
  // House 2: Top right corner small triangle  
  2:  { labelX: 340, labelY: 95, planetX: 345, planetY: 55 },
  
  // House 3: Right side triangle (outside diamond)
  3:  { labelX: 340, labelY: 175, planetX: 345, planetY: 200 },
  
  // House 4: Right side triangle (outside diamond, lower)
  4:  { labelX: 340, labelY: 260, planetX: 345, planetY: 230 },
  
  // House 5: Center right small triangle (inside diamond)
  5:  { labelX: 265, labelY: 235, planetX: 280, planetY: 270 },
  
  // House 6: Bottom right corner small triangle
  6:  { labelX: 340, labelY: 340, planetX: 345, planetY: 375 },
  
  // House 7: Bottom center large triangle
  7:  { labelX: 200, labelY: 340, planetX: 200, planetY: 375 },
  
  // House 8: Bottom left corner small triangle
  8:  { labelX: 60, labelY: 340, planetX: 55, planetY: 375 },
  
  // House 9: Center left small triangle (inside diamond)
  9:  { labelX: 135, labelY: 235, planetX: 120, planetY: 270 },
  
  // House 10: Left side triangle (outside diamond, lower)
  10: { labelX: 60, labelY: 260, planetX: 55, planetY: 230 },
  
  // House 11: Left side triangle (outside diamond, upper)
  11: { labelX: 60, labelY: 175, planetX: 55, planetY: 200 },
  
  // House 12: Top left corner small triangle
  12: { labelX: 60, labelY: 95, planetX: 55, planetY: 55 },
};

export function NorthIndianChart({ planets, ascendantSign }: NorthIndianChartProps) {
  // Get planets in a house
  const getPlanetsInHouse = (houseNo: number): Planet[] => {
    return planets.filter(p => p.house_no === houseNo);
  };

  // Render planets for a house
  const renderPlanets = (houseNo: number) => {
    const housePlanets = getPlanetsInHouse(houseNo);
    const config = HOUSE_CONFIG[houseNo];
    
    if (housePlanets.length === 0) return null;
    
    return housePlanets.map((planet, idx) => {
      // Arrange planets - single column for cleaner look
      const offsetY = idx * 22;
      
      return (
        <text
          key={`${houseNo}-${planet.planet}`}
          x={config.planetX}
          y={config.planetY + offsetY}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fill: PLANET_COLORS[planet.planet] || "#1f2937" }}
          className="text-[16px] font-bold"
          fontFamily="system-ui, sans-serif"
        >
          {PLANET_SHORT[planet.planet] || planet.planet.slice(0, 2)}
        </text>
      );
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-[rgba(0,0,0,0.1)] rounded-2xl p-6 shadow-xl shadow-black/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#2b2e38] flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair)' }}>
          <span className="text-[#d4af37]">◇</span>
          North Indian Chart
        </h3>
        <span className="text-xs text-[#6b7280] bg-[#f3f4f6] px-3 py-1 rounded-full font-medium">
          Lagna: {ascendantSign}
        </span>
      </div>
      
      <div className="flex justify-center">
        <svg viewBox="0 0 400 430" className="w-full max-w-[420px] h-auto">
          {/* Background */}
          <rect x="0" y="0" width="400" height="430" fill="#f9fafb" rx="8" />
          
          {/* Outer square border */}
          <rect
            x="20"
            y="20"
            width="360"
            height="360"
            fill="#ffffff"
            stroke="#111827"
            strokeWidth="2.5"
          />
          
          {/* Diagonal lines from corners to opposite corners (X pattern) */}
          <line x1="20" y1="20" x2="380" y2="380" stroke="#111827" strokeWidth="2" />
          <line x1="380" y1="20" x2="20" y2="380" stroke="#111827" strokeWidth="2" />
          
          {/* Inner diamond (connecting midpoints of each side) */}
          <polygon
            points="200,20 380,200 200,380 20,200"
            fill="none"
            stroke="#111827"
            strokeWidth="2"
          />
          
          {/* House numbers - positioned as in reference image */}
          {/* Corner houses */}
          <text x="172" y="40" className="text-[13px] fill-[#4b5563] font-medium" textAnchor="middle">6</text>
          <text x="360" y="40" className="text-[13px] fill-[#4b5563] font-medium" textAnchor="middle">4</text>
          <text x="172" y="390" className="text-[13px] fill-[#4b5563] font-medium" textAnchor="middle">9</text>
          <text x="228" y="390" className="text-[13px] fill-[#4b5563] font-medium" textAnchor="middle">10</text>
          <text x="360" y="375" className="text-[13px] fill-[#4b5563] font-medium" textAnchor="middle">1</text>
          <text x="325" y="390" className="text-[13px] fill-[#4b5563] font-medium" textAnchor="middle">12</text>
          <text x="40" y="40" className="text-[13px] fill-[#4b5563] font-medium" textAnchor="middle">7</text>
          
          {/* Side houses */}
          <text x="360" y="185" className="text-[13px] fill-[#4b5563] font-medium" textAnchor="middle">3</text>
          <text x="40" y="220" className="text-[13px] fill-[#4b5563] font-medium" textAnchor="middle">9</text>
          
          {/* Inner diamond house numbers */}
          <text x="220" y="168" className="text-[13px] fill-[#4b5563] font-medium" textAnchor="middle">5</text>
          <text x="155" y="215" className="text-[13px] fill-[#4b5563] font-medium" textAnchor="middle">8</text>
          <text x="245" y="215" className="text-[13px] fill-[#4b5563] font-medium" textAnchor="middle">2</text>
          <text x="200" y="265" className="text-[13px] fill-[#4b5563] font-medium" textAnchor="middle">11</text>
          
          {/* Render planets in their houses */}
          {/* House 1 - Top triangle center (main area) */}
          {getPlanetsInHouse(1).map((planet, idx) => (
            <text
              key={`h1-${planet.planet}`}
              x={200}
              y={80 + idx * 22}
              textAnchor="middle"
              style={{ fill: PLANET_COLORS[planet.planet] || "#1f2937" }}
              className="text-[16px] font-bold"
            >
              {PLANET_SHORT[planet.planet]}
            </text>
          ))}
          
          {/* House 2 - Top right inner */}
          {getPlanetsInHouse(2).map((planet, idx) => (
            <text
              key={`h2-${planet.planet}`}
              x={280}
              y={105 + idx * 20}
              textAnchor="middle"
              style={{ fill: PLANET_COLORS[planet.planet] || "#1f2937" }}
              className="text-[16px] font-bold"
            >
              {PLANET_SHORT[planet.planet]}
            </text>
          ))}
          
          {/* House 3 - Right side */}
          {getPlanetsInHouse(3).map((planet, idx) => (
            <text
              key={`h3-${planet.planet}`}
              x={335}
              y={150 + idx * 20}
              textAnchor="middle"
              style={{ fill: PLANET_COLORS[planet.planet] || "#1f2937" }}
              className="text-[16px] font-bold"
            >
              {PLANET_SHORT[planet.planet]}
            </text>
          ))}
          
          {/* House 4 - Top right corner */}
          {getPlanetsInHouse(4).map((planet, idx) => (
            <text
              key={`h4-${planet.planet}`}
              x={335}
              y={65 + idx * 20}
              textAnchor="middle"
              style={{ fill: PLANET_COLORS[planet.planet] || "#1f2937" }}
              className="text-[16px] font-bold"
            >
              {PLANET_SHORT[planet.planet]}
            </text>
          ))}
          
          {/* House 5 - Bottom right inner */}
          {getPlanetsInHouse(5).map((planet, idx) => (
            <text
              key={`h5-${planet.planet}`}
              x={280}
              y={300 + idx * 20}
              textAnchor="middle"
              style={{ fill: PLANET_COLORS[planet.planet] || "#1f2937" }}
              className="text-[16px] font-bold"
            >
              {PLANET_SHORT[planet.planet]}
            </text>
          ))}
          
          {/* House 6 - Bottom right corner */}
          {getPlanetsInHouse(6).map((planet, idx) => (
            <text
              key={`h6-${planet.planet}`}
              x={335}
              y={335 + idx * 20}
              textAnchor="middle"
              style={{ fill: PLANET_COLORS[planet.planet] || "#1f2937" }}
              className="text-[16px] font-bold"
            >
              {PLANET_SHORT[planet.planet]}
            </text>
          ))}
          
          {/* House 7 - Bottom center large triangle */}
          {getPlanetsInHouse(7).map((planet, idx) => (
            <text
              key={`h7-${planet.planet}`}
              x={200}
              y={325 + idx * 22}
              textAnchor="middle"
              style={{ fill: PLANET_COLORS[planet.planet] || "#1f2937" }}
              className="text-[16px] font-bold"
            >
              {PLANET_SHORT[planet.planet]}
            </text>
          ))}
          
          {/* House 8 - Bottom left inner */}
          {getPlanetsInHouse(8).map((planet, idx) => (
            <text
              key={`h8-${planet.planet}`}
              x={120}
              y={300 + idx * 20}
              textAnchor="middle"
              style={{ fill: PLANET_COLORS[planet.planet] || "#1f2937" }}
              className="text-[16px] font-bold"
            >
              {PLANET_SHORT[planet.planet]}
            </text>
          ))}
          
          {/* House 9 - Left side */}
          {getPlanetsInHouse(9).map((planet, idx) => (
            <text
              key={`h9-${planet.planet}`}
              x={65}
              y={250 + idx * 20}
              textAnchor="middle"
              style={{ fill: PLANET_COLORS[planet.planet] || "#1f2937" }}
              className="text-[16px] font-bold"
            >
              {PLANET_SHORT[planet.planet]}
            </text>
          ))}
          
          {/* House 10 - Bottom left corner */}
          {getPlanetsInHouse(10).map((planet, idx) => (
            <text
              key={`h10-${planet.planet}`}
              x={65}
              y={335 + idx * 20}
              textAnchor="middle"
              style={{ fill: PLANET_COLORS[planet.planet] || "#1f2937" }}
              className="text-[16px] font-bold"
            >
              {PLANET_SHORT[planet.planet]}
            </text>
          ))}
          
          {/* House 11 - Top left inner */}
          {getPlanetsInHouse(11).map((planet, idx) => (
            <text
              key={`h11-${planet.planet}`}
              x={120}
              y={105 + idx * 20}
              textAnchor="middle"
              style={{ fill: PLANET_COLORS[planet.planet] || "#1f2937" }}
              className="text-[16px] font-bold"
            >
              {PLANET_SHORT[planet.planet]}
            </text>
          ))}
          
          {/* House 12 - Top left corner */}
          {getPlanetsInHouse(12).map((planet, idx) => (
            <text
              key={`h12-${planet.planet}`}
              x={65}
              y={65 + idx * 20}
              textAnchor="middle"
              style={{ fill: PLANET_COLORS[planet.planet] || "#1f2937" }}
              className="text-[16px] font-bold"
            >
              {PLANET_SHORT[planet.planet]}
            </text>
          ))}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-[rgba(0,0,0,0.06)]">
        <div className="flex flex-wrap justify-center gap-2 text-[11px]">
          {planets.map((planet) => (
            <span
              key={planet.planet}
              className="px-2 py-1 rounded-full bg-[#f3f4f6] font-medium"
              style={{ color: PLANET_COLORS[planet.planet] || "#1f2937" }}
            >
              {PLANET_SHORT[planet.planet]} = {planet.planet}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
