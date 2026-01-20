// User roles
export type UserRole = 'super_admin' | 'admin' | 'user';

// JWT payload structure
export interface JWTPayload {
  sub: string; // user_id
  role: UserRole;
  org_id: string | null;
  exp?: number;
  iat?: number;
}

// User info stored in context
export interface User {
  id: string;
  username: string;
  role: UserRole;
  org_id: string | null;
}

// Login response from API
export interface LoginResponse {
  access_token: string;
  role: UserRole;
}

// Organization
export interface Organization {
  _id: string;
  org_name: string;
  org_code: string;
  max_users: number;
  created_by: string;
  created_at: string;
}

// Create organization request
export interface CreateOrgRequest {
  org_name: string;
  org_code: string;
  max_users: number;
  admin_username: string;
  admin_password: string;
}

// Create organization response
export interface CreateOrgResponse {
  message: string;
  org_id: string;
}

// Create user request
export interface CreateUserRequest {
  username: string;
  password: string;
}

// Create user response
export interface CreateUserResponse {
  message: string;
}

// Auth context state
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Auth context actions
export interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  createOrganization: (data: CreateOrgRequest) => Promise<CreateOrgResponse>;
  createUser: (data: CreateUserRequest) => Promise<CreateUserResponse>;
}
