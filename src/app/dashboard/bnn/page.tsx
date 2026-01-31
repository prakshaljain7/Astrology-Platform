'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useKundaliData } from '@/context/KundaliDataContext';
import { useTheme } from '@/context/ThemeContext';
import { bnnApi } from '@/lib/api';
import { BnnResponse, BnnEvent } from '@/types/kundali';
import { colors, cssVars, planetColors } from '@/lib/theme';
import { BnnDirectionalChart } from '@/components/dashboard/BnnDirectionalChart';

export default function BnnPage() {
  const { formData, hasData, kundaliData } = useKundaliData();
  const { themeColors } = useTheme();
  const [bnnData, setBnnData] = useState<BnnResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [yearsToPredict, setYearsToPredict] = useState(60);
  const [filterPlanet, setFilterPlanet] = useState<string>('all');
  const [filterTriangle, setFilterTriangle] = useState<string>('all');

  // Calculate BNN when data is available
  const calculateBnn = async () => {
    if (!hasData || !formData) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await bnnApi.computeBnn({
        dob: formData.dob,
        tob: formData.tob,
        lat: formData.lat,
        lon: formData.lon,
        tz: formData.tz,
        ayanamsa: formData.ayanamsa,
        years: yearsToPredict,
      });
      setBnnData(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to calculate BNN. Please check if the API server is running.',
      );
      console.error('Error calculating BNN:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-calculate when data becomes available
  useEffect(() => {
    if (hasData && !bnnData) {
      calculateBnn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasData]);

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // Get planet from event string (e.g., "Jupiter → Moon" returns "Moon")
  const getTargetPlanet = (event: string): string => {
    const parts = event.split('→');
    return parts.length > 1 ? parts[1].trim() : event;
  };

  // Get planet color
  const getPlanetColor = (planet: string): string => {
    return planetColors[planet] || themeColors.brand.accent;
  };

  // Get triangle color based on group
  const getTriangleColor = (group: string): string => {
    const groupColors: Record<string, string> = {
      '1/5/9': '#059669', // Green - Dharma
      '2/6/10': '#0ea5e9', // Blue - Artha (Money/Work)
      '3/7/11': '#d97706', // Orange - Kama (Efforts/Gains)
      '4/8/12': '#7c3aed', // Purple - Moksha (Transformation)
    };
    return groupColors[group] || themeColors.brand.accent;
  };

  // Get unique planets and triangles for filters
  const getUniquePlanets = (): string[] => {
    if (!bnnData) return [];
    const planets = new Set<string>();
    bnnData.forEach((event) => {
      planets.add(getTargetPlanet(event.event));
    });
    return Array.from(planets).sort();
  };

  const getUniqueTriangles = (): string[] => {
    if (!bnnData) return [];
    const triangles = new Set<string>();
    bnnData.forEach((event) => {
      event.triangles.forEach((t) => triangles.add(t.group));
    });
    return Array.from(triangles).sort();
  };

  // Filter events
  const filteredEvents = bnnData?.filter((event) => {
    const planetMatch =
      filterPlanet === 'all' || getTargetPlanet(event.event) === filterPlanet;
    const triangleMatch =
      filterTriangle === 'all' ||
      event.triangles.some((t) => t.group === filterTriangle);
    return planetMatch && triangleMatch;
  });

  // Group events by year
  const groupEventsByYear = (
    events: BnnEvent[],
  ): Record<string, BnnEvent[]> => {
    const grouped: Record<string, BnnEvent[]> = {};
    events.forEach((event) => {
      const year = event.date.split('-')[0];
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(event);
    });
    return grouped;
  };

  // Render no data state
  if (!hasData) {
    return (
      <div className='p-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1
            className='text-3xl font-semibold mb-2 shimmer-gold'
            style={{
              color: colors.text.primary,
              fontFamily: cssVars.fontPlayfair,
            }}
          >
            Bhrigu Nandi Nadi
          </h1>
          <p style={{ color: colors.text.secondary }}>
            Jupiter transit predictions based on natal chart
          </p>
        </div>

        {/* No Data Card */}
        <div className='glass-card rounded-2xl p-8 text-center'>
          <div
            className='w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center'
            style={{
              background: `linear-gradient(to bottom right, ${themeColors.brand.accentBg50}, ${themeColors.decorative.lavenderBg})`,
              boxShadow: `0 10px 30px ${themeColors.brand.accentBg}`,
            }}
          >
            <svg
              className='w-10 h-10'
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
          </div>
          <h3
            className='text-xl mb-3'
            style={{
              color: themeColors.text.primary,
              fontFamily: cssVars.fontPlayfair,
            }}
          >
            Calculate Kundali First
          </h3>
          <p
            className='mb-6 max-w-md mx-auto'
            style={{ color: themeColors.text.secondary }}
          >
            To view Bhrigu Nandi Nadi predictions, please calculate your Kundali
            first. BNN uses Jupiter&apos;s transit over natal planets to predict
            significant life events.
          </p>
          <Link
            href='/dashboard'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all'
            style={{
              background: `linear-gradient(to right, ${themeColors.brand.accent}, ${themeColors.brand.accentLight})`,
              color: '#3a2d0b',
              boxShadow: `0 4px 15px ${themeColors.brand.accentBg}`,
            }}
          >
            <svg
              className='w-5 h-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            Go to Kundali Calculator
          </Link>
        </div>
      </div>
    );
  }

  const groupedEvents = filteredEvents ? groupEventsByYear(filteredEvents) : {};
  const years = Object.keys(groupedEvents).sort();

  return (
    <div className='p-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1
          className='text-3xl font-semibold mb-2 shimmer-gold'
          style={{
            color: colors.text.primary,
            fontFamily: cssVars.fontPlayfair,
          }}
        >
          Bhrigu Nandi Nadi
        </h1>
        <p style={{ color: colors.text.secondary }}>
          Jupiter transit predictions based on natal chart positions
        </p>
      </div>

      {/* Birth Details Summary */}
      {formData && (
        <div
          className='glass-card rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center'
          style={{ borderLeft: `4px solid ${themeColors.brand.accent}` }}
        >
          <div className='flex items-center gap-2'>
            <svg
              className='w-4 h-4'
              style={{ color: themeColors.brand.accent }}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            <span style={{ color: themeColors.text.secondary }}>DOB:</span>
            <span style={{ color: themeColors.text.primary, fontWeight: 500 }}>
              {formData.dob}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <svg
              className='w-4 h-4'
              style={{ color: themeColors.brand.accent }}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span style={{ color: themeColors.text.secondary }}>TOB:</span>
            <span style={{ color: themeColors.text.primary, fontWeight: 500 }}>
              {formData.tob}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <svg
              className='w-4 h-4'
              style={{ color: themeColors.brand.accent }}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            <span style={{ color: themeColors.text.secondary }}>Location:</span>
            <span style={{ color: themeColors.text.primary, fontWeight: 500 }}>
              {formData.lat.toFixed(4)}°, {formData.lon.toFixed(4)}°
            </span>
          </div>
          <Link
            href='/dashboard'
            className='ml-auto text-sm flex items-center gap-1 hover:underline'
            style={{ color: themeColors.brand.accent }}
          >
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
              />
            </svg>
            Edit Details
          </Link>
        </div>
      )}

      {/* Controls */}
      <div className='glass-card rounded-xl p-4 mb-6'>
        <div className='flex flex-wrap gap-4 items-end'>
          {/* Years to predict */}
          <div>
            <label
              className='block text-sm font-medium mb-1'
              style={{ color: themeColors.text.secondary }}
            >
              Years to Predict
            </label>
            <select
              value={yearsToPredict}
              onChange={(e) => setYearsToPredict(Number(e.target.value))}
              className='px-3 py-2 rounded-lg border'
              style={{
                backgroundColor: themeColors.background.input,
                borderColor: themeColors.border.gray,
                color: themeColors.text.primary,
              }}
            >
              <option value={30}>30 Years</option>
              <option value={60}>60 Years</option>
              <option value={90}>90 Years</option>
              <option value={120}>120 Years</option>
            </select>
          </div>

          {/* Filter by planet */}
          <div>
            <label
              className='block text-sm font-medium mb-1'
              style={{ color: themeColors.text.secondary }}
            >
              Filter by Planet
            </label>
            <select
              value={filterPlanet}
              onChange={(e) => setFilterPlanet(e.target.value)}
              className='px-3 py-2 rounded-lg border'
              style={{
                backgroundColor: themeColors.background.input,
                borderColor: themeColors.border.gray,
                color: themeColors.text.primary,
              }}
            >
              <option value='all'>All Planets</option>
              {getUniquePlanets().map((planet) => (
                <option key={planet} value={planet}>
                  {planet}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by triangle */}
          <div>
            <label
              className='block text-sm font-medium mb-1'
              style={{ color: themeColors.text.secondary }}
            >
              Filter by Triangle
            </label>
            <select
              value={filterTriangle}
              onChange={(e) => setFilterTriangle(e.target.value)}
              className='px-3 py-2 rounded-lg border'
              style={{
                backgroundColor: themeColors.background.input,
                borderColor: themeColors.border.gray,
                color: themeColors.text.primary,
              }}
            >
              <option value='all'>All Triangles</option>
              {getUniqueTriangles().map((triangle) => (
                <option key={triangle} value={triangle}>
                  {triangle}
                </option>
              ))}
            </select>
          </div>

          {/* Recalculate button */}
          <button
            onClick={calculateBnn}
            disabled={isLoading}
            className='px-4 py-2 rounded-lg font-medium transition-all'
            style={{
              background: `linear-gradient(to right, ${themeColors.brand.accent}, ${themeColors.brand.accentLight})`,
              color: '#3a2d0b',
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? 'Calculating...' : 'Recalculate'}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className='glass-card rounded-2xl p-8 text-center'>
          <div
            className='w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4'
            style={{
              borderColor: themeColors.brand.accent,
              borderTopColor: 'transparent',
            }}
          />
          <p style={{ color: themeColors.text.secondary }}>
            Calculating Bhrigu Nandi Nadi predictions...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          className='mb-8 p-4 rounded-xl'
          style={{
            backgroundColor: colors.status.errorBg,
            border: `1px solid ${colors.status.errorBorder}`,
          }}
        >
          <div className='flex items-center gap-3'>
            <svg
              className='w-5 h-5'
              style={{ color: colors.status.error }}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <p style={{ color: colors.status.error }}>{error}</p>
          </div>
        </div>
      )}

      {/* Directional Chart - Show when kundali data is available */}
      {kundaliData && kundaliData.planets && (
        <div className='mb-6'>
          <BnnDirectionalChart planets={kundaliData.planets} />
        </div>
      )}

      {/* Results */}
      {bnnData && !isLoading && (
        <div className='space-y-6 animate-fadeIn'>
          {/* Summary */}
          <div className='glass-card rounded-xl p-4'>
            <div className='flex flex-wrap gap-4 items-center'>
              <div className='flex items-center gap-2'>
                <span style={{ color: themeColors.text.secondary }}>
                  Total Events:
                </span>
                <span
                  className='font-bold'
                  style={{ color: themeColors.brand.accent }}
                >
                  {filteredEvents?.length || 0}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <span style={{ color: themeColors.text.secondary }}>
                  Years Covered:
                </span>
                <span
                  className='font-bold'
                  style={{ color: themeColors.brand.accent }}
                >
                  {years.length > 0
                    ? `${years[0]} - ${years[years.length - 1]}`
                    : '-'}
                </span>
              </div>
            </div>
          </div>

          {/* Triangle Legend */}
          <div className='glass-card rounded-xl p-4'>
            <h3
              className='font-semibold mb-3'
              style={{ color: themeColors.text.primary }}
            >
              Triangle Meanings
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
              {[
                {
                  group: '1/5/9',
                  meaning: 'Dharma - Destiny, learning, direction',
                },
                { group: '2/6/10', meaning: 'Artha - Money, work, profession' },
                {
                  group: '3/7/11',
                  meaning: 'Kama - Efforts, partnerships, gains',
                },
                {
                  group: '4/8/12',
                  meaning: 'Moksha - Transformation, inner change',
                },
              ].map((item) => (
                <div
                  key={item.group}
                  className='flex items-center gap-2 p-2 rounded-lg'
                  style={{
                    backgroundColor: `${getTriangleColor(item.group)}15`,
                  }}
                >
                  <div
                    className='w-3 h-3 rounded-full'
                    style={{ backgroundColor: getTriangleColor(item.group) }}
                  />
                  <div>
                    <span
                      className='font-medium'
                      style={{ color: getTriangleColor(item.group) }}
                    >
                      {item.group}
                    </span>
                    <span
                      className='text-xs ml-1'
                      style={{ color: themeColors.text.secondary }}
                    >
                      {item.meaning}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events by Year */}
          {years.map((year) => (
            <div key={year} className='glass-card rounded-xl overflow-hidden'>
              <div
                className='px-4 py-3 font-semibold'
                style={{
                  backgroundColor: themeColors.brand.accentBg20,
                  color: themeColors.text.primary,
                }}
              >
                {year} ({groupedEvents[year].length} events)
              </div>
              <div
                className='divide-y'
                style={{ borderColor: themeColors.border.light }}
              >
                {groupedEvents[year].map((event, idx) => {
                  const targetPlanet = getTargetPlanet(event.event);
                  return (
                    <div
                      key={`${event.date}-${idx}`}
                      className='p-4 hover:bg-white/50 transition-colors'
                    >
                      <div className='flex flex-wrap items-start gap-4'>
                        {/* Date */}
                        <div className='min-w-[100px]'>
                          <span
                            className='text-sm font-medium'
                            style={{ color: themeColors.text.primary }}
                          >
                            {formatDate(event.date)}
                          </span>
                        </div>

                        {/* Event */}
                        <div className='flex items-center gap-2 min-w-[150px]'>
                          <div
                            className='w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold'
                            style={{
                              backgroundColor: getPlanetColor(targetPlanet),
                            }}
                          >
                            {targetPlanet.charAt(0)}
                          </div>
                          <span style={{ color: themeColors.text.primary }}>
                            {event.event}
                          </span>
                        </div>

                        {/* Houses */}
                        <div className='flex items-center gap-1'>
                          <span
                            className='text-sm'
                            style={{ color: themeColors.text.secondary }}
                          >
                            Houses:
                          </span>
                          {event.houses.map((house) => (
                            <span
                              key={house}
                              className='px-2 py-0.5 text-xs rounded-full'
                              style={{
                                backgroundColor: themeColors.brand.primaryBg,
                                color: themeColors.brand.primary,
                              }}
                            >
                              {house}
                            </span>
                          ))}
                        </div>

                        {/* Degrees */}
                        <div
                          className='text-sm'
                          style={{ color: themeColors.text.secondary }}
                        >
                          <span>Jupiter: {event.jupiter_deg.toFixed(2)}°</span>
                          <span className='mx-2'>|</span>
                          <span>Natal: {event.natal_deg.toFixed(2)}°</span>
                        </div>

                        {/* Triangles */}
                        <div className='flex flex-wrap gap-1 ml-auto'>
                          {event.triangles.map((triangle, tIdx) => (
                            <span
                              key={tIdx}
                              className='px-2 py-1 text-xs rounded-lg font-medium'
                              style={{
                                backgroundColor: `${getTriangleColor(triangle.group)}20`,
                                color: getTriangleColor(triangle.group),
                              }}
                              title={triangle.meaning}
                            >
                              {triangle.group}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Empty state for filtered results */}
          {filteredEvents?.length === 0 && (
            <div className='glass-card rounded-xl p-8 text-center'>
              <p style={{ color: themeColors.text.secondary }}>
                No events found for the selected filters.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
