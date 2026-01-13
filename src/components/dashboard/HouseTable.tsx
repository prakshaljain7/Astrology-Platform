"use client";

import { House } from "@/types/kundali";

interface HouseTableProps {
  houses: House[];
}

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

export function HouseTable({ houses }: HouseTableProps) {
  return (
    <div className="bg-white/88 backdrop-blur-sm border border-[rgba(0,0,0,0.06)] rounded-2xl overflow-hidden shadow-xl shadow-black/5">
      <div className="px-6 py-4 border-b border-[rgba(0,0,0,0.06)] bg-gradient-to-r from-[#fff6d8] to-[#f7e7b4]">
        <h3 className="text-lg font-semibold text-[#4a3b15] flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair)' }}>
          <span className="text-[#d4af37]">⌂</span>
          House Details
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-[#fff6d8] to-[#f7e7b4]">
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#4a3b15] uppercase tracking-wider">
                House
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#4a3b15] uppercase tracking-wider">
                Sign
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#4a3b15] uppercase tracking-wider">
                Cusp Degree
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#4a3b15] uppercase tracking-wider">
                Planets
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(0,0,0,0.06)]">
            {houses.map((house, index) => {
              const planets = house.planets.map((p) => p.planet).join(", ") || "—";
              const symbol = ZODIAC_SYMBOLS[house.sign] || "";
              
              return (
                <tr
                  key={house.house_no}
                  className={`
                    transition-colors duration-200 hover:bg-[#f5efd9]
                    ${index % 2 === 0 ? "bg-white" : "bg-[#fffdf6]"}
                  `}
                >
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#e6ddff]/50 text-[#7c3aed] font-semibold text-sm">
                      {house.house_no}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[#d4af37] text-lg">{symbol}</span>
                      <span className="text-[#2f3440] font-medium">{house.sign}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#6b7280]">
                    {house.cusp_degree}°
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${planets === "—" ? "text-[#9ca3af]" : "text-emerald-600"}`}>
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
