'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';

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
          <stop offset='0%' stopColor='#d4af37' />
          <stop offset='100%' stopColor='#f7e7b4' />
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
  const zodiacSymbols = [
    '♈',
    '♉',
    '♊',
    '♋',
    '♌',
    '♍',
    '♎',
    '♏',
    '♐',
    '♑',
    '♒',
    '♓',
  ];

  return (
    <div className='absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03]'>
      <div className='relative w-[800px] h-[800px] rotate-slow'>
        {zodiacSymbols.map((symbol, i) => (
          <div
            key={i}
            className='absolute text-8xl text-[#d4af37]'
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 30}deg) translateY(-350px) rotate(-${
                i * 30
              }deg)`,
            }}
          >
            {symbol}
          </div>
        ))}
        {/* Inner ring */}
        <div className='absolute inset-[100px] border border-[#d4af37]/30 rounded-full' />
        {/* Outer ring */}
        <div className='absolute inset-0 border border-[#d4af37]/20 rounded-full' />
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
      <div className='absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-[#f6c1cc]/40 to-transparent rounded-full blur-2xl float-animation' />
      <div
        className='absolute bottom-32 right-20 w-48 h-48 bg-gradient-to-br from-[#e6ddff]/40 to-transparent rounded-full blur-3xl float-animation'
        style={{ animationDelay: '-2s' }}
      />
      <div
        className='absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-[#c9e6ff]/40 to-transparent rounded-full blur-2xl float-animation'
        style={{ animationDelay: '-4s' }}
      />

      {/* Login Card */}
      <div className='relative z-10 w-full max-w-md animate-fadeIn'>
        <div className='glass-card rounded-3xl p-8 md:p-10'>
          {/* Logo and Title */}
          <div className='text-center mb-8'>
            <div className='flex justify-center mb-4'>
              <div className='relative'>
                <SunLogo className='w-20 h-20' />
                <div className='absolute inset-0 bg-[#d4af37]/20 rounded-full blur-xl pulse-soft' />
              </div>
            </div>
            <h1
              className='text-3xl font-bold text-[#2b2e38] mb-2'
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Astrologers Portal
            </h1>
            <p className='text-[#6b7280]'>Enter your credentials to continue</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm animate-fadeIn'>
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
                className='block text-sm font-medium text-[#2b2e38] mb-2'
              >
                Username
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <svg
                    className='w-5 h-5 text-[#9ca3af]'
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
                  className='w-full pl-12 pr-4 py-3.5 rounded-xl border border-[rgba(0,0,0,0.1)] bg-white/90 text-[#2b2e38] placeholder-[#9ca3af] focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all duration-200'
                  disabled={isSubmitting || isLoading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-[#2b2e38] mb-2'
              >
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <svg
                    className='w-5 h-5 text-[#9ca3af]'
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
                  className='w-full pl-12 pr-4 py-3.5 rounded-xl border border-[rgba(0,0,0,0.1)] bg-white/90 text-[#2b2e38] placeholder-[#9ca3af] focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all duration-200'
                  disabled={isSubmitting || isLoading}
                />
              </div>
            </div>

            <button
              type='submit'
              disabled={isSubmitting || isLoading}
              className='w-full py-4 px-6 bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-white font-semibold rounded-xl shadow-lg shadow-[#d4af37]/30 hover:shadow-xl hover:shadow-[#d4af37]/40 hover:from-[#b8962e] hover:to-[#a17f27] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
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
          <div className='mt-8 pt-6 border-t border-[rgba(0,0,0,0.06)] text-center'>
            <p className='text-sm text-[#6b7280]'>
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
          <h3 className='text-sm font-semibold text-[#2b2e38] mb-3 flex items-center gap-2'>
            <svg
              className='w-4 h-4 text-[#d4af37]'
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
          <div className='space-y-2 text-xs text-[#6b7280]'>
            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-[#7c3aed]' />
              <span>
                <strong>Super Admin:</strong> Manage organizations
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-[#d4af37]' />
              <span>
                <strong>Admin:</strong> Manage users in organization
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-[#10b981]' />
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
