"use client";

import { Ascendant } from "@/types/kundali";

interface AscendantCardProps {
  ascendant: Ascendant;
  ayanamsa: string;
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

export function AscendantCard({ ascendant, ayanamsa }: AscendantCardProps) {
  const symbol = ZODIAC_SYMBOLS[ascendant.sign] || "☉";

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#fffdf7] to-[#f7f1de] border border-[#d4af37]/35 rounded-2xl p-6 shadow-xl shadow-black/5">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#e6ddff]/30 rounded-full blur-2xl" />
      
      <div className="relative flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#f7e7b4] flex items-center justify-center shadow-lg shadow-[#d4af37]/30">
            <span className="text-3xl text-white drop-shadow-sm">{symbol}</span>
          </div>
          <div>
            <p className="text-[#6b7280] text-sm uppercase tracking-wider font-medium">Ascendant (Lagna)</p>
            <p className="text-2xl font-semibold text-[#2b2e38]" style={{ fontFamily: 'var(--font-playfair)' }}>
              {ascendant.sign}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="text-[#6b7280] text-xs uppercase tracking-wider font-medium">Degree</p>
            <p className="text-xl font-semibold text-[#d4af37]">{ascendant.degree}°</p>
          </div>
          
          <div className="text-center">
            <p className="text-[#6b7280] text-xs uppercase tracking-wider font-medium">Ayanamsa</p>
            <p className="text-lg text-[#2b2e38] capitalize font-medium">{ayanamsa}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
