"use client";

import { useTheme } from "@/context/ThemeContext";
import { 
  planetColors, 
  planetShort, 
  zodiacSymbols,
  getChartTheme,
  cssVars 
} from "@/lib/theme";
import {
  NORTH_SIGN_POSITIONS,
  NORTH_PLANET_POSITIONS,
  SOUTH_SIGN_GRID,
  SOUTH_SIGN_NUMBER_GRID,
  ZODIAC_SIGNS,
  getSignForHouse,
  getHouseForSign,
  scalePosition,
  getScaledFontSize,
  type ScaleConfig,
} from "@/lib/chart-geometry";

// ============================================
// TYPES
// ============================================

export interface ChartPlanet {
  planet: string;
  sign?: string;
  degree?: number;
  house_no: number;
}

export interface ChartProps {
  planets: ChartPlanet[];
  ascendantSign: string;
  chartType?: 'north' | 'south';
  size?: number;
  showTitle?: boolean;
  showLegend?: boolean;
  showLagnaBadge?: boolean;
  title?: string;
  className?: string;
  compact?: boolean;
}

// ============================================
// NORTH INDIAN CHART SVG
// ============================================

interface NorthChartSvgProps {
  planets: ChartPlanet[];
  ascendantSign: string;
  size: number;
  compact: boolean;
}

