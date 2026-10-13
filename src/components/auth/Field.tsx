import React from "react";

interface FieldProps {
  label: string;
  icon: React.ReactNode;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  rightSlot?: React.ReactNode;
}

export function Field({
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  rightSlot,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-white/80 text-xs font-bold tracking-widest uppercase">
        {label}
      </label>
      <div
        className={`h-12 flex items-center gap-3 bg-[rgba(255,255,255,0.05)] border rounded-xl px-3.5 focus-within:border-primary transition-colors ${
          error ? "border-red-500/70" : "border-white/15"
        }`}
      >
        <span className="text-white/40 flex-shrink-0 w-5 h-5 flex items-center justify-center">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 min-w-0 h-full bg-transparent text-white placeholder-white/30 text-sm outline-none font-body leading-none"
        />
        {rightSlot && (
          <div className="flex items-center justify-center flex-shrink-0">
            {rightSlot}
          </div>
        )}
      </div>
      {error && <p className="text-red-400 text-xs font-semibold">{error}</p>}
    </div>
  );
}
