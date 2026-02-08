'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Planet } from '@/types/kundali';
import { 
  cssVars, 
  planetColors, 
  planetShort, 
  zodiacSigns, 
  zodiacSymbols,
  getChartTheme 
} from '@/lib/theme';

interface BnnDirectionalChartProps {
  planets: Planet[];
  ascendantSign: string;
}

interface DirectionData {
  name: string;
  houses: number[];
  label: string;
  meaning: string;
}

const DIRECTIONS: DirectionData[] = [
  { name: 'North', houses: [1, 5, 9], label: '1,5,9', meaning: 'Dharma' },
  { name: 'East', houses: [4, 8, 12], label: '4,8,12', meaning: 'Moksha' },
  { name: 'South', houses: [3, 7, 11], label: '3,7,11', meaning: 'Kama' },
  { name: 'West', houses: [2, 6, 10], label: '2,6,10', meaning: 'Artha' },
];

// Sign positions for North Indian chart
const SIGN_POSITIONS: Record<number, { x: number; y: number }> = {
  1:  { x: 200, y: 180 },
  2:  { x: 110, y: 90 },
  3:  { x: 90, y: 110 },
  4:  { x: 110, y: 130 },
  5:  { x: 90, y: 290 },
  6:  { x: 110, y: 310 },
  7:  { x: 200, y: 220 },
  8:  { x: 290, y: 310 },
  9:  { x: 310, y: 290 },
  10: { x: 290, y: 130 },
  11: { x: 310, y: 110 },
  12: { x: 290, y: 90 },
};

const PLANET_CENTER_POSITIONS: Record<number, { x: number; y: number }> = {
  1:  { x: 200, y: 110 },
  2:  { x: 110, y: 55 },
  3:  { x: 55, y: 110 },
  4:  { x: 110, y: 200 },
  5:  { x: 55, y: 290 },
  6:  { x: 110, y: 345 },
  7:  { x: 200, y: 290 },
  8:  { x: 290, y: 345 },
  9:  { x: 345, y: 290 },
  10: { x: 290, y: 200 },
  11: { x: 345, y: 110 },
  12: { x: 290, y: 55 },
};

// South Indian chart positions
const SOUTH_INDIAN_SIGN_POSITIONS: Record<string, number> = {
  Pisces: 0, Aries: 1, Taurus: 2, Gemini: 3,
  Cancer: 4, Leo: 5, Virgo: 6, Libra: 7,
  Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11
};

const GRID_POSITIONS = [
  { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 },
  { row: 1, col: 3 }, { row: 2, col: 3 }, { row: 3, col: 3 }, { row: 3, col: 2 },
  { row: 3, col: 1 }, { row: 3, col: 0 }, { row: 2, col: 0 }, { row: 1, col: 0 },
];

