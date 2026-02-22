/**
 * Charts Module - Single Source of Truth
 * =======================================
 * 
 * This module provides all chart-related components with:
 * - Normalized geometry (all positions as 0-1 values)
 * - Scalable rendering (any size via the size prop)
 * - Consistent theming across all chart types
 * - Reusable components for different contexts
 * 
 * Usage Examples:
 * 
 * 1. Full chart with decorations:
 *    <KundaliChart planets={planets} ascendantSign="Libra" chartType="north" />
 * 
 * 2. Mini chart (no decorations):
 *    <MiniChart planets={planets} ascendantSign="Libra" size={200} />
 * 
 * 3. Chart with toggle:
 *    <ChartWithToggle planets={planets} ascendantSign="Libra" />
 * 
 * 4. Just the SVG (for embedding):
 *    <KundaliChart planets={planets} ascendantSign="Libra" showTitle={false} showLegend={false} showLagnaBadge={false} />
 * 
 * 5. Divisional charts:
 *    <DivisionalChartView chartInfo={info} houses={houses} chartStyle="north" />
 *    <DivisionalChartGrid charts={chartsMap} chartInfoList={infos} chartStyle="north" />
 */

// Main Kundali chart components
export {
  KundaliChart,
  MiniChart,
  ChartWithToggle,
  NorthIndianChartSvg,
  SouthIndianChartSvg,
  type ChartProps,
  type ChartPlanet,
  type MiniChartProps,
  type ChartWithToggleProps,
} from './KundaliChart';

// Divisional chart components
export {
  DivisionalChartView,
  DivisionalChartGrid,
  NorthDivisionalChartSvg,
  SouthDivisionalChartSvg,
  type DivisionalChartViewProps,
  type DivisionalChartGridProps,
} from './DivisionalChartView';

// Re-export geometry utilities for advanced usage
export {
  NORTH_SIGN_POSITIONS,
  NORTH_PLANET_POSITIONS,
  SOUTH_SIGN_GRID,
  SOUTH_SIGN_NUMBER_GRID,
  ZODIAC_SIGNS,
  getSignForHouse,
  getHouseForSign,
  scalePosition,
  getScaledFontSize,
  type ZodiacSign,
  type ScaleConfig,
  type ChartPlanetData,
  type ChartHouseData,
} from '@/lib/chart-geometry';
