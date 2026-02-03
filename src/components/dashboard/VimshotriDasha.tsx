'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { dashaApi } from '@/lib/api';
import {
  DashaResponse,
  MahaDasha,
  AntarDasha,
  AntarDashaResponse,
  PratyantarDasha,
  PratyantarDashaResponse,
} from '@/types/kundali';
import { colors, cssVars, planetColors } from '@/lib/theme';

interface VimshotriDashaProps {
  dob: string;
  tob: string;
  moonSign: number;
  moonDegree: number;
  showHeader?: boolean;
}

export function VimshotriDasha({
  dob,
  tob,
  moonSign,
  moonDegree,
  showHeader = true,
}: VimshotriDashaProps) {
  const { themeColors } = useTheme();

  // Dasha state
  const [dashaData, setDashaData] = useState<DashaResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Antardasha state
  const [expandedMahadasha, setExpandedMahadasha] = useState<string | null>(
    null,
  );
  const [antardashaData, setAntardashaData] = useState<
    Record<string, AntarDashaResponse>
  >({});
  const [antardashaLoading, setAntardashaLoading] = useState<string | null>(
    null,
  );

  // Pratyantardasha state
  const [expandedAntardasha, setExpandedAntardasha] = useState<string | null>(
    null,
  );
  const [pratyantardashaData, setPratyantardashaData] = useState<
    Record<string, PratyantarDashaResponse>
  >({});
  const [pratyantardashaLoading, setPratyantardashaLoading] = useState<
    string | null
  >(null);

  // Auto-calculate dasha when props change
  useEffect(() => {
    const calculateDasha = async () => {
      if (!dob || !tob || moonSign === null || moonDegree === null) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await dashaApi.computeDasha({
          dob,
          tob,
          sign: moonSign,
          degree: moonDegree,
        });
        setDashaData(response);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to calculate Dasha.',
        );
        console.error('Error calculating dasha:', err);
      } finally {
        setIsLoading(false);
      }
    };

    calculateDasha();
  }, [dob, tob, moonSign, moonDegree]);

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

  // Get planet color
  const getPlanetColor = (planet: string): string => {
    return planetColors[planet] || themeColors.brand.accent;
  };

  // Fetch Antardasha for a Mahadasha
  const fetchAntardasha = async (mahadasha: MahaDasha) => {
    // Toggle expansion
    if (expandedMahadasha === mahadasha.lord) {
      setExpandedMahadasha(null);
      return;
    }

    setExpandedMahadasha(mahadasha.lord);
    setExpandedAntardasha(null); // Close any open pratyantardasha

    // Check if we already have data
    if (antardashaData[mahadasha.lord]) return;

    setAntardashaLoading(mahadasha.lord);

    try {
      const response = await dashaApi.computeAntardasha({
        lord: mahadasha.lord,
        start: mahadasha.start,
        end: mahadasha.end,
      });
      setAntardashaData((prev) => ({ ...prev, [mahadasha.lord]: response }));
    } catch (err) {
      console.error('Error fetching antardasha:', err);
    } finally {
      setAntardashaLoading(null);
    }
  };

  // Fetch Pratyantardasha for an Antardasha
  const fetchPratyantardasha = async (
    mahadashaLord: string,
    antardasha: AntarDasha,
  ) => {
    const key = `${mahadashaLord}-${antardasha.lord}`;

    // Toggle expansion
    if (expandedAntardasha === key) {
      setExpandedAntardasha(null);
      return;
    }

    setExpandedAntardasha(key);

    // Check if we already have data
    if (pratyantardashaData[key]) return;

    setPratyantardashaLoading(key);

    try {
      const response = await dashaApi.computePratyantardasha({
        lord: antardasha.lord,
        start: antardasha.start,
        end: antardasha.end,
      });
      setPratyantardashaData((prev) => ({ ...prev, [key]: response }));
    } catch (err) {
      console.error('Error fetching pratyantardasha:', err);
    } finally {
      setPratyantardashaLoading(null);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className='glass-card rounded-2xl p-8 text-center'>
        <div
          className='w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4'
          style={{
            borderColor: themeColors.brand.accent,
            borderTopColor: 'transparent',
          }}
        />
        <p style={{ color: themeColors.text.secondary }}>
          Calculating Vimshotri Dasha...
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div
        className='p-4 rounded-xl'
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
    );
  }

  // No data state
  if (!dashaData) {
    return null;
  }

  return (
    <div className='space-y-4 animate-fadeIn'>
      {showHeader && (
        <h3
          className='text-lg font-semibold mb-4'
          style={{
            color: themeColors.text.primary,
            fontFamily: cssVars.fontPlayfair,
          }}
        >
          Maha Dasha Periods
        </h3>
      )}

      {dashaData.map((dasha: MahaDasha, index: number) => (
        <div
          key={`${dasha.lord}-${index}`}
          className='glass-card rounded-xl overflow-hidden'
          style={{
            borderLeft: `4px solid ${getPlanetColor(dasha.lord)}`,
            backgroundColor: dasha.current
              ? `${getPlanetColor(dasha.lord)}10`
              : undefined,
          }}
        >
          {/* Mahadasha Header - Clickable */}
          <div
            className='p-4 flex items-center gap-4 cursor-pointer hover:bg-black/5 transition-colors'
            onClick={() => fetchAntardasha(dasha)}
          >
            <div
              className='w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg shrink-0'
              style={{ backgroundColor: getPlanetColor(dasha.lord) }}
            >
              {dasha.lord.charAt(0).toUpperCase()}
            </div>
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2 flex-wrap'>
                <h4
                  className='font-semibold text-lg'
                  style={{ color: themeColors.text.primary }}
                >
                  {dasha.lord} Maha Dasha
                </h4>
                {dasha.current && (
                  <span
                    className='px-2 py-0.5 rounded-full text-xs font-bold'
                    style={{
                      backgroundColor: getPlanetColor(dasha.lord),
                      color: '#ffffff',
                    }}
                  >
                    CURRENT
                  </span>
                )}
              </div>
              <div className='flex flex-wrap gap-4 mt-1'>
                <p
                  className='text-sm'
                  style={{ color: themeColors.text.secondary }}
                >
                  <span className='font-medium'>Start:</span>{' '}
                  {formatDate(dasha.start)}
                </p>
                <p
                  className='text-sm'
                  style={{ color: themeColors.text.secondary }}
                >
                  <span className='font-medium'>End:</span>{' '}
                  {formatDate(dasha.end)}
                </p>
              </div>
            </div>
            <div className='text-right shrink-0 flex items-center gap-3'>
              <div>
                <span
                  className='text-lg font-bold'
                  style={{ color: getPlanetColor(dasha.lord) }}
                >
                  {dasha.duration}
                </span>
                <p
                  className='text-xs'
                  style={{ color: themeColors.text.muted }}
                >
                  Duration
                </p>
              </div>
              {/* Expand/Collapse Icon */}
              <svg
                className={`w-5 h-5 transition-transform ${expandedMahadasha === dasha.lord ? 'rotate-180' : ''}`}
                style={{ color: themeColors.text.muted }}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </div>

          {/* Antardasha Section - Expandable */}
          {expandedMahadasha === dasha.lord && (
            <div
              className='border-t px-4 py-3'
              style={{
                borderColor: colors.border.soft,
                backgroundColor: 'rgba(0,0,0,0.02)',
              }}
            >
              {antardashaLoading === dasha.lord ? (
                <div className='flex items-center justify-center py-4'>
                  <div
                    className='w-6 h-6 border-2 border-t-transparent rounded-full animate-spin'
                    style={{
                      borderColor: getPlanetColor(dasha.lord),
                      borderTopColor: 'transparent',
                    }}
                  />
                  <span
                    className='ml-2 text-sm'
                    style={{ color: themeColors.text.secondary }}
                  >
                    Loading Antardasha...
                  </span>
                </div>
              ) : antardashaData[dasha.lord] ? (
                <div className='space-y-2'>
                  <h5
                    className='text-sm font-semibold mb-3'
                    style={{ color: themeColors.text.primary }}
                  >
                    Antar Dasha Periods
                  </h5>
                  {antardashaData[dasha.lord].map(
                    (antardasha: AntarDasha, adIndex: number) => {
                      const adKey = `${dasha.lord}-${antardasha.lord}`;
                      return (
                        <div
                          key={`ad-${adIndex}`}
                          className='rounded-lg overflow-hidden'
                          style={{
                            backgroundColor: antardasha.current
                              ? `${getPlanetColor(antardasha.lord)}15`
                              : 'rgba(255,255,255,0.5)',
                            border: `1px solid ${antardasha.current ? getPlanetColor(antardasha.lord) : colors.border.soft}`,
                          }}
                        >
                          {/* Antardasha Header */}
                          <div
                            className='p-3 flex items-center gap-3 cursor-pointer hover:bg-black/5 transition-colors'
                            onClick={(e) => {
                              e.stopPropagation();
                              fetchPratyantardasha(dasha.lord, antardasha);
                            }}
                          >
                            <div
                              className='w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white text-sm shrink-0'
                              style={{
                                backgroundColor: getPlanetColor(
                                  antardasha.lord,
                                ),
                              }}
                            >
                              {antardasha.lord.charAt(0)}
                            </div>
                            <div className='flex-1 min-w-0'>
                              <div className='flex items-center gap-2'>
                                <span
                                  className='font-medium text-sm'
                                  style={{ color: themeColors.text.primary }}
                                >
                                  {antardasha.lord}
                                </span>
                                {antardasha.current && (
                                  <span
                                    className='px-1.5 py-0.5 rounded text-xs font-bold'
                                    style={{
                                      backgroundColor: getPlanetColor(
                                        antardasha.lord,
                                      ),
                                      color: '#fff',
                                    }}
                                  >
                                    CURRENT
                                  </span>
                                )}
                              </div>
                              <p
                                className='text-xs'
                                style={{ color: themeColors.text.muted }}
                              >
                                {formatDate(antardasha.start)} -{' '}
                                {formatDate(antardasha.end)}
                              </p>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span
                                className='text-sm font-semibold'
                                style={{
                                  color: getPlanetColor(antardasha.lord),
                                }}
                              >
                                {antardasha.duration}
                              </span>
                              <svg
                                className={`w-4 h-4 transition-transform ${expandedAntardasha === adKey ? 'rotate-180' : ''}`}
                                style={{ color: themeColors.text.muted }}
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M19 9l-7 7-7-7'
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Pratyantardasha Section */}
                          {expandedAntardasha === adKey && (
                            <div
                              className='border-t px-3 py-2'
                              style={{
                                borderColor: colors.border.soft,
                                backgroundColor: 'rgba(0,0,0,0.03)',
                              }}
                            >
                              {pratyantardashaLoading === adKey ? (
                                <div className='flex items-center justify-center py-3'>
                                  <div
                                    className='w-5 h-5 border-2 border-t-transparent rounded-full animate-spin'
                                    style={{
                                      borderColor: getPlanetColor(
                                        antardasha.lord,
                                      ),
                                      borderTopColor: 'transparent',
                                    }}
                                  />
                                  <span
                                    className='ml-2 text-xs'
                                    style={{
                                      color: themeColors.text.secondary,
                                    }}
                                  >
                                    Loading Pratyantardasha...
                                  </span>
                                </div>
                              ) : pratyantardashaData[adKey] ? (
                                <div className='space-y-1'>
                                  <h6
                                    className='text-xs font-semibold mb-2'
                                    style={{
                                      color: themeColors.text.secondary,
                                    }}
                                  >
                                    Pratyanter Dasha Periods
                                  </h6>
                                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1'>
                                    {pratyantardashaData[adKey].map(
                                      (
                                        prat: PratyantarDasha,
                                        pIndex: number,
                                      ) => (
                                        <div
                                          key={`prat-${pIndex}`}
                                          className='flex items-center gap-2 p-2 rounded'
                                          style={{
                                            backgroundColor: prat.current
                                              ? `${getPlanetColor(prat.lord)}20`
                                              : 'rgba(255,255,255,0.5)',
                                            border: prat.current
                                              ? `1px solid ${getPlanetColor(prat.lord)}`
                                              : '1px solid transparent',
                                          }}
                                        >
                                          <div
                                            className='w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0'
                                            style={{
                                              backgroundColor: getPlanetColor(
                                                prat.lord,
                                              ),
                                            }}
                                          >
                                            {prat.lord.charAt(0)}
                                          </div>
                                          <div className='flex-1 min-w-0'>
                                            <div className='flex items-center gap-1'>
                                              <span
                                                className='text-xs font-medium'
                                                style={{
                                                  color:
                                                    themeColors.text.primary,
                                                }}
                                              >
                                                {prat.lord}
                                              </span>
                                              {prat.current && (
                                                <span
                                                  className='px-1 py-0.5 rounded text-[10px] font-bold'
                                                  style={{
                                                    backgroundColor:
                                                      getPlanetColor(prat.lord),
                                                    color: '#fff',
                                                  }}
                                                >
                                                  NOW
                                                </span>
                                              )}
                                            </div>
                                            <p
                                              className='text-[10px]'
                                              style={{
                                                color: themeColors.text.muted,
                                              }}
                                            >
                                              {formatDate(prat.start)} -{' '}
                                              {formatDate(prat.end)}
                                            </p>
                                          </div>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <p
                                  className='text-xs text-center py-2'
                                  style={{ color: themeColors.text.muted }}
                                >
                                  Unable to load Pratyantardasha
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              ) : (
                <p
                  className='text-sm text-center py-2'
                  style={{ color: themeColors.text.muted }}
                >
                  Unable to load Antardasha
                </p>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Dasha Info */}
      <div
        className='mt-6 p-4 rounded-xl'
        style={{ backgroundColor: themeColors.brand.accentBg }}
      >
        <div className='flex items-center gap-3'>
          <svg
            className='w-5 h-5 shrink-0'
            style={{ color: themeColors.brand.accent }}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <p className='text-sm' style={{ color: themeColors.text.primary }}>
            Vimshotri Dasha is a 120-year planetary period system based on the
            Moon&apos;s Nakshatra at birth. Click on any Maha Dasha to see Antar
            Dasha, and click on Antar Dasha to see Pratyanter Dasha periods.
          </p>
        </div>
      </div>
    </div>
  );
}
