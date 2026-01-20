"use client";

import { SelectHTMLAttributes, forwardRef } from "react";
import { colors } from "@/lib/theme";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = "", ...props }, ref) => {
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
        <select
          ref={ref}
          className={`
            w-full px-4 py-3 bg-white/85 border rounded-xl 
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            appearance-none cursor-pointer
            bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="%236b7280"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>')]
            bg-size-[20px_20px] bg-position-[right_12px_center] bg-no-repeat
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
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              style={{ backgroundColor: colors.background.white, color: colors.text.primary }}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p style={{ color: colors.status.error }} className="text-xs mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
