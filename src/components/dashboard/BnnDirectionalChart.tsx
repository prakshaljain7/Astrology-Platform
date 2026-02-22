'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Planet } from '@/types/kundali';
import { cssVars, planetColors } from '@/lib/theme';
import { MiniChart, type ChartPlanet } from '@/components/charts';

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

export function BnnDirectionalChart({ planets, ascendantSign }: BnnDirectionalChartProps) {
  const { themeColors } = useTheme();
  const [chartView, setChartView] = useState<'north' | 'south'>('north');

  // Convert Planet[] to ChartPlanet[] for the unified chart system
  const chartPlanets: ChartPlanet[] = planets.map(p => ({
    planet: p.planet,
    sign: p.sign,
    degree: p.degree,
    house_no: p.house_no,
  }));

  // Group planets by direction based on their house_no
  const getPlanetsForDirection = (houses: number[]): Planet[] => {
    return planets.filter((planet) => houses.includes(planet.house_no));
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
                  style={{ color: planetColors[planet.planet] || themeColors.text.primary }}
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

        {/* Center - Kundali Chart (using unified MiniChart) */}
        <div
          className='flex items-center justify-center aspect-square'
          style={{
            gridColumn: '2',
            gridRow: '2',
          }}
        >
          <div className='w-full h-full'>
            <MiniChart
              planets={chartPlanets}
              ascendantSign={ascendantSign}
              chartType={chartView}
              size={400}
            />
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
