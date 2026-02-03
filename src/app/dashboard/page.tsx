'use client';

import { useState } from 'react';
import { KundaliForm } from '@/components/dashboard/KundaliForm';
import { AscendantCard } from '@/components/dashboard/AscendantCard';
import { HouseTable } from '@/components/dashboard/HouseTable';
import { PlanetTable } from '@/components/dashboard/PlanetTable';
import { NorthIndianChart } from '@/components/dashboard/NorthIndianChart';
import { SouthIndianChart } from '@/components/dashboard/SouthIndianChart';
import { VimshotriDasha } from '@/components/dashboard/VimshotriDasha';
import { kundaliApi } from '@/lib/api';
import { KundaliFormData } from '@/types/kundali';
import { useKundaliData } from '@/context/KundaliDataContext';
import { colors, cssVars } from '@/lib/theme';

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

  const [activeChartView, setActiveChartView] = useState<'north' | 'south'>(
    'north',
  );

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

  const moonDegree = getMoonDegree();
  const moonSign = getMoonSignNumber();

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
          {savedFormData && moonDegree !== null && moonSign !== null && (
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

              <VimshotriDasha
                dob={savedFormData.dob}
                tob={savedFormData.tob}
                moonSign={moonSign}
                moonDegree={moonDegree}
                showHeader={false}
              />
            </div>
          )}
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
