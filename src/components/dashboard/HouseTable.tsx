"use client";

import { House } from "@/types/kundali";
import { colors, zodiacSymbols, cssVars } from "@/lib/theme";

interface HouseTableProps {
  houses: House[];
}

export function HouseTable({ houses }: HouseTableProps) {
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
          background: `linear-gradient(to right, #fff6d8, ${colors.decorative.champagne})`
        }}
      >
        <h3 
          className="text-lg font-semibold flex items-center gap-2"
          style={{ color: colors.text.primary, fontFamily: cssVars.fontPlayfair }}
        >
          <span style={{ color: colors.brand.accent }}>⌂</span>
          House Details
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ background: `linear-gradient(to right, #fff6d8, ${colors.decorative.champagne})` }}>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.text.primary }}>
                House
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.text.primary }}>
                Sign
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.text.primary }}>
                Cusp Degree
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.text.primary }}>
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
                    backgroundColor: index % 2 === 0 ? colors.background.white : '#fffdf6',
                    borderBottom: `1px solid ${colors.border.light}`
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5efd9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? colors.background.white : '#fffdf6'}
                >
                  <td className="px-6 py-4">
                    <span 
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-semibold text-sm"
                      style={{ 
                        backgroundColor: colors.decorative.lavenderBg,
                        color: colors.brand.primary 
                      }}
                    >
                      {house.house_no}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg" style={{ color: colors.brand.accent }}>{symbol}</span>
                      <span className="font-medium" style={{ color: colors.text.primary }}>{house.sign}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4" style={{ color: colors.text.secondary }}>
                    {house.cusp_degree}°
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      className="font-medium"
                      style={{ color: planets === "—" ? colors.text.muted : colors.status.success }}
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
