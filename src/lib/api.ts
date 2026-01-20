import axios from 'axios';
import { KundaliResponse, KundaliFormData } from '@/types/kundali';

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
  }
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
  }
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
      `/api/lagna?${params.toString()}`
    );
    return response.data;
  },
};

export default apiClient;
