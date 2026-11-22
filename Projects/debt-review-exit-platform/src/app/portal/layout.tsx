"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Modal, ToastProvider } from "@/components/ui";
import { BUSINESS } from "@/lib/site-config";

type NavKey = "dashboard" | "case" | "documents" | "messages" | "profile";

const NAV: { href: string; label: string; key: NavKey }[] = [
  { href: "/portal/dashboard", label: "Dashboard", key: "dashboard" },
  { href: "/portal/case", label: "My Case", key: "case" },
  { href: "/portal/documents", label: "Documents", key: "documents" },
  { href: "/portal/messages", label: "Messages", key: "messages" },
  { href: "/portal/profile", label: "Profile", key: "profile" },
];

const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "A clear view of where your case stands" },
  "/case": { title: "My Case", subtitle: "Progress, phases and case notes" },
  "/documents": { title: "Documents", subtitle: "Upload and track your supporting documents" },
  "/messages": { title: "Messages", subtitle: "Secure communication with your case team" },
  "/profile": { title: "Profile", subtitle: "Your details, preferences and consents" },
};

function NavIcon({ name }: { name: NavKey }) {
  if (name === "dashboard") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    );
  }
  if (name === "case") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z" /><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" /><path d="M3 12h18" />
      </svg>
    );
  }
  if (name === "documents") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h4" />
      </svg>
    );
  }
  if (name === "messages") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a8 8 0 01-8 8H5l-2 1 1-4a8 8 0 118-9z" /><path d="M8 11h8M8 14h5" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" />
    </svg>
  );
}

function BrandMark() {
  return (
    <span className="w-9 h-9 rounded-lg bg-teal flex items-center justify-center text-white shrink-0">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" />
      </svg>
    </span>
  );
}

function Sidebar({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  return (
    <div className="flex flex-col h-full bg-primary text-white">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <BrandMark />
        <div className="min-w-0">
          <p className="font-heading font-bold text-sm leading-tight truncate">{BUSINESS.name}</p>
          <p className="text-[11px] text-white/50 uppercase tracking-wider">Client portal</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1" aria-label="Client portal navigation">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">Workspace</p>
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-white/10 text-white shadow-sm" : "text-white/65 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className={active ? "text-teal" : "text-white/50"}><NavIcon name={item.key} /></span>
              {item.label}
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 pb-6 space-y-4">
        <div className="rounded-lg bg-white/5 border border-white/10 p-4">
          <p className="text-xs font-semibold text-white">Need a hand?</p>
          <p className="text-[11px] text-white/55 mt-1 leading-relaxed">
            Your case manager is here to help during business hours.
          </p>
          <a href={`mailto:${BUSINESS.email}`} className="mt-2 inline-block text-[11px] font-semibold text-teal hover:underline">
            {BUSINESS.email}
          </a>
        </div>
        <div className="flex items-start gap-2 text-[10px] text-white/40 leading-relaxed">
          <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" strokeLinecap="round" /></svg>
          <span>Demo preview only. Live authentication and data persistence are not connected yet.</span>
        </div>
      </div>
    </div>
  );
}

export default function PortalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const meta = PAGE_META[pathname] ?? { title: "Client Portal", subtitle: "Welcome back" };

  if (isAuthPage) {
    return (
      <ToastProvider>
        <div className="min-h-screen bg-background">{children}</div>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background">
        {/* Mobile backdrop */}
        {mobileOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-primary/50 lg:hidden"
          />
        )}

        {/* Fixed sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 lg:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar pathname={pathname} onNavigate={() => setMobileOpen(false)} />
        </aside>

        {/* Main column */}
        <div className="lg:pl-64">
          <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur border-b border-divider">
            <div className="flex items-center gap-4 px-4 sm:px-6 lg:px-8 h-[72px]">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-lg text-text-secondary hover:bg-primary-50 hover:text-text"
                aria-label="Open navigation menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-heading font-bold text-lg text-primary truncate">{meta.title}</h1>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-teal bg-teal-50 border border-teal/20 rounded-full px-2 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" /> Demo preview
                  </span>
                </div>
                <p className="text-xs text-text-secondary truncate">{meta.subtitle}</p>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="hidden sm:block text-right leading-tight">
                  <p className="text-xs font-semibold text-text">Thandi Mokoena</p>
                  <p className="text-[11px] text-text-secondary">Client</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-royal-50 border border-royal/20 flex items-center justify-center text-royal text-xs font-bold shrink-0" aria-label="Demo user: Thandi Mokoena">
                  TM
                </div>
                <button
                  type="button"
                  onClick={() => setLogoutOpen(true)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary border border-divider rounded-lg px-3 py-2 hover:border-error hover:text-error transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><path d="M16 17l5-5-5-5M21 12H9" />
                  </svg>
                  <span className="hidden md:inline">Log out</span>
                </button>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        </div>

        <Modal
          isOpen={logoutOpen}
          title="Sign out of the demo portal"
          description="Authentication is not connected yet. This preview will return you to the demo sign-in screen — no session or data is affected."
          confirmLabel="Sign out"
          cancelLabel="Stay here"
          onCancel={() => setLogoutOpen(false)}
          onConfirm={() => {
            setLogoutOpen(false);
            router.push("/login");
          }}
        />
      </div>
    </ToastProvider>
  );
}
