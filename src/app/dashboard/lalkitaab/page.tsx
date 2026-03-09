'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useKundaliData } from '@/context/KundaliDataContext';
import { useTheme } from '@/context/ThemeContext';
import { colors, cssVars } from '@/lib/theme';
import {
  transformToLalKitaabChart,
  convertPlanetsToHouseData,
  generateYearMenu,
  getYearIndex,
  HouseData,
} from '@/lib/lal-kitaab';
import {
  LAL_KITAAB_HOUSE_DESCRIPTIONS,
  getPlanetInHouseDescription,
  getPlanetDisplayName,
} from '@/lib/lal-kitaab-descriptions';
import { NorthIndianChartSvg, SouthIndianChartSvg, ChartPlanet } from '@/components/charts';

// Convert HouseData to planet format expected by chart components
function housesToChartPlanets(houses: HouseData[]): ChartPlanet[] {
  const planets: ChartPlanet[] = [];
  houses.forEach((house) => {
    house.planets.forEach((planetName) => {
      planets.push({
        planet: planetName,
        house_no: house.houseNumber,
        sign: String(house.sign || 1),
        degree: 0,
      });
    });
  });
  return planets;
}

export default function LalKitaabPage() {
  const { kundaliData, formData, hasData } = useKundaliData();
  const { themeColors } = useTheme();

  // Chart style state
  const [chartStyle, setChartStyle] = useState<'north' | 'south'>('north');

  // Get birth year from form data
  const birthYear = useMemo(() => {
    if (formData?.dob) {
      return new Date(formData.dob).getFullYear();
    }
    return new Date().getFullYear();
  }, [formData]);

  // Year selection state - initialize with current year
  const [selectedYear, setSelectedYear] = useState<number>(() => new Date().getFullYear());

  // Generate year menu
  const yearMenu = useMemo(() => generateYearMenu(birthYear, 12), [birthYear]);

  // Calculate year index
  const yearIndex = useMemo(
    () => getYearIndex(birthYear, selectedYear),
    [birthYear, selectedYear]
  );

  // Convert kundali planets to house data
  const natalHouses = useMemo(() => {
    if (!kundaliData?.planets || !kundaliData?.ascendant) {
      return null;
    }
    
    // Convert API planets to the format expected by convertPlanetsToHouseData
    const planetsForConversion = kundaliData.planets.map(p => ({
      name: p.planet,
      house: p.house_no,
      sign: parseInt(p.sign) || 1,
    }));
    
    // Get ascendant sign number (convert from string if needed)
    const ascSign = parseInt(kundaliData.ascendant.sign) || 1;
    
    return convertPlanetsToHouseData(planetsForConversion, ascSign);
  }, [kundaliData]);

  // Transform to Lal Kitaab yearly chart
  const yearlyHouses = useMemo(() => {
    if (!natalHouses) return null;
    return transformToLalKitaabChart(natalHouses, yearIndex);
  }, [natalHouses, yearIndex]);

  // Convert houses to chart planets for display
  const natalChartPlanets = useMemo(() => {
    if (!natalHouses) return [];
    return housesToChartPlanets(natalHouses);
  }, [natalHouses]);

  const yearlyChartPlanets = useMemo(() => {
    if (!yearlyHouses) return [];
    return housesToChartPlanets(yearlyHouses);
  }, [yearlyHouses]);

  // Get ascendant sign name
  const ascendantSign = kundaliData?.ascendant?.sign || 'Aries';

  // Navigate years
  const handlePreviousYear = () => {
    if (selectedYear > birthYear) {
      setSelectedYear(selectedYear - 1);
    }
  };

  const handleNextYear = () => {
    if (selectedYear < birthYear + 120) {
      setSelectedYear(selectedYear + 1);
    }
  };

  // Render no data state
  if (!hasData || !kundaliData) {
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
            Lal Kitaab
          </h1>
          <p style={{ color: colors.text.secondary }}>
            Yearly chart predictions based on Lal Kitaab principles
          </p>
        </div>

        {/* No Data Card */}
        <div className="glass-card rounded-2xl p-8 text-center">
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(to bottom right, ${themeColors.brand.accentBg50}, ${themeColors.decorative.lavenderBg})`,
              boxShadow: `0 10px 30px ${themeColors.brand.accentBg}`,
            }}
          >
            <svg
              className="w-10 h-10"
              style={{ color: themeColors.brand.accent }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3
            className="text-xl mb-3"
            style={{
              color: themeColors.text.primary,
              fontFamily: cssVars.fontPlayfair,
            }}
          >
            Calculate Kundali First
          </h3>
          <p
            className="mb-6 max-w-md mx-auto"
            style={{ color: themeColors.text.secondary }}
          >
            To view Lal Kitaab yearly charts, please calculate your Kundali
            first. The Lal Kitaab chart is derived from your birth chart using a
            special transformation matrix.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
            style={{
              background: `linear-gradient(to right, ${themeColors.brand.accent}, ${themeColors.brand.accentLight})`,
              color: '#3a2d0b',
              boxShadow: `0 4px 15px ${themeColors.brand.accentBg}`,
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go to Kundali Calculator
          </Link>
        </div>
      </div>
    );
  }

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
          Lal Kitaab
        </h1>
        <p style={{ color: colors.text.secondary }}>
          Yearly chart predictions based on Lal Kitaab principles
        </p>
      </div>

      {/* Controls */}
      <div
        className="glass-card rounded-xl p-4 mb-6"
        style={{ borderLeft: `4px solid ${themeColors.brand.accent}` }}
      >
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Birth Details */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span style={{ color: themeColors.text.secondary }}>DOB:</span>
              <span style={{ color: themeColors.text.primary, fontWeight: 500 }}>
                {formData?.dob}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: themeColors.text.secondary }}>Birth Year:</span>
              <span style={{ color: themeColors.text.primary, fontWeight: 500 }}>
                {birthYear}
              </span>
            </div>
          </div>

          {/* Chart Style Toggle */}
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-medium"
              style={{ color: themeColors.text.secondary }}
            >
              Style:
            </span>
            <div
              className="flex rounded-lg overflow-hidden"
              style={{ border: `1px solid ${themeColors.border.gray}` }}
            >
              <button
                onClick={() => setChartStyle('north')}
                className="px-3 py-1.5 text-sm font-medium transition-all"
                style={{
                  backgroundColor:
                    chartStyle === 'north'
                      ? themeColors.brand.accent
                      : 'transparent',
                  color:
                    chartStyle === 'north' ? '#fff' : themeColors.text.secondary,
                }}
              >
                North
              </button>
              <button
                onClick={() => setChartStyle('south')}
                className="px-3 py-1.5 text-sm font-medium transition-all"
                style={{
                  backgroundColor:
                    chartStyle === 'south'
                      ? themeColors.brand.accent
                      : 'transparent',
                  color:
                    chartStyle === 'south' ? '#fff' : themeColors.text.secondary,
                }}
              >
                South
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Year Selection */}
      <div className="glass-card rounded-xl p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Year Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePreviousYear}
              disabled={selectedYear <= birthYear}
              className="p-2 rounded-lg transition-all"
              style={{
                backgroundColor: themeColors.background.hover,
                color: themeColors.text.primary,
                opacity: selectedYear <= birthYear ? 0.5 : 1,
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="text-center">
              <div
                className="text-2xl font-bold"
                style={{ color: themeColors.brand.accent }}
              >
                {selectedYear}
              </div>
              <div
                className="text-sm"
                style={{ color: themeColors.text.secondary }}
              >
                Age: {selectedYear - birthYear} years
              </div>
            </div>

            <button
              onClick={handleNextYear}
              disabled={selectedYear >= birthYear + 120}
              className="p-2 rounded-lg transition-all"
              style={{
                backgroundColor: themeColors.background.hover,
                color: themeColors.text.primary,
                opacity: selectedYear >= birthYear + 120 ? 0.5 : 1,
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Year Dropdown */}
          <div className="flex items-center gap-2">
            <label
              className="text-sm font-medium"
              style={{ color: themeColors.text.secondary }}
            >
              Jump to:
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-3 py-2 rounded-lg border"
              style={{
                backgroundColor: themeColors.background.input,
                borderColor: themeColors.border.gray,
                color: themeColors.text.primary,
              }}
            >
              {yearMenu.map((decade) => (
                <optgroup key={decade.decade} label={`Decade ${decade.decade}`}>
                  {decade.years.map((year) => (
                    <option key={year} value={year}>
                      {year} (Age {year - birthYear})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Charts Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Birth Chart (Lagna) */}
        <div className="glass-card rounded-xl p-6">
          <h3
            className="text-xl font-semibold mb-4 text-center"
            style={{
              color: themeColors.text.primary,
              fontFamily: cssVars.fontPlayfair,
            }}
          >
            Birth Chart (Lagna Kundali)
          </h3>
          <div className="flex justify-center">
            {chartStyle === 'north' ? (
              <NorthIndianChartSvg
                planets={natalChartPlanets}
                ascendantSign={ascendantSign}
                size={350}
                compact={false}
              />
            ) : (
              <SouthIndianChartSvg
                planets={natalChartPlanets}
                ascendantSign={ascendantSign}
                size={350}
                compact={false}
              />
            )}
          </div>
          <div
            className="mt-4 text-center text-sm"
            style={{ color: themeColors.text.secondary }}
          >
            Original planetary positions at birth
          </div>
        </div>

        {/* Lal Kitaab Yearly Chart */}
        <div className="glass-card rounded-xl p-6">
          <h3
            className="text-xl font-semibold mb-4 text-center"
            style={{
              color: themeColors.text.primary,
              fontFamily: cssVars.fontPlayfair,
            }}
          >
            Lal Kitaab Varshphal ({selectedYear})
          </h3>
          <div className="flex justify-center">
            {chartStyle === 'north' ? (
              <NorthIndianChartSvg
                planets={yearlyChartPlanets}
                ascendantSign={ascendantSign}
                size={350}
                compact={false}
              />
            ) : (
              <SouthIndianChartSvg
                planets={yearlyChartPlanets}
                ascendantSign={ascendantSign}
                size={350}
                compact={false}
              />
            )}
          </div>
          <div
            className="mt-4 text-center text-sm"
            style={{ color: themeColors.text.secondary }}
          >
            Transformed positions for year {selectedYear} (Matrix Index: {yearIndex})
          </div>
        </div>
      </div>

      {/* House Comparison Table */}
      <div className="glass-card rounded-xl p-6 mt-6">
        <h3
          className="text-lg font-semibold mb-4"
          style={{
            color: themeColors.text.primary,
            fontFamily: cssVars.fontPlayfair,
          }}
        >
          House-wise Planet Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold"
                  style={{
                    backgroundColor: themeColors.brand.primary,
                    color: '#fff',
                  }}
                >
                  House
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold"
                  style={{
                    backgroundColor: themeColors.brand.primary,
                    color: '#fff',
                  }}
                >
                  Birth Chart Planets
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold"
                  style={{
                    backgroundColor: themeColors.brand.primary,
                    color: '#fff',
                  }}
                >
                  Lal Kitaab {selectedYear} Planets
                </th>
              </tr>
            </thead>
            <tbody>
              {natalHouses?.map((natalHouse, index) => {
                const yearlyHouse = yearlyHouses?.[index];
                return (
                  <tr
                    key={index}
                    style={{
                      borderBottom: `1px solid ${themeColors.border.light}`,
                    }}
                  >
                    <td
                      className="px-4 py-3 font-medium"
                      style={{ color: themeColors.text.primary }}
                    >
                      House {natalHouse.houseNumber}
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{ color: themeColors.text.primary }}
                    >
                      {natalHouse.planets.length > 0
                        ? natalHouse.planets.join(', ')
                        : '-'}
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{ color: themeColors.text.primary }}
                    >
                      {yearlyHouse && yearlyHouse.planets.length > 0
                        ? yearlyHouse.planets.join(', ')
                        : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lal Kitaab House & Planet Descriptions */}
      {yearlyHouses && (
        <div className="glass-card rounded-xl p-6 mt-6">
          <h3
            className="text-lg font-semibold mb-4"
            style={{
              color: themeColors.text.primary,
              fontFamily: cssVars.fontPlayfair,
            }}
          >
            Lal Kitaab Descriptions — Houses & Planets ({selectedYear})
          </h3>
          <p
            className="text-sm mb-6"
            style={{ color: themeColors.text.secondary }}
          >
            Below are the significations of each house and the meaning of planets placed in them for your Lal Kitaab Varshphal chart of {selectedYear}.
          </p>
          <div className="space-y-6">
            {yearlyHouses.map((house) => {
              const houseDesc = LAL_KITAAB_HOUSE_DESCRIPTIONS[house.houseNumber];
              if (!houseDesc) return null;
              return (
                <div
                  key={house.houseNumber}
                  className="rounded-lg p-4"
                  style={{
                    borderLeft: `4px solid ${themeColors.brand.accent}`,
                    backgroundColor: themeColors.background.hover,
                  }}
                >
                  <h4
                    className="font-semibold mb-2"
                    style={{
                      color: themeColors.text.primary,
                      fontFamily: cssVars.fontPlayfair,
                    }}
                  >
                    House {house.houseNumber}: {houseDesc.title}
                  </h4>
                  <p
                    className="text-sm mb-2"
                    style={{ color: themeColors.text.secondary }}
                  >
                    {houseDesc.significations}
                  </p>
                  {houseDesc.bodyParts && (
                    <p
                      className="text-xs mb-3"
                      style={{ color: themeColors.text.muted }}
                    >
                      Body parts: {houseDesc.bodyParts}. Ruler: {houseDesc.ruler}, Significator: {houseDesc.significator}.
                    </p>
                  )}
                  {house.planets.length > 0 ? (
                    <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${themeColors.border.light}` }}>
                      <p
                        className="text-xs font-medium mb-2"
                        style={{ color: themeColors.text.primary }}
                      >
                        Planets in this house ({selectedYear}):
                      </p>
                      <ul className="list-none space-y-2">
                        {house.planets.map((planetShort) => {
                          const desc = getPlanetInHouseDescription(planetShort, house.houseNumber);
                          const name = getPlanetDisplayName(planetShort);
                          return (
                            <li
                              key={planetShort}
                              className="text-sm pl-3"
                              style={{
                                color: themeColors.text.secondary,
                                borderLeft: `2px solid ${themeColors.brand.accent}`,
                              }}
                            >
                              <strong style={{ color: themeColors.text.primary }}>{name}:</strong>{' '}
                              {desc ?? `${name} in house ${house.houseNumber} influences the affairs of this house.`}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    <p
                      className="text-xs mt-2 italic"
                      style={{ color: themeColors.text.muted }}
                    >
                      No planets in this house for {selectedYear}.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="glass-card rounded-xl p-6 mt-6">
        <h3
          className="text-lg font-semibold mb-4"
          style={{
            color: themeColors.text.primary,
            fontFamily: cssVars.fontPlayfair,
          }}
        >
          About Lal Kitaab
        </h3>
        <div
          className="text-sm space-y-3"
          style={{ color: themeColors.text.secondary }}
        >
          <p>
            <strong style={{ color: themeColors.text.primary }}>Lal Kitaab</strong> (Red Book) 
            is a set of five Urdu language books on astrology and palmistry, written in the 
            19th century in the Punjab region. It has its own unique system of predicting events 
            and prescribing remedies.
          </p>
          <p>
            <strong style={{ color: themeColors.text.primary }}>Varshphal Chart:</strong> The 
            yearly chart is calculated using a special 121x12 transformation matrix. Each year 
            from birth has a unique mapping that rearranges the planets from their natal positions 
            to their yearly positions.
          </p>
          <p>
            <strong style={{ color: themeColors.text.primary }}>Current Selection:</strong> Year 
            {' '}{selectedYear} corresponds to matrix index {yearIndex}, which means this is 
            {selectedYear === birthYear ? ' the birth year' : ` ${selectedYear - birthYear} years after birth`}.
          </p>
        </div>
      </div>
    </div>
  );
}
