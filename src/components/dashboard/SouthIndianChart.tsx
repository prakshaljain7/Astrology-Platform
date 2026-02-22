"use client";

/**
 * South Indian Chart Component
 * 
 * This is a wrapper around the unified KundaliChart component.
 * Use this for backwards compatibility with existing code.
 * 
 * For new code, prefer importing from '@/components/charts':
 *   import { KundaliChart } from '@/components/charts';
 *   <KundaliChart chartType="south" ... />
 */

import { Planet } from "@/types/kundali";
import { KundaliChart, type ChartPlanet } from "@/components/charts";

interface SouthIndianChartProps {
  planets: Planet[];
  ascendantSign: string;
  size?: number;
  showTitle?: boolean;
  showLegend?: boolean;
  showLagnaBadge?: boolean;
}

export function SouthIndianChart({ 
  planets, 
  ascendantSign,
  size = 400,
  showTitle = true,
  showLegend = true,
  showLagnaBadge = true,
}: SouthIndianChartProps) {
  // Convert Planet[] to ChartPlanet[] (same structure)
  const chartPlanets: ChartPlanet[] = planets.map(p => ({
    planet: p.planet,
    sign: p.sign,
    degree: p.degree,
    house_no: p.house_no,
  }));

  return (
    <KundaliChart
      planets={chartPlanets}
      ascendantSign={ascendantSign}
      chartType="south"
      size={size}
      showTitle={showTitle}
      showLegend={showLegend}
      showLagnaBadge={showLagnaBadge}
    />
  );
}
