"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { CreateOrgRequest } from "@/types/auth";
import { colors, cssVars } from "@/lib/theme";

interface Organization {
  id: string;
  org_name: string;
  org_code: string;
  max_users: number;
  admin_username: string;
  created_at: string;
}

export default function OrganizationsPage() {
  const { user, createOrganization } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Form fields
  const [orgName, setOrgName] = useState("");
  const [orgCode, setOrgCode] = useState("");
  const [maxUsers, setMaxUsers] = useState(5);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  
  // Local list of created organizations (in production, this would come from an API)
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  // Check if user is super_admin
  if (user?.role !== 'super_admin') {
    return (
      <div className="p-8">
        <div className="glass-card rounded-2xl p-8 text-center">
          <svg className="w-16 h-16 mx-auto mb-4" style={{ color: colors.status.error }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-semibold mb-2" style={{ color: colors.text.primary }}>Access Denied</h2>
          <p style={{ color: colors.text.secondary }}>Only Super Admins can access this page.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!orgName.trim() || !orgCode.trim() || !adminUsername.trim() || !adminPassword.trim()) {
      setError("All fields are required");
      return;
    }

    if (maxUsers < 1 || maxUsers > 100) {
      setError("Max users must be between 1 and 100");
      return;
    }

    setIsCreating(true);
    try {
      const data: CreateOrgRequest = {
        org_name: orgName,
        org_code: orgCode,
        max_users: maxUsers,
        admin_username: adminUsername,
        admin_password: adminPassword,
      };

      const result = await createOrganization(data);
      
      // Add to local list
      setOrganizations(prev => [...prev, {
        id: result.org_id,
        org_name: orgName,
        org_code: orgCode,
        max_users: maxUsers,
        admin_username: adminUsername,
        created_at: new Date().toISOString(),
      }]);

      setSuccess(`Organization "${orgName}" created successfully!`);
      
      // Reset form
      setOrgName("");
      setOrgCode("");
      setMaxUsers(5);
      setAdminUsername("");
      setAdminPassword("");
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create organization");
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
              Organization Management
            </h1>
            <p className="mt-1" style={{ color: colors.text.secondary }}>Create and manage organizations</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2"
            style={{
              background: `linear-gradient(to right, ${colors.brand.primary}, ${colors.brand.primaryDark})`,
              color: colors.text.white,
              boxShadow: `0 10px 30px ${colors.brand.primaryBg}`
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Organization
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
            <svg className="w-6 h-6" style={{ color: colors.brand.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Create New Organization
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Organization Name */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                  Organization Name *
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g., Astrology Pvt Ltd"
                  className="w-full px-4 py-3 rounded-xl border bg-white/90 transition-all duration-200"
                  style={{ 
                    borderColor: colors.border.medium,
                    color: colors.text.primary
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.brand.primary;
                    e.target.style.boxShadow = `0 0 0 2px ${colors.brand.primaryBg20}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.border.medium;
                    e.target.style.boxShadow = 'none';
                  }}
                  disabled={isCreating}
                />
              </div>

              {/* Organization Code */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                  Organization Code *
                </label>
                <input
                  type="text"
                  value={orgCode}
                  onChange={(e) => setOrgCode(e.target.value.toUpperCase())}
                  placeholder="e.g., AST001"
                  className="w-full px-4 py-3 rounded-xl border bg-white/90 transition-all duration-200"
                  style={{ 
                    borderColor: colors.border.medium,
                    color: colors.text.primary
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.brand.primary;
                    e.target.style.boxShadow = `0 0 0 2px ${colors.brand.primaryBg20}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.border.medium;
                    e.target.style.boxShadow = 'none';
                  }}
                  disabled={isCreating}
                />
              </div>

              {/* Max Users */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                  Max Users *
                </label>
                <input
                  type="number"
                  value={maxUsers}
                  onChange={(e) => setMaxUsers(parseInt(e.target.value) || 1)}
                  min={1}
                  max={100}
                  className="w-full px-4 py-3 rounded-xl border bg-white/90 transition-all duration-200"
                  style={{ 
                    borderColor: colors.border.medium,
                    color: colors.text.primary
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.brand.primary;
                    e.target.style.boxShadow = `0 0 0 2px ${colors.brand.primaryBg20}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.border.medium;
                    e.target.style.boxShadow = 'none';
                  }}
                  disabled={isCreating}
                />
                <p className="text-xs mt-1" style={{ color: colors.text.secondary }}>Maximum number of users allowed in this organization</p>
              </div>

              {/* Admin Username */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                  Admin Username *
                </label>
                <input
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="e.g., astro_admin"
                  className="w-full px-4 py-3 rounded-xl border bg-white/90 transition-all duration-200"
                  style={{ 
                    borderColor: colors.border.medium,
                    color: colors.text.primary
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.brand.primary;
                    e.target.style.boxShadow = `0 0 0 2px ${colors.brand.primaryBg20}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.border.medium;
                    e.target.style.boxShadow = 'none';
                  }}
                  disabled={isCreating}
                />
              </div>

              {/* Admin Password */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                  Admin Password *
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter secure password"
                  className="w-full px-4 py-3 rounded-xl border bg-white/90 transition-all duration-200"
                  style={{ 
                    borderColor: colors.border.medium,
                    color: colors.text.primary
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.brand.primary;
                    e.target.style.boxShadow = `0 0 0 2px ${colors.brand.primaryBg20}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.border.medium;
                    e.target.style.boxShadow = 'none';
                  }}
                  disabled={isCreating}
                />
                <p className="text-xs mt-1" style={{ color: colors.text.secondary }}>This will be the password for the organization&apos;s admin user</p>
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
                  background: `linear-gradient(to right, ${colors.brand.primary}, ${colors.brand.primaryDark})`,
                  color: colors.text.white,
                  boxShadow: `0 10px 30px ${colors.brand.primaryBg}`
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Organization
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Organizations List */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: colors.text.primary }}>
          <svg className="w-6 h-6" style={{ color: colors.brand.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Organizations ({organizations.length})
        </h2>

        {organizations.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4" style={{ color: colors.border.gray }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-lg font-medium mb-2" style={{ color: colors.text.secondary }}>No Organizations Yet</h3>
            <p className="text-sm" style={{ color: colors.text.muted }}>Click &quot;New Organization&quot; to create your first organization</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: `1px solid ${colors.border.light}` }}>
                  <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: colors.text.secondary }}>Organization</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: colors.text.secondary }}>Code</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: colors.text.secondary }}>Admin</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: colors.text.secondary }}>Max Users</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: colors.text.secondary }}>Created</th>
                </tr>
              </thead>
              <tbody>
                {organizations.map((org) => (
                  <tr 
                    key={org.id} 
                    className="transition-colors"
                    style={{ borderBottom: `1px solid ${colors.border.light}` }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.background.hover}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: `linear-gradient(to bottom right, ${colors.brand.primaryBg20}, ${colors.brand.primaryBg})` }}
                        >
                          <span style={{ color: colors.brand.primary }} className="font-bold">{org.org_name.charAt(0)}</span>
                        </div>
                        <span className="font-medium" style={{ color: colors.text.primary }}>{org.org_name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span 
                        className="px-3 py-1 rounded-lg text-sm font-mono"
                        style={{ backgroundColor: colors.background.hover, color: colors.text.secondary }}
                      >
                        {org.org_code}
                      </span>
                    </td>
                    <td className="py-4 px-4" style={{ color: colors.text.secondary }}>{org.admin_username}</td>
                    <td className="py-4 px-4">
                      <span 
                        className="px-3 py-1 rounded-lg text-sm font-medium"
                        style={{ backgroundColor: colors.brand.accentBg, color: colors.brand.accent }}
                      >
                        {org.max_users} users
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm" style={{ color: colors.text.muted }}>
                      {new Date(org.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
