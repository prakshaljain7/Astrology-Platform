import axios from 'axios';
import {
  LoginResponse,
  CreateOrgRequest,
  CreateOrgResponse,
  CreateUserRequest,
  CreateUserResponse,
  JWTPayload,
  User,
} from '@/types/auth';

// Use local API routes to avoid CORS issues
// These routes proxy requests to the external auth server
const API_BASE_URL = '';

// Create axios instance for auth
const authClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
authClient.interceptors.request.use(
  (config) => {
    console.log(`[Auth API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        '[Auth API Error]',
        error.response.status,
        error.response.data
      );
      const message =
        error.response.data?.message ||
        error.response.data?.msg ||
        'An error occurred';
      throw new Error(message);
    } else if (error.request) {
      console.error('[Auth API Error] No response:', error.message);
      throw new Error('Unable to connect to server');
    }
    throw error;
  }
);

// Helper to decode JWT token
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

// Helper to create Basic Auth header
function createBasicAuthHeader(username: string, password: string): string {
  const credentials = `${username}:${password}`;
  const encoded = btoa(credentials);
  return `Basic ${encoded}`;
}

// Auth API functions
export const authApi = {
  /**
   * Login with username and password
   * Uses local API route to avoid CORS
   */
  login: async (
    username: string,
    password: string
  ): Promise<{ token: string; user: User }> => {
    const response = await authClient.post<LoginResponse>(
      '/api/auth/login',
      {},
      {
        headers: {
          Authorization: createBasicAuthHeader(username, password),
        },
      }
    );

    const token = response.data.access_token;
    const payload = decodeJWT(token);

    if (!payload) {
      throw new Error('Invalid token received');
    }

    const user: User = {
      id: payload.sub,
      username: username,
      role: payload.role,
      org_id: payload.org_id,
    };

    return { token, user };
  },

  /**
   * Create organization (Super Admin only)
   * Uses local API route to avoid CORS
   */
  createOrganization: async (
    token: string,
    data: CreateOrgRequest
  ): Promise<CreateOrgResponse> => {
    const response = await authClient.post<CreateOrgResponse>(
      '/api/auth/org/create',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  /**
   * Create user (Admin only)
   * Uses local API route to avoid CORS
   */
  createUser: async (
    token: string,
    data: CreateUserRequest
  ): Promise<CreateUserResponse> => {
    const response = await authClient.post<CreateUserResponse>(
      '/api/auth/user/create',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};

export default authApi;
