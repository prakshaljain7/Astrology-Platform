"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { colors } from "@/lib/theme";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      className = "",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      font-semibold rounded-xl shadow-lg transform transition-all duration-300
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
      flex items-center justify-center gap-2
    `;

    const variants = {
      primary: `
        bg-gradient-to-r from-[${colors.brand.primary}] to-[${colors.brand.primaryLight}]
        hover:from-[${colors.brand.primaryDark}] hover:to-[${colors.brand.primary}]
        text-white shadow-[${colors.brand.primary}]/20 hover:shadow-[${colors.brand.primary}]/30
        hover:translate-y-[-2px]
      `,
      secondary: `
        bg-white border border-[${colors.border.soft}]
        text-[${colors.text.primary}] hover:border-[${colors.brand.accent}]
        hover:translate-y-[-2px] shadow-sm
      `,
      gold: `
        bg-gradient-to-r from-[${colors.brand.accent}] to-[${colors.brand.accentLight}]
        hover:from-[${colors.brand.accentDark}] hover:to-[${colors.brand.accentDarker}]
        text-[#3a2d0b] shadow-[${colors.brand.accent}]/40 hover:shadow-[${colors.brand.accent}]/50
        hover:translate-y-[-2px]
      `,
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
