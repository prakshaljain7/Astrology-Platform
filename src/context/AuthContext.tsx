'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  AuthContextType,
  User,
  CreateOrgRequest,
  CreateOrgResponse,
  CreateUserRequest,
  CreateUserResponse,
} from '@/types/auth';
import { authApi, decodeJWT } from '@/lib/auth-api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);

        if (storedToken && storedUser) {
          // Verify token is not expired
          const payload = decodeJWT(storedToken);
          if (payload && payload.exp) {
            const isExpired = Date.now() >= payload.exp * 1000;
            if (!isExpired) {
              setToken(storedToken);
              setUser(JSON.parse(storedUser));
            } else {
              // Token expired, clear storage
              localStorage.removeItem(TOKEN_KEY);
              localStorage.removeItem(USER_KEY);
            }
          } else {
            // No expiry, assume valid
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(
    async (username: string, password: string) => {
      setIsLoading(true);
      try {
        const result = await authApi.login(username, password);

        // Store in state
        setToken(result.token);
        setUser(result.user);

        // Persist to localStorage
        localStorage.setItem(TOKEN_KEY, result.token);
        localStorage.setItem(USER_KEY, JSON.stringify(result.user));

        // Redirect to dashboard
        router.push('/dashboard');
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  // Logout function
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    router.push('/');
  }, [router]);

  // Create organization (super_admin only)
  const createOrganization = useCallback(
    async (data: CreateOrgRequest): Promise<CreateOrgResponse> => {
      if (!token) {
        throw new Error('Not authenticated');
      }
      if (user?.role !== 'super_admin') {
        throw new Error('Access denied');
      }
      return authApi.createOrganization(token, data);
    },
    [token, user]
  );

  // Create user (admin only)
  const createUser = useCallback(
    async (data: CreateUserRequest): Promise<CreateUserResponse> => {
      if (!token) {
        throw new Error('Not authenticated');
      }
      if (user?.role !== 'admin') {
        throw new Error('Access denied');
      }
      return authApi.createUser(token, data);
    },
    [token, user]
  );

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
    createOrganization,
    createUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// HOC for protected routes
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles?: string[]
) {
  return function ProtectedRoute(props: P) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/');
      }
      if (!isLoading && isAuthenticated && allowedRoles && user) {
        if (!allowedRoles.includes(user.role)) {
          router.push('/dashboard');
        }
      }
    }, [isLoading, isAuthenticated, user, router]);

    if (isLoading) {
      return (
        <div className='min-h-screen flex items-center justify-center'>
          <div className='animate-spin w-8 h-8 border-4 border-[#d4af37] border-t-transparent rounded-full' />
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
