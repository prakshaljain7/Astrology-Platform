'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { UserRole } from '@/types/auth';
import { cssVars } from '@/lib/theme';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  allowedRoles?: UserRole[];
}

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Kundali Calculator',
    icon: (
      <svg
        className='w-5 h-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        />
      </svg>
    ),
    // Available to all roles
  },
  {
    href: '/dashboard/vimshotri',
    label: 'Vimshotri Dasha',
    icon: (
      <svg
        className='w-5 h-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
    ),
    // Available to all roles
  },
  {
    href: '/dashboard/bnn',
    label: 'Bhrigu Nandi Nadi',
    icon: (
      <svg
        className='w-5 h-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
        />
      </svg>
    ),
    // Available to all roles
  },
  {
    href: '/dashboard/organizations',
    label: 'Organizations',
    icon: (
      <svg
        className='w-5 h-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
        />
      </svg>
    ),
    allowedRoles: ['super_admin'],
  },
  {
    href: '/dashboard/users',
    label: 'User Management',
    icon: (
      <svg
        className='w-5 h-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
        />
      </svg>
    ),
    allowedRoles: ['admin'],
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: (
      <svg
        className='w-5 h-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
        />
      </svg>
    ),
    // Available to all roles
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();
  const { themeColors, roleColors } = useTheme();

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter((item) => {
    if (!item.allowedRoles) return true; // Available to all
    if (!user) return false;
    return item.allowedRoles.includes(user.role);
  });

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

  return (
    <aside
      className='fixed left-0 top-0 h-screen w-64 backdrop-blur-xl flex flex-col z-50 shadow-xl'
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRight: `1px solid ${themeColors.border.light}`,
        boxShadow: `0 25px 50px ${themeColors.shadow.soft}`,
      }}
    >
      {/* Logo */}
      <div
        className='p-6'
        style={{ borderBottom: `1px solid ${themeColors.border.light}` }}
      >
        <Link href='/dashboard' className='flex items-center gap-3'>
          <svg
            viewBox='0 0 100 100'
            className='w-10 h-10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <defs>
              <linearGradient
                id='sunGradientSidebar'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop offset='0%' stopColor={themeColors.brand.accent} />
                <stop offset='100%' stopColor={themeColors.brand.accentLight} />
              </linearGradient>
            </defs>
            <circle cx='50' cy='50' r='18' fill='url(#sunGradientSidebar)' />
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1='50'
                y1='20'
                x2='50'
                y2='28'
                stroke='url(#sunGradientSidebar)'
                strokeWidth='3'
                strokeLinecap='round'
                transform={`rotate(${i * 45} 50 50)`}
              />
            ))}
          </svg>
          <div>
            <h1
              className='text-lg font-semibold'
              style={{
                color: themeColors.text.primary,
                fontFamily: cssVars.fontPlayfair,
              }}
            >
              Astrologers
            </h1>
            <p
              className='text-xs font-medium'
              style={{ color: themeColors.brand.accent }}
            >
              Portal
            </p>
          </div>
        </Link>
      </div>

      {/* User Info */}
      {isAuthenticated && user && (
        <div
          className='p-4'
          style={{ borderBottom: `1px solid ${themeColors.border.light}` }}
        >
          <div className='flex items-center gap-3'>
            <div
              className='w-10 h-10 rounded-full flex items-center justify-center'
              style={{
                background: `linear-gradient(to bottom right, ${themeColors.brand.accentBg20}, ${themeColors.brand.primaryBg20})`,
              }}
            >
              <span
                className='font-semibold'
                style={{ color: themeColors.text.primary }}
              >
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className='flex-1 min-w-0'>
              <p
                className='text-sm font-medium truncate'
                style={{ color: themeColors.text.primary }}
              >
                {user.username}
              </p>
              {roleBadge && (
                <span
                  className='inline-block px-2 py-0.5 text-xs font-medium rounded-md'
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
        </div>
      )}

      {/* Navigation */}
      <nav className='flex-1 p-4 space-y-2 overflow-y-auto'>
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className='flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200'
              style={{
                background: isActive
                  ? `linear-gradient(to right, ${themeColors.brand.accentBg50}, ${themeColors.decorative.lavenderBg})`
                  : 'transparent',
                color: isActive
                  ? themeColors.brand.accent
                  : themeColors.text.secondary,
                border: isActive
                  ? `1px solid ${themeColors.brand.accentBg20}`
                  : '1px solid transparent',
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
              <span className='font-medium'>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout section */}
      <div
        className='p-4'
        style={{ borderTop: `1px solid ${themeColors.border.light}` }}
      >
        <button
          onClick={logout}
          className='flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full'
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
            className='w-5 h-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
            />
          </svg>
          <span className='font-medium'>Logout</span>
        </button>
      </div>
    </aside>
  );
}
