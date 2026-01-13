"use client";

import { useState } from "react";
import { KundaliForm } from "@/components/dashboard/KundaliForm";
import { AscendantCard } from "@/components/dashboard/AscendantCard";
import { HouseTable } from "@/components/dashboard/HouseTable";
import { PlanetTable } from "@/components/dashboard/PlanetTable";
import { NorthIndianChart } from "@/components/dashboard/NorthIndianChart";
import { SouthIndianChart } from "@/components/dashboard/SouthIndianChart";
import { kundaliApi } from "@/lib/api";
import { KundaliResponse, KundaliFormData } from "@/types/kundali";

export default function DashboardPage() {
  const [chartData, setChartData] = useState<KundaliResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeChartView, setActiveChartView] = useState<"both" | "north" | "south">("both");

  const handleCalculate = async (formData: KundaliFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await kundaliApi.calculateLagna(formData);
      setChartData(data);
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : "Failed to calculate chart. Please check if the API server is running."
      );
      console.error("Error calculating chart:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 
          className="text-3xl font-semibold text-[#2b2e38] mb-2 shimmer-gold"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Vedic Lagna Calculator
        </h1>
        <p className="text-[#6b7280]">
          Calculate birth chart with house and planetary positions
        </p>
      </div>

      {/* Form Card */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <KundaliForm onSubmit={handleCalculate} isLoading={isLoading} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {chartData && (
        <div className="space-y-8 animate-fadeIn">
          {/* Ascendant Card */}
          <AscendantCard 
            ascendant={chartData.ascendant} 
            ayanamsa={chartData.ayanamsa} 
          />

          {/* Chart View Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex bg-white/80 rounded-xl p-1 shadow-sm border border-[rgba(0,0,0,0.08)]">
              <button
                onClick={() => setActiveChartView("both")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeChartView === "both"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#f7e7b4] text-[#3a2d0b] shadow-sm"
                    : "text-[#6b7280] hover:text-[#2b2e38]"
                }`}
              >
                Both Charts
              </button>
              <button
                onClick={() => setActiveChartView("north")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeChartView === "north"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#f7e7b4] text-[#3a2d0b] shadow-sm"
                    : "text-[#6b7280] hover:text-[#2b2e38]"
                }`}
              >
                ◇ North Indian
              </button>
              <button
                onClick={() => setActiveChartView("south")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeChartView === "south"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#f7e7b4] text-[#3a2d0b] shadow-sm"
                    : "text-[#6b7280] hover:text-[#2b2e38]"
                }`}
              >
                ▣ South Indian
              </button>
            </div>
          </div>

          {/* Kundali Charts */}
          <div className={`grid gap-8 ${activeChartView === "both" ? "grid-cols-1 xl:grid-cols-2" : "grid-cols-1 max-w-xl mx-auto"}`}>
            {(activeChartView === "both" || activeChartView === "north") && (
              <NorthIndianChart
                houses={chartData.houses}
                planets={chartData.planets}
                ascendantSign={chartData.ascendant.sign}
              />
            )}
            {(activeChartView === "both" || activeChartView === "south") && (
              <SouthIndianChart
                houses={chartData.houses}
                planets={chartData.planets}
                ascendantSign={chartData.ascendant.sign}
              />
            )}
          </div>

          {/* Tables Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <HouseTable houses={chartData.houses} />
            <PlanetTable planets={chartData.planets} />
          </div>
        </div>
      )}

      {/* Empty State */}
      {!chartData && !error && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#f7e7b4]/50 to-[#e6ddff]/50 flex items-center justify-center shadow-lg shadow-[#d4af37]/10">
            <svg className="w-12 h-12 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 className="text-xl text-[#2b2e38] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            Enter Birth Details
          </h3>
          <p className="text-[#6b7280] max-w-md mx-auto">
            Fill in the form above with date, time, and location of birth to calculate the Vedic birth chart.
          </p>
        </div>
      )}
    </div>
  );
}
