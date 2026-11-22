// Server component: exports metadata (server-only) and renders the interactive
// eligibility form as a separate "use client" child.
import Link from "next/link";
import type { Metadata } from "next";
import { BUSINESS, COMPLIANCE_DISCLAIMER } from "@/lib/site-config";
import { Button, Alert, Badge, Card } from "@/components/ui";
import { EligibilityForm } from "./EligibilityForm";

export const metadata: Metadata = {
  title: "Eligibility check | Debt Review Exit",
  description:
    "A free, no-obligation check to see whether our debt-review exit assistance may suit your circumstances.",
};

function Icon({ path, size = 20 }: { path: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-royal blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[380px] h-[380px] rounded-full bg-teal blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 lg:pt-20 pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-teal" /> Free, no-obligation check
            </span>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-[1.1] tracking-tight mb-5">
              Find out where you <span className="text-teal">stand.</span>
            </h1>
            <p className="text-lg leading-relaxed text-white/70 mb-6">
              Answer a few simple questions and get an honest, indicative response about whether our
              debt-review exit assistance may suit your circumstances.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/register"
                className="inline-flex items-center gap-2 font-semibold px-5 py-3 rounded-xl bg-royal text-white hover:bg-primary transition-all shadow-lg shadow-royal-500/25"
              >
                <Icon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                Create a free account
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-semibold px-5 py-3 rounded-xl border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-all"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 4h16v12H4z" />
                  <path d="M4 7l8 6 8-6" />
                </svg>
                Ask us a question
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <Card className="bg-white/10 border-white/15 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-teal" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Step 1 of 3
                </span>
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-3">Are you under debt review?</h3>
              <div className="flex flex-col gap-2">
                {(["yes", "no"] as const).map((v) => (
                  <label
                    key={v}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all ${
                      v === "yes"
                        ? "border-white bg-white/15"
                        : "border-white/10 hover:bg-white/5"
                    }`}
                  >
                    <input
                      type="radio"
                      name="demo"
                      checked={v === "yes"}
                      readOnly
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        v === "yes" ? "border-white bg-white/20" : "border-white/20"
                      }`}
                    >
                      {v === "yes" && (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 10l4 4 8-8" />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm text-white/90">{v.charAt(0).toUpperCase() + v.slice(1)}</span>
                  </label>
                ))}
              </div>
              <p className="mt-4 text-xs text-white/60">You will answer 6 questions in under a minute.</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function EligibilityPage() {
  return (
    <>
      <Hero />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <EligibilityForm />
      </section>
      <section className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-heading font-bold text-white mb-3">
              Get plain-English next steps
            </h2>
            <p className="text-white/70 mb-6">
              When your indicative result comes back, we can walk you through what it means and what to
              do next — free, and with no obligation.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3"
            >
              <label htmlFor="contact-email" className="sr-only">
                Email address
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <Button
                type="submit"
                className="bg-white text-primary hover:bg-white/90 transition-all shadow-md"
              >
                Get next steps
              </Button>
            </form>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-primary-50 border border-divider rounded-lg p-5 text-xs text-text-secondary leading-relaxed">
          <strong className="text-primary">Important notice.</strong> {COMPLIANCE_DISCLAIMER}{" "}
          Questions? Email {BUSINESS.email}.
        </div>
      </section>
    </>
  );
}
