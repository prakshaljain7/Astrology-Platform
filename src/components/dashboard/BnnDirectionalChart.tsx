'use client';

import { useTheme } from '@/context/ThemeContext';
import { Planet } from '@/types/kundali';
import { cssVars } from '@/lib/theme';

interface BnnDirectionalChartProps {
  planets: Planet[];
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

export function BnnDirectionalChart({ planets }: BnnDirectionalChartProps) {
  const { themeColors } = useTheme();

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
        className='rounded-xl p-4 min-h-[180px] flex flex-col'
        style={{
          ...positionStyles[position],
          backgroundColor: themeColors.background.white,
          border: `2px solid ${themeColors.brand.primary}`,
          boxShadow: `0 4px 12px ${themeColors.shadow.soft}`,
        }}
      >
        {/* Direction Header */}
        <div
          className='text-center mb-3 pb-2'
          style={{ borderBottom: `1px solid ${themeColors.border.light}` }}
        >
          <h3
            className='font-bold text-lg'
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
        <div className='flex-1 space-y-3'>
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
                  className='font-medium'
                  style={{ color: themeColors.text.primary }}
                >
                  {planet.planet} ({planet.degree.toFixed(2)}°)
                </div>
                <div
                  className='text-xs'
                  style={{ color: themeColors.text.secondary }}
                >
                  House {planet.house_no} ({planet.sign})
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
      {/* Title */}
      <h2
        className='text-xl font-semibold mb-6 text-center'
        style={{
          color: themeColors.text.primary,
          fontFamily: cssVars.fontPlayfair,
        }}
      >
        BNN Directional House Chart
      </h2>

      {/* Chart Grid */}
      <div
        className='grid gap-4 max-w-2xl mx-auto'
        style={{
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: 'auto auto auto',
        }}
      >
        {/* North - Top Center */}
        {renderDirectionBox(DIRECTIONS[0], 'north')}

        {/* West - Middle Left */}
        {renderDirectionBox(DIRECTIONS[3], 'west')}

        {/* Center - Empty or with label */}
        <div
          className='flex items-center justify-center rounded-xl'
          style={{
            gridColumn: '2',
            gridRow: '2',
            backgroundColor: themeColors.brand.accentBg20,
            border: `1px dashed ${themeColors.brand.accent}`,
          }}
        >
          <div className='text-center p-4'>
            <svg
              className='w-12 h-12 mx-auto mb-2'
              style={{ color: themeColors.brand.accent }}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
              />
            </svg>
            <span
              className='text-sm font-medium'
              style={{ color: themeColors.brand.accent }}
            >
              Natal Chart
            </span>
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
