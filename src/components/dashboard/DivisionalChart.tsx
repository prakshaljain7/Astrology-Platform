"use client";

import { useTheme } from "@/context/ThemeContext";
import { DivisionalHouse, DivisionalChartInfo } from "@/types/kundali";
import { 
  planetColors, 
  planetShort, 
  zodiacSymbols,
  getChartTheme,
} from "@/lib/theme";

interface DivisionalChartProps {
  chartInfo: DivisionalChartInfo;
  houses: DivisionalHouse[];
  chartStyle: 'north' | 'south';
}

// North Indian mini chart positions
const NORTH_SIGN_POSITIONS: Record<number, { x: number; y: number }> = {
  1:  { x: 100, y: 85 },
  2:  { x: 55,  y: 40 },
  3:  { x: 40,  y: 55 },
  4:  { x: 55,  y: 70 },
  5:  { x: 40,  y: 145 },
  6:  { x: 55, y: 160 },
  7:  { x: 100, y: 115 },
  8:  { x: 145, y: 160 },
  9:  { x: 160, y: 145 },
  10: { x: 145, y: 70 },
  11: { x: 160, y: 55 },
  12: { x: 145, y: 40 },
};

const NORTH_PLANET_POSITIONS: Record<number, { x: number; y: number }> = {
  1:  { x: 100, y: 55 },
  2:  { x: 55, y: 25 },
  3:  { x: 25,  y: 55 },
  4:  { x: 55,  y: 100 },
  5:  { x: 25, y: 145 },
  6:  { x: 55, y: 175 },
  7:  { x: 100, y: 145 },
  8:  { x: 145, y: 175 },
  9:  { x: 175, y: 145 },
  10: { x: 145, y: 100 },
  11: { x: 175, y: 55 },
  12: { x: 145, y: 25 },
};

// South Indian chart house mapping (fixed positions by sign number)
const SOUTH_HOUSE_POSITIONS: Record<number, { row: number; col: number }> = {
  12: { row: 0, col: 0 },
  1:  { row: 0, col: 1 },
  2:  { row: 0, col: 2 },
  3:  { row: 0, col: 3 },
  4:  { row: 1, col: 3 },
  5:  { row: 2, col: 3 },
  6:  { row: 3, col: 3 },
  7:  { row: 3, col: 2 },
  8:  { row: 3, col: 1 },
  9:  { row: 3, col: 0 },
  10: { row: 2, col: 0 },
  11: { row: 1, col: 0 },
};

