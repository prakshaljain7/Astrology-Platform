'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { UserRole } from '@/types/auth';
import { cssVars } from '@/lib/theme';
import {
  SETTINGS_HREF,
  dashboardNavItems,
  filterNavItemsForRole,
} from '@/lib/dashboard-nav';

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();
  const { themeColors, roleColors } = useTheme();

  const filteredNavItems = filterNavItemsForRole(
    dashboardNavItems,
    user?.role,
  );

  const getRoleBadge = (role: UserRole) => {
    const roleConfig = roleColors[role] || roleColors.user;
    const labels: Record<UserRole, string> = {
      super_admin: 'Super Admin',
      admin: 'Admin',
      user: 'User',
    };
    return {
      label: labels[role],
      bgColor: roleConfig.bg,
      textColor: roleConfig.text,
    };
  };

  const roleBadge = user ? getRoleBadge(user.role) : null;
  const settingsActive = pathname === SETTINGS_HREF;

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className="sticky top-0 z-50 backdrop-blur-xl shadow-sm"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderBottom: `1px solid ${themeColors.border.light}`,
          boxShadow: `0 25px 50px ${themeColors.shadow.soft}`,
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
          <Link href="/dashboard" className="flex min-w-0 items-center gap-3">
            <svg
              viewBox="0 0 100 100"
              className="h-10 w-10 shrink-0"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="sunGradientDashboardShell"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={themeColors.brand.accent} />
                  <stop offset="100%" stopColor={themeColors.brand.accentLight} />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="18" fill="url(#sunGradientDashboardShell)" />
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="20"
                  x2="50"
                  y2="28"
                  stroke="url(#sunGradientDashboardShell)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  transform={`rotate(${i * 45} 50 50)`}
                />
              ))}
            </svg>
            <div className="min-w-0">
              <h1
                className="truncate text-lg font-semibold"
                style={{
                  color: themeColors.text.primary,
                  fontFamily: cssVars.fontPlayfair,
                }}
              >
                Astrologers
              </h1>
              <p
                className="text-xs font-medium"
                style={{ color: themeColors.brand.accent }}
              >
                Portal
              </p>
            </div>
          </Link>

          <div className="ml-auto flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            {isAuthenticated && user && (
              <div className="flex items-center gap-2">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: `linear-gradient(to bottom right, ${themeColors.brand.accentBg20}, ${themeColors.brand.primaryBg20})`,
                  }}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ color: themeColors.text.primary }}
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden min-w-0 max-w-40 sm:block">
                  <p
                    className="truncate text-sm font-medium"
                    style={{ color: themeColors.text.primary }}
                  >
                    {user.username}
                  </p>
                  {roleBadge && (
                    <span
                      className="mt-0.5 inline-block rounded-md px-2 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: roleBadge.bgColor,
                        color: roleBadge.textColor,
                      }}
                    >
                      {roleBadge.label}
                    </span>
                  )}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors"
              style={{ color: themeColors.text.secondary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = themeColors.status.error;
                e.currentTarget.style.backgroundColor = themeColors.status.errorBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = themeColors.text.secondary;
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>

            <Link
              href={SETTINGS_HREF}
              aria-label="Settings"
              title="Settings"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-200"
              style={{
                background: settingsActive
                  ? `linear-gradient(to right, ${themeColors.brand.accentBg50}, ${themeColors.decorative.lavenderBg})`
                  : 'transparent',
                color: settingsActive
                  ? themeColors.brand.accent
                  : themeColors.text.secondary,
                border: settingsActive
                  ? `1px solid ${themeColors.brand.accentBg20}`
                  : `1px solid ${themeColors.border.light}`,
                boxShadow: settingsActive ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!settingsActive) {
                  e.currentTarget.style.color = themeColors.text.primary;
                  e.currentTarget.style.backgroundColor = themeColors.background.hover;
                }
              }}
              onMouseLeave={(e) => {
                if (!settingsActive) {
                  e.currentTarget.style.color = themeColors.text.secondary;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <SettingsIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <nav
          className="flex overflow-x-auto px-4 pb-3 md:px-6 [scrollbar-width:thin]"
          style={{ borderTop: `1px solid ${themeColors.border.light}` }}
        >
          <div className="mx-auto flex min-h-11 w-max flex-nowrap justify-center gap-2 py-2">
            {filteredNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200"
                  style={{
                    background: isActive
                      ? `linear-gradient(to right, ${themeColors.brand.accentBg50}, ${themeColors.decorative.lavenderBg})`
                      : 'transparent',
                    color: isActive
                      ? themeColors.brand.accent
                      : themeColors.text.secondary,
                    border: isActive
                      ? `1px solid ${themeColors.brand.accent}`
                      : '1px solid rgba(191, 143, 79, 0.45)',
                    boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = themeColors.text.primary;
                      e.currentTarget.style.backgroundColor =
                        themeColors.background.hover;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = themeColors.text.secondary;
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      <main className="min-h-0 flex-1">{children}</main>
    </div>
  );
}
