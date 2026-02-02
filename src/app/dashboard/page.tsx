'use client';

import { useState, useEffect } from 'react';
import { KundaliForm } from '@/components/dashboard/KundaliForm';
import { AscendantCard } from '@/components/dashboard/AscendantCard';
import { HouseTable } from '@/components/dashboard/HouseTable';
import { PlanetTable } from '@/components/dashboard/PlanetTable';
import { NorthIndianChart } from '@/components/dashboard/NorthIndianChart';
import { SouthIndianChart } from '@/components/dashboard/SouthIndianChart';
import { kundaliApi, dashaApi } from '@/lib/api';
import { KundaliFormData, DashaResponse, MahaDasha } from '@/types/kundali';
import { useKundaliData } from '@/context/KundaliDataContext';
import { useTheme } from '@/context/ThemeContext';
import { colors, cssVars, planetColors } from '@/lib/theme';

export default function DashboardPage() {
  // Use shared context for data persistence across pages
  const {
    formData: savedFormData,
    setFormData,
    kundaliData: chartData,
    setKundaliData: setChartData,
    isLoading,
    setIsLoading,
    error,
    setError,
    getMoonDegree,
    getMoonSignNumber,
  } = useKundaliData();

  const { themeColors } = useTheme();
  const [activeChartView, setActiveChartView] = useState<'north' | 'south'>(
    'north',
  );

  // Dasha state
  const [dashaData, setDashaData] = useState<DashaResponse | null>(null);
  const [dashaLoading, setDashaLoading] = useState(false);
  const [dashaError, setDashaError] = useState<string | null>(null);

  // Auto-calculate dasha when kundali data is available
  useEffect(() => {
    const calculateDasha = async () => {
      if (!chartData || !savedFormData) return;

      const moonDegree = getMoonDegree();
      const moonSign = getMoonSignNumber();

      if (moonDegree === null || moonSign === null) {
        setDashaError('Moon data not found in Kundali.');
        return;
      }

      setDashaLoading(true);
      setDashaError(null);

      try {
        const response = await dashaApi.computeDasha({
          dob: savedFormData.dob,
          tob: savedFormData.tob,
          sign: moonSign,
          degree: moonDegree,
        });
        setDashaData(response);
      } catch (err) {
        setDashaError(
          err instanceof Error ? err.message : 'Failed to calculate Dasha.',
        );
        console.error('Error calculating dasha:', err);
      } finally {
        setDashaLoading(false);
      }
    };

    calculateDasha();
  }, [chartData, savedFormData, getMoonDegree, getMoonSignNumber]);

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

  const handleCalculate = async (formData: KundaliFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await kundaliApi.calculateLagna(formData);
      setChartData(data);
      // Save form data to context for use in other pages (like Vimshotri)
      setFormData(formData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to calculate chart. Please check if the API server is running.',
      );
      console.error('Error calculating chart:', err);
    } finally {
      setIsLoading(false);
    }
  };

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
          Vedic Lagna Calculator
        </h1>
        <p style={{ color: colors.text.secondary }}>
          Calculate birth chart with house and planetary positions
        </p>
      </div>

      {/* Form Card */}
      <div className='glass-card rounded-2xl p-6 mb-8'>
        <KundaliForm
          onSubmit={handleCalculate}
          isLoading={isLoading}
          initialData={savedFormData}
        />
      </div>

      {/* Error Message */}
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

      {/* Results */}
      {chartData && (
        <div className='space-y-8 animate-fadeIn'>
          {/* Ascendant Card */}
          <AscendantCard
            ascendant={chartData.ascendant}
            ayanamsa={chartData.ayanamsa}
          />

          {/* Chart View Toggle */}
          <div className='flex justify-center'>
            <div
              className='inline-flex rounded-xl p-1 shadow-sm'
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: `1px solid ${colors.border.soft}`,
              }}
            >
              {[
                { key: 'north', label: '◇ North Indian' },
                { key: 'south', label: '▣ South Indian' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() =>
                    setActiveChartView(item.key as typeof activeChartView)
                  }
                  className='px-5 py-2.5 rounded-lg text-sm font-medium transition-all'
                  style={{
                    background:
                      activeChartView === item.key
                        ? `linear-gradient(to right, ${colors.brand.accent}, ${colors.brand.accentLight})`
                        : 'transparent',
                    color:
                      activeChartView === item.key
                        ? '#3a2d0b'
                        : colors.text.secondary,
                    boxShadow:
                      activeChartView === item.key
                        ? '0 2px 8px rgba(0,0,0,0.1)'
                        : 'none',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Kundali Chart - Single View */}
          <div className='max-w-xl mx-auto'>
            {activeChartView === 'north' ? (
              <NorthIndianChart
                planets={chartData.planets}
                ascendantSign={chartData.ascendant.sign}
              />
            ) : (
              <SouthIndianChart
                planets={chartData.planets}
                ascendantSign={chartData.ascendant.sign}
              />
            )}
          </div>

          {/* Tables Grid */}
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
            <HouseTable houses={chartData.houses} />
            <PlanetTable planets={chartData.planets} />
          </div>

          {/* Vimshotri Dasha Section */}
          <div
            className='mt-12 pt-8'
            style={{ borderTop: `1px solid ${colors.border.soft}` }}
          >
            <div className='mb-6'>
              <h2
                className='text-2xl font-semibold mb-2 shimmer-gold'
                style={{
                  color: colors.text.primary,
                  fontFamily: cssVars.fontPlayfair,
                }}
              >
                Vimshotri Dasha
              </h2>
              <p style={{ color: colors.text.secondary }}>
                Planetary periods based on Moon position
              </p>
            </div>

            {/* Dasha Loading State */}
            {dashaLoading && (
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
            )}

            {/* Dasha Error State */}
            {dashaError && !dashaLoading && (
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
                  <p style={{ color: colors.status.error }}>{dashaError}</p>
                </div>
              </div>
            )}

            {/* Dasha Results */}
            {dashaData && !dashaLoading && (
              <div className='space-y-4 animate-fadeIn'>
                <h3
                  className='text-lg font-semibold mb-4'
                  style={{
                    color: themeColors.text.primary,
                    fontFamily: cssVars.fontPlayfair,
                  }}
                >
                  Maha Dasha Periods
                </h3>

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
                    <div className='p-4 flex items-center gap-4'>
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
                      <div className='text-right shrink-0'>
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
                    </div>
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
                    <p
                      className='text-sm'
                      style={{ color: themeColors.text.primary }}
                    >
                      Vimshotri Dasha is a 120-year planetary period system
                      based on the Moon&apos;s Nakshatra at birth.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!chartData && !error && (
        <div className='text-center py-16'>
          <div
            className='w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg'
            style={{
              background: `linear-gradient(to bottom right, ${colors.brand.accentBg50}, ${colors.decorative.lavenderBg})`,
              boxShadow: `0 10px 30px ${colors.brand.accentBg}`,
            }}
          >
            <svg
              className='w-12 h-12'
              style={{ color: colors.brand.accent }}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1}
                d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
              />
            </svg>
          </div>
          <h3
            className='text-xl mb-2'
            style={{
              color: colors.text.primary,
              fontFamily: cssVars.fontPlayfair,
            }}
          >
            Enter Birth Details
          </h3>
          <p
            className='max-w-md mx-auto'
            style={{ color: colors.text.secondary }}
          >
            Fill in the form above with date, time, and location of birth to
            calculate the Vedic birth chart.
          </p>
        </div>
      )}
    </div>
  );
}
