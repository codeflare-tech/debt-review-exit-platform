"use client";

import { type ReactNode, createContext, useCallback, useContext, useState } from "react";

/* ============================================================
   TABLE COMPONENTS
   ============================================================ */
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  className?: string;
  children: ReactNode;
}

export const Table = ({ className = "", children, ...props }: TableProps) => (
  <div className="overflow-x-auto">
    <table className={`w-full border-collapse text-sm ${className}`} {...props}>
      {children}
    </table>
  </div>
);

export const TableHead = ({ children }: { children: ReactNode }) => (
  <thead className="bg-primary-50/50 sticky top-0">
    <tr className="border-b border-divider">{children}</tr>
  </thead>
);

export const TableRow = ({
  children,
  className = "",
  ...props
}: React.TableHTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={`border-b border-divider/60 transition-colors hover:bg-primary-50/30 ${className}`}
    {...props}
  >
    {children}
  </tr>
);

export const TableHeader = ({ children }: { children: ReactNode }) => (
  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
    {children}
  </th>
);

export const TableCell = ({
  children,
  className = "",
  ...props
}: React.TableHTMLAttributes<HTMLTableCellElement>) => (
  <td className={`px-4 py-3 text-sm text-text ${className}`} {...props}>
    {children}
  </td>
);

/* ============================================================
   MODAL  (controlled, no context — parent owns the open state)
   ============================================================ */
export interface ModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "primary" | "secondary";
  confirmLabel?: string;
  cancelLabel?: string;
  footerChildren?: ReactNode;
  disableCancel?: boolean;
}

export const Modal = ({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  variant = "primary",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  footerChildren,
  disableCancel = false,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1200] bg-black/50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onCancel}
      role="button"
      aria-label="Close confirmation dialog"
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <div className="flex flex-col gap-5 p-6">
          <div className="flex flex-col gap-1">
            <h3 id="modal-title" className="text-lg font-semibold text-text">
              {title}
            </h3>
            <p id="modal-desc" className="text-sm text-text-secondary leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={disableCancel}
              className="px-4 py-2.5 text-sm font-semibold text-text-secondary bg-surface border border-divider rounded-lg hover:bg-primary-50 hover:text-text transition-all disabled:opacity-40"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                variant === "danger"
                  ? "bg-error text-white hover:opacity-90 shadow-sm hover:shadow-md"
                  : variant === "primary"
                  ? "bg-royal text-white hover:bg-royal-600 shadow-md hover:shadow-lg"
                  : "bg-white text-text border border-divider hover:border-royal hover:text-text hover:shadow-sm"
              }`}
            >
              {confirmLabel}
            </button>
          </div>
          {footerChildren && (
            <div className="flex justify-end gap-3 pt-2">{footerChildren}</div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   TOAST (exposed invisibly to the widget)
   ============================================================ */
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
              {toast.description && (
                <p className="text-xs mt-0.5 opacity-80">{toast.description}</p>
              )}
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