function NorthIndianChartSvg({ planets, ascendantSign, size, compact }: NorthChartSvgProps) {
  const { themeColors } = useTheme();
  const chartTheme = getChartTheme(themeColors);
  
  const margin = size * 0.05;
  const inner = size - 2 * margin;
  const mid = size / 2;
  
  const scale = size / 400; // Base size is 400
  const config: ScaleConfig = { size, margin };
  
  const signFontSize = getScaledFontSize(compact ? 10 : 14, scale);
  const planetFontSize = getScaledFontSize(compact ? 9 : 11, scale);
  const planetSpacing = getScaledFontSize(compact ? 16 : 20, scale);
  const planetRowSpacing = getScaledFontSize(compact ? 14 : 18, scale);

  const getPlanetsInHouse = (houseNo: number): ChartPlanet[] => {
    return planets.filter(p => p.house_no === houseNo);
  };

  // Calculate planet grid layout - always max 3 per row
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
        strokeWidth={compact ? 1 : 2}
      />
      
      {/* Diagonal X pattern */}
      <line 
        x1={margin} y1={margin} 
        x2={size - margin} y2={size - margin} 
        stroke={chartTheme.borderPrimary}
        strokeWidth={compact ? 0.75 : 1.5} 
      />
      <line 
        x1={size - margin} y1={margin} 
        x2={margin} y2={size - margin} 
        stroke={chartTheme.borderPrimary}
        strokeWidth={compact ? 0.75 : 1.5} 
      />
      
      {/* Inner diamond */}
      <polygon
        points={`${mid},${margin} ${size - margin},${mid} ${mid},${size - margin} ${margin},${mid}`}
        fill="none"
        stroke={chartTheme.borderPrimary}
        strokeWidth={compact ? 0.75 : 1.5}
      />
      
      {/* Signs */}
      <g className="signs-group">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((houseNo) => {
          const normalizedPos = NORTH_SIGN_POSITIONS[houseNo];
          const pos = scalePosition(normalizedPos, config);
          const sign = getSignForHouse(ascendantSign, houseNo);
          
          return (
            <text
              key={`sign-${houseNo}`}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={signFontSize}
              fill={chartTheme.signColor}
            >
              {zodiacSymbols[sign] || ""}
            </text>
          );
        })}
      </g>
      
      {/* Planets */}
      <g className="planets-group">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((houseNo) => {
          const normalizedPos = NORTH_PLANET_POSITIONS[houseNo];
          const centerPos = scalePosition(normalizedPos, config);
          const housePlanets = getPlanetsInHouse(houseNo);
          
          if (housePlanets.length === 0) return null;
          
          const totalPlanets = housePlanets.length;
          const totalRows = Math.ceil(totalPlanets / 3);
          
          return (
            <g key={`planets-house-${houseNo}`}>
              {housePlanets.map((planet, idx) => {
                const { col, row, colsInThisRow } = getPlanetLayout(totalPlanets, idx);
                
                // Center each row independently
                const colOffset = (col - (colsInThisRow - 1) / 2) * planetSpacing;
                const rowOffset = (row - (totalRows - 1) / 2) * planetRowSpacing;
                
                return (
                  <text
                    key={`planet-${houseNo}-${planet.planet}`}
                    x={centerPos.x + colOffset}
                    y={centerPos.y + rowOffset}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={planetColors[planet.planet] || themeColors.text.primary}
                    fontSize={planetFontSize}
                    fontWeight="600"
                  >
                    {planetShort[planet.planet] || planet.planet.slice(0, 2)}
                  </text>
                );
              })}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

// ============================================
// SOUTH INDIAN CHART SVG
// ============================================

interface SouthChartSvgProps {
  planets: ChartPlanet[];
  ascendantSign: string;
  size: number;
  compact: boolean;
}

function SouthIndianChartSvg({ planets, ascendantSign, size, compact }: SouthChartSvgProps) {
  const { themeColors } = useTheme();
  const chartTheme = getChartTheme(themeColors);
  
  const padding = size * 0.025;
  const cellSize = (size - 2 * padding) / 4;
  
  const scale = size / 400;
  const signFontSize = getScaledFontSize(compact ? 10 : 14, scale);
  const planetFontSize = getScaledFontSize(compact ? 9 : 12, scale);
  const houseNumFontSize = getScaledFontSize(compact ? 8 : 10, scale);

  const getPlanetsInSign = (sign: string): ChartPlanet[] => {
    const houseNo = getHouseForSign(ascendantSign, sign);
    return planets.filter(p => p.house_no === houseNo);
  };

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
      {/* Background */}
      <rect x="0" y="0" width={size} height={size} fill={chartTheme.background} rx={size * 0.02} />
      
      {/* Outer border */}
      <rect
        x={padding}
        y={padding}
        width={cellSize * 4}
        height={cellSize * 4}
        fill="none"
        stroke={chartTheme.borderPrimary}
        strokeWidth={compact ? 1 : 2}
        rx={size * 0.01}
      />
      
      {/* Sign cells */}
      {ZODIAC_SIGNS.map((sign) => {
        const gridPos = SOUTH_SIGN_GRID[sign];
        if (!gridPos) return null;
        
        const x = padding + gridPos.col * cellSize;
        const y = padding + gridPos.row * cellSize;
        const houseNo = getHouseForSign(ascendantSign, sign);
        const signPlanets = getPlanetsInSign(sign);
        
        return (
          <g key={sign}>
            {/* Cell background */}
            <rect
              x={x}
              y={y}
              width={cellSize}
              height={cellSize}
              fill={chartTheme.cardBg}
              stroke={chartTheme.borderPrimary}
              strokeWidth={compact ? 1 : 2}
            />
            
            {/* Sign symbol */}
            <text
              x={x + cellSize * 0.1}
              y={y + cellSize * 0.2}
              fontSize={signFontSize}
              fill={chartTheme.signColor}
            >
              {zodiacSymbols[sign] || ""}
            </text>
            
            {/* House number */}
            <text
              x={x + cellSize - cellSize * 0.12}
              y={y + cellSize * 0.18}
              textAnchor="end"
              fontSize={houseNumFontSize}
              fontWeight="500"
              fill={chartTheme.houseNumberColor}
            >
              {houseNo}
            </text>
            
            {/* Planets */}
            {signPlanets.map((planet, idx) => {
              const col = idx % 3;
              const row = Math.floor(idx / 3);
              const planetX = x + cellSize * 0.12 + col * cellSize * 0.3;
              const planetY = y + cellSize * 0.42 + row * cellSize * 0.22;
              
              return (
                <text
                  key={planet.planet}
                  x={planetX}
                  y={planetY}
                  fill={planetColors[planet.planet] || themeColors.text.primary}
                  fontSize={planetFontSize}
                  fontWeight="600"
                >
                  {planetShort[planet.planet] || planet.planet.slice(0, 2)}
                </text>
              );
            })}
          </g>
        );
      })}
      
      {/* Center area */}
      <rect
        x={padding + cellSize}
        y={padding + cellSize}
        width={cellSize * 2}
        height={cellSize * 2}
        fill={themeColors.background.secondary}
        stroke={chartTheme.borderPrimary}
        strokeWidth={compact ? 1 : 2}
      />
      
      {/* Center diagonal lines */}
      <line
        x1={padding + cellSize}
        y1={padding + cellSize}
        x2={padding + cellSize * 3}
        y2={padding + cellSize * 3}
        stroke={chartTheme.borderPrimary}
        strokeWidth={compact ? 0.75 : 1.5}
      />
      <line
        x1={padding + cellSize * 3}
        y1={padding + cellSize}
        x2={padding + cellSize}
        y2={padding + cellSize * 3}
        stroke={chartTheme.borderPrimary}
        strokeWidth={compact ? 0.75 : 1.5}
      />
    </svg>
  );
}

// ============================================
// MAIN KUNDALI CHART COMPONENT
// ============================================

export function KundaliChart({
  planets,
  ascendantSign,
  chartType = 'north',
  size = 400,
  showTitle = true,
  showLegend = true,
  showLagnaBadge = true,
  title,
  className = '',
  compact = false,
}: ChartProps) {
  const { themeColors } = useTheme();
  
  const chartTitle = title || (chartType === 'north' ? 'North Indian Chart' : 'South Indian Chart');
  const chartIcon = chartType === 'north' ? '◇' : '▣';
  
  // Render just the SVG (for embedding in other components)
  if (!showTitle && !showLegend && !showLagnaBadge) {
    return chartType === 'north' 
      ? <NorthIndianChartSvg planets={planets} ascendantSign={ascendantSign} size={size} compact={compact} />
      : <SouthIndianChartSvg planets={planets} ascendantSign={ascendantSign} size={size} compact={compact} />;
  }

  return (
    <div 
      className={`backdrop-blur-sm rounded-2xl p-6 shadow-xl ${className}`}
      style={{ 
        backgroundColor: themeColors.background.card,
        border: `1px solid ${themeColors.border.soft}`,
        boxShadow: `0 25px 50px ${themeColors.shadow.soft}`
      }}
    >
      {/* Header */}
      {(showTitle || showLagnaBadge) && (
        <div className="flex items-center justify-between mb-4">
          {showTitle && (
            <h3 
              className="text-lg font-semibold flex items-center gap-2"
              style={{ color: themeColors.text.primary, fontFamily: cssVars.fontPlayfair }}
            >
              <span style={{ color: themeColors.brand.accent }}>{chartIcon}</span>
              {chartTitle}
            </h3>
          )}
          {showLagnaBadge && (
            <span 
              className="text-xs px-2 py-1 rounded-full"
              style={{ color: themeColors.text.secondary, backgroundColor: themeColors.background.hover }}
            >
              Lagna: {ascendantSign} {zodiacSymbols[ascendantSign] || ""}
            </span>
          )}
        </div>
      )}
      
      {/* Chart */}
      <div className="flex justify-center">
        <div style={{ maxWidth: size, width: '100%' }}>
          {chartType === 'north' 
            ? <NorthIndianChartSvg planets={planets} ascendantSign={ascendantSign} size={size} compact={compact} />
            : <SouthIndianChartSvg planets={planets} ascendantSign={ascendantSign} size={size} compact={compact} />
          }
        </div>
      </div>
      
      {/* Legend */}
      {showLegend && (
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-[10px]">
          {planets.slice(0, 9).map((planet) => (
            <span
              key={planet.planet}
              className="px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: themeColors.background.hover,
                color: planetColors[planet.planet] || themeColors.text.primary 
              }}
            >
              {planetShort[planet.planet] || planet.planet.slice(0, 2)} = {planet.planet}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// MINI CHART (Convenience wrapper)
// ============================================

export interface MiniChartProps {
  planets: ChartPlanet[];
  ascendantSign: string;
  chartType?: 'north' | 'south';
  size?: number;
  className?: string;
}

export function MiniChart({
  planets,
  ascendantSign,
  chartType = 'north',
  size = 200,
  className = '',
}: MiniChartProps) {
  return (
    <div className={className}>
      <KundaliChart
        planets={planets}
        ascendantSign={ascendantSign}
        chartType={chartType}
        size={size}
        showTitle={false}
        showLegend={false}
        showLagnaBadge={false}
        compact={true}
      />
    </div>
  );
}

// ============================================
// CHART TOGGLE WRAPPER
// ============================================

export interface ChartWithToggleProps {
  planets: ChartPlanet[];
  ascendantSign: string;
  defaultType?: 'north' | 'south';
  size?: number;
  showLegend?: boolean;
}

export function ChartWithToggle({
  planets,
  ascendantSign,
  defaultType = 'north',
  size = 400,
  showLegend = true,
}: ChartWithToggleProps) {
  const { themeColors } = useTheme();
  const [chartType, setChartType] = useState<'north' | 'south'>(defaultType);

  return (
    <div 
      className="backdrop-blur-sm rounded-2xl p-6 shadow-xl"
      style={{ 
        backgroundColor: themeColors.background.card,
        border: `1px solid ${themeColors.border.soft}`,
        boxShadow: `0 25px 50px ${themeColors.shadow.soft}`
      }}
    >
      {/* Header with toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 
          className="text-lg font-semibold flex items-center gap-2"
          style={{ color: themeColors.text.primary, fontFamily: cssVars.fontPlayfair }}
        >
          <span style={{ color: themeColors.brand.accent }}>
            {chartType === 'north' ? '◇' : '▣'}
          </span>
          Kundali Chart
        </h3>
        
        <div 
          className="flex rounded-lg p-1"
          style={{ backgroundColor: themeColors.background.secondary }}
        >
          <button
            onClick={() => setChartType('north')}
            className="px-3 py-1 rounded-md text-xs font-medium transition-all"
            style={{
              backgroundColor: chartType === 'north' ? themeColors.brand.accent : 'transparent',
              color: chartType === 'north' ? themeColors.text.white : themeColors.text.secondary,
            }}
          >
            North
          </button>
          <button
            onClick={() => setChartType('south')}
            className="px-3 py-1 rounded-md text-xs font-medium transition-all"
            style={{
              backgroundColor: chartType === 'south' ? themeColors.brand.accent : 'transparent',
              color: chartType === 'south' ? themeColors.text.white : themeColors.text.secondary,
            }}
          >
            South
          </button>
        </div>
      </div>
      
      {/* Lagna badge */}
      <div className="flex justify-end mb-2">
        <span 
          className="text-xs px-2 py-1 rounded-full"
          style={{ color: themeColors.text.secondary, backgroundColor: themeColors.background.hover }}
        >
          Lagna: {ascendantSign} {zodiacSymbols[ascendantSign] || ""}
        </span>
      </div>
      
      {/* Chart */}
      <div className="flex justify-center">
        <div style={{ maxWidth: size, width: '100%' }}>
          {chartType === 'north' 
            ? <NorthIndianChartSvg planets={planets} ascendantSign={ascendantSign} size={size} compact={false} />
            : <SouthIndianChartSvg planets={planets} ascendantSign={ascendantSign} size={size} compact={false} />
          }
        </div>
      </div>
      
      {/* Legend */}
      {showLegend && (
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-[10px]">
          {planets.slice(0, 9).map((planet) => (
            <span
              key={planet.planet}
              className="px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: themeColors.background.hover,
                color: planetColors[planet.planet] || themeColors.text.primary 
              }}
            >
              {planetShort[planet.planet] || planet.planet.slice(0, 2)} = {planet.planet}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Import useState for ChartWithToggle
import { useState } from 'react';

// ============================================
// EXPORTS
// ============================================

export { NorthIndianChartSvg, SouthIndianChartSvg };
