"use client";

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
  
  // Clear all data
  clearData: () => void;
}

const KundaliDataContext = createContext<KundaliDataContextType | undefined>(undefined);

export function KundaliDataProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<KundaliFormData | null>(null);
  const [kundaliData, setKundaliData] = useState<KundaliResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasData = !!kundaliData && !!formData;

  // Get moon degree from planets data
  const getMoonDegree = (): number | null => {
    if (!kundaliData) return null;
    const moon = kundaliData.planets.find(
      p => p.planet.toLowerCase() === 'moon' || p.planet.toLowerCase() === 'chandra'
    );
    return moon ? moon.degree : null;
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
