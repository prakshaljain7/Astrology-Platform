'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useKundaliData } from '@/context/KundaliDataContext';
import { useTheme } from '@/context/ThemeContext';
import { colors, cssVars } from '@/lib/theme';

// Types for API responses
interface CycleData {
  date: string;
  age_range: string;
  cycle: number;
  sign: number;
}

interface YearData {
  date: string;
  age_range: string;
  sign: number;
}

interface MonthData {
  date: string;
  age_range: string;
  sign: number;
}

interface DayData {
  date: string;
  age_range: string;
  sign: number;
}

// Planet options
const PLANETS = [
  { value: 'Jupiter', label: 'Jupiter' },
  { value: 'Saturn', label: 'Saturn' },
  { value: 'Mars', label: 'Mars' },
  { value: 'Sun', label: 'Sun' },
  { value: 'Moon', label: 'Moon' },
];

// Mode options
const MODES = [
  { value: 'age', label: 'Age Wise' },
  { value: 'degree', label: 'Degree Wise' },
];

export default function BnnCyclePage() {
  const { formData, hasData } = useKundaliData();
  const { themeColors } = useTheme();

  // Form state
  const [dob, setDob] = useState<string>('1998-01-28');
  const [planet, setPlanet] = useState<string>('Jupiter');
  const [startSign, setStartSign] = useState<number>(1);
  const [mode, setMode] = useState<string>('degree');
  const [degree, setDegree] = useState<string>('20.77');

  // Data state
  const [cycles, setCycles] = useState<CycleData[]>([]);
  const [years, setYears] = useState<YearData[]>([]);
  const [months, setMonths] = useState<MonthData[]>([]);
  const [days, setDays] = useState<DayData[]>([]);

  // Loading states
  const [loadingCycles, setLoadingCycles] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [loadingMonths, setLoadingMonths] = useState(false);
  const [loadingDays, setLoadingDays] = useState(false);

  // Selected indices
  const [selectedCycleIndex, setSelectedCycleIndex] = useState<number | null>(null);
  const [selectedYearIndex, setSelectedYearIndex] = useState<number | null>(null);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(null);

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Initialize DOB from kundali data
  useEffect(() => {
    if (hasData && formData) {
      setDob(formData.dob);
    }
  }, [hasData, formData]);

  // Extract start date from date string (e.g., "2026-01-19 → 2035-04-11" -> "2026-01-19")
  const extractStartDate = (dateStr: string): string => {
    const parts = dateStr.split('→');
    return parts[0].trim();
  };

  // Fetch cycles
  const fetchCycles = async () => {
    if (!dob) return;

    setLoadingCycles(true);
    setError(null);
    setCycles([]);
    setYears([]);
    setMonths([]);
    setDays([]);
    setSelectedCycleIndex(null);
    setSelectedYearIndex(null);
    setSelectedMonthIndex(null);

    try {
      const params = new URLSearchParams({
        dob,
        planet,
        start_sign: startSign.toString(),
        mode,
      });

      if (mode === 'degree') {
        params.append('degree', degree);
      }

      const response = await fetch(`/api/bnn-cycles?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch cycles');
      }

      setCycles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cycles');
      console.error('Error fetching cycles:', err);
    } finally {
      setLoadingCycles(false);
    }
  };

  // Fetch years when a cycle is selected
  const fetchYears = async (cycleIndex: number) => {
    const cycle = cycles[cycleIndex];
    if (!cycle) return;

    setLoadingYears(true);
    setYears([]);
    setMonths([]);
    setDays([]);
    setSelectedCycleIndex(cycleIndex);
    setSelectedYearIndex(null);
    setSelectedMonthIndex(null);

    try {
      const startDate = extractStartDate(cycle.date);
      const params = new URLSearchParams({
        start: startDate,
        start_sign: cycle.sign.toString(),
      });

      const response = await fetch(`/api/bnn-years?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch years');
      }

      setYears(data);
    } catch (err) {
      console.error('Error fetching years:', err);
    } finally {
      setLoadingYears(false);
    }
  };

  // Fetch months when a year is selected
  const fetchMonths = async (yearIndex: number) => {
    const year = years[yearIndex];
    if (!year) return;

    setLoadingMonths(true);
    setMonths([]);
    setDays([]);
    setSelectedYearIndex(yearIndex);
    setSelectedMonthIndex(null);

    try {
      const startDate = extractStartDate(year.date);
      const params = new URLSearchParams({
        start: startDate,
        start_sign: year.sign.toString(),
      });

      const response = await fetch(`/api/bnn-months?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch months');
      }

      setMonths(data);
    } catch (err) {
      console.error('Error fetching months:', err);
    } finally {
      setLoadingMonths(false);
    }
  };

  // Fetch days when a month is selected
  const fetchDays = async (monthIndex: number) => {
    const month = months[monthIndex];
    if (!month) return;

    setLoadingDays(true);
    setDays([]);
    setSelectedMonthIndex(monthIndex);

    try {
      const startDate = extractStartDate(month.date);
      const params = new URLSearchParams({
        start: startDate,
        start_sign: month.sign.toString(),
      });

      const response = await fetch(`/api/bnn-days?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch days');
      }

      setDays(data);
    } catch (err) {
      console.error('Error fetching days:', err);
    } finally {
      setLoadingDays(false);
    }
  };

  // Table header style
  const tableHeaderStyle = {
    backgroundColor: themeColors.brand.primary,
    color: '#fff',
    fontWeight: 600,
    padding: '10px 12px',
    textAlign: 'center' as const,
    fontSize: '13px',
    borderBottom: `2px solid ${themeColors.brand.primary}`,
  };

  // Table cell style
  const tableCellStyle = (isSelected: boolean) => ({
    padding: '8px 12px',
    textAlign: 'center' as const,
    fontSize: '13px',
    backgroundColor: isSelected ? themeColors.brand.primary : 'transparent',
    color: isSelected ? '#fff' : themeColors.text.primary,
    borderBottom: `1px solid ${themeColors.border.light}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  });

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-8">
      <div
        className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
        style={{
          borderColor: themeColors.brand.accent,
          borderTopColor: 'transparent',
        }}
      />
    </div>
  );

  // Empty state component
  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex justify-center items-center py-8">
      <p className="text-sm" style={{ color: themeColors.text.secondary }}>
        {message}
      </p>
    </div>
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-semibold mb-2 shimmer-gold"
          style={{
            color: colors.text.primary,
            fontFamily: cssVars.fontPlayfair,
          }}
        >
          BNN Cycle System
        </h1>
        <p style={{ color: colors.text.secondary }}>
          Planetary cycle progressions based on BNN principles
        </p>
      </div>

      {/* Controls */}
      <div
        className="glass-card rounded-xl p-4 mb-6"
        style={{ borderLeft: `4px solid ${themeColors.brand.accent}` }}
      >
        <div className="flex flex-wrap gap-4 items-end">
          {/* DOB */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: themeColors.text.secondary }}
            >
              DOB
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="px-3 py-2 rounded-lg border"
              style={{
                backgroundColor: themeColors.background.input,
                borderColor: themeColors.border.gray,
                color: themeColors.text.primary,
              }}
            />
          </div>

          {/* Planet */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: themeColors.text.secondary }}
            >
              Planet
            </label>
            <select
              value={planet}
              onChange={(e) => setPlanet(e.target.value)}
              className="px-3 py-2 rounded-lg border"
              style={{
                backgroundColor: themeColors.background.input,
                borderColor: themeColors.border.gray,
                color: themeColors.text.primary,
              }}
            >
              {PLANETS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Start Sign */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: themeColors.text.secondary }}
            >
              Start Sign
            </label>
            <select
              value={startSign}
              onChange={(e) => setStartSign(Number(e.target.value))}
              className="px-3 py-2 rounded-lg border"
              style={{
                backgroundColor: themeColors.background.input,
                borderColor: themeColors.border.gray,
                color: themeColors.text.primary,
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Mode */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: themeColors.text.secondary }}
            >
              Mode
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="px-3 py-2 rounded-lg border"
              style={{
                backgroundColor: themeColors.background.input,
                borderColor: themeColors.border.gray,
                color: themeColors.text.primary,
              }}
            >
              {MODES.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Degree - only shown in degree mode */}
          {mode === 'degree' && (
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: themeColors.text.secondary }}
              >
                Degree
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="30"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="px-3 py-2 rounded-lg border w-24"
                style={{
                  backgroundColor: themeColors.background.input,
                  borderColor: themeColors.border.gray,
                  color: themeColors.text.primary,
                }}
              />
            </div>
          )}

          {/* Go Button */}
          <button
            onClick={fetchCycles}
            disabled={!dob || loadingCycles}
            className="px-6 py-2 rounded-lg font-medium transition-all"
            style={{
              background: `linear-gradient(to right, ${themeColors.brand.accent}, ${themeColors.brand.accentLight})`,
              color: '#3a2d0b',
              opacity: !dob || loadingCycles ? 0.5 : 1,
            }}
          >
            {loadingCycles ? 'Loading...' : 'Go'}
          </button>
        </div>

        {/* Birth details link if available */}
        {hasData && !dob && (
          <div className="mt-4">
            <Link
              href="/dashboard"
              className="text-sm hover:underline"
              style={{ color: themeColors.brand.accent }}
            >
              Use Kundali birth details →
            </Link>
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div
          className="mb-6 p-4 rounded-xl"
          style={{
            backgroundColor: colors.status.errorBg,
            border: `1px solid ${colors.status.errorBorder}`,
          }}
        >
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5"
              style={{ color: colors.status.error }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p style={{ color: colors.status.error }}>{error}</p>
          </div>
        </div>
      )}

      {/* Results Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-2 gap-4">
        {/* Table 1: Cycles */}
        <div
          className="glass-card rounded-xl overflow-hidden"
          style={{ border: `1px solid ${themeColors.border.light}` }}
        >
          <div
            className="px-4 py-2 font-semibold text-sm"
            style={{
              backgroundColor: themeColors.brand.accentBg20,
              color: themeColors.text.primary,
              borderBottom: `1px solid ${themeColors.border.light}`,
            }}
          >
            Cycles
          </div>
          <div className="overflow-x-auto max-h-[500px]">
            {loadingCycles ? (
              <LoadingSpinner />
            ) : cycles.length === 0 ? (
              <EmptyState message="Click 'Go' to load cycles" />
            ) : (
              <table className="w-full">
                <thead className="sticky top-0">
                  <tr>
                    <th style={tableHeaderStyle}>Date</th>
                    <th style={tableHeaderStyle}>Age Range</th>
                    <th style={tableHeaderStyle}>Cycle</th>
                    <th style={tableHeaderStyle}>Sign</th>
                  </tr>
                </thead>
                <tbody>
                  {cycles.map((cycle, index) => {
                    const isSelected = index === selectedCycleIndex;
                    return (
                      <tr
                        key={index}
                        onClick={() => fetchYears(index)}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor =
                              themeColors.background.hover;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <td style={tableCellStyle(isSelected)}>{cycle.date}</td>
                        <td style={tableCellStyle(isSelected)}>{cycle.age_range}</td>
                        <td style={tableCellStyle(isSelected)}>{cycle.cycle}</td>
                        <td style={tableCellStyle(isSelected)}>{cycle.sign}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Table 2: Years */}
        <div
          className="glass-card rounded-xl overflow-hidden"
          style={{ border: `1px solid ${themeColors.border.light}` }}
        >
          <div
            className="px-4 py-2 font-semibold text-sm"
            style={{
              backgroundColor: themeColors.brand.accentBg20,
              color: themeColors.text.primary,
              borderBottom: `1px solid ${themeColors.border.light}`,
            }}
          >
            Years
          </div>
          <div className="overflow-x-auto max-h-[500px]">
            {loadingYears ? (
              <LoadingSpinner />
            ) : years.length === 0 ? (
              <EmptyState message="Select a cycle to load years" />
            ) : (
              <table className="w-full">
                <thead className="sticky top-0">
                  <tr>
                    <th style={tableHeaderStyle}>Date</th>
                    <th style={tableHeaderStyle}>Age Range</th>
                    <th style={tableHeaderStyle}>Sign</th>
                  </tr>
                </thead>
                <tbody>
                  {years.map((year, index) => {
                    const isSelected = index === selectedYearIndex;
                    return (
                      <tr
                        key={index}
                        onClick={() => fetchMonths(index)}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor =
                              themeColors.background.hover;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <td style={tableCellStyle(isSelected)}>{year.date}</td>
                        <td style={tableCellStyle(isSelected)}>{year.age_range}</td>
                        <td style={tableCellStyle(isSelected)}>{year.sign}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Table 3: Months */}
        <div
          className="glass-card rounded-xl overflow-hidden"
          style={{ border: `1px solid ${themeColors.border.light}` }}
        >
          <div
            className="px-4 py-2 font-semibold text-sm"
            style={{
              backgroundColor: themeColors.brand.accentBg20,
              color: themeColors.text.primary,
              borderBottom: `1px solid ${themeColors.border.light}`,
            }}
          >
            Months
          </div>
          <div className="overflow-x-auto max-h-[500px]">
            {loadingMonths ? (
              <LoadingSpinner />
            ) : months.length === 0 ? (
              <EmptyState message="Select a year to load months" />
            ) : (
              <table className="w-full">
                <thead className="sticky top-0">
                  <tr>
                    <th style={tableHeaderStyle}>Date</th>
                    <th style={tableHeaderStyle}>Age Range</th>
                    <th style={tableHeaderStyle}>Sign</th>
                  </tr>
                </thead>
                <tbody>
                  {months.map((month, index) => {
                    const isSelected = index === selectedMonthIndex;
                    return (
                      <tr
                        key={index}
                        onClick={() => fetchDays(index)}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor =
                              themeColors.background.hover;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <td style={tableCellStyle(isSelected)}>{month.date}</td>
                        <td style={tableCellStyle(isSelected)}>{month.age_range}</td>
                        <td style={tableCellStyle(isSelected)}>{month.sign}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Table 4: Days */}
        <div
          className="glass-card rounded-xl overflow-hidden"
          style={{ border: `1px solid ${themeColors.border.light}` }}
        >
          <div
            className="px-4 py-2 font-semibold text-sm"
            style={{
              backgroundColor: themeColors.brand.accentBg20,
              color: themeColors.text.primary,
              borderBottom: `1px solid ${themeColors.border.light}`,
            }}
          >
            Days
          </div>
          <div className="overflow-x-auto max-h-[500px]">
            {loadingDays ? (
              <LoadingSpinner />
            ) : days.length === 0 ? (
              <EmptyState message="Select a month to load days" />
            ) : (
              <table className="w-full">
                <thead className="sticky top-0">
                  <tr>
                    <th style={tableHeaderStyle}>Date</th>
                    <th style={tableHeaderStyle}>Age Range</th>
                    <th style={tableHeaderStyle}>Sign</th>
                  </tr>
                </thead>
                <tbody>
                  {days.map((day, index) => (
                    <tr key={index}>
                      <td style={tableCellStyle(false)}>{day.date}</td>
                      <td style={tableCellStyle(false)}>{day.age_range}</td>
                      <td style={tableCellStyle(false)}>{day.sign}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
