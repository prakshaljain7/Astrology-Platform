import axios from 'axios';
import {
  KundaliResponse,
  KundaliFormData,
  DashaRequestData,
  DashaResponse,
  AntarDashaRequestData,
  AntarDashaResponse,
  PratyantarDashaRequestData,
  PratyantarDashaResponse,
  BnnRequestData,
  BnnResponse,
} from '@/types/kundali';

// Use local API routes to avoid CORS issues
// The proxy routes handle forwarding to the correct ports:
// - Lagna API: port 5001
// - Auth API: port 5003
const API_BASE_URL = '';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging/auth
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // config.headers.Authorization = `Bearer ${token}`;
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('[API Error]', error.response.status, error.response.data);
    } else if (error.request) {
      // No response received
      console.error('[API Error] No response received:', error.message);
    } else {
      // Request setup error
      console.error('[API Error]', error.message);
    }
    return Promise.reject(error);
  },
);

// Kundali/Lagna API - uses local proxy route to avoid CORS
export const kundaliApi = {
  /**
   * Calculate Lagna chart based on birth details
   * Uses /api/lagna proxy route which forwards to port 5001
   */
  calculateLagna: async (data: KundaliFormData): Promise<KundaliResponse> => {
    const params = new URLSearchParams({
      dob: data.dob,
      tob: data.tob,
      lat: data.lat.toString(),
      lon: data.lon.toString(),
      tz: data.tz.toString(),
      ayanamsa: data.ayanamsa,
    });

    const response = await apiClient.get<KundaliResponse>(
      `/api/lagna?${params.toString()}`,
    );
    return response.data;
  },
};

// Dasha API - uses local proxy route to avoid CORS
export const dashaApi = {
  /**
   * Compute Vimshotri Mahadasha based on birth details, moon sign and degree
   * Uses /api/dasha proxy route which forwards to port 8000
   */
  computeDasha: async (data: DashaRequestData): Promise<DashaResponse> => {
    const params = new URLSearchParams({
      dob: data.dob,
      tob: data.tob,
      sign: data.sign.toString(),
      degree: data.degree.toString(),
    });

    const response = await apiClient.get<DashaResponse>(
      `/api/dasha?${params.toString()}`,
    );
    return response.data;
  },

  /**
   * Compute Antardasha (sub-periods) for a specific Mahadasha
   * Uses /api/antardasha proxy route which forwards to port 8000
   * API: /api/antardasha?lord=Rahu&start=2026-02-02&end=2039-08-04
   */
  computeAntardasha: async (
    data: AntarDashaRequestData,
  ): Promise<AntarDashaResponse> => {
    const params = new URLSearchParams({
      lord: data.lord,
      start: data.start,
      end: data.end,
    });

    const response = await apiClient.get<AntarDashaResponse>(
      `/api/antardasha?${params.toString()}`,
    );
    return response.data;
  },

  /**
   * Compute Pratyantardasha (sub-sub-periods) for a specific Antardasha
   * Uses /api/pratyantardasha proxy route which forwards to port 8000
   * API: /api/pratyantardasha?lord=Rahu&start=2026-02-02&end=2028-02-11
   */
  computePratyantardasha: async (
    data: PratyantarDashaRequestData,
  ): Promise<PratyantarDashaResponse> => {
    const params = new URLSearchParams({
      lord: data.lord,
      start: data.start,
      end: data.end,
    });

    const response = await apiClient.get<PratyantarDashaResponse>(
      `/api/pratyantardasha?${params.toString()}`,
    );
    return response.data;
  },
};

// BNN API - uses local proxy route to avoid CORS
export const bnnApi = {
  /**
   * Compute Bhrigu Nandi Nadi predictions
   * Uses /api/bnn proxy route which forwards to port 8000
   */
  computeBnn: async (data: BnnRequestData): Promise<BnnResponse> => {
    const params = new URLSearchParams({
      dob: data.dob,
      tob: data.tob,
      lat: data.lat.toString(),
      lon: data.lon.toString(),
      tz: data.tz.toString(),
      ayanamsa: data.ayanamsa,
      years: data.years.toString(),
    });

    const response = await apiClient.get<BnnResponse>(
      `/api/bnn?${params.toString()}`,
    );
    return response.data;
  },
};

export default apiClient;
