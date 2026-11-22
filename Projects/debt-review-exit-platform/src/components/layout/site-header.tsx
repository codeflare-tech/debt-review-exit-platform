"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PUBLIC_NAV, BUSINESS } from "@/lib/site-config";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Debt Review Exit home">
      <span className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-sm">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2L4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-4z" stroke="#20B99A" strokeWidth="2" strokeLinejoin="round" />
          <path d="M8.5 12.5l2.3 2.3 4.7-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="font-heading font-bold text-primary text-[15px] leading-tight">
        Debt Review<span className="text-royal"> Exit</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-sticky bg-surface/95 backdrop-blur border-b border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {PUBLIC_NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                    active ? "text-royal bg-royal-50" : "text-text-secondary hover:text-primary hover:bg-primary-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/portal/login" className="text-sm font-semibold text-primary hover:text-royal px-3 py-2">
              Log in
            </Link>
            <Link
              href="/eligibility"
              className="text-sm font-semibold text-white bg-royal hover:bg-primary px-5 py-2.5 rounded-lg shadow-sm transition-colors"
            >
              Check eligibility
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-primary hover:bg-primary-50"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-divider bg-surface">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium px-3 py-2.5 rounded-md ${
                  pathname === item.href ? "text-royal bg-royal-50" : "text-text-secondary"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-3 pt-3 border-t border-divider">
              <Link href="/portal/login" onClick={() => setOpen(false)} className="flex-1 text-center text-sm font-semibold text-primary border border-divider rounded-lg py-2.5">
                Log in
              </Link>
              <Link href="/eligibility" onClick={() => setOpen(false)} className="flex-1 text-center text-sm font-semibold text-white bg-royal rounded-lg py-2.5">
                Check eligibility
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
