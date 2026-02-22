"use client";

import { useTheme } from "@/context/ThemeContext";
import { DivisionalHouse, DivisionalChartInfo } from "@/types/kundali";
import { 
  planetColors, 
  planetShort, 
  zodiacSymbols,
  getChartTheme,
} from "@/lib/theme";
import {
  NORTH_SIGN_POSITIONS,
  NORTH_PLANET_POSITIONS,
  SOUTH_SIGN_NUMBER_GRID,
  scalePosition,
  getScaledFontSize,
  type ScaleConfig,
} from "@/lib/chart-geometry";

// ============================================
// TYPES
// ============================================

export interface DivisionalChartViewProps {
  chartInfo: DivisionalChartInfo;
  houses: DivisionalHouse[];
  chartStyle: 'north' | 'south';
  size?: number;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function parsePlanets(planetStr: string): string[] {
  if (!planetStr || planetStr === "—" || planetStr === "-") return [];
  // Extract just planet names from strings like "Sun (5.0°), Mercury (1.87°)"
  return planetStr.split(",").map(p => {
    const match = p.trim().match(/^(\w+)/);
    return match ? match[1] : p.trim();
  }).filter(Boolean);
}

// ============================================
// NORTH INDIAN DIVISIONAL CHART SVG
// ============================================

interface NorthDivisionalSvgProps {
  houses: DivisionalHouse[];
  size: number;
}

function NorthDivisionalChartSvg({ houses, size }: NorthDivisionalSvgProps) {
  const { themeColors } = useTheme();
  const chartTheme = getChartTheme(themeColors);
  
  const margin = size * 0.05;
  const inner = size - 2 * margin;
  const mid = size / 2;
  
  const scale = size / 200; // Base size is 200 for mini charts
  const config: ScaleConfig = { size, margin };
  
  const signFontSize = getScaledFontSize(8, scale);
  const planetFontSize = getScaledFontSize(7, scale);
  const planetSpacing = getScaledFontSize(10, scale);
  const planetRowSpacing = getScaledFontSize(9, scale);

  // Calculate planet grid layout - max 3 per row
  const getPlanetLayout = (totalPlanets: number, idx: number) => {
    const maxCols = 3;
    const col = idx % maxCols;
    const row = Math.floor(idx / maxCols);
    const totalRows = Math.ceil(totalPlanets / maxCols);
    const planetsInLastRow = totalPlanets % maxCols || maxCols;
    const isLastRow = row === totalRows - 1;
    const colsInThisRow = isLastRow ? planetsInLastRow : maxCols;
    
    return { col, row, totalRows, colsInThisRow };
  };

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
      {/* Background */}
      <rect x="0" y="0" width={size} height={size} fill={chartTheme.background} rx={size * 0.02} />
      
      {/* Main chart area */}
      <rect x={margin} y={margin} width={inner} height={inner} fill={chartTheme.cardBg} />
      
      {/* Outer border */}
      <rect
        x={margin}
        y={margin}
        width={inner}
        height={inner}
        fill="none"
        stroke={chartTheme.borderPrimary}
        strokeWidth={1.5}
      />
      
      {/* X pattern */}
      <line x1={margin} y1={margin} x2={size - margin} y2={size - margin} stroke={chartTheme.borderPrimary} strokeWidth={1} />
      <line x1={size - margin} y1={margin} x2={margin} y2={size - margin} stroke={chartTheme.borderPrimary} strokeWidth={1} />
      
      {/* Inner diamond */}
      <polygon
        points={`${mid},${margin} ${size - margin},${mid} ${mid},${size - margin} ${margin},${mid}`}
        fill="none"
        stroke={chartTheme.borderPrimary}
        strokeWidth={1}
      />
      
      {/* Signs and Planets */}
      {houses.map((house) => {
        const signNormPos = NORTH_SIGN_POSITIONS[house.House];
        const planetNormPos = NORTH_PLANET_POSITIONS[house.House];
        
        if (!signNormPos || !planetNormPos) return null;
        
        const signPos = scalePosition(signNormPos, config);
        const planetPos = scalePosition(planetNormPos, config);
        const planets = parsePlanets(house.Planets);
        const totalPlanets = planets.length;
        const totalRows = Math.ceil(totalPlanets / 3);
        
        return (
          <g key={house.House}>
            {/* Sign symbol */}
            <text
              x={signPos.x}
              y={signPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={signFontSize}
              fill={chartTheme.signColor}
            >
              {zodiacSymbols[house.SignName] || house.SignNo}
            </text>
            
            {/* Planets - max 3 per row */}
            {planets.map((planet, idx) => {
              const { col, row, colsInThisRow } = getPlanetLayout(totalPlanets, idx);
              const colOffset = (col - (colsInThisRow - 1) / 2) * planetSpacing;
              const rowOffset = (row - (totalRows - 1) / 2) * planetRowSpacing;
              
              return (
                <text
                  key={`${house.House}-${planet}-${idx}`}
                  x={planetPos.x + colOffset}
                  y={planetPos.y + rowOffset}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={planetColors[planet] || themeColors.text.primary}
                  fontSize={planetFontSize}
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
}

// ============================================
// SOUTH INDIAN DIVISIONAL CHART SVG
// ============================================

interface SouthDivisionalSvgProps {
  houses: DivisionalHouse[];
  size: number;
}

function SouthDivisionalChartSvg({ houses, size }: SouthDivisionalSvgProps) {
  const { themeColors } = useTheme();
  const chartTheme = getChartTheme(themeColors);
  
  const padding = size * 0.02;
  const innerSize = size - 2 * padding;
  const cellSize = innerSize / 4;
  
  const scale = size / 200;
  const signFontSize = getScaledFontSize(7, scale);
  const planetFontSize = getScaledFontSize(7, scale);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
      {/* Background */}
      <rect x="0" y="0" width={size} height={size} fill={chartTheme.background} rx={size * 0.02} />
      
      {/* Outer border - thick and visible */}
      <rect
        x={padding}
        y={padding}
        width={innerSize}
        height={innerSize}
        fill="none"
        stroke={chartTheme.borderPrimary}
        strokeWidth={2}
        rx={size * 0.01}
      />
      
      {/* Internal grid lines - thicker for visibility */}
      {[1, 2, 3].map(i => (
        <g key={`grid-${i}`}>
          {/* Vertical lines */}
          <line 
            x1={padding + i * cellSize} 
            y1={padding} 
            x2={padding + i * cellSize} 
            y2={padding + innerSize} 
            stroke={chartTheme.borderPrimary} 
            strokeWidth={2} 
          />
          {/* Horizontal lines */}
          <line 
            x1={padding} 
            y1={padding + i * cellSize} 
            x2={padding + innerSize} 
            y2={padding + i * cellSize} 
            stroke={chartTheme.borderPrimary} 
            strokeWidth={2} 
          />
        </g>
      ))}
      
      {/* Center empty area with border */}
      <rect 
        x={padding + cellSize} 
        y={padding + cellSize} 
        width={cellSize * 2} 
        height={cellSize * 2} 
        fill={themeColors.background.secondary} 
        stroke={chartTheme.borderPrimary}
        strokeWidth={2}
      />
      
      {/* Center diagonal lines */}
      <line
        x1={padding + cellSize}
        y1={padding + cellSize}
        x2={padding + cellSize * 3}
        y2={padding + cellSize * 3}
        stroke={chartTheme.borderPrimary}
        strokeWidth={1.5}
      />
      <line
        x1={padding + cellSize * 3}
        y1={padding + cellSize}
        x2={padding + cellSize}
        y2={padding + cellSize * 3}
        stroke={chartTheme.borderPrimary}
        strokeWidth={1.5}
      />
      
      {/* Houses */}
      {houses.map((house) => {
        const pos = SOUTH_SIGN_NUMBER_GRID[house.SignNo];
        if (!pos) return null;
        
        const x = padding + pos.col * cellSize;
        const y = padding + pos.row * cellSize;
        const planets = parsePlanets(house.Planets);
        
        return (
          <g key={house.House}>
            {/* Cell background */}
            <rect x={x} y={y} width={cellSize} height={cellSize} fill={chartTheme.cardBg} />
            
            {/* Sign symbol */}
            <text
              x={x + cellSize - cellSize * 0.12}
              y={y + cellSize * 0.2}
              textAnchor="end"
              fontSize={signFontSize}
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
                  x={x + cellSize * 0.15 + col * cellSize * 0.4}
                  y={y + cellSize * 0.5 + row * cellSize * 0.25}
                  fontSize={planetFontSize}
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
}

// ============================================
// DIVISIONAL CHART VIEW COMPONENT
// ============================================

export function DivisionalChartView({ 
  chartInfo, 
  houses, 
  chartStyle,
  size = 200 
}: DivisionalChartViewProps) {
  const { themeColors } = useTheme();

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
        {chartStyle === 'north' 
          ? <NorthDivisionalChartSvg houses={houses} size={size} />
          : <SouthDivisionalChartSvg houses={houses} size={size} />
        }
      </div>
    </div>
  );
}

// ============================================
// DIVISIONAL CHART GRID
// ============================================

export interface DivisionalChartGridProps {
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
            <DivisionalChartView
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

export { NorthDivisionalChartSvg, SouthDivisionalChartSvg };
