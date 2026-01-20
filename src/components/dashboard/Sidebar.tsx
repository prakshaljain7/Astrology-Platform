"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/auth";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  allowedRoles?: UserRole[];
}

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Kundali Calculator",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    // Available to all roles
  },
  {
    href: "/dashboard/organizations",
    label: "Organizations",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    allowedRoles: ['super_admin'],
  },
  {
    href: "/dashboard/users",
    label: "User Management",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    allowedRoles: ['admin'],
  },
];

function SunLogo() {
  return (
    <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sunGradientSidebar" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#f7e7b4" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="18" fill="url(#sunGradientSidebar)" />
      {[...Array(8)].map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="20"
          x2="50"
          y2="28"
          stroke="url(#sunGradientSidebar)"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
    </svg>
  );
}

function getRoleBadge(role: UserRole) {
  switch (role) {
    case 'super_admin':
      return {
        label: 'Super Admin',
        color: 'bg-[#7c3aed]/10 text-[#7c3aed]',
      };
    case 'admin':
      return {
        label: 'Admin',
        color: 'bg-[#d4af37]/10 text-[#d4af37]',
      };
    case 'user':
    default:
      return {
        label: 'User',
        color: 'bg-[#10b981]/10 text-[#10b981]',
      };
  }
}

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter((item) => {
    if (!item.allowedRoles) return true; // Available to all
    if (!user) return false;
    return item.allowedRoles.includes(user.role);
  });

  const roleBadge = user ? getRoleBadge(user.role) : null;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white/80 backdrop-blur-xl border-r border-[rgba(0,0,0,0.06)] flex flex-col z-50 shadow-xl shadow-black/5">
      {/* Logo */}
      <div className="p-6 border-b border-[rgba(0,0,0,0.06)]">
        <Link href="/dashboard" className="flex items-center gap-3">
          <SunLogo />
          <div>
            <h1 className="text-lg font-semibold text-[#2b2e38]" style={{ fontFamily: 'var(--font-playfair)' }}>
              Astrologers
            </h1>
            <p className="text-xs text-[#d4af37] font-medium">Portal</p>
          </div>
        </Link>
      </div>

      {/* User Info */}
      {isAuthenticated && user && (
        <div className="p-4 border-b border-[rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#7c3aed]/20 flex items-center justify-center">
              <span className="text-[#2b2e38] font-semibold">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#2b2e38] truncate">
                {user.username}
              </p>
              {roleBadge && (
                <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-md ${roleBadge.color}`}>
                  {roleBadge.label}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#f7e7b4]/50 to-[#e6ddff]/50 text-[#d4af37] border border-[#d4af37]/20 shadow-sm"
                    : "text-[#6b7280] hover:text-[#2b2e38] hover:bg-[#f3f4f6]"
                }
              `}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout section */}
      <div className="p-4 border-t border-[rgba(0,0,0,0.06)]">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#6b7280] hover:text-red-500 hover:bg-red-50 transition-all duration-200 w-full"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
