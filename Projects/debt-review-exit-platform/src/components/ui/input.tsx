import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  showPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      error,
      hint,
      leftAddon,
      rightAddon,
      showPasswordToggle = false,
      id,
      type = "text",
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2)}`;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftAddon}
          <input
            ref={ref}
            id={inputId}
            type={showPasswordToggle ? (type === "password" ? "text" : "password") : type}
            className={`w-full bg-surface border ${error ? "border-error-500 focus:border-error-500" : "border-divider focus:border-royal"} ${leftAddon || rightAddon ? "px-4" : "px-4 py-2.5"} rounded-lg border-input transition-all placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal ${error ? "focus:ring-error/20" : "focus:ring-royal/20"} ${className}`}
            {...props}
          />
          {rightAddon}
          {showPasswordToggle && type === "password" && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text transition-colors"
              aria-label={type === "password" ? "Show password" : "Hide password"}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          )}
        </div>
        {(error || hint) && (
          <p className={`mt-1.5 text-xs ${error ? "text-error" : "text-text-secondary"}`}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, hint, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).slice(2)}`;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full bg-surface border ${error ? "border-error-500 focus:border-error-500" : "border-divider focus:border-royal"} ${className} rounded-lg border-input transition-all placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal resize-y min-h-[120px]`}
          {...props}
        />
        {hint && !error && <p className="mt-1.5 text-xs text-text-secondary">{hint}</p>}
        {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
