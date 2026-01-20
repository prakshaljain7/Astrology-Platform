'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { colors, cssVars, zodiacSymbols } from '@/lib/theme';

function SunLogo({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 100 100'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <linearGradient
          id='sunGradientLogin'
          x1='0%'
          y1='0%'
          x2='100%'
          y2='100%'
        >
          <stop offset='0%' stopColor={colors.brand.accent} />
          <stop offset='100%' stopColor={colors.brand.accentLight} />
        </linearGradient>
        <filter id='glow'>
          <feGaussianBlur stdDeviation='3' result='coloredBlur' />
          <feMerge>
            <feMergeNode in='coloredBlur' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>
      <circle
        cx='50'
        cy='50'
        r='18'
        fill='url(#sunGradientLogin)'
        filter='url(#glow)'
      />
      {[...Array(8)].map((_, i) => (
        <line
          key={i}
          x1='50'
          y1='20'
          x2='50'
          y2='28'
          stroke='url(#sunGradientLogin)'
          strokeWidth='3'
          strokeLinecap='round'
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
    </svg>
  );
}

function ZodiacWheel() {
  const zodiacSigns = Object.values(zodiacSymbols);

  return (
    <div className='absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03]'>
      <div className='relative w-[800px] h-[800px] rotate-slow'>
        {zodiacSigns.map((symbol, i) => (
          <div
            key={i}
            className='absolute text-8xl'
            style={{
              left: '50%',
              top: '50%',
              color: colors.brand.accent,
              transform: `rotate(${i * 30}deg) translateY(-350px) rotate(-${
                i * 30
              }deg)`,
            }}
          >
            {symbol}
          </div>
        ))}
        {/* Inner ring */}
        <div 
          className='absolute inset-[100px] rounded-full'
          style={{ border: `1px solid ${colors.brand.accentBg30}` }}
        />
        {/* Outer ring */}
        <div 
          className='absolute inset-0 rounded-full'
          style={{ border: `1px solid ${colors.brand.accentBg20}` }}
        />
      </div>
    </div>
  );
}

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen aurora-bg relative flex items-center justify-center p-4'>
      <ZodiacWheel />

      {/* Floating orbs */}
      <div 
        className='absolute top-20 left-20 w-32 h-32 rounded-full blur-2xl float-animation'
        style={{ background: `linear-gradient(to bottom right, ${colors.decorative.roseBg}, transparent)` }}
      />
      <div
        className='absolute bottom-32 right-20 w-48 h-48 rounded-full blur-3xl float-animation'
        style={{ 
          background: `linear-gradient(to bottom right, ${colors.decorative.lavenderBg}, transparent)`,
          animationDelay: '-2s' 
        }}
      />
      <div
        className='absolute top-1/3 right-1/4 w-24 h-24 rounded-full blur-2xl float-animation'
        style={{ 
          background: `linear-gradient(to bottom right, ${colors.decorative.skyBg}, transparent)`,
          animationDelay: '-4s' 
        }}
      />

      {/* Login Card */}
      <div className='relative z-10 w-full max-w-md animate-fadeIn'>
        <div className='glass-card rounded-3xl p-8 md:p-10'>
          {/* Logo and Title */}
          <div className='text-center mb-8'>
            <div className='flex justify-center mb-4'>
              <div className='relative'>
                <SunLogo className='w-20 h-20' />
                <div 
                  className='absolute inset-0 rounded-full blur-xl pulse-soft'
                  style={{ backgroundColor: colors.brand.accentBg20 }}
                />
              </div>
            </div>
            <h1
              className='text-3xl font-bold mb-2'
              style={{ color: colors.text.primary, fontFamily: cssVars.fontPlayfair }}
            >
              Astrologers Portal
            </h1>
            <p style={{ color: colors.text.secondary }}>Enter your credentials to continue</p>
          </div>

          {/* Error Message */}
          {error && (
            <div 
              className='mb-6 p-4 rounded-xl text-sm animate-fadeIn'
              style={{ 
                backgroundColor: colors.status.errorBg,
                border: `1px solid ${colors.status.errorBorder}`,
                color: colors.status.errorText
              }}
            >
              <div className='flex items-center gap-2'>
                <svg
                  className='w-5 h-5 flex-shrink-0'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                {error}
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium mb-2'
                style={{ color: colors.text.primary }}
              >
                Username
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <svg
                    className='w-5 h-5'
                    style={{ color: colors.text.muted }}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    />
                  </svg>
                </div>
                <input
                  id='username'
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Enter your username'
                  className='w-full pl-12 pr-4 py-3.5 rounded-xl border bg-white/90 transition-all duration-200'
                  style={{
                    borderColor: colors.border.medium,
                    color: colors.text.primary,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.brand.accent;
                    e.target.style.boxShadow = `0 0 0 2px ${colors.brand.accentBg20}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.border.medium;
                    e.target.style.boxShadow = 'none';
                  }}
                  disabled={isSubmitting || isLoading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium mb-2'
                style={{ color: colors.text.primary }}
              >
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <svg
                    className='w-5 h-5'
                    style={{ color: colors.text.muted }}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                    />
                  </svg>
                </div>
                <input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your password'
                  className='w-full pl-12 pr-4 py-3.5 rounded-xl border bg-white/90 transition-all duration-200'
                  style={{
                    borderColor: colors.border.medium,
                    color: colors.text.primary,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.brand.accent;
                    e.target.style.boxShadow = `0 0 0 2px ${colors.brand.accentBg20}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.border.medium;
                    e.target.style.boxShadow = 'none';
                  }}
                  disabled={isSubmitting || isLoading}
                />
              </div>
            </div>

            <button
              type='submit'
              disabled={isSubmitting || isLoading}
              className='w-full py-4 px-6 font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
              style={{
                background: `linear-gradient(to right, ${colors.brand.accent}, ${colors.brand.accentDark})`,
                color: colors.text.white,
                boxShadow: `0 10px 30px ${colors.brand.accentBg30}`,
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting && !isLoading) {
                  e.currentTarget.style.background = `linear-gradient(to right, ${colors.brand.accentDark}, ${colors.brand.accentDarker})`;
                  e.currentTarget.style.boxShadow = `0 15px 40px ${colors.brand.accentBg50}`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(to right, ${colors.brand.accent}, ${colors.brand.accentDark})`;
                e.currentTarget.style.boxShadow = `0 10px 30px ${colors.brand.accentBg30}`;
              }}
            >
              {isSubmitting || isLoading ? (
                <>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  Signing in...
                </>
              ) : (
                <>
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                    />
                  </svg>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div 
            className='mt-8 pt-6 text-center'
            style={{ borderTop: `1px solid ${colors.border.light}` }}
          >
            <p className='text-sm' style={{ color: colors.text.secondary }}>
              <span className='inline-flex items-center gap-1'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  />
                </svg>
                Secure login powered by JWT
              </span>
            </p>
          </div>
        </div>

        {/* Role Info */}
        <div className='mt-6 glass-card rounded-2xl p-5'>
          <h3 
            className='text-sm font-semibold mb-3 flex items-center gap-2'
            style={{ color: colors.text.primary }}
          >
            <svg
              className='w-4 h-4'
              style={{ color: colors.brand.accent }}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            Access Levels
          </h3>
          <div className='space-y-2 text-xs' style={{ color: colors.text.secondary }}>
            <div className='flex items-center gap-2'>
              <span 
                className='w-2 h-2 rounded-full'
                style={{ backgroundColor: colors.brand.primary }}
              />
              <span>
                <strong>Super Admin:</strong> Manage organizations
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span 
                className='w-2 h-2 rounded-full'
                style={{ backgroundColor: colors.brand.accent }}
              />
              <span>
                <strong>Admin:</strong> Manage users in organization
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span 
                className='w-2 h-2 rounded-full'
                style={{ backgroundColor: colors.status.success }}
              />
              <span>
                <strong>User:</strong> Access kundali calculator
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