export function BnnDirectionalChart({ planets, ascendantSign }: BnnDirectionalChartProps) {
  const { themeColors } = useTheme();
  const [chartView, setChartView] = useState<'north' | 'south'>('north');
  const chartTheme = getChartTheme(themeColors);

  const ascendantIndex = zodiacSigns.indexOf(ascendantSign as typeof zodiacSigns[number]);

  const getSignForHouse = (houseNo: number): string => {
    if (ascendantIndex === -1) return "";
    const signIndex = (ascendantIndex + houseNo - 1) % 12;
    return zodiacSigns[signIndex];
  };

  const getPlanetsInHouse = (houseNo: number): Planet[] => {
    return planets.filter(p => p.house_no === houseNo);
  };

  const getHouseForSign = (sign: string) => {
    const signIndex = zodiacSigns.indexOf(sign as typeof zodiacSigns[number]);
    if (signIndex === -1 || ascendantIndex === -1) return 1;
    return ((signIndex - ascendantIndex + 12) % 12) + 1;
  };

  const getPlanetsInSign = (sign: string): Planet[] => {
    const houseNo = getHouseForSign(sign);
    return planets.filter(p => p.house_no === houseNo);
  };

  // Group planets by direction based on their house_no
  const getPlanetsForDirection = (houses: number[]): Planet[] => {
    return planets.filter((planet) => houses.includes(planet.house_no));
  };

  // Render North Indian Chart SVG only
  const renderNorthIndianChart = () => {
    const size = 400;
    const margin = 20;
    const inner = size - 2 * margin;
    const mid = size / 2;

    return (
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
        <rect x="0" y="0" width={size} height={size} fill={chartTheme.background} rx="8" />
        <rect x={margin} y={margin} width={inner} height={inner} fill={chartTheme.cardBg} />
        <rect x={margin} y={margin} width={inner} height={inner} fill="none" stroke={chartTheme.borderPrimary} strokeWidth="2" />
        <line x1={margin} y1={margin} x2={size - margin} y2={size - margin} stroke={chartTheme.borderPrimary} strokeWidth="1.5" />
        <line x1={size - margin} y1={margin} x2={margin} y2={size - margin} stroke={chartTheme.borderPrimary} strokeWidth="1.5" />
        <polygon points={`${mid},${margin} ${size - margin},${mid} ${mid},${size - margin} ${margin},${mid}`} fill="none" stroke={chartTheme.borderPrimary} strokeWidth="1.5" />
        
        {/* Signs */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((houseNo) => {
          const pos = SIGN_POSITIONS[houseNo];
          const sign = getSignForHouse(houseNo);
          return (
            <text key={`sign-${houseNo}`} x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill={chartTheme.signColor}>
              {zodiacSymbols[sign] || ""}
            </text>
          );
        })}

        {/* Planets */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((houseNo) => {
          const centerPos = PLANET_CENTER_POSITIONS[houseNo];
          const housePlanets = getPlanetsInHouse(houseNo);
          if (housePlanets.length === 0) return null;
          return (
            <g key={`planets-house-${houseNo}`}>
              {housePlanets.map((planet, idx) => {
                const totalPlanets = housePlanets.length;
                const cols = Math.min(totalPlanets, 3);
                const col = idx % cols;
                const row = Math.floor(idx / cols);
                const colOffset = (col - (cols - 1) / 2) * 22;
                const rowOffset = (row - (Math.ceil(totalPlanets / cols) - 1) / 2) * 14;
                return (
                  <text key={`planet-${houseNo}-${planet.planet}`} x={centerPos.x + colOffset} y={centerPos.y + rowOffset} textAnchor="middle" dominantBaseline="middle" fill={planetColors[planet.planet] || themeColors.text.primary} fontSize="11" fontWeight="600">
                    {planetShort[planet.planet] || planet.planet.slice(0, 2)}
                  </text>
                );
              })}
            </g>
          );
        })}
      </svg>
    );
  };

  // Render South Indian Chart SVG only
  const renderSouthIndianChart = () => {
    const cellSize = 90;
    const padding = 10;
    const totalSize = cellSize * 4 + padding * 2;

    return (
      <svg viewBox={`0 0 ${totalSize} ${totalSize}`} className="w-full h-auto">
        <rect x="0" y="0" width={totalSize} height={totalSize} fill={chartTheme.background} rx="8" />
        <rect x={padding} y={padding} width={cellSize * 4} height={cellSize * 4} fill="none" stroke={chartTheme.borderPrimary} strokeWidth="2" rx="4" />
        
        {zodiacSigns.map((sign) => {
          const posIndex = SOUTH_INDIAN_SIGN_POSITIONS[sign];
          const gridPos = GRID_POSITIONS[posIndex];
          const x = padding + gridPos.col * cellSize;
          const y = padding + gridPos.row * cellSize;
          const houseNo = getHouseForSign(sign);
          const signPlanets = getPlanetsInSign(sign);

          return (
            <g key={sign}>
              <rect x={x} y={y} width={cellSize} height={cellSize} fill={chartTheme.cardBg} stroke={chartTheme.borderSecondary} strokeWidth="1" />
              <text x={x + 8} y={y + 16} fontSize="14" fill={chartTheme.signColor}>{zodiacSymbols[sign] || ""}</text>
              <text x={x + cellSize - 12} y={y + 14} textAnchor="end" fontSize="10" fontWeight="500" fill={chartTheme.houseNumberColor}>{houseNo}</text>
              {signPlanets.map((planet, idx) => {
                const col = idx % 3;
                const row = Math.floor(idx / 3);
                return (
                  <text key={planet.planet} x={x + 10 + col * 28} y={y + 38 + row * 18} fill={planetColors[planet.planet] || themeColors.text.primary} fontSize="12" fontWeight="600">
                    {planetShort[planet.planet] || planet.planet.slice(0, 2)}
                  </text>
                );
              })}
            </g>
          );
        })}

        {/* Center area */}
        <rect x={padding + cellSize} y={padding + cellSize} width={cellSize * 2} height={cellSize * 2} fill={themeColors.background.secondary} stroke={chartTheme.borderPrimary} strokeWidth="1" />
        <line x1={padding + cellSize} y1={padding + cellSize} x2={padding + cellSize * 3} y2={padding + cellSize * 3} stroke={chartTheme.borderSecondary} strokeWidth="1" />
        <line x1={padding + cellSize * 3} y1={padding + cellSize} x2={padding + cellSize} y2={padding + cellSize * 3} stroke={chartTheme.borderSecondary} strokeWidth="1" />
      </svg>
    );
  };

  // Render a single direction box
  const renderDirectionBox = (direction: DirectionData, position: string) => {
    const directionPlanets = getPlanetsForDirection(direction.houses);

    const positionStyles: Record<string, React.CSSProperties> = {
      north: { gridColumn: '2', gridRow: '1' },
      east: { gridColumn: '3', gridRow: '2' },
      south: { gridColumn: '2', gridRow: '3' },
      west: { gridColumn: '1', gridRow: '2' },
    };

    return (
      <div
        key={direction.name}
        className='rounded-xl p-4 flex flex-col aspect-square'
        style={{
          ...positionStyles[position],
          backgroundColor: themeColors.background.white,
          border: `2px solid ${themeColors.brand.primary}`,
          boxShadow: `0 4px 12px ${themeColors.shadow.soft}`,
        }}
      >
        {/* Direction Header */}
        <div
          className='text-center mb-2 pb-2'
          style={{ borderBottom: `1px solid ${themeColors.border.light}` }}
        >
          <h3
            className='font-bold text-base'
            style={{ color: themeColors.text.primary }}
          >
            {direction.name} ({direction.label})
          </h3>
          <span
            className='text-xs'
            style={{ color: themeColors.text.secondary }}
          >
            {direction.meaning}
          </span>
        </div>

        {/* Planets in this direction */}
        <div className='flex-1 flex flex-col justify-center space-y-2 overflow-auto'>
          {directionPlanets.length === 0 ? (
            <p
              className='text-center text-sm italic'
              style={{ color: themeColors.text.muted }}
            >
              No planets
            </p>
          ) : (
            directionPlanets.map((planet, idx) => (
              <div key={`${planet.planet}-${idx}`} className='text-center'>
                <div
                  className='font-medium text-sm'
                  style={{ color: themeColors.text.primary }}
                >
                  {planet.planet} ({planet.degree.toFixed(1)}°)
                </div>
                <div
                  className='text-xs'
                  style={{ color: themeColors.text.secondary }}
                >
                  H{planet.house_no} - {planet.sign}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='glass-card rounded-2xl p-6'>
      {/* Title and Toggle Row */}
      <div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
        <h2
          className='text-xl font-semibold'
          style={{
            color: themeColors.text.primary,
            fontFamily: cssVars.fontPlayfair,
          }}
        >
          BNN Directional House Chart
        </h2>

        {/* Toggle Switch */}
        <div
          className='inline-flex rounded-xl p-1 shadow-sm'
          style={{
            backgroundColor: themeColors.background.card,
            border: `1px solid ${themeColors.border.soft}`,
          }}
        >
          <button
            onClick={() => setChartView('north')}
            className='px-4 py-2 rounded-lg text-sm font-medium transition-all'
            style={{
              background: chartView === 'north'
                ? `linear-gradient(to right, ${themeColors.brand.accent}, ${themeColors.brand.accentLight})`
                : 'transparent',
              color: chartView === 'north' ? themeColors.text.white : themeColors.text.secondary,
              boxShadow: chartView === 'north' ? `0 2px 8px ${themeColors.shadow.soft}` : 'none',
            }}
          >
            ◇ North Indian
          </button>
          <button
            onClick={() => setChartView('south')}
            className='px-4 py-2 rounded-lg text-sm font-medium transition-all'
            style={{
              background: chartView === 'south'
                ? `linear-gradient(to right, ${themeColors.brand.accent}, ${themeColors.brand.accentLight})`
                : 'transparent',
              color: chartView === 'south' ? themeColors.text.white : themeColors.text.secondary,
              boxShadow: chartView === 'south' ? `0 2px 8px ${themeColors.shadow.soft}` : 'none',
            }}
          >
            ▣ South Indian
          </button>
        </div>
      </div>

      {/* Chart Grid */}
      <div
        className='grid gap-4 max-w-5xl mx-auto'
        style={{
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr 1fr',
        }}
      >
        {/* North - Top Center */}
        {renderDirectionBox(DIRECTIONS[0], 'north')}

        {/* West - Middle Left */}
        {renderDirectionBox(DIRECTIONS[3], 'west')}

        {/* Center - Kundali Chart */}
        <div
          className='flex items-center justify-center aspect-square'
          style={{
            gridColumn: '2',
            gridRow: '2',
          }}
        >
          <div className='w-full h-full'>
            {chartView === 'north' ? renderNorthIndianChart() : renderSouthIndianChart()}
          </div>
        </div>

        {/* East - Middle Right */}
        {renderDirectionBox(DIRECTIONS[1], 'east')}

        {/* South - Bottom Center */}
        {renderDirectionBox(DIRECTIONS[2], 'south')}
      </div>

      {/* Legend */}
      <div
        className='mt-6 pt-4'
        style={{ borderTop: `1px solid ${themeColors.border.light}` }}
      >
        <div className='flex flex-wrap justify-center gap-4 text-sm'>
          {DIRECTIONS.map((dir) => (
            <div key={dir.name} className='flex items-center gap-2'>
              <div
                className='w-3 h-3 rounded-full'
                style={{
                  backgroundColor: themeColors.brand.primary,
                  opacity: 0.7 + DIRECTIONS.indexOf(dir) * 0.1,
                }}
              />
              <span style={{ color: themeColors.text.secondary }}>
                <strong style={{ color: themeColors.text.primary }}>
                  {dir.name}
                </strong>{' '}
                ({dir.label}) - {dir.meaning}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
