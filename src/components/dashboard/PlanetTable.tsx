"use client";

import { Planet } from "@/types/kundali";
import { colors, zodiacSymbols, planetColors, cssVars } from "@/lib/theme";

interface PlanetTableProps {
  planets: Planet[];
}

// Planet symbols mapping
const PLANET_SYMBOLS: Record<string, string> = {
  Sun: "☉",
  Moon: "☽",
  Mars: "♂",
  Mercury: "☿",
  Jupiter: "♃",
  Venus: "♀",
  Saturn: "♄",
  Rahu: "☊",
  Ketu: "☋",
  Uranus: "♅",
  Neptune: "♆",
  Pluto: "♇",
};

export function PlanetTable({ planets }: PlanetTableProps) {
  return (
    <div 
      className="backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl"
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        border: `1px solid ${colors.border.light}`,
        boxShadow: `0 25px 50px ${colors.shadow.soft}`
      }}
    >
      <div 
        className="px-6 py-4 border-b"
        style={{ 
          borderColor: colors.border.light,
          background: `linear-gradient(to right, ${colors.decorative.lavender}, ${colors.decorative.roseBg})`
        }}
      >
        <h3 
          className="text-lg font-semibold flex items-center gap-2"
          style={{ color: colors.text.primary, fontFamily: cssVars.fontPlayfair }}
        >
          <span style={{ color: colors.brand.primary }}>✧</span>
          Planet Details
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ background: `linear-gradient(to right, ${colors.decorative.lavenderBg}, ${colors.decorative.roseBg})` }}>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.text.primary }}>
                Planet
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.text.primary }}>
                Sign
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.text.primary }}>
                Degree
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.text.primary }}>
                House
              </th>
            </tr>
          </thead>
          <tbody style={{ borderColor: colors.border.light }}>
            {planets.map((planet, index) => {
              const planetSymbol = PLANET_SYMBOLS[planet.planet] || "⭐";
              const signSymbol = zodiacSymbols[planet.sign] || "";
              const planetColor = planetColors[planet.planet] || colors.text.primary;
              
              return (
                <tr
                  key={planet.planet}
                  className="transition-colors duration-200"
                  style={{
                    backgroundColor: index % 2 === 0 ? colors.background.white : colors.background.tableAlt,
                    borderBottom: `1px solid ${colors.border.light}`
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.decorative.lavenderBg}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? colors.background.white : colors.background.tableAlt}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" style={{ color: planetColor }}>{planetSymbol}</span>
                      <span className="font-medium" style={{ color: colors.text.primary }}>{planet.planet}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg" style={{ color: colors.brand.accent }}>{signSymbol}</span>
                      <span style={{ color: colors.text.primary }}>{planet.sign}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4" style={{ color: colors.text.secondary }}>
                    {planet.degree}°
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-semibold text-sm"
                      style={{ 
                        backgroundColor: colors.brand.accentBg50,
                        color: colors.brand.accent 
                      }}
                    >
                      {planet.house_no}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
