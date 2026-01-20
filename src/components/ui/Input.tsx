"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { colors } from "@/lib/theme";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label 
            className="block text-sm font-semibold"
            style={{ color: colors.text.primary }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 bg-white/85 border rounded-xl 
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-red-400" : ""}
            ${className}
          `}
          style={{
            borderColor: error ? colors.status.error : colors.border.soft,
            color: colors.text.primary,
          }}
          onFocus={(e) => {
            e.target.style.borderColor = colors.brand.accent;
            e.target.style.boxShadow = `0 0 0 2px ${colors.brand.accentBg}`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? colors.status.error : colors.border.soft;
            e.target.style.boxShadow = 'none';
          }}
          {...props}
        />
        {error && (
          <p style={{ color: colors.status.error }} className="text-xs mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
