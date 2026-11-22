"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ToastProvider, useToast } from "@/components/ui";

type IconName =
  | "grid"
  | "folder"
  | "users"
  | "file"
  | "shield"
  | "box"
  | "wallet"
  | "chart"
  | "settings"
  | "menu"
  | "search"
  | "bell"
  | "logout"
  | "chevron"
  | "check"
  | "close"
  | "spark";

function Icon({ name, className = "w-5 h-5" }: { name: IconName; className?: string }) {
  const p = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "grid":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "folder":
      return (
        <svg {...p}>
          <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
        </svg>
      );
    case "users":
      return (
        <svg {...p}>
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case "file":
      return (
        <svg {...p}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6M8 13h8M8 17h6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...p}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "box":
      return (
        <svg {...p}>
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <path d="M3.3 7L12 12l8.7-5M12 22V12" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...p}>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20M16 15h2" />
        </svg>
      );
    case "chart":
      return (
        <svg {...p}>
          <path d="M3 3v18h18" />
          <path d="M7 16l4-5 3 3 5-7" />
        </svg>
      );
    case "settings":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1 1.55V21a2 2 0 11-4 0v-.09a1.7 1.7 0 00-1.11-1.55 1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.34-1.87 1.7 1.7 0 00-1.55-1H3a2 2 0 110-4h.09a1.7 1.7 0 001.55-1.11 1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06a1.7 1.7 0 001.87.34h.02a1.7 1.7 0 001-1.55V3a2 2 0 114 0v.09a1.7 1.7 0 001 1.55 1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06a1.7 1.7 0 00-.34 1.87v.02a1.7 1.7 0 001.55 1H21a2 2 0 110 4h-.09a1.7 1.7 0 00-1.51 1z" />
        </svg>
      );
    case "menu":
      return (
        <svg {...p}>
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      );
    case "search":
      return (
        <svg {...p}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4-4" />
        </svg>
      );
    case "bell":
      return (
        <svg {...p}>
          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" />
        </svg>
      );
    case "logout":
      return (
        <svg {...p}>
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...p}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case "check":
      return (
        <svg {...p}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
    case "close":
      return (
        <svg {...p}>
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      );
    case "spark":
      return (
        <svg {...p}>
          <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
        </svg>
      );
  }
}

const NAV: { label: string; href: string; icon: IconName }[] = [
  { label: "Overview", href: "/admin", icon: "grid" },
  { label: "Cases", href: "/admin/cases", icon: "folder" },
  { label: "Clients", href: "/admin/clients", icon: "users" },
  { label: "Documents", href: "/admin/documents", icon: "file" },
  { label: "Users", href: "/admin/users", icon: "shield" },
  { label: "Packages", href: "/admin/packages", icon: "box" },
  { label: "Finance", href: "/admin/finance", icon: "wallet" },
  { label: "Reports", href: "/admin/reports", icon: "chart" },
  { label: "Settings", href: "/admin/settings", icon: "settings" },
];

