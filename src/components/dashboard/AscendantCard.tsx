"use client";

import { Ascendant } from "@/types/kundali";
import { colors, zodiacSymbols, cssVars } from "@/lib/theme";

interface AscendantCardProps {
  ascendant: Ascendant;
  ayanamsa: string;
}

export function AscendantCard({ ascendant, ayanamsa }: AscendantCardProps) {
  const symbol = zodiacSymbols[ascendant.sign] || "☉";

  return (
    <div 
      className="relative overflow-hidden rounded-2xl p-6 shadow-xl"
      style={{ 
        background: `linear-gradient(to bottom right, ${colors.background.primary}, #f7f1de)`,
        border: `1px solid ${colors.brand.accentBg30}`,
        boxShadow: `0 25px 50px ${colors.shadow.soft}`
      }}
    >
      {/* Background decoration */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl"
        style={{ backgroundColor: colors.brand.accentBg }}
      />
      <div 
        className="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl"
        style={{ backgroundColor: colors.decorative.lavenderBg }}
      />
      
      <div className="relative flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ 
              background: `linear-gradient(to bottom right, ${colors.brand.accent}, ${colors.brand.accentLight})`,
              boxShadow: `0 10px 30px ${colors.brand.accentBg30}`
            }}
          >
            <span className="text-3xl drop-shadow-sm" style={{ color: colors.text.white }}>{symbol}</span>
          </div>
          <div>
            <p 
              className="text-sm uppercase tracking-wider font-medium"
              style={{ color: colors.text.secondary }}
            >
              Ascendant (Lagna)
            </p>
            <p 
              className="text-2xl font-semibold"
              style={{ color: colors.text.primary, fontFamily: cssVars.fontPlayfair }}
            >
              {ascendant.sign}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-center">
            <p 
              className="text-xs uppercase tracking-wider font-medium"
              style={{ color: colors.text.secondary }}
            >
              Degree
            </p>
            <p className="text-xl font-semibold" style={{ color: colors.brand.accent }}>
              {ascendant.degree}°
            </p>
          </div>
          
          <div className="text-center">
            <p 
              className="text-xs uppercase tracking-wider font-medium"
              style={{ color: colors.text.secondary }}
            >
              Ayanamsa
            </p>
            <p className="text-lg capitalize font-medium" style={{ color: colors.text.primary }}>
              {ayanamsa}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
