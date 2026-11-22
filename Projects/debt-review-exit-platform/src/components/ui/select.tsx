import { forwardRef, type SelectHTMLAttributes, type ReactNode } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className = "",
      label,
      error,
      hint,
      options,
      placeholder,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).slice(2)}`;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full bg-surface border border-divider rounded-lg px-4 py-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal appearance-none cursor-pointer ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {(error || hint) && (
          <p className={`mt-1.5 text-xs ${error ? "text-error" : "text-text-secondary"}`}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  hint?: string;
  className?: string;
}

export const Checkbox = ({
  label,
  checked,
  onChange,
  disabled,
  hint,
  className,
}: CheckboxProps) => {
  return (
    <label className={`flex items-start gap-2.5 cursor-pointer group ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div className="w-4 h-4 border border-divider rounded flex items-center justify-center transition-all peer-hover:border-royal peer-checked:bg-teal peer-checked:border-teal peer-disabled:opacity-40">
          {checked && (
            <svg
              className="w-3.5 h-3.5 text-white"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 10l4 4 8-8" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-sm text-text">{label}</span>
      {hint && <span className="text-xs text-text-secondary block">{hint}</span>}
    </label>
  );
};

export interface RadioGroupProps {
  label?: string;
  options: { value: string; label: string; hint?: string }[];
  value: string;
  onChange: (value: string) => void;
  direction?: "row" | "col";
  hint?: string;
}

export const RadioGroup = ({
  label,
  options,
  value,
  onChange,
  direction = "col",
  hint,
}: RadioGroupProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}
      <div className={`flex ${direction === "row" ? "flex-row" : "flex-col"} gap-3`}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-divider px-4 py-3 transition-all hover:border-royal/40 ${
              value === opt.value ? "border-royal/40 bg-royal-50" : ""
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name={`radio-${Math.random().toString(36).slice(2)}`}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                  value === opt.value
                    ? "border-royal bg-royal/10"
                    : "border-divider"
                }`}
              >
                {value === opt.value && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 10l4 4 8-8" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-text">{opt.label}</span>
              {opt.hint && <span className="text-xs text-text-secondary">{opt.hint}</span>}
            </div>
            <span className="text-xs font-mono text-text-secondary">{opt.value}</span>
          </label>
        ))}
      </div>
      {hint && <p className="mt-1.5 text-xs text-text-secondary">{hint}</p>}
    </div>
  );
};
