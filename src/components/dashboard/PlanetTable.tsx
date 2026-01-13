"use client";

import { Planet } from "@/types/kundali";

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

// Zodiac sign symbols mapping
const ZODIAC_SYMBOLS: Record<string, string> = {
  Aries: "♈",
  Taurus: "♉",
  Gemini: "♊",
  Cancer: "♋",
  Leo: "♌",
  Virgo: "♍",
  Libra: "♎",
  Scorpio: "♏",
  Sagittarius: "♐",
  Capricorn: "♑",
  Aquarius: "♒",
  Pisces: "♓",
};

// Planet colors for visual distinction
const PLANET_COLORS: Record<string, string> = {
  Sun: "text-amber-500",
  Moon: "text-slate-500",
  Mars: "text-red-500",
  Mercury: "text-emerald-500",
  Jupiter: "text-yellow-600",
  Venus: "text-pink-500",
  Saturn: "text-blue-600",
  Rahu: "text-purple-500",
  Ketu: "text-orange-500",
};

export function PlanetTable({ planets }: PlanetTableProps) {
  return (
    <div className="bg-white/88 backdrop-blur-sm border border-[rgba(0,0,0,0.06)] rounded-2xl overflow-hidden shadow-xl shadow-black/5">
      <div className="px-6 py-4 border-b border-[rgba(0,0,0,0.06)] bg-gradient-to-r from-[#e6ddff] to-[#f6c1cc]/50">
        <h3 className="text-lg font-semibold text-[#4a3b5a] flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair)' }}>
          <span className="text-[#7c3aed]">✧</span>
          Planet Details
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-[#e6ddff]/50 to-[#f6c1cc]/30">
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#4a3b5a] uppercase tracking-wider">
                Planet
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#4a3b5a] uppercase tracking-wider">
                Sign
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#4a3b5a] uppercase tracking-wider">
                Degree
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#4a3b5a] uppercase tracking-wider">
                House
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(0,0,0,0.06)]">
            {planets.map((planet, index) => {
              const planetSymbol = PLANET_SYMBOLS[planet.planet] || "⭐";
              const signSymbol = ZODIAC_SYMBOLS[planet.sign] || "";
              const planetColor = PLANET_COLORS[planet.planet] || "text-[#2b2e38]";
              
              return (
                <tr
                  key={planet.planet}
                  className={`
                    transition-colors duration-200 hover:bg-[#f5f0ff]
                    ${index % 2 === 0 ? "bg-white" : "bg-[#fdfcff]"}
                  `}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-2xl ${planetColor}`}>{planetSymbol}</span>
                      <span className="text-[#2f3440] font-medium">{planet.planet}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[#d4af37] text-lg">{signSymbol}</span>
                      <span className="text-[#2f3440]">{planet.sign}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#6b7280]">
                    {planet.degree}°
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#f7e7b4]/50 text-[#d4af37] font-semibold text-sm">
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
