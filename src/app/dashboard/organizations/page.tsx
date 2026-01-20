"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { CreateOrgRequest } from "@/types/auth";

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
          <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-semibold text-[#2b2e38] mb-2">Access Denied</h2>
          <p className="text-[#6b7280]">Only Super Admins can access this page.</p>
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
            <h1 className="text-3xl font-bold text-[#2b2e38]" style={{ fontFamily: 'var(--font-playfair)' }}>
              Organization Management
            </h1>
            <p className="text-[#6b7280] mt-1">Create and manage organizations</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white font-semibold rounded-xl shadow-lg shadow-[#7c3aed]/30 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
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
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 animate-fadeIn">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {success}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 animate-fadeIn">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* Create Form */}
      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8 animate-fadeIn">
          <h2 className="text-xl font-semibold text-[#2b2e38] mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-[#7c3aed]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Create New Organization
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Organization Name */}
              <div>
                <label className="block text-sm font-medium text-[#2b2e38] mb-2">
                  Organization Name *
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g., Astrology Pvt Ltd"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.1)] bg-white/90 text-[#2b2e38] placeholder-[#9ca3af] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 transition-all duration-200"
                  disabled={isCreating}
                />
              </div>

              {/* Organization Code */}
              <div>
                <label className="block text-sm font-medium text-[#2b2e38] mb-2">
                  Organization Code *
                </label>
                <input
                  type="text"
                  value={orgCode}
                  onChange={(e) => setOrgCode(e.target.value.toUpperCase())}
                  placeholder="e.g., AST001"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.1)] bg-white/90 text-[#2b2e38] placeholder-[#9ca3af] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 transition-all duration-200"
                  disabled={isCreating}
                />
              </div>

              {/* Max Users */}
              <div>
                <label className="block text-sm font-medium text-[#2b2e38] mb-2">
                  Max Users *
                </label>
                <input
                  type="number"
                  value={maxUsers}
                  onChange={(e) => setMaxUsers(parseInt(e.target.value) || 1)}
                  min={1}
                  max={100}
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.1)] bg-white/90 text-[#2b2e38] placeholder-[#9ca3af] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 transition-all duration-200"
                  disabled={isCreating}
                />
                <p className="text-xs text-[#6b7280] mt-1">Maximum number of users allowed in this organization</p>
              </div>

              {/* Admin Username */}
              <div>
                <label className="block text-sm font-medium text-[#2b2e38] mb-2">
                  Admin Username *
                </label>
                <input
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="e.g., astro_admin"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.1)] bg-white/90 text-[#2b2e38] placeholder-[#9ca3af] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 transition-all duration-200"
                  disabled={isCreating}
                />
              </div>

              {/* Admin Password */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2b2e38] mb-2">
                  Admin Password *
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter secure password"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.1)] bg-white/90 text-[#2b2e38] placeholder-[#9ca3af] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 transition-all duration-200"
                  disabled={isCreating}
                />
                <p className="text-xs text-[#6b7280] mt-1">This will be the password for the organization's admin user</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[rgba(0,0,0,0.06)]">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 text-[#6b7280] hover:text-[#2b2e38] font-medium rounded-xl hover:bg-gray-100 transition-all duration-200"
                disabled={isCreating}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="px-6 py-3 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white font-semibold rounded-xl shadow-lg shadow-[#7c3aed]/30 hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
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
        <h2 className="text-xl font-semibold text-[#2b2e38] mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Organizations ({organizations.length})
        </h2>

        {organizations.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-[#d1d5db] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-lg font-medium text-[#6b7280] mb-2">No Organizations Yet</h3>
            <p className="text-sm text-[#9ca3af]">Click "New Organization" to create your first organization</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(0,0,0,0.06)]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b7280]">Organization</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b7280]">Code</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b7280]">Admin</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b7280]">Max Users</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b7280]">Created</th>
                </tr>
              </thead>
              <tbody>
                {organizations.map((org) => (
                  <tr key={org.id} className="border-b border-[rgba(0,0,0,0.03)] hover:bg-[#f9fafb] transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#7c3aed]/10 flex items-center justify-center">
                          <span className="text-[#7c3aed] font-bold">{org.org_name.charAt(0)}</span>
                        </div>
                        <span className="font-medium text-[#2b2e38]">{org.org_name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-[#f3f4f6] rounded-lg text-sm font-mono text-[#6b7280]">{org.org_code}</span>
                    </td>
                    <td className="py-4 px-4 text-[#6b7280]">{org.admin_username}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-[#d4af37]/10 rounded-lg text-sm text-[#d4af37] font-medium">{org.max_users} users</span>
                    </td>
                    <td className="py-4 px-4 text-sm text-[#9ca3af]">
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
