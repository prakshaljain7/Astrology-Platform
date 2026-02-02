'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useKundaliData } from '@/context/KundaliDataContext';
import { useTheme } from '@/context/ThemeContext';
import { dashaApi } from '@/lib/api';
import { DashaResponse, MahaDasha } from '@/types/kundali';
import { colors, cssVars, planetColors } from '@/lib/theme';

export default function VimshotriPage() {
  const { formData, hasData, getMoonDegree, getMoonSignNumber } =
    useKundaliData();
  const { themeColors } = useTheme();
  const [dashaData, setDashaData] = useState<DashaResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-calculate dasha when data is available
  useEffect(() => {
    const calculateDasha = async () => {
      if (!hasData || !formData) return;

      const moonDegree = getMoonDegree();
      const moonSign = getMoonSignNumber();

      if (moonDegree === null || moonSign === null) {
        setError('Moon data not found in Kundali. Please recalculate Kundali.');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await dashaApi.computeDasha({
          dob: formData.dob,
          tob: formData.tob,
          sign: moonSign,
          degree: moonDegree,
        });
        setDashaData(response);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to calculate Dasha. Please check if the API server is running.',
        );
        console.error('Error calculating dasha:', err);
      } finally {
        setIsLoading(false);
      }
    };

    calculateDasha();
  }, [hasData, formData, getMoonDegree, getMoonSignNumber]);

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

  // Get zodiac sign name from number
  const getSignName = (signNumber: number | null): string => {
    if (!signNumber) return '';
    const signs = [
      '',
      'Aries',
      'Taurus',
      'Gemini',
      'Cancer',
      'Leo',
      'Virgo',
      'Libra',
      'Scorpio',
      'Sagittarius',
      'Capricorn',
      'Aquarius',
      'Pisces',
    ];
    return signs[signNumber] || '';
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
            Vimshotri Dasha
          </h1>
          <p style={{ color: colors.text.secondary }}>
            View planetary periods and sub-periods
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
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
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
            To view your Vimshotri Dasha, please calculate your Kundali first.
            The Dasha periods are based on your Moon&apos;s position at birth.
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

  const moonSign = getMoonSignNumber();
  const moonDegree = getMoonDegree();

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
          Vimshotri Dasha
        </h1>
        <p style={{ color: colors.text.secondary }}>
          Planetary periods based on Moon in {getSignName(moonSign)} at{' '}
          {moonDegree?.toFixed(2)}°
        </p>
      </div>

      {/* Birth Details Summary */}
      {formData && (
        <div
          className='glass-card rounded-xl p-4 mb-8 flex flex-wrap gap-4 items-center'
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
            Calculating Vimshotri Dasha...
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

      {/* Dasha Results */}
      {dashaData && !isLoading && (
        <div className='space-y-4 animate-fadeIn'>
          <h2
            className='text-xl font-semibold mb-4'
            style={{
              color: themeColors.text.primary,
              fontFamily: cssVars.fontPlayfair,
            }}
          >
            Maha Dasha Periods
          </h2>

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
              {/* Maha Dasha Content */}
              <div className='p-4 flex items-center gap-4'>
                <div
                  className='w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg shrink-0'
                  style={{ backgroundColor: getPlanetColor(dasha.lord) }}
                >
                  {dasha.lord.charAt(0).toUpperCase()}
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 flex-wrap'>
                    <h3
                      className='font-semibold text-lg'
                      style={{ color: themeColors.text.primary }}
                    >
                      {dasha.lord} Maha Dasha
                    </h3>
                    {/* Current Badge - Inline */}
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

          {/* Total Duration Info */}
          <div
            className='mt-6 p-4 rounded-xl'
            style={{ backgroundColor: themeColors.brand.accentBg }}
          >
            <div className='flex items-center gap-3'>
              <svg
                className='w-5 h-5'
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
                Vimshotri Dasha is a 120-year planetary period system based on
                the Moon&apos;s Nakshatra at birth. The current dasha is
                highlighted above.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
