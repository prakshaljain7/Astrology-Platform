'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { KundaliFormData, KundaliResponse } from '@/types/kundali';

interface KundaliDataContextType {
  // Form data (birth details)
  formData: KundaliFormData | null;
  setFormData: (data: KundaliFormData) => void;

  // Kundali/Lagna API response
  kundaliData: KundaliResponse | null;
  setKundaliData: (data: KundaliResponse | null) => void;

  // Loading and error states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;

  // Helper to check if data is available
  hasData: boolean;

  // Helper to get moon degree for dasha calculation
  getMoonDegree: () => number | null;

  // Helper to get moon sign number (1-12) for dasha calculation
  getMoonSignNumber: () => number | null;

  // Clear all data
  clearData: () => void;
}

const KundaliDataContext = createContext<KundaliDataContextType | undefined>(
  undefined,
);

export function KundaliDataProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<KundaliFormData | null>(null);
  const [kundaliData, setKundaliData] = useState<KundaliResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasData = !!kundaliData && !!formData;

  // Zodiac sign to number mapping
  const signToNumber: Record<string, number> = {
    aries: 1,
    taurus: 2,
    gemini: 3,
    cancer: 4,
    leo: 5,
    virgo: 6,
    libra: 7,
    scorpio: 8,
    sagittarius: 9,
    capricorn: 10,
    aquarius: 11,
    pisces: 12,
  };

  // Get moon data from planets
  const getMoonData = () => {
    if (!kundaliData) return null;
    return kundaliData.planets.find(
      (p) =>
        p.planet.toLowerCase() === 'moon' ||
        p.planet.toLowerCase() === 'chandra',
    );
  };

  // Get moon degree from planets data
  const getMoonDegree = (): number | null => {
    const moon = getMoonData();
    return moon ? moon.degree : null;
  };

  // Get moon sign number (1-12) from planets data
  const getMoonSignNumber = (): number | null => {
    const moon = getMoonData();
    if (!moon) return null;
    const signNumber = signToNumber[moon.sign.toLowerCase()];
    return signNumber || null;
  };

  const clearData = () => {
    setFormData(null);
    setKundaliData(null);
    setError(null);
  };

  return (
    <KundaliDataContext.Provider
      value={{
        formData,
        setFormData,
        kundaliData,
        setKundaliData,
        isLoading,
        setIsLoading,
        error,
        setError,
        hasData,
        getMoonDegree,
        getMoonSignNumber,
        clearData,
      }}
    >
      {children}
    </KundaliDataContext.Provider>
  );
}

export function useKundaliData() {
  const context = useContext(KundaliDataContext);
  if (context === undefined) {
    throw new Error('useKundaliData must be used within a KundaliDataProvider');
  }
  return context;
}
