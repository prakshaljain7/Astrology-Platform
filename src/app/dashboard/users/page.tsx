"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { CreateUserRequest } from "@/types/auth";
import { colors, cssVars } from "@/lib/theme";

interface LocalUser {
  id: string;
  username: string;
  created_at: string;
}

export default function UsersPage() {
  const { user, createUser } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Local list of created users (in production, this would come from an API)
  const [users, setUsers] = useState<LocalUser[]>([]);

  // Check if user is admin
  if (user?.role !== 'admin') {
    return (
      <div className="p-8">
        <div className="glass-card rounded-2xl p-8 text-center">
          <svg className="w-16 h-16 mx-auto mb-4" style={{ color: colors.status.error }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-semibold mb-2" style={{ color: colors.text.primary }}>Access Denied</h2>
          <p style={{ color: colors.text.secondary }}>Only Admins can access this page.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsCreating(true);
    try {
      const data: CreateUserRequest = {
        username: username,
        password: password,
      };

      await createUser(data);
      
      // Add to local list
      setUsers(prev => [...prev, {
        id: Date.now().toString(),
        username: username,
        created_at: new Date().toISOString(),
      }]);

      setSuccess(`User "${username}" created successfully!`);
      
      // Reset form
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: colors.text.primary, fontFamily: cssVars.fontPlayfair }}>
              User Management
            </h1>
            <p className="mt-1" style={{ color: colors.text.secondary }}>Create and manage users in your organization</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2"
            style={{
              background: `linear-gradient(to right, ${colors.brand.accent}, ${colors.brand.accentDark})`,
              color: colors.text.white,
              boxShadow: `0 10px 30px ${colors.brand.accentBg30}`
            }}
          >
            {showForm ? (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                New User
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div 
          className="mb-6 p-4 rounded-xl animate-fadeIn"
          style={{ 
            backgroundColor: colors.status.successBg,
            border: `1px solid ${colors.status.success}`,
            color: colors.status.success
          }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {success}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div 
          className="mb-6 p-4 rounded-xl animate-fadeIn"
          style={{ 
            backgroundColor: colors.status.errorBg,
            border: `1px solid ${colors.status.errorBorder}`,
            color: colors.status.error
          }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* Create Form */}
      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8 animate-fadeIn">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: colors.text.primary }}>
            <svg className="w-6 h-6" style={{ color: colors.brand.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Create New User
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                  Username *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" style={{ color: colors.text.muted }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white/90 transition-all duration-200"
                    style={{ 
                      borderColor: colors.border.medium,
                      color: colors.text.primary
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.brand.accent;
                      e.target.style.boxShadow = `0 0 0 2px ${colors.brand.accentBg20}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.border.medium;
                      e.target.style.boxShadow = 'none';
                    }}
                    disabled={isCreating}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" style={{ color: colors.text.muted }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white/90 transition-all duration-200"
                    style={{ 
                      borderColor: colors.border.medium,
                      color: colors.text.primary
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.brand.accent;
                      e.target.style.boxShadow = `0 0 0 2px ${colors.brand.accentBg20}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.border.medium;
                      e.target.style.boxShadow = 'none';
                    }}
                    disabled={isCreating}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" style={{ color: colors.text.muted }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white/90 transition-all duration-200"
                    style={{ 
                      borderColor: colors.border.medium,
                      color: colors.text.primary
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.brand.accent;
                      e.target.style.boxShadow = `0 0 0 2px ${colors.brand.accentBg20}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.border.medium;
                      e.target.style.boxShadow = 'none';
                    }}
                    disabled={isCreating}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4" style={{ borderTop: `1px solid ${colors.border.light}` }}>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 font-medium rounded-xl transition-all duration-200"
                style={{ color: colors.text.secondary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.text.primary;
                  e.currentTarget.style.backgroundColor = colors.background.hover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.text.secondary;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                disabled={isCreating}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="px-6 py-3 font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                style={{
                  background: `linear-gradient(to right, ${colors.brand.accent}, ${colors.brand.accentDark})`,
                  color: colors.text.white,
                  boxShadow: `0 10px 30px ${colors.brand.accentBg30}`
                }}
              >
                {isCreating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Create User
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: colors.text.primary }}>
          <svg className="w-6 h-6" style={{ color: colors.status.success }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Users ({users.length})
        </h2>

        {users.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4" style={{ color: colors.border.gray }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 className="text-lg font-medium mb-2" style={{ color: colors.text.secondary }}>No Users Yet</h3>
            <p className="text-sm" style={{ color: colors.text.muted }}>Click &quot;New User&quot; to create your first user</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((u) => (
              <div
                key={u.id}
                className="p-4 rounded-xl transition-all duration-200"
                style={{
                  background: `linear-gradient(to bottom right, ${colors.background.white}, ${colors.background.hover})`,
                  border: `1px solid ${colors.border.light}`
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: `linear-gradient(to bottom right, ${colors.status.successBg}, ${colors.status.successBg})` }}
                  >
                    <svg className="w-6 h-6" style={{ color: colors.status.success }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium" style={{ color: colors.text.primary }}>{u.username}</h3>
                    <p className="text-xs" style={{ color: colors.text.muted }}>
                      Created {new Date(u.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${colors.border.light}` }}>
                  <span 
                    className="px-3 py-1 rounded-lg text-xs font-medium"
                    style={{ backgroundColor: colors.status.successBg, color: colors.status.success }}
                  >
                    Active User
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="mt-6 glass-card rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: colors.brand.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-sm font-semibold mb-1" style={{ color: colors.text.primary }}>User Limits</h3>
            <p className="text-xs" style={{ color: colors.text.secondary }}>
              You can create users up to the maximum limit set for your organization. 
              Users created here will have access to the Kundali Calculator feature.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
