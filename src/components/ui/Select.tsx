"use client";

import { SelectHTMLAttributes, forwardRef } from "react";

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
          <label className="block text-sm font-semibold text-[#3b3f4a]">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`
            w-full px-4 py-3 bg-white/85 border border-[rgba(0,0,0,0.08)] rounded-xl 
            text-[#2b2e38]
            focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/25 
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            appearance-none cursor-pointer
            bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="%236b7280"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>')]
            bg-[length:20px_20px] bg-[right_12px_center] bg-no-repeat
            ${error ? "border-red-400" : ""}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="bg-white text-[#2b2e38]"
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