const NOTIFICATIONS = [
  { title: "New document uploaded", body: "ID document for case DRX-2041 is awaiting review.", time: "12 min ago" },
  { title: "Case status changed", body: "DRX-2038 moved to Document review.", time: "1 hr ago" },
  { title: "Fee disclosure accepted", body: "Client accepted the fee disclosure for DRX-2035.", time: "3 hrs ago" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <AdminShell>{children}</AdminShell>
    </ToastProvider>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { pushToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifRead, setNotifRead] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const results = search.trim()
    ? NAV.filter((n) => n.label.toLowerCase().includes(search.trim().toLowerCase()))
    : [];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogout = () => {
    pushToast({
      type: "info",
      title: "Sign-out unavailable in demo preview",
      description: "Authentication is not connected yet.",
    });
    setUserOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="mobile-nav-backdrop lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-primary text-white transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <span className="w-10 h-10 rounded-lg bg-teal flex items-center justify-center shrink-0">
            <Icon name="spark" className="w-5 h-5 text-white" />
          </span>
          <div className="min-w-0">
            <p className="font-heading font-bold text-sm leading-tight truncate">Debt Review Exit</p>
            <p className="text-[11px] text-white/50">Admin console</p>
          </div>
          <button
            type="button"
            className="ml-auto text-white/60 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Admin navigation">
          <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">
            Workspace
          </p>
          <div className="space-y-1">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-teal" />}
                  <Icon name={item.icon} className="w-[18px] h-[18px] shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="px-5 py-4 border-t border-white/10">
          <div className="rounded-lg bg-white/5 border border-white/10 p-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-warning" />
              <p className="text-xs font-semibold text-white/90">Demo preview</p>
            </div>
            <p className="text-[11px] text-white/50 mt-1 leading-relaxed">
              Data is realistic demo data. Live database and RBAC wiring are being finalised.
            </p>
          </div>
          <p className="text-[10px] text-white/30 mt-4 text-center">v0.9.0 · Preview build</p>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 bg-surface border-b border-divider">
          <div className="flex items-center gap-3 px-4 sm:px-6 py-3">
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-primary-50 hover:text-text"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Icon name="menu" className="w-5 h-5" />
            </button>

            <div className="relative flex-1 max-w-md">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
                  <Icon name="search" className="w-4 h-4" />
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search pages…"
                  aria-label="Search admin pages"
                  className="w-full bg-background border border-divider rounded-lg pl-9 pr-3 py-2 text-sm text-text placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal"
                />
              </div>
              {results.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-surface border border-divider rounded-lg shadow-lg p-1.5 z-50">
                  {results.map((r) => (
                    <Link
                      key={r.label}
                      href={r.href}
                      onClick={() => {
                        setSearch("");
                        setSidebarOpen(false);
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-text hover:bg-primary-50"
                    >
                      <Icon name={r.icon} className="w-4 h-4 text-royal" />
                      {r.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-800">
              <span className="w-1.5 h-1.5 rounded-full bg-warning" />
              Demo preview
            </span>

            <div className="relative ml-auto sm:ml-0">
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((v) => !v);
                  setUserOpen(false);
                }}
                className="relative p-2 rounded-lg text-text-secondary hover:bg-primary-50 hover:text-text"
                aria-label="Notifications"
              >
                <Icon name="bell" className="w-5 h-5" />
                {!notifRead && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error border-2 border-surface" />
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface border border-divider rounded-xl shadow-lg z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-divider">
                    <p className="text-sm font-semibold text-text">Notifications</p>
                    <button
                      type="button"
                      onClick={() => {
                        setNotifRead(true);
                        setNotifOpen(false);
                        pushToast({ type: "success", title: "Notifications marked as read" });
                      }}
                      className="text-xs font-semibold text-royal hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="divide-y divide-divider">
                    {NOTIFICATIONS.map((n) => (
                      <div key={n.title} className="px-4 py-3 flex gap-3">
                        <span className="w-8 h-8 rounded-lg bg-royal-50 text-royal flex items-center justify-center shrink-0">
                          <Icon name="bell" className="w-4 h-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-text">{n.title}</p>
                          <p className="text-xs text-text-secondary mt-0.5">{n.body}</p>
                          <p className="text-[11px] text-text-secondary/70 mt-1">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setUserOpen((v) => !v);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-primary-50"
                aria-label="Admin account menu"
              >
                <span className="w-9 h-9 rounded-full bg-royal text-white text-xs font-bold flex items-center justify-center">
                  AM
                </span>
                <span className="hidden md:block text-left">
                  <span className="block text-sm font-semibold text-text leading-tight">A. Manager</span>
                  <span className="block text-[11px] text-text-secondary">Super admin</span>
                </span>
                <Icon name="chevron" className="w-4 h-4 text-text-secondary hidden md:block" />
              </button>
              {userOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface border border-divider rounded-xl shadow-lg z-50 p-1.5">
                  <div className="px-3 py-2 border-b border-divider mb-1">
                    <p className="text-sm font-semibold text-text">A. Manager</p>
                    <p className="text-xs text-text-secondary">admin@debtreviewexit.co.za</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      pushToast({ type: "info", title: "Profile is a demo preview" });
                      setUserOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-text hover:bg-primary-50"
                  >
                    My profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      pushToast({ type: "info", title: "Preferences are a demo preview" });
                      setUserOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-text hover:bg-primary-50"
                  >
                    Preferences
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm text-error hover:bg-red-50"
                  >
                    <Icon name="logout" className="w-4 h-4" />
                    Log out
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="hidden xl:inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text px-2 py-2 rounded-lg hover:bg-primary-50"
              aria-label="Log out"
            >
              <Icon name="logout" className="w-4 h-4" />
              Log out
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
