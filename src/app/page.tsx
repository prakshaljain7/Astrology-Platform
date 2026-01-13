"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Zodiac wheel decoration
function ZodiacWheel({ className }: { className?: string }) {
  const zodiacSymbols = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
  
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full rotate-slow">
        <defs>
          <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="95" fill="none" stroke="url(#wheelGradient)" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="url(#wheelGradient)" strokeWidth="0.5" />
        {zodiacSymbols.map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="5"
            x2="100"
            y2="20"
            stroke="url(#wheelGradient)"
            strokeWidth="0.5"
            transform={`rotate(${i * 30} 100 100)`}
          />
        ))}
      </svg>
      {zodiacSymbols.map((symbol, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = 100 + 65 * Math.cos(angle);
        const y = 100 + 65 * Math.sin(angle);
        return (
          <span
            key={i}
            className="absolute text-[10px] text-[#d4af37]/60"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {symbol}
          </span>
        );
      })}
    </div>
  );
}

// Sun icon for branding
function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#f7e7b4" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="20" fill="url(#sunGradient)" />
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="15"
          x2="50"
          y2="25"
          stroke="url(#sunGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setShowForgotPassword(false);
      setForgotEmail("");
    }, 3000);
  };

  return (
    <main className="relative min-h-screen aurora-bg overflow-hidden">
      {/* Zodiac wheel decoration - left side */}
      <div className="hidden lg:block absolute left-[-100px] top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-40">
        <ZodiacWheel className="w-full h-full" />
      </div>

      {/* Zodiac wheel decoration - right side */}
      <div className="hidden lg:block absolute right-[-150px] bottom-[-100px] w-[350px] h-[350px] opacity-30">
        <ZodiacWheel className="w-full h-full" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left panel - branding (hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12">
          <div className="max-w-md text-center">
            <SunIcon className="w-24 h-24 mx-auto mb-8 float-animation" />
            <h1 
              className="text-5xl font-semibold mb-4 tracking-tight shimmer-gold"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Astrologers
              <span className="block">Portal</span>
            </h1>
            <p className="text-[#4a4860] text-lg leading-relaxed">
              Your professional platform for celestial guidance and astrological consultations.
            </p>
            
            {/* Feature highlights */}
            <div className="mt-12 grid grid-cols-3 gap-6 text-center">
              {[
                { icon: "☉", label: "Birth Charts" },
                { icon: "☽", label: "Moon Phases" },
                { icon: "✧", label: "Predictions" },
              ].map((item) => (
                <div key={item.label} className="group">
                  <div className="text-2xl mb-2 text-[#d4af37] group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-xs text-[#6b7280] uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel - login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-[420px]">
            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-10">
              <SunIcon className="w-16 h-16 mx-auto mb-4" />
              <h1 
                className="text-3xl font-semibold shimmer-gold"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Astrologers Portal
              </h1>
            </div>

            {/* Card */}
            <div className="glass-card rounded-3xl p-8 lg:p-10">
              {!showForgotPassword ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#2b2e38] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                      Welcome back
                    </h2>
                    <p className="text-[#6b7280] text-sm">
                      Enter your credentials to access your portal
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[#3b3f4a] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3.5 bg-white/80 border border-[rgba(0,0,0,0.08)] rounded-xl text-[#2b2e38] placeholder-[#9ca3af] focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/25 transition-all duration-300"
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#3b3f4a] mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3.5 pr-12 bg-white/80 border border-[rgba(0,0,0,0.08)] rounded-xl text-[#2b2e38] placeholder-[#9ca3af] focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/25 transition-all duration-300"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#d4af37] transition-colors"
                        >
                          {showPassword ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-[rgba(0,0,0,0.15)] bg-white text-[#d4af37] focus:ring-[#d4af37]/30" />
                        <span className="text-sm text-[#6b7280]">Remember me</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm text-[#7c3aed] hover:text-[#d4af37] transition-colors font-medium"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 mt-2 bg-gradient-to-r from-[#d4af37] to-[#f7e7b4] hover:from-[#7c3aed] hover:to-[#a78bfa] text-[#3a2d0b] hover:text-white font-semibold rounded-xl shadow-lg shadow-[#d4af37]/30 hover:shadow-[#7c3aed]/30 transform hover:translate-y-[-2px] transition-all duration-300"
                    >
                      Sign In
                    </button>
                  </form>

                  <div className="mt-8 pt-6 border-t border-[rgba(0,0,0,0.06)] text-center">
                    <p className="text-[#6b7280] text-sm">
                      Don&apos;t have an account?{" "}
                      <button className="text-[#7c3aed] hover:text-[#d4af37] font-medium transition-colors">
                        Contact Admin
                      </button>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetSent(false);
                      setForgotEmail("");
                    }}
                    className="flex items-center gap-2 text-[#6b7280] hover:text-[#2b2e38] transition-colors mb-6"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>

                  <div className="mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#f7e7b4] to-[#e6ddff] rounded-2xl flex items-center justify-center mb-4 shadow-md">
                      <svg className="w-7 h-7 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-[#2b2e38] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                      Reset Password
                    </h2>
                    <p className="text-[#6b7280] text-sm">
                      Enter your email to receive reset instructions
                    </p>
                  </div>

                  {resetSent ? (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-emerald-600 font-medium mb-2">Email Sent!</p>
                      <p className="text-[#6b7280] text-sm">
                        Check your inbox for reset instructions
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleForgotPassword} className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-[#3b3f4a] mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          className="w-full px-4 py-3.5 bg-white/80 border border-[rgba(0,0,0,0.08)] rounded-xl text-[#2b2e38] placeholder-[#9ca3af] focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/25 transition-all duration-300"
                          placeholder="you@example.com"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] hover:from-[#d4af37] hover:to-[#f7e7b4] text-white hover:text-[#3a2d0b] font-semibold rounded-xl shadow-lg shadow-[#7c3aed]/30 hover:shadow-[#d4af37]/30 transform hover:translate-y-[-2px] transition-all duration-300"
                      >
                        Send Reset Link
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <p className="text-center text-[#9ca3af] text-xs mt-8">
              © 2026 Astrologers Portal. All rights reserved.
            </p>
          </div>
        </div>
        </div>
      </main>
  );
}
