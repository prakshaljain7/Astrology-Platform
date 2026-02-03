'use client';

import Link from 'next/link';
import { useKundaliData } from '@/context/KundaliDataContext';
import { useTheme } from '@/context/ThemeContext';
import { VimshotriDasha } from '@/components/dashboard/VimshotriDasha';
import { colors, cssVars } from '@/lib/theme';

export default function VimshotriPage() {
  const { formData, hasData, getMoonDegree, getMoonSignNumber } =
    useKundaliData();
  const { themeColors } = useTheme();

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

  const moonSign = getMoonSignNumber();
  const moonDegree = getMoonDegree();

  // Render no data state
  if (!hasData || !formData || moonSign === null || moonDegree === null) {
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

      {/* Vimshotri Dasha Component */}
      <VimshotriDasha
        dob={formData.dob}
        tob={formData.tob}
        moonSign={moonSign}
        moonDegree={moonDegree}
        showHeader={true}
      />
    </div>
  );
}
