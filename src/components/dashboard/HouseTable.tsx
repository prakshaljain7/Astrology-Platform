"use client";

import { House } from "@/types/kundali";
import { useTheme } from "@/context/ThemeContext";
import { zodiacSymbols, cssVars } from "@/lib/theme";

interface HouseTableProps {
  houses: House[];
}

export function HouseTable({ houses }: HouseTableProps) {
  const { themeColors } = useTheme();

  return (
    <div 
      className="backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl"
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        border: `1px solid ${themeColors.border.light}`,
        boxShadow: `0 25px 50px ${themeColors.shadow.soft}`
      }}
    >
      <div 
        className="px-6 py-4 border-b"
        style={{ 
          borderColor: themeColors.border.light,
          background: `linear-gradient(to right, ${themeColors.brand.accentBg}, ${themeColors.decorative.champagne || themeColors.brand.accentBg50})`
        }}
      >
        <h3 
          className="text-lg font-semibold flex items-center gap-2"
          style={{ color: themeColors.text.primary, fontFamily: cssVars.fontPlayfair }}
        >
          <span style={{ color: themeColors.brand.accent }}>⌂</span>
          House Details
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ background: `linear-gradient(to right, ${themeColors.brand.accentBg}, ${themeColors.decorative.champagne || themeColors.brand.accentBg50})` }}>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: themeColors.text.primary }}>
                House
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: themeColors.text.primary }}>
                Sign
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: themeColors.text.primary }}>
                Planets
              </th>
            </tr>
          </thead>
          <tbody>
            {houses.map((house, index) => {
              const planets = house.planets.map((p) => p.planet).join(", ") || "—";
              const symbol = zodiacSymbols[house.sign] || "";
              
              return (
                <tr
                  key={house.house_no}
                  className="transition-colors duration-200"
                  style={{
                    backgroundColor: index % 2 === 0 ? themeColors.background.white : themeColors.background.tableAlt,
                    borderBottom: `1px solid ${themeColors.border.light}`
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = themeColors.brand.accentBg}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? themeColors.background.white : themeColors.background.tableAlt}
                >
                  <td className="px-6 py-4">
                    <span 
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-semibold text-sm"
                      style={{ 
                        backgroundColor: themeColors.decorative.lavenderBg,
                        color: themeColors.brand.primary 
                      }}
                    >
                      {house.house_no}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg" style={{ color: themeColors.brand.accent }}>{symbol}</span>
                      <span className="font-medium" style={{ color: themeColors.text.primary }}>{house.sign}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      className="font-medium"
                      style={{ color: planets === "—" ? themeColors.text.muted : themeColors.status.success }}
                    >
                      {planets}
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
