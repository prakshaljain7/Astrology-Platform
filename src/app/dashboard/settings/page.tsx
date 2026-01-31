'use client';

import { useTheme } from '@/context/ThemeContext';
import { ThemeId } from '@/lib/theme';
import { cssVars } from '@/lib/theme';

export default function SettingsPage() {
  const { currentTheme, setTheme, allThemes, themeColors } = useTheme();

  const themeList = Object.values(allThemes);

  return (
    <div className='p-8 max-w-4xl mx-auto'>
      {/* Header */}
      <div className='mb-8'>
        <h1
          className='text-3xl font-bold mb-2'
          style={{
            color: themeColors.text.primary,
            fontFamily: cssVars.fontPlayfair,
          }}
        >
          Settings
        </h1>
        <p style={{ color: themeColors.text.secondary }}>
          Customize your dashboard appearance
        </p>
      </div>

      {/* Theme Selection */}
      <div
        className='rounded-2xl p-6 backdrop-blur-sm'
        style={{
          backgroundColor: themeColors.background.card,
          border: `1px solid ${themeColors.border.soft}`,
          boxShadow: `0 25px 50px ${themeColors.shadow.soft}`,
        }}
      >
        <div className='flex items-center gap-3 mb-6'>
          <div
            className='w-10 h-10 rounded-xl flex items-center justify-center'
            style={{
              background: `linear-gradient(135deg, ${themeColors.brand.accent}, ${themeColors.brand.accentLight})`,
            }}
          >
            <svg
              className='w-5 h-5'
              style={{ color: themeColors.text.white }}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
              />
            </svg>
          </div>
          <div>
            <h2
              className='text-xl font-semibold'
              style={{ color: themeColors.text.primary }}
            >
              Theme Selection
            </h2>
            <p
              className='text-sm'
              style={{ color: themeColors.text.secondary }}
            >
              Choose a cosmic theme for your dashboard
            </p>
          </div>
        </div>

        {/* Theme Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {themeList.map((theme) => {
            const isSelected = currentTheme === theme.id;
            const previewColors = theme.colors;

            return (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id as ThemeId)}
                className='relative p-4 rounded-xl text-left transition-all duration-300 group'
                style={{
                  backgroundColor: isSelected
                    ? previewColors.brand.accentBg20
                    : themeColors.background.white,
                  border: `2px solid ${isSelected ? previewColors.brand.accent : themeColors.border.gray}`,
                  boxShadow: isSelected
                    ? `0 8px 25px ${previewColors.brand.accentBg30}`
                    : 'none',
                }}
              >
                {/* Selected indicator */}
                {isSelected && (
                  <div
                    className='absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center'
                    style={{ backgroundColor: previewColors.brand.accent }}
                  >
                    <svg
                      className='w-4 h-4 text-white'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={3}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  </div>
                )}

                {/* Aurora Preview Background */}
                <div
                  className='absolute inset-0 rounded-xl opacity-40 pointer-events-none'
                  style={{
                    background: `
                      radial-gradient(300px 150px at 10% 10%, ${previewColors.aurora.color1}, transparent 60%),
                      radial-gradient(250px 140px at 90% 30%, ${previewColors.aurora.color2}, transparent 60%),
                      radial-gradient(200px 120px at 50% 80%, ${previewColors.aurora.color3}, transparent 60%),
                      linear-gradient(135deg, ${previewColors.background.primary}, ${previewColors.aurora.gradientEnd})
                    `,
                  }}
                />

                {/* Theme Preview */}
                <div className='relative flex items-start gap-4'>
                  {/* Color swatches */}
                  <div className='flex flex-col gap-2'>
                    <div
                      className='w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg'
                      style={{
                        background: `linear-gradient(135deg, ${previewColors.brand.accent}, ${previewColors.brand.accentLight})`,
                        boxShadow: `0 4px 15px ${previewColors.brand.accentBg50}`,
                      }}
                    >
                      {theme.icon}
                    </div>
                    <div className='flex gap-1 justify-center'>
                      <div
                        className='w-4 h-4 rounded-full shadow-sm'
                        style={{ backgroundColor: previewColors.brand.primary }}
                        title='Primary'
                      />
                      <div
                        className='w-4 h-4 rounded-full shadow-sm'
                        style={{ backgroundColor: previewColors.brand.accent }}
                        title='Accent'
                      />
                      <div
                        className='w-4 h-4 rounded-full shadow-sm'
                        style={{
                          backgroundColor: previewColors.brand.accentLight,
                        }}
                        title='Accent Light'
                      />
                    </div>
                  </div>

                  {/* Theme info */}
                  <div className='flex-1'>
                    <h3
                      className='font-semibold text-lg mb-1'
                      style={{ color: previewColors.text.primary }}
                    >
                      {theme.name}
                    </h3>
                    <p
                      className='text-sm leading-relaxed'
                      style={{ color: previewColors.text.secondary }}
                    >
                      {theme.description}
                    </p>
                  </div>
                </div>

                {/* Mini preview bar showing aurora gradient */}
                <div
                  className='relative mt-4 h-3 rounded-full overflow-hidden'
                  style={{
                    backgroundColor: previewColors.background.secondary,
                  }}
                >
                  <div
                    className='absolute inset-0'
                    style={{
                      background: `linear-gradient(90deg, 
                        ${previewColors.brand.primary}, 
                        ${previewColors.brand.accent}, 
                        ${previewColors.brand.accentLight},
                        ${previewColors.aurora.color1.replace('rgba', 'rgb').replace(/,\s*[\d.]+\)/, ')')},
                        ${previewColors.aurora.color2.replace('rgba', 'rgb').replace(/,\s*[\d.]+\)/, ')')}
                      )`,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Current theme info */}
        <div
          className='mt-6 p-4 rounded-xl flex items-center gap-3'
          style={{ backgroundColor: themeColors.brand.accentBg }}
        >
          <svg
            className='w-5 h-5'
            style={{ color: themeColors.brand.accent }}
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
          <p className='text-sm' style={{ color: themeColors.text.primary }}>
            Your theme preference is automatically saved and will persist across
            sessions.
          </p>
        </div>
      </div>

      {/* Additional Settings Placeholder */}
      <div
        className='mt-6 rounded-2xl p-6 backdrop-blur-sm'
        style={{
          backgroundColor: themeColors.background.card,
          border: `1px solid ${themeColors.border.soft}`,
          boxShadow: `0 25px 50px ${themeColors.shadow.soft}`,
        }}
      >
        <div className='flex items-center gap-3 mb-4'>
          <div
            className='w-10 h-10 rounded-xl flex items-center justify-center'
            style={{ backgroundColor: themeColors.brand.primaryBg }}
          >
            <svg
              className='w-5 h-5'
              style={{ color: themeColors.brand.primary }}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          </div>
          <div>
            <h2
              className='text-xl font-semibold'
              style={{ color: themeColors.text.primary }}
            >
              More Settings
            </h2>
            <p
              className='text-sm'
              style={{ color: themeColors.text.secondary }}
            >
              Additional customization options coming soon
            </p>
          </div>
        </div>

        <div
          className='text-center py-8'
          style={{ color: themeColors.text.muted }}
        >
          <svg
            className='w-12 h-12 mx-auto mb-3 opacity-50'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
          <p className='text-sm'>
            More customization options will be available here
          </p>
        </div>
      </div>
    </div>
  );
}
