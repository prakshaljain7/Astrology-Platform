'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useKundaliData } from '@/context/KundaliDataContext';
import { useTheme } from '@/context/ThemeContext';
import { divisionalApi } from '@/lib/api';
import { 
  DivisionalHouse, 
  DIVISIONAL_CHARTS,
  DivisionalChartInfo
} from '@/types/kundali';
import { cssVars } from '@/lib/theme';
import { DivisionalChartGrid } from '@/components/dashboard/DivisionalChart';

export default function ShodashvargaPage() {
  const { formData, hasData } = useKundaliData();
  const { themeColors } = useTheme();
  const [charts, setCharts] = useState<Map<string, DivisionalHouse[]>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chartStyle, setChartStyle] = useState<'north' | 'south'>('north');
  const [selectedCharts] = useState<DivisionalChartInfo[]>(DIVISIONAL_CHARTS);
  const [expandedChart, setExpandedChart] = useState<string | null>(null);

  const fetchAllCharts = async () => {
    if (!hasData || !formData) return;

    setIsLoading(true);
    setError(null);

    try {
      const newCharts = new Map<string, DivisionalHouse[]>();
      
      const promises = selectedCharts.map(async (chartInfo) => {
        try {
          const response = await divisionalApi.getChart(chartInfo.id, formData);
          const chartKey = Object.keys(response)[0];
          return { id: chartInfo.id, data: response[chartKey] };
        } catch (err) {
          console.error(`Error fetching ${chartInfo.id}:`, err);
          return { id: chartInfo.id, data: null };
        }
      });

      const results = await Promise.all(promises);
      results.forEach(({ id, data }) => {
        if (data) {
          newCharts.set(id, data);
        }
      });

      setCharts(newCharts);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to fetch divisional charts. Please check if the API server is running.',
      );
      console.error('Error fetching divisional charts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasData && charts.size === 0) {
      fetchAllCharts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasData]);

  const handleChartClick = (chartId: string) => {
    setExpandedChart(expandedChart === chartId ? null : chartId);
  };

  if (!hasData) {
    return (
      <div className='p-8'>
        <div className='mb-8'>
          <h1
            className='text-3xl font-semibold mb-2 shimmer-gold'
            style={{
              color: themeColors.text.primary,
              fontFamily: cssVars.fontPlayfair,
            }}
          >
            Shodashvarga Charts
          </h1>
          <p style={{ color: themeColors.text.secondary }}>
            16 divisional charts for comprehensive astrological analysis
          </p>
        </div>

        <div 
          className='rounded-2xl p-8 text-center'
          style={{
            backgroundColor: themeColors.background.card,
            border: `1px solid ${themeColors.border.soft}`,
            boxShadow: `0 25px 50px ${themeColors.shadow.soft}`
          }}
        >
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
                d='M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'
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
            To view Shodashvarga (divisional) charts, please calculate your Kundali
            first. These charts provide deeper insights into specific life areas.
          </p>
          <Link
            href='/dashboard'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all'
            style={{
              background: `linear-gradient(to right, ${themeColors.brand.accent}, ${themeColors.brand.accentLight})`,
              color: themeColors.text.white,
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
      <div className='mb-8'>
        <h1
          className='text-3xl font-semibold mb-2 shimmer-gold'
          style={{
            color: themeColors.text.primary,
            fontFamily: cssVars.fontPlayfair,
          }}
        >
          Shodashvarga Charts
        </h1>
        <p style={{ color: themeColors.text.secondary }}>
          16 divisional charts revealing different aspects of life
        </p>
      </div>

      {/* Birth Details Summary */}
      {formData && (
        <div
          className='rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center'
          style={{ 
            backgroundColor: themeColors.background.card,
            border: `1px solid ${themeColors.border.soft}`,
            borderLeft: `4px solid ${themeColors.brand.accent}` 
          }}
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
      <div 
        className='rounded-xl p-4 mb-6'
        style={{
          backgroundColor: themeColors.background.card,
          border: `1px solid ${themeColors.border.soft}`,
        }}
      >
        <div className='flex flex-wrap gap-4 items-center justify-between'>
          {/* Chart Style Toggle */}
          <div className='flex items-center gap-3'>
            <span 
              className='text-sm font-medium'
              style={{ color: themeColors.text.secondary }}
            >
              Chart Style:
            </span>
            <div 
              className='flex rounded-lg p-1'
              style={{ backgroundColor: themeColors.background.secondary }}
            >
              <button
                onClick={() => setChartStyle('north')}
                className='px-4 py-1.5 rounded-md text-sm font-medium transition-all'
                style={{
                  backgroundColor: chartStyle === 'north' ? themeColors.brand.accent : 'transparent',
                  color: chartStyle === 'north' ? themeColors.text.white : themeColors.text.secondary,
                }}
              >
                North Indian
              </button>
              <button
                onClick={() => setChartStyle('south')}
                className='px-4 py-1.5 rounded-md text-sm font-medium transition-all'
                style={{
                  backgroundColor: chartStyle === 'south' ? themeColors.brand.accent : 'transparent',
                  color: chartStyle === 'south' ? themeColors.text.white : themeColors.text.secondary,
                }}
              >
                South Indian
              </button>
            </div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchAllCharts}
            disabled={isLoading}
            className='px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2'
            style={{
              background: `linear-gradient(to right, ${themeColors.brand.accent}, ${themeColors.brand.accentLight})`,
              color: themeColors.text.white,
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            <svg 
              className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
              />
            </svg>
            {isLoading ? 'Loading...' : 'Refresh Charts'}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && charts.size === 0 && (
        <div 
          className='rounded-2xl p-8 text-center'
          style={{
            backgroundColor: themeColors.background.card,
            border: `1px solid ${themeColors.border.soft}`,
          }}
        >
          <div
            className='w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4'
            style={{
              borderColor: themeColors.brand.accent,
              borderTopColor: 'transparent',
            }}
          />
          <p style={{ color: themeColors.text.secondary }}>
            Loading divisional charts...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          className='mb-8 p-4 rounded-xl'
          style={{
            backgroundColor: themeColors.status.errorBg,
            border: `1px solid ${themeColors.status.errorBorder}`,
          }}
        >
          <div className='flex items-center gap-3'>
            <svg
              className='w-5 h-5'
              style={{ color: themeColors.status.error }}
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
            <p style={{ color: themeColors.status.error }}>{error}</p>
          </div>
        </div>
      )}

      {/* Chart Categories Info */}
      <div 
        className='rounded-xl p-4 mb-6'
        style={{
          backgroundColor: themeColors.background.card,
          border: `1px solid ${themeColors.border.soft}`,
        }}
      >
        <h3 
          className='font-semibold mb-3'
          style={{ color: themeColors.text.primary }}
        >
          Divisional Chart Significance
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          {[
            { charts: 'D1 (Rasi)', meaning: 'Main Birth Chart - Overall Life', color: themeColors.brand.primary },
            { charts: 'D2 (Hora)', meaning: 'Wealth & Financial Matters', color: '#059669' },
            { charts: 'D3 (Drekkana)', meaning: 'Siblings, Courage & Efforts', color: '#0ea5e9' },
            { charts: 'D4 (Chaturthamsa)', meaning: 'Property, Home & Fortune', color: '#d97706' },
            { charts: 'D7 (Saptamsa)', meaning: 'Children & Progeny', color: '#7c3aed' },
            { charts: 'D9 (Navamsa)', meaning: 'Marriage, Dharma & Spouse', color: '#e11d48' },
            { charts: 'D10 (Dasamsa)', meaning: 'Career, Profession & Status', color: '#0d9488' },
            { charts: 'D12 (Dvadasamsa)', meaning: 'Parents & Ancestral Karma', color: '#8b5cf6' },
            { charts: 'D16 (Shodasamsa)', meaning: 'Vehicles, Comforts & Luxury', color: '#f59e0b' },
            { charts: 'D20 (Vimsamsa)', meaning: 'Spirituality & Religious Life', color: '#6366f1' },
            { charts: 'D24 (Chaturvimsamsa)', meaning: 'Education & Knowledge', color: '#14b8a6' },
            { charts: 'D27/D30', meaning: 'Inner Strength & Karma Flaws', color: '#ef4444' },
          ].map((item) => (
            <div
              key={item.charts}
              className='flex items-center gap-2 p-2 rounded-lg'
              style={{
                backgroundColor: `${item.color}10`,
              }}
            >
              <div
                className='w-2 h-2 rounded-full shrink-0'
                style={{ backgroundColor: item.color }}
              />
              <div className='min-w-0'>
                <span
                  className='font-medium text-sm'
                  style={{ color: item.color }}
                >
                  {item.charts}
                </span>
                <span
                  className='text-xs ml-1.5'
                  style={{ color: themeColors.text.secondary }}
                >
                  {item.meaning}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      {!isLoading && charts.size > 0 && (
        <div className='animate-fadeIn'>
          <DivisionalChartGrid
            charts={charts}
            chartInfoList={selectedCharts}
            chartStyle={chartStyle}
            onChartClick={handleChartClick}
          />
        </div>
      )}

      {/* Expanded Chart View */}
      {expandedChart && charts.get(expandedChart) && (
        <div 
          className='fixed inset-0 z-50 flex items-center justify-center p-4'
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setExpandedChart(null)}
        >
          <div 
            className='rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-auto'
            style={{
              backgroundColor: themeColors.background.white,
              border: `1px solid ${themeColors.border.soft}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-between mb-4'>
              <div>
                <span 
                  className='text-sm font-bold px-2 py-1 rounded mr-2'
                  style={{ 
                    backgroundColor: themeColors.brand.primaryBg,
                    color: themeColors.brand.primary 
                  }}
                >
                  {expandedChart}
                </span>
                <span 
                  className='text-xl font-semibold'
                  style={{ color: themeColors.text.primary, fontFamily: cssVars.fontPlayfair }}
                >
                  {DIVISIONAL_CHARTS.find(c => c.id === expandedChart)?.name}
                </span>
              </div>
              <button
                onClick={() => setExpandedChart(null)}
                className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
              >
                <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
            
            <p 
              className='text-sm mb-4'
              style={{ color: themeColors.text.secondary }}
            >
              {DIVISIONAL_CHARTS.find(c => c.id === expandedChart)?.meaning}
            </p>

            {/* House Details Table */}
            <div 
              className='rounded-lg overflow-hidden'
              style={{ border: `1px solid ${themeColors.border.soft}` }}
            >
              <table className='w-full text-sm'>
                <thead>
                  <tr style={{ backgroundColor: themeColors.brand.accentBg20 }}>
                    <th className='px-3 py-2 text-left' style={{ color: themeColors.text.primary }}>House</th>
                    <th className='px-3 py-2 text-left' style={{ color: themeColors.text.primary }}>Sign</th>
                    <th className='px-3 py-2 text-left' style={{ color: themeColors.text.primary }}>Planets</th>
                  </tr>
                </thead>
                <tbody>
                  {charts.get(expandedChart)?.map((house, idx) => (
                    <tr 
                      key={house.House}
                      style={{ 
                        backgroundColor: idx % 2 === 0 ? 'transparent' : themeColors.background.tableAlt,
                        borderTop: `1px solid ${themeColors.border.light}`
                      }}
                    >
                      <td className='px-3 py-2 font-medium' style={{ color: themeColors.text.primary }}>
                        {house.House}
                      </td>
                      <td className='px-3 py-2' style={{ color: themeColors.text.secondary }}>
                        {house.SignName} ({house.SignNo})
                      </td>
                      <td className='px-3 py-2' style={{ color: themeColors.brand.accent }}>
                        {house.Planets === '—' ? '-' : house.Planets}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
