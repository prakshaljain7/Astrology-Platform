'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  ThemeId,
  ThemeColors,
  themes,
  getThemeColors,
  getChartTheme,
  getRoleColors,
} from '@/lib/theme';

const THEME_STORAGE_KEY = 'astrologers-portal-theme';
const DEFAULT_THEME: ThemeId = 'cosmic-gold';

interface ThemeContextType {
  currentTheme: ThemeId;
  themeColors: ThemeColors;
  chartTheme: ReturnType<typeof getChartTheme>;
  roleColors: ReturnType<typeof getRoleColors>;
  setTheme: (themeId: ThemeId) => void;
  allThemes: typeof themes;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(DEFAULT_THEME);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(
      THEME_STORAGE_KEY,
    ) as ThemeId | null;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
    setIsInitialized(true);
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    }
  }, [currentTheme, isInitialized]);

  const setTheme = (themeId: ThemeId) => {
    if (themes[themeId]) {
      setCurrentTheme(themeId);
    }
  };

  const themeColors = getThemeColors(currentTheme);
  const chartTheme = getChartTheme(themeColors);
  const roleColors = getRoleColors(themeColors);

  // Apply CSS variables to document root
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;

      // Core backgrounds
      root.style.setProperty('--background', themeColors.background.primary);
      root.style.setProperty(
        '--background-secondary',
        themeColors.background.secondary,
      );
      root.style.setProperty('--foreground', themeColors.text.primary);

      // Brand colors
      root.style.setProperty('--primary', themeColors.brand.primary);
      root.style.setProperty('--primary-light', themeColors.brand.primaryLight);
      root.style.setProperty('--primary-dark', themeColors.brand.primaryDark);
      root.style.setProperty('--accent', themeColors.brand.accent);
      root.style.setProperty('--accent-light', themeColors.brand.accentLight);
      root.style.setProperty('--accent-dark', themeColors.brand.accentDark);

      // Text colors
      root.style.setProperty('--muted', themeColors.text.secondary);
      root.style.setProperty('--text-light', themeColors.text.light);

      // Aurora gradient colors
      root.style.setProperty('--aurora-1', themeColors.aurora.color1);
      root.style.setProperty('--aurora-2', themeColors.aurora.color2);
      root.style.setProperty('--aurora-3', themeColors.aurora.color3);
      root.style.setProperty('--aurora-end', themeColors.aurora.gradientEnd);

      // Decorative colors
      root.style.setProperty('--rose', themeColors.decorative.rose);
      root.style.setProperty('--sky', themeColors.decorative.sky);
      root.style.setProperty('--lavender', themeColors.decorative.lavender);
      root.style.setProperty('--champagne', themeColors.decorative.champagne);

      // Glass/card effects
      root.style.setProperty('--glass-bg', themeColors.background.glass);
      root.style.setProperty('--card-bg', themeColors.background.card);
      root.style.setProperty('--input-bg', themeColors.background.input);
      root.style.setProperty('--hover-bg', themeColors.background.hover);

      // Border colors
      root.style.setProperty('--border-soft', themeColors.border.soft);
      root.style.setProperty('--border-light', themeColors.border.light);
      root.style.setProperty('--border-gray', themeColors.border.gray);

      // Shimmer effect colors
      root.style.setProperty('--shimmer-dark', themeColors.shimmer.dark);
      root.style.setProperty('--shimmer-main', themeColors.shimmer.main);
      root.style.setProperty('--shimmer-light', themeColors.shimmer.light);

      // Scrollbar
      root.style.setProperty('--scrollbar-thumb', themeColors.brand.accent);
      root.style.setProperty(
        '--scrollbar-thumb-hover',
        themeColors.brand.primary,
      );
      root.style.setProperty(
        '--scrollbar-track',
        themeColors.background.secondary,
      );
    }
  }, [themeColors]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeColors,
        chartTheme,
        roleColors,
        setTheme,
        allThemes: themes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
