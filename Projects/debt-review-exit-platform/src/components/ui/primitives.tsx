"use client";

import { type ReactNode, createContext, useContext, useState, useCallback } from "react";

export interface BadgeProps {
  variant?: "default" | "primary" | "teal" | "royal" | "error" | "warning" | "success" | "ghost";
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
}

export const Badge = ({ variant = "default", size = "md", className = "", children }: BadgeProps) => {
  const variants = {
    default: "bg-primary-50 text-primary-700 border border-primary-100/60",
    primary: "bg-primary-100 text-primary-800",
    teal: "bg-teal-100 text-teal-800",
    royal: "bg-royal-100 text-royal-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    success: "bg-green-100 text-green-800",
    ghost: "bg-transparent text-text-secondary",
  };
  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export interface AlertProps {
  variant?: "info" | "warning" | "error" | "success";
  title?: string;
  children: ReactNode;
  dismissable?: boolean;
}

export const Alert = ({ variant = "info", title, children, dismissable }: AlertProps) => {
  const variants = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    error: "bg-red-50 border-red-200 text-red-800",
    success: "bg-green-50 border-green-200 text-green-800",
  };
  return (
    <div
      className={`border-l-4 rounded-r-lg p-4 ${variants[variant]} border`}
      role="alert"
    >
      {title && <p className="font-semibold mb-1">{title}</p>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
};

export interface CardProps {
  className?: string;
  children: ReactNode;
}

export const Card = ({ className = "", children }: CardProps) => (
  <div className={`bg-surface rounded-xl border border-divider shadow-sm ${className}`}>
    {children}
  </div>
);

export interface CardHeader extends CardProps {}
export const CardHeader = ({ children, className = "" }: CardProps) => (
  <div className={`flex flex-col gap-3 p-5 border-b border-divider ${className}`}>{children}</div>
);
export const CardTitle = ({ children }: { children: ReactNode }) => (
  <h3 className="text-lg font-semibold text-text tracking-tight">{children}</h3>
);
export const CardDescription = ({ children }: { children: ReactNode }) => (
  <p className="text-sm text-text-secondary">{children}</p>
);

export const CardContent = ({ children, className = "" }: CardProps) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

export const CardActions = ({ children, className = "" }: CardProps) => (
  <div className={`flex items-center gap-3 pt-3 border-t border-divider ${className}`}>
    {children}
  </div>
);

/* Toast context */
type ToastType = "success" | "error" | "info" | "warning";
interface Toast { id: string; type: ToastType; title: string; description?: string; }

const ToastContext = createContext<{ pushToast: (t: Omit<Toast, "id">) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const pushToast = useCallback((t: Omit<Toast, "id">) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);
  return (
    <ToastContext.Provider value={{ pushToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[1400] flex flex-col gap-2.5 w-[calc(100%-3rem)] max-w-md">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg text-sm animate-slide-up ${
              toast.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : toast.type === "error"
                ? "bg-red-50 border-red-200 text-red-800"
                : toast.type === "warning"
                ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full mt-1.5 ${
                toast.type === "success"
                  ? "bg-green-500"
                  : toast.type === "error"
                  ? "bg-red-500"
                  : toast.type === "warning"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              }`}
            />
            <div>
              <p className="font-semibold text-sm">{toast.title}</p>
              {toast.description && <p className="text-xs mt-0.5 opacity-80">{toast.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
