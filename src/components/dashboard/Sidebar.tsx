"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
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

export function Sidebar() {
  const pathname = usePathname();

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

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
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

      {/* User section */}
      <div className="p-4 border-t border-[rgba(0,0,0,0.06)]">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#6b7280] hover:text-red-500 hover:bg-red-50 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
