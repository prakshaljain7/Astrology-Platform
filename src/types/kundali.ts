// Types for Kundali/Lagna API

export interface Planet {
  planet: string;
  sign: string;
  degree: number;
  house_no: number;
}

export interface HousePlanet {
  planet: string;
}

export interface House {
  house_no: number;
  sign: string;
  cusp_degree: number;
  planets: HousePlanet[];
}

export interface Ascendant {
  sign: string;
  degree: number;
}

export interface TransitHouse {
  house_no: number;
  sign: string;
  planets: HousePlanet[];
}

export interface TransitData {
  houses: TransitHouse[];
  planets: Planet[];
}

export interface KundaliResponse {
  ascendant: Ascendant;
  ayanamsa: string;
  houses: House[];
  planets: Planet[];
  transit?: TransitData;
}

export interface KundaliFormData {
  dob: string;
  tob: string;
  lat: number;
  lon: number;
  tz: number;
  ayanamsa: string;
}

export type AyanamsaType =
  | 'lahiri'
  | 'raman'
  | 'kp'
  | 'jnbhasin'
  | 'parashari'
  | 'faganbradley'
  | 'pushyapaksha'
  | 'true'
  | 'suryasiddhanta';

export const AYANAMSA_OPTIONS: { value: AyanamsaType; label: string }[] = [
  { value: 'lahiri', label: 'Lahiri (Chitrapaksha)' },
  { value: 'raman', label: 'Raman' },
  { value: 'kp', label: 'Krishnamurti (KP)' },
  { value: 'jnbhasin', label: 'KP (J.N. Bhasin)' },
  { value: 'parashari', label: 'Parashari' },
  { value: 'faganbradley', label: 'Fagan–Bradley' },
  { value: 'pushyapaksha', label: 'Pushya Paksha' },
  { value: 'true', label: 'True (Observational)' },
  { value: 'suryasiddhanta', label: 'Surya Siddhanta' },
];

// Types for Dasha API (Vimshotri Mahadasha)

export interface DashaRequestData {
  dob: string;
  tob: string;
  sign: number; // Moon sign number (1-12)
  degree: number; // Moon degree
}

export interface MahaDasha {
  lord: string; // Planet name (e.g., "Moon", "Mars", "Rahu")
  start: string; // Start date
  end: string; // End date
  duration: string; // Duration string (e.g., "6y 3m 2d")
  current: boolean; // Whether this is the current dasha
}

export type DashaResponse = MahaDasha[];

// Types for Antardasha API
export interface AntarDashaRequestData {
  lord: string; // Mahadasha lord name
  start: string; // Mahadasha start date
  end: string; // Mahadasha end date
}

export interface AntarDasha {
  lord: string; // Planet name
  start: string; // Start date
  end: string; // End date
  duration: string; // Duration string
  current: boolean; // Whether this is the current antardasha
}

export type AntarDashaResponse = AntarDasha[];

// Types for Pratyantardasha API
export interface PratyantarDashaRequestData {
  lord: string; // Antardasha lord name
  start: string; // Antardasha start date
  end: string; // Antardasha end date
}

export interface PratyantarDasha {
  lord: string; // Planet name
  start: string; // Start date
  end: string; // End date
  duration: string; // Duration string
  current: boolean; // Whether this is the current pratyantardasha
}

export type PratyantarDashaResponse = PratyantarDasha[];

// Types for BNN API (Bhrigu Nandi Nadi)

export interface BnnRequestData {
  dob: string;
  tob: string;
  lat: number;
  lon: number;
  tz: number;
  ayanamsa: string;
  years: number;
}

export interface BnnTriangle {
  group: string;
  meaning: string;
}

export interface BnnEvent {
  date: string;
  event: string;
  houses: number[];
  jupiter_deg: number;
  natal_deg: number;
  triangles: BnnTriangle[];
}

export type BnnResponse = BnnEvent[];

// Types for Divisional Charts (Shodashvarga)

export interface DivisionalHouse {
  House: number;
  Planets: string;
  SignName: string;
  SignNo: number;
}

export interface DivisionalChartResponse {
  [key: string]: DivisionalHouse[];
}

export type DivisionalChartType = 
  | 'D2' | 'D3' | 'D4' | 'D7' | 'D9' | 'D10' 
  | 'D12' | 'D16' | 'D20' | 'D24' | 'D27' | 'D30';

export interface DivisionalChartInfo {
  id: DivisionalChartType;
  name: string;
  meaning: string;
  endpoint: string;
}

export const DIVISIONAL_CHARTS: DivisionalChartInfo[] = [
  { id: 'D2', name: 'Hora', meaning: 'Wealth Chart', endpoint: 'd2' },
  { id: 'D3', name: 'Drekkana', meaning: 'Siblings/Courage', endpoint: 'd3' },
  { id: 'D4', name: 'Chaturthamsa', meaning: 'Property/Home', endpoint: 'd4' },
  { id: 'D7', name: 'Saptamsa', meaning: 'Children', endpoint: 'd7' },
  { id: 'D9', name: 'Navamsa', meaning: 'Marriage/Dharma', endpoint: 'd9' },
  { id: 'D10', name: 'Dasamsa', meaning: 'Career/Profession', endpoint: 'd10' },
  { id: 'D12', name: 'Dvadasamsa', meaning: 'Parents/Karma Lineage', endpoint: 'd12' },
  { id: 'D16', name: 'Shodasamsa', meaning: 'Vehicles/Luxury', endpoint: 'd16' },
  { id: 'D20', name: 'Vimsamsa', meaning: 'Spiritual Chart', endpoint: 'd20' },
  { id: 'D24', name: 'Chaturvimsamsa', meaning: 'Education/Wisdom', endpoint: 'd24' },
  { id: 'D27', name: 'Bhamsha', meaning: 'Inner Strength', endpoint: 'd27' },
  { id: 'D30', name: 'Trimsamsa', meaning: 'Misfortune/Karmic Flaws', endpoint: 'd30' },
];
