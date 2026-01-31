/**
 * Centralized Theme Configuration
 * All colors and styling constants for the Astrologers Portal
 * Includes 4 astrology-themed light color schemes
 */

// ============================================
// THEME TYPES
// ============================================

export type ThemeId =
  | 'cosmic-gold'
  | 'celestial-blue'
  | 'mystic-rose'
  | 'sacred-sage';

export interface ThemeColors {
  background: {
    primary: string;
    secondary: string;
    white: string;
    glass: string;
    card: string;
    input: string;
    hover: string;
    tableAlt: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    light: string;
    white: string;
  };
  brand: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    primaryBg: string;
    primaryBg20: string;
    accent: string;
    accentLight: string;
    accentDark: string;
    accentDarker: string;
    accentDarkest: string;
    accentBg: string;
    accentBg20: string;
    accentBg30: string;
    accentBg50: string;
  };
  status: {
    success: string;
    successBg: string;
    error: string;
    errorBg: string;
    errorBorder: string;
    errorText: string;
    warning: string;
    info: string;
  };
  decorative: {
    rose: string;
    roseBg: string;
    sky: string;
    skyBg: string;
    lavender: string;
    lavenderBg: string;
    champagne: string;
  };
  // Aurora background gradient colors
  aurora: {
    color1: string;
    color2: string;
    color3: string;
    gradientEnd: string;
  };
  border: {
    light: string;
    soft: string;
    medium: string;
    gray: string;
  };
  shadow: {
    soft: string;
    medium: string;
  };
  // Shimmer effect colors for text
  shimmer: {
    dark: string;
    main: string;
    light: string;
  };
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  icon: string;
  colors: ThemeColors;
}

// ============================================
// THEME 1: COSMIC GOLD (Sun/Jupiter Energy)
// ============================================

