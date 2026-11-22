import Link from "next/link";
import { BUSINESS, LEGAL_NAV, PUBLIC_NAV, PACKAGES } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-white/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2L4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-4z" stroke="#20B99A" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M8.5 12.5l2.3 2.3 4.7-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-heading font-bold text-white text-[15px]">Debt Review Exit</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">{BUSINESS.description}</p>
            <div className="mt-4 space-y-1.5 text-sm text-white/60">
              <p>{BUSINESS.email}</p>
              <p>{BUSINESS.phone}</p>
              <p>{BUSINESS.hours}</p>
            </div>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              {PUBLIC_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Packages</h3>
            <ul className="space-y-2.5 text-sm">
              {PACKAGES.map((p) => (
                <li key={p.code}>
                  <Link href={`/packages#package-${p.code}`} className="hover:text-white transition-colors">
                    Package {p.code} — {p.name} ({p.priceLabel})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2.5 text-sm">
              {LEGAL_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-white/50 leading-relaxed">
          <p className="mb-2">{BUSINESS.registrationNote}</p>
          <p>
            We are an independent private company and are not affiliated with the National Credit Regulator,
            any credit bureau, any court or any financial institution. We do not guarantee removal from debt
            review or any particular outcome. Service periods are targets only.
          </p>
          <p className="mt-4">© {new Date().getFullYear()} {BUSINESS.legalName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
