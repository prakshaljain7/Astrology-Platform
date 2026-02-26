'use client';

import { useState, useRef, useEffect } from 'react';
import { City, searchCities, formatCityDisplay } from '@/data/cities';
import { useTheme } from '@/context/ThemeContext';

interface CitySearchProps {
  onSelect: (city: City) => void;
  placeholder?: string;
  label?: string;
}

export function CitySearch({
  onSelect,
  placeholder = 'Search city...',
  label,
}: CitySearchProps) {
  const { themeColors } = useTheme();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<City[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle query change and search
  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    if (newQuery.length >= 2) {
      const searchResults = searchCities(newQuery, 10);
      setResults(searchResults);
      setIsOpen(searchResults.length > 0);
      setHighlightedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: City) => {
    setQuery(formatCityDisplay(city));
    setIsOpen(false);
    onSelect(city);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < results.length) {
          handleSelect(results[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={wrapperRef} className='relative'>
      {label && (
        <label
          className='block text-sm font-medium mb-2'
          style={{ color: themeColors.text.primary }}
        >
          {label}
        </label>
      )}

      <div className='relative'>
        <input
          ref={inputRef}
          type='text'
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={() =>
            query.length >= 2 && results.length > 0 && setIsOpen(true)
          }
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className='w-full px-4 py-3 rounded-xl text-base transition-all duration-200 outline-none'
          style={{
            backgroundColor: themeColors.background.card,
            border: `1px solid ${themeColors.border.soft}`,
            color: themeColors.text.primary,
          }}
        />

        {/* Search icon */}
        <div
          className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'
          style={{ color: themeColors.text.primary }}
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
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          className='absolute z-50 w-full mt-1 rounded-xl shadow-xl overflow-hidden max-h-64 overflow-y-auto'
          style={{
            backgroundColor: themeColors.background.card,
            border: `1px solid ${themeColors.border.soft}`,
            boxShadow: `0 10px 40px ${themeColors.shadow.medium}`,
          }}
        >
          {results.map((city, index) => (
            <button
              key={`${city.name}-${city.country}-${index}`}
              type='button'
              onClick={() => handleSelect(city)}
              className='w-full px-4 py-3 text-left transition-colors flex items-center justify-between'
              style={{
                backgroundColor:
                  highlightedIndex === index
                    ? themeColors.brand.accentBg
                    : 'transparent',
                color: themeColors.text.primary,
                borderBottom:
                  index < results.length - 1
                    ? `1px solid ${themeColors.border.light}`
                    : 'none',
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <div>
                <div className='font-medium'>{city.name}</div>
                <div
                  className='text-sm'
                  style={{ color: themeColors.text.secondary }}
                >
                  {city.state ? `${city.state}, ` : ''}
                  {city.country}
                </div>
              </div>
              <div
                className='text-xs'
                style={{ color: themeColors.text.primary }}
              >
                {city.lat.toFixed(2)}°, {city.lon.toFixed(2)}°
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div
          className='absolute z-50 w-full mt-1 rounded-xl shadow-lg p-4 text-center'
          style={{
            backgroundColor: themeColors.background.card,
            border: `1px solid ${themeColors.border.soft}`,
            color: themeColors.text.secondary,
          }}
        >
          No cities found for &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}