const cosmicGoldColors: ThemeColors = {
  background: {
    primary: '#fffdf8',
    secondary: '#faf8f3',
    white: '#ffffff',
    glass: 'rgba(255, 253, 248, 0.75)',
    card: 'rgba(255, 255, 255, 0.88)',
    input: 'rgba(255, 255, 255, 0.92)',
    hover: '#fef6e6',
    tableAlt: '#fffcf5',
  },
  text: {
    primary: '#3d2e14',
    secondary: '#78716c',
    muted: '#a8a29e',
    light: '#57534e',
    white: '#ffffff',
  },
  brand: {
    primary: '#b8860b',
    primaryLight: '#daa520',
    primaryDark: '#996f0a',
    primaryBg: 'rgba(184, 134, 11, 0.12)',
    primaryBg20: 'rgba(184, 134, 11, 0.2)',
    accent: '#d4af37',
    accentLight: '#f7e7b4',
    accentDark: '#b8962e',
    accentDarker: '#a17f27',
    accentDarkest: '#8a6c1f',
    accentBg: 'rgba(212, 175, 55, 0.12)',
    accentBg20: 'rgba(212, 175, 55, 0.2)',
    accentBg30: 'rgba(212, 175, 55, 0.3)',
    accentBg50: 'rgba(212, 175, 55, 0.5)',
  },
  status: {
    success: '#10b981',
    successBg: 'rgba(16, 185, 129, 0.1)',
    error: '#dc2626',
    errorBg: '#fef2f2',
    errorBorder: '#fecaca',
    errorText: '#dc2626',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  decorative: {
    rose: '#fce4c4',
    roseBg: 'rgba(252, 228, 196, 0.5)',
    sky: '#fef3c7',
    skyBg: 'rgba(254, 243, 199, 0.5)',
    lavender: '#fde68a',
    lavenderBg: 'rgba(253, 230, 138, 0.4)',
    champagne: '#f7e7b4',
  },
  aurora: {
    color1: 'rgba(252, 228, 196, 0.7)', // Warm peach/orange
    color2: 'rgba(254, 243, 199, 0.6)', // Golden yellow
    color3: 'rgba(253, 230, 138, 0.5)', // Amber glow
    gradientEnd: '#fef9ef',
  },
  border: {
    light: 'rgba(212, 175, 55, 0.12)',
    soft: 'rgba(212, 175, 55, 0.18)',
    medium: 'rgba(212, 175, 55, 0.25)',
    gray: '#f0e6d2',
  },
  shadow: {
    soft: 'rgba(212, 175, 55, 0.08)',
    medium: 'rgba(212, 175, 55, 0.15)',
  },
  shimmer: {
    dark: '#8a6c1f',
    main: '#d4af37',
    light: '#f7e7b4',
  },
};

// ============================================
// THEME 2: CELESTIAL BLUE (Moon/Neptune Energy)
// ============================================

const celestialBlueColors: ThemeColors = {
  background: {
    primary: '#f0f7ff',
    secondary: '#e8f2fc',
    white: '#ffffff',
    glass: 'rgba(240, 247, 255, 0.78)',
    card: 'rgba(255, 255, 255, 0.9)',
    input: 'rgba(255, 255, 255, 0.95)',
    hover: '#dbeafe',
    tableAlt: '#f5f9ff',
  },
  text: {
    primary: '#1e3a5f',
    secondary: '#4b6a8c',
    muted: '#7c9ab8',
    light: '#3d5a80',
    white: '#ffffff',
  },
  brand: {
    primary: '#2563eb',
    primaryLight: '#60a5fa',
    primaryDark: '#1d4ed8',
    primaryBg: 'rgba(37, 99, 235, 0.12)',
    primaryBg20: 'rgba(37, 99, 235, 0.2)',
    accent: '#0ea5e9',
    accentLight: '#bae6fd',
    accentDark: '#0284c7',
    accentDarker: '#0369a1',
    accentDarkest: '#075985',
    accentBg: 'rgba(14, 165, 233, 0.12)',
    accentBg20: 'rgba(14, 165, 233, 0.2)',
    accentBg30: 'rgba(14, 165, 233, 0.3)',
    accentBg50: 'rgba(14, 165, 233, 0.5)',
  },
  status: {
    success: '#10b981',
    successBg: 'rgba(16, 185, 129, 0.1)',
    error: '#ef4444',
    errorBg: '#fef2f2',
    errorBorder: '#fecaca',
    errorText: '#dc2626',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  decorative: {
    rose: '#c7d2fe',
    roseBg: 'rgba(199, 210, 254, 0.5)',
    sky: '#7dd3fc',
    skyBg: 'rgba(125, 211, 252, 0.4)',
    lavender: '#a5b4fc',
    lavenderBg: 'rgba(165, 180, 252, 0.4)',
    champagne: '#bfdbfe',
  },
  aurora: {
    color1: 'rgba(147, 197, 253, 0.6)', // Light blue
    color2: 'rgba(165, 180, 252, 0.5)', // Soft indigo
    color3: 'rgba(125, 211, 252, 0.5)', // Cyan tint
    gradientEnd: '#e8f2fc',
  },
  border: {
    light: 'rgba(37, 99, 235, 0.1)',
    soft: 'rgba(37, 99, 235, 0.15)',
    medium: 'rgba(37, 99, 235, 0.22)',
    gray: '#dbeafe',
  },
  shadow: {
    soft: 'rgba(37, 99, 235, 0.08)',
    medium: 'rgba(37, 99, 235, 0.12)',
  },
  shimmer: {
    dark: '#1d4ed8',
    main: '#2563eb',
    light: '#93c5fd',
  },
};

// ============================================
// THEME 3: MYSTIC ROSE (Venus Energy)
// ============================================

const mysticRoseColors: ThemeColors = {
  background: {
    primary: '#fdf2f8',
    secondary: '#fce7f3',
    white: '#ffffff',
    glass: 'rgba(253, 242, 248, 0.78)',
    card: 'rgba(255, 255, 255, 0.9)',
    input: 'rgba(255, 255, 255, 0.95)',
    hover: '#fbcfe8',
    tableAlt: '#fef7fb',
  },
  text: {
    primary: '#5c2142',
    secondary: '#9d5478',
    muted: '#c08aa3',
    light: '#7a3d5c',
    white: '#ffffff',
  },
  brand: {
    primary: '#db2777',
    primaryLight: '#f9a8d4',
    primaryDark: '#be185d',
    primaryBg: 'rgba(219, 39, 119, 0.12)',
    primaryBg20: 'rgba(219, 39, 119, 0.2)',
    accent: '#e879a9',
    accentLight: '#fbcfe8',
    accentDark: '#db2777',
    accentDarker: '#be185d',
    accentDarkest: '#9d174d',
    accentBg: 'rgba(232, 121, 169, 0.15)',
    accentBg20: 'rgba(232, 121, 169, 0.25)',
    accentBg30: 'rgba(232, 121, 169, 0.35)',
    accentBg50: 'rgba(232, 121, 169, 0.55)',
  },
  status: {
    success: '#059669',
    successBg: 'rgba(5, 150, 105, 0.1)',
    error: '#e11d48',
    errorBg: '#fff1f2',
    errorBorder: '#fecdd3',
    errorText: '#be123c',
    warning: '#d97706',
    info: '#7c3aed',
  },
  decorative: {
    rose: '#f9a8d4',
    roseBg: 'rgba(249, 168, 212, 0.5)',
    sky: '#f5d0fe',
    skyBg: 'rgba(245, 208, 254, 0.4)',
    lavender: '#fce7f3',
    lavenderBg: 'rgba(252, 231, 243, 0.5)',
    champagne: '#fdf2f8',
  },
  aurora: {
    color1: 'rgba(249, 168, 212, 0.6)', // Pink
    color2: 'rgba(245, 208, 254, 0.5)', // Light purple
    color3: 'rgba(252, 231, 243, 0.6)', // Soft rose
    gradientEnd: '#fef1f7',
  },
  border: {
    light: 'rgba(219, 39, 119, 0.1)',
    soft: 'rgba(219, 39, 119, 0.15)',
    medium: 'rgba(219, 39, 119, 0.22)',
    gray: '#fce7f3',
  },
  shadow: {
    soft: 'rgba(219, 39, 119, 0.08)',
    medium: 'rgba(219, 39, 119, 0.12)',
  },
  shimmer: {
    dark: '#9d174d',
    main: '#db2777',
    light: '#fbcfe8',
  },
};

// ============================================
// THEME 4: SACRED SAGE (Mercury/Earth Energy)
// ============================================

const sacredSageColors: ThemeColors = {
  background: {
    primary: '#ecfdf5',
    secondary: '#d1fae5',
    white: '#ffffff',
    glass: 'rgba(236, 253, 245, 0.78)',
    card: 'rgba(255, 255, 255, 0.9)',
    input: 'rgba(255, 255, 255, 0.95)',
    hover: '#a7f3d0',
    tableAlt: '#f0fdf9',
  },
  text: {
    primary: '#134e3a',
    secondary: '#2d6a4f',
    muted: '#52796f',
    light: '#40916c',
    white: '#ffffff',
  },
  brand: {
    primary: '#059669',
    primaryLight: '#34d399',
    primaryDark: '#047857',
    primaryBg: 'rgba(5, 150, 105, 0.15)',
    primaryBg20: 'rgba(5, 150, 105, 0.25)',
    accent: '#10b981',
    accentLight: '#6ee7b7',
    accentDark: '#059669',
    accentDarker: '#047857',
    accentDarkest: '#065f46',
    accentBg: 'rgba(16, 185, 129, 0.15)',
    accentBg20: 'rgba(16, 185, 129, 0.25)',
    accentBg30: 'rgba(16, 185, 129, 0.35)',
    accentBg50: 'rgba(16, 185, 129, 0.55)',
  },
  status: {
    success: '#22c55e',
    successBg: 'rgba(34, 197, 94, 0.15)',
    error: '#dc2626',
    errorBg: '#fef2f2',
    errorBorder: '#fecaca',
    errorText: '#dc2626',
    warning: '#eab308',
    info: '#0ea5e9',
  },
  decorative: {
    rose: '#bbf7d0',
    roseBg: 'rgba(187, 247, 208, 0.5)',
    sky: '#6ee7b7',
    skyBg: 'rgba(110, 231, 183, 0.4)',
    lavender: '#a7f3d0',
    lavenderBg: 'rgba(167, 243, 208, 0.5)',
    champagne: '#d1fae5',
  },
  aurora: {
    color1: 'rgba(167, 243, 208, 0.6)', // Mint green
    color2: 'rgba(110, 231, 183, 0.5)', // Emerald tint
    color3: 'rgba(187, 247, 208, 0.5)', // Light sage
    gradientEnd: '#e6f9ef',
  },
  border: {
    light: 'rgba(16, 185, 129, 0.12)',
    soft: 'rgba(16, 185, 129, 0.18)',
    medium: 'rgba(16, 185, 129, 0.25)',
    gray: '#a7f3d0',
  },
  shadow: {
    soft: 'rgba(16, 185, 129, 0.1)',
    medium: 'rgba(16, 185, 129, 0.15)',
  },
  shimmer: {
    dark: '#047857',
    main: '#10b981',
    light: '#6ee7b7',
  },
};

// ============================================
// ALL THEMES CONFIGURATION
// ============================================

export const themes: Record<ThemeId, ThemeConfig> = {
  'cosmic-gold': {
    id: 'cosmic-gold',
    name: 'Cosmic Gold',
    description: 'Sun & Jupiter energy - Warmth, wisdom, and prosperity',
    icon: '☉',
    colors: cosmicGoldColors,
  },
  'celestial-blue': {
    id: 'celestial-blue',
    name: 'Celestial Blue',
    description: 'Moon & Neptune energy - Intuition and cosmic flow',
    icon: '☽',
    colors: celestialBlueColors,
  },
  'mystic-rose': {
    id: 'mystic-rose',
    name: 'Mystic Rose',
    description: 'Venus energy - Love, beauty, and harmony',
    icon: '♀',
    colors: mysticRoseColors,
  },
  'sacred-sage': {
    id: 'sacred-sage',
    name: 'Sacred Sage',
    description: 'Mercury & Earth energy - Growth and grounding',
    icon: '☿',
    colors: sacredSageColors,
  },
};

// Default theme colors (Cosmic Gold)
export const colors = cosmicGoldColors;

// ============================================
// PLANET COLORS (for Kundali charts)
// ============================================

export const planetColors: Record<string, string> = {
  Sun: '#d97706',
  Moon: '#64748b',
  Mars: '#dc2626',
  Mercury: '#059669',
  Jupiter: '#ca8a04',
  Venus: '#db2777',
  Saturn: '#2563eb',
  Rahu: '#7c3aed',
  Ketu: '#ea580c',
  Uranus: '#0891b2',
  Neptune: '#4f46e5',
  Pluto: '#71717a',
};

// ============================================
// PLANET ABBREVIATIONS
// ============================================

export const planetShort: Record<string, string> = {
  Sun: 'Su',
  Moon: 'Mo',
  Mars: 'Ma',
  Mercury: 'Me',
  Jupiter: 'Ju',
  Venus: 'Ve',
  Saturn: 'Sa',
  Rahu: 'Ra',
  Ketu: 'Ke',
  Uranus: 'Ur',
  Neptune: 'Ne',
  Pluto: 'Pl',
};

// ============================================
// ZODIAC DATA
// ============================================

export const zodiacSigns = [
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
] as const;

export const zodiacSymbols: Record<string, string> = {
  Aries: '1',
  Taurus: '2',
  Gemini: '3',
  Cancer: '4',
  Leo: '5',
  Virgo: '6',
  Libra: '7',
  Scorpio: '8',
  Sagittarius: '9',
  Capricorn: '10',
  Aquarius: '11',
  Pisces: '12',
};

export const zodiacShort: Record<string, string> = {
  Aries: 'Ar',
  Taurus: 'Ta',
  Gemini: 'Ge',
  Cancer: 'Ca',
  Leo: 'Le',
  Virgo: 'Vi',
  Libra: 'Li',
  Scorpio: 'Sc',
  Sagittarius: 'Sg',
  Capricorn: 'Cp',
  Aquarius: 'Aq',
  Pisces: 'Pi',
};

// ============================================
// CSS VARIABLE REFERENCES
// ============================================

export const cssVars = {
  fontPlayfair: 'var(--font-playfair)',
  fontSans: 'var(--font-dm-sans)',
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getThemeColors = (themeId: ThemeId): ThemeColors => {
  return themes[themeId]?.colors || cosmicGoldColors;
};

export const getChartTheme = (themeColors: ThemeColors) => ({
  background: themeColors.background.primary,
  cardBg: themeColors.background.white,
  borderPrimary: themeColors.brand.accent,
  borderSecondary: themeColors.border.gray,
  highlightBg: themeColors.brand.accentLight,
  highlightBgOpacity: 0.4,
  signColor: themeColors.brand.accent,
  houseNumberColor: themeColors.brand.primary,
  textColor: themeColors.text.primary,
});

export const getRoleColors = (themeColors: ThemeColors) => ({
  super_admin: {
    bg: themeColors.brand.primaryBg,
    text: themeColors.brand.primary,
    dot: themeColors.brand.primary,
  },
  admin: {
    bg: themeColors.brand.accentBg,
    text: themeColors.brand.accent,
    dot: themeColors.brand.accent,
  },
  user: {
    bg: themeColors.status.successBg,
    text: themeColors.status.success,
    dot: themeColors.status.success,
  },
});

// Default chart theme (for backward compatibility)
export const chartTheme = getChartTheme(cosmicGoldColors);

// Default role colors (for backward compatibility)
export const roleColors = getRoleColors(cosmicGoldColors);

// Default export for convenience
const theme = {
  themes,
  colors,
  planetColors,
  planetShort,
  zodiacSigns,
  zodiacSymbols,
  zodiacShort,
  cssVars,
  chartTheme,
  roleColors,
  getThemeColors,
  getChartTheme,
  getRoleColors,
};

export default theme;
