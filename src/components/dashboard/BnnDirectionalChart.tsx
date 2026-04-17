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

export function BnnDirectionalChart({
  planets,
  ascendantSign,
}: BnnDirectionalChartProps) {
  const { themeColors } = useTheme();
  const [chartView, setChartView] = useState<'north' | 'south'>('north');

  // Convert Planet[] to ChartPlanet[] for the unified chart system
  const chartPlanets: ChartPlanet[] = planets.map((p) => ({
    planet: p.planet,
    sign: p.sign,
    degree: p.degree,
    house_no: p.house_no,
  }));

  // Group planets by direction based on their house_no
  const getPlanetsForDirection = (houses: number[]): Planet[] => {
    return planets.filter((planet) => houses.includes(planet.house_no));
  };

  // Render a single direction box (desktop / md+ grid)
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
        className='hidden h-full min-h-0 w-full min-w-0 max-h-full max-w-full flex-col overflow-hidden rounded-xl p-4 md:flex'
        style={{
          ...positionStyles[position],
          backgroundColor: themeColors.background.white,
          border: `1px solid ${themeColors.brand.primary}`,
          boxShadow: `0 2px 10px ${themeColors.shadow.soft}`,
        }}
      >
        {/* Direction Header */}
        <div
          className='mb-2 shrink-0 pb-2 text-center'
          style={{ borderBottom: `1px solid ${themeColors.border.light}` }}
        >
          <h3
            className='text-base font-bold leading-tight'
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
        <div className='flex min-h-0 flex-1 flex-col justify-center space-y-2 overflow-y-auto overscroll-y-contain'>
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
                  className='text-sm font-medium leading-snug'
                  style={{
                    color:
                      planetColors[planet.planet] || themeColors.text.primary,
                  }}
                >
                  {planet.planet} ({planet.degree.toFixed(1)}°)
                </div>
                <div
                  className='text-xs leading-snug'
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

  /** Compact text-only blocks below chart on small screens (no borders). */
  const renderMobileDirectionBelow = (direction: DirectionData) => {
    const directionPlanets = getPlanetsForDirection(direction.houses);

    return (
      <div key={`mb-${direction.name}`} className='min-w-0'>
        <div className='text-xs leading-snug font-semibold'>
          <span style={{ color: themeColors.text.primary }}>
            {direction.name}
          </span>
          <span style={{ color: themeColors.text.secondary }}>
            {' '}
            ({direction.label})
          </span>
        </div>
        <div
          className='text-[10px] leading-tight'
          style={{ color: themeColors.text.muted }}
        >
          {direction.meaning}
        </div>
        {directionPlanets.length > 0 ? (
          <ul className='mt-1 flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] leading-tight'>
            {directionPlanets.map((planet, idx) => (
              <li
                key={`${planet.planet}-${idx}`}
                style={{
                  color:
                    planetColors[planet.planet] || themeColors.text.primary,
                }}
              >
                {planet.planet}{' '}
                <span style={{ color: themeColors.text.muted }}>
                  H{planet.house_no}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p
            className='mt-0.5 text-[10px] italic'
            style={{ color: themeColors.text.muted }}
          >
            No planets
          </p>
        )}
      </div>
    );
  };

  return (
    <div className='glass-card rounded-2xl p-4 md:p-6'>
      {/* Title and Toggle Row */}
      <div className='mb-6 flex flex-wrap items-center justify-between gap-4 max-md:mb-4 max-md:flex-col max-md:items-stretch'>
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
          className='flex w-full rounded-xl p-1 shadow-sm md:inline-flex md:w-auto'
          style={{
            backgroundColor: themeColors.background.card,
            border: `1px solid ${themeColors.border.soft}`,
          }}
        >
          <button
            onClick={() => setChartView('north')}
            className='flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all md:flex-none md:px-4'
            style={{
              background:
                chartView === 'north'
                  ? `linear-gradient(to right, ${themeColors.brand.accent}, ${themeColors.brand.accentLight})`
                  : 'transparent',
              color:
                chartView === 'north'
                  ? themeColors.text.white
                  : themeColors.text.secondary,
              boxShadow:
                chartView === 'north'
                  ? `0 2px 8px ${themeColors.shadow.soft}`
                  : 'none',
            }}
          >
            ◇ North Indian
          </button>
          <button
            onClick={() => setChartView('south')}
            className='flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all md:flex-none md:px-4'
            style={{
              background:
                chartView === 'south'
                  ? `linear-gradient(to right, ${themeColors.brand.accent}, ${themeColors.brand.accentLight})`
                  : 'transparent',
              color:
                chartView === 'south'
                  ? themeColors.text.white
                  : themeColors.text.secondary,
              boxShadow:
                chartView === 'south'
                  ? `0 2px 8px ${themeColors.shadow.soft}`
                  : 'none',
            }}
          >
            ▣ South Indian
          </button>
        </div>
      </div>

      {/* Mobile: full-width chart first; direction copy below (no side strips) */}
      <div className='mx-auto flex w-full flex-col gap-4 md:hidden'>
        <div className='relative aspect-square w-full min-w-0'>
          <MiniChart
            planets={chartPlanets}
            ascendantSign={ascendantSign}
            chartType={chartView}
            size={520}
          />
        </div>
        <div
          className='grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-3'
          style={{ borderColor: themeColors.border.light }}
        >
          {/* Compass layout: N | E / W | S */}
          {renderMobileDirectionBelow(DIRECTIONS[0])}
          {renderMobileDirectionBelow(DIRECTIONS[1])}
          {renderMobileDirectionBelow(DIRECTIONS[3])}
          {renderMobileDirectionBelow(DIRECTIONS[2])}
        </div>
      </div>

      {/* Desktop: center-weighted grid — edge cells sized for readable direction boxes */}
      <div
        className='mx-auto hidden min-h-0 max-w-5xl gap-3 md:grid md:min-h-120 lg:min-h-128'
        style={{
          gridTemplateColumns:
            'minmax(11.5rem, 0.82fr) minmax(0, 1.68fr) minmax(11.5rem, 0.82fr)',
          gridTemplateRows:
            'minmax(9.5rem, 0.74fr) minmax(0, 1.82fr) minmax(9.5rem, 0.74fr)',
        }}
      >
        {/* North - Top Center */}
        {renderDirectionBox(DIRECTIONS[0], 'north')}

        {/* West - Middle Left */}
        {renderDirectionBox(DIRECTIONS[3], 'west')}

        {/* Center - Kundali Chart (using unified MiniChart) */}
        <div
          className='flex min-h-0 min-w-0 items-center justify-center p-2'
          style={{
            gridColumn: '2',
            gridRow: '2',
          }}
        >
          <div className='aspect-square h-full max-h-full w-full min-h-0 min-w-0 max-w-full'>
            <MiniChart
              planets={chartPlanets}
              ascendantSign={ascendantSign}
              chartType={chartView}
              size={560}
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
