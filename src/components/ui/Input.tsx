"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-[#3b3f4a]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 bg-white/85 border border-[rgba(0,0,0,0.08)] rounded-xl 
            text-[#2b2e38] placeholder-[#9ca3af] 
            focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/25 
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-red-400" : ""}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
