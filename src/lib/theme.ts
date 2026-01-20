/**
 * Centralized Theme Configuration
 * All colors and styling constants for the Astrologers Portal
 */

// ============================================
// CORE COLORS
// ============================================

export const colors = {
  // Background colors
  background: {
    primary: '#fffdf8',      // Main page background (warm cream)
    secondary: '#fafaf9',    // Secondary/card backgrounds
    white: '#ffffff',
    glass: 'rgba(255, 255, 255, 0.65)',
    card: 'rgba(255, 255, 255, 0.85)',
    input: 'rgba(255, 255, 255, 0.9)',
    hover: '#f3f4f6',
    tableAlt: '#fdfcff',
  },

  // Text colors
  text: {
    primary: '#2b2e38',      // Main text color
    secondary: '#6b7280',    // Muted/secondary text
    muted: '#9ca3af',        // Placeholder text
    light: '#4b5563',
    white: '#ffffff',
  },

  // Brand colors
  brand: {
    // Primary (Purple)
    primary: '#7c3aed',
    primaryLight: '#a78bfa',
    primaryDark: '#6d28d9',
    primaryBg: 'rgba(124, 58, 237, 0.1)',
    primaryBg20: 'rgba(124, 58, 237, 0.2)',
    
    // Accent (Gold)
    accent: '#d4af37',
    accentLight: '#f7e7b4',
    accentDark: '#b8962e',
    accentDarker: '#a17f27',
    accentDarkest: '#8a6c1f',
    accentBg: 'rgba(212, 175, 55, 0.1)',
    accentBg20: 'rgba(212, 175, 55, 0.2)',
    accentBg30: 'rgba(212, 175, 55, 0.3)',
    accentBg50: 'rgba(212, 175, 55, 0.5)',
  },

  // Status colors
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

  // Decorative colors (for gradients/backgrounds)
  decorative: {
    rose: '#f6c1cc',
    roseBg: 'rgba(246, 193, 204, 0.4)',
    sky: '#c9e6ff',
    skyBg: 'rgba(201, 230, 255, 0.4)',
    lavender: '#e6ddff',
    lavenderBg: 'rgba(230, 221, 255, 0.4)',
    champagne: '#f7e7b4',
  },

  // Border colors
  border: {
    light: 'rgba(0, 0, 0, 0.06)',
    soft: 'rgba(0, 0, 0, 0.08)',
    medium: 'rgba(0, 0, 0, 0.1)',
    gray: '#e5e7eb',
  },

  // Shadow colors
  shadow: {
    soft: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.08)',
  },
} as const;

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
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
] as const;

// export const zodiacSymbols: Record<string, string> = {
//   Aries: '♈',
//   Taurus: '♉',
//   Gemini: '♊',
//   Cancer: '♋',
//   Leo: '♌',
//   Virgo: '♍',
//   Libra: '♎',
//   Scorpio: '♏',
//   Sagittarius: '♐',
//   Capricorn: '♑',
//   Aquarius: '♒',
//   Pisces: '♓',
// };

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
// ROLE COLORS
// ============================================

export const roleColors = {
  super_admin: {
    bg: `bg-[${colors.brand.primary}]/10`,
    text: `text-[${colors.brand.primary}]`,
    dot: colors.brand.primary,
  },
  admin: {
    bg: `bg-[${colors.brand.accent}]/10`,
    text: `text-[${colors.brand.accent}]`,
    dot: colors.brand.accent,
  },
  user: {
    bg: `bg-[${colors.status.success}]/10`,
    text: `text-[${colors.status.success}]`,
    dot: colors.status.success,
  },
} as const;

// ============================================
// CSS VARIABLE REFERENCES
// ============================================

export const cssVars = {
  fontPlayfair: 'var(--font-playfair)',
  fontSans: 'var(--font-dm-sans)',
} as const;

// ============================================
// CHART THEME COLORS
// ============================================

export const chartTheme = {
  background: colors.background.primary,
  cardBg: colors.background.white,
  borderPrimary: colors.brand.accent,
  borderSecondary: colors.border.gray,
  highlightBg: colors.brand.accentLight,
  highlightBgOpacity: 0.4,
  signColor: colors.brand.accent,
  houseNumberColor: colors.brand.primary,
  textColor: colors.text.primary,
};

// ============================================
// COMMON TAILWIND CLASS PATTERNS
// ============================================

export const twClasses = {
  // Card styles
  glassCard: 'bg-white/65 backdrop-blur-[22px] border border-[rgba(0,0,0,0.08)] shadow-[0_40px_80px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]',
  
  // Button styles
  primaryButton: `bg-gradient-to-r from-[${colors.brand.accent}] to-[${colors.brand.accentDark}] text-white shadow-lg shadow-[${colors.brand.accent}]/30`,
  
  // Input focus
  inputFocus: `focus:border-[${colors.brand.accent}] focus:ring-2 focus:ring-[${colors.brand.accent}]/20`,
} as const;

// Default export for convenience
export default {
  colors,
  planetColors,
  planetShort,
  zodiacSigns,
  zodiacSymbols,
  zodiacShort,
  roleColors,
  cssVars,
  chartTheme,
  twClasses,
};
