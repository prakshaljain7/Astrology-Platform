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

export interface KundaliResponse {
  ascendant: Ascendant;
  ayanamsa: string;
  houses: House[];
  planets: Planet[];
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