export function DivisionalChart({ chartInfo, houses, chartStyle }: DivisionalChartProps) {
  const { themeColors } = useTheme();
  const chartTheme = getChartTheme(themeColors);

  const parsePlanets = (planetStr: string): string[] => {
    if (!planetStr || planetStr === "—" || planetStr === "-") return [];
    return planetStr.split(",").map(p => p.trim()).filter(Boolean);
  };

  const renderNorthIndianChart = () => {
    const size = 200;
    const margin = 10;
    const inner = size - 2 * margin;
    const mid = size / 2;

    return (
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
        <rect x="0" y="0" width={size} height={size} fill={chartTheme.background} rx="4" />
        <rect x={margin} y={margin} width={inner} height={inner} fill={chartTheme.cardBg} />
        <rect x={margin} y={margin} width={inner} height={inner} fill="none" stroke={chartTheme.borderPrimary} strokeWidth="1.5" />
        
        {/* X pattern */}
        <line x1={margin} y1={margin} x2={size - margin} y2={size - margin} stroke={chartTheme.borderPrimary} strokeWidth="1" />
        <line x1={size - margin} y1={margin} x2={margin} y2={size - margin} stroke={chartTheme.borderPrimary} strokeWidth="1" />
        
        {/* Inner diamond */}
        <polygon
          points={`${mid},${margin} ${size - margin},${mid} ${mid},${size - margin} ${margin},${mid}`}
          fill="none"
          stroke={chartTheme.borderPrimary}
          strokeWidth="1"
        />
        
        {/* Signs and Planets */}
        {houses.map((house) => {
          const signPos = NORTH_SIGN_POSITIONS[house.House];
          const planetPos = NORTH_PLANET_POSITIONS[house.House];
          const planets = parsePlanets(house.Planets);
          
          return (
            <g key={house.House}>
              {/* Sign symbol */}
              <text
                x={signPos.x}
                y={signPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8"
                fill={chartTheme.signColor}
              >
                {zodiacSymbols[house.SignName] || house.SignNo}
              </text>
              
              {/* Planets */}
              {planets.map((planet, idx) => {
                const offset = (idx - (planets.length - 1) / 2) * 12;
                return (
                  <text
                    key={`${house.House}-${planet}-${idx}`}
                    x={planetPos.x + offset}
                    y={planetPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={planetColors[planet] || themeColors.text.primary}
                    fontSize="7"
                    fontWeight="600"
                  >
                    {planetShort[planet] || planet.slice(0, 2)}
                  </text>
                );
              })}
            </g>
          );
        })}
      </svg>
    );
  };

  const renderSouthIndianChart = () => {
    const size = 200;
    const cellSize = size / 4;

    return (
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
        <rect x="0" y="0" width={size} height={size} fill={chartTheme.background} rx="4" />
        
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <g key={`grid-${i}`}>
            <line x1={i * cellSize} y1={0} x2={i * cellSize} y2={size} stroke={chartTheme.borderPrimary} strokeWidth="1" />
            <line x1={0} y1={i * cellSize} x2={size} y2={i * cellSize} stroke={chartTheme.borderPrimary} strokeWidth="1" />
          </g>
        ))}
        
        {/* Center empty area */}
        <rect x={cellSize} y={cellSize} width={cellSize * 2} height={cellSize * 2} fill={chartTheme.cardBg} />
        
        {/* Houses */}
        {houses.map((house) => {
          const pos = SOUTH_HOUSE_POSITIONS[house.SignNo];
          if (!pos) return null;
          
          const x = pos.col * cellSize;
          const y = pos.row * cellSize;
          const planets = parsePlanets(house.Planets);
          
          return (
            <g key={house.House}>
              {/* Cell background */}
              <rect x={x} y={y} width={cellSize} height={cellSize} fill={chartTheme.cardBg} />
              
              {/* Sign symbol */}
              <text
                x={x + cellSize - 6}
                y={y + 10}
                textAnchor="end"
                fontSize="7"
                fill={chartTheme.signColor}
              >
                {zodiacSymbols[house.SignName] || house.SignNo}
              </text>
              
              {/* Planets */}
              {planets.map((planet, idx) => {
                const row = Math.floor(idx / 2);
                const col = idx % 2;
                return (
                  <text
                    key={`${house.House}-${planet}-${idx}`}
                    x={x + 8 + col * 20}
                    y={y + 25 + row * 12}
                    fontSize="7"
                    fontWeight="600"
                    fill={planetColors[planet] || themeColors.text.primary}
                  >
                    {planetShort[planet] || planet.slice(0, 2)}
                  </text>
                );
              })}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div
      className="rounded-xl p-3 transition-all hover:scale-[1.02]"
      style={{
        backgroundColor: themeColors.background.card,
        border: `1px solid ${themeColors.border.soft}`,
        boxShadow: `0 4px 12px ${themeColors.shadow.soft}`,
      }}
    >
      {/* Header */}
      <div className="mb-2">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span 
            className="text-xs font-bold px-1.5 py-0.5 rounded"
            style={{ 
              backgroundColor: themeColors.brand.primaryBg,
              color: themeColors.brand.primary 
            }}
          >
            {chartInfo.id}
          </span>
          <span 
            className="text-sm font-semibold"
            style={{ color: themeColors.text.primary }}
          >
            {chartInfo.name}
          </span>
        </div>
        <p 
          className="text-xs"
          style={{ color: themeColors.text.muted }}
        >
          {chartInfo.meaning}
        </p>
      </div>
      
      {/* Chart */}
      <div className="aspect-square">
        {chartStyle === 'north' ? renderNorthIndianChart() : renderSouthIndianChart()}
      </div>
    </div>
  );
}

interface DivisionalChartGridProps {
  charts: Map<string, DivisionalHouse[]>;
  chartInfoList: DivisionalChartInfo[];
  chartStyle: 'north' | 'south';
  onChartClick?: (chartId: string) => void;
}

export function DivisionalChartGrid({ 
  charts, 
  chartInfoList, 
  chartStyle,
  onChartClick 
}: DivisionalChartGridProps) {
  const { themeColors } = useTheme();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {chartInfoList.map((chartInfo) => {
        const houses = charts.get(chartInfo.id);
        
        if (!houses) {
          return (
            <div
              key={chartInfo.id}
              className="rounded-xl p-4 flex items-center justify-center aspect-square"
              style={{
                backgroundColor: themeColors.background.secondary,
                border: `1px dashed ${themeColors.border.medium}`,
              }}
            >
              <div className="text-center">
                <span 
                  className="text-xs font-bold block mb-1"
                  style={{ color: themeColors.text.muted }}
                >
                  {chartInfo.id}
                </span>
                <span 
                  className="text-xs"
                  style={{ color: themeColors.text.muted }}
                >
                  Loading...
                </span>
              </div>
            </div>
          );
        }
        
        return (
          <div 
            key={chartInfo.id}
            onClick={() => onChartClick?.(chartInfo.id)}
            className={onChartClick ? "cursor-pointer" : ""}
          >
            <DivisionalChart
              chartInfo={chartInfo}
              houses={houses}
              chartStyle={chartStyle}
            />
          </div>
        );
      })}
    </div>
  );
}
