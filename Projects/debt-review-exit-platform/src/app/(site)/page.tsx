import Link from "next/link";
import { PACKAGES, BUSINESS, COMPLIANCE_DISCLAIMER } from "@/lib/site-config";

function Check() {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-teal-50 shrink-0">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#20B99A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12l5 5L20 7" />
      </svg>
    </span>
  );
}

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-royal blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[380px] h-[380px] rounded-full bg-teal blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-teal" /> Independent debt-review assistance
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] tracking-tight mb-6">
                A clear path <span className="text-teal">out of</span> debt review.
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
                Understand whether you qualify, get professional guidance, and move through the lawful exit
                process with a dedicated case manager by your side. Transparent, structured, and built around
                your circumstances.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/eligibility" className="inline-flex items-center justify-center gap-2 bg-teal text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-teal-500 transition-colors">
                  Check my eligibility
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
                <Link href="/how-it-works" className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-white/20 transition-colors">
                  How it works
                </Link>
              </div>
              <p className="mt-5 text-xs text-white/50">No obligation. Eligibility is assessed case by case. No outcome is guaranteed.</p>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 text-text">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">Your case progress</p>
                    <p className="font-heading font-bold text-xl">Step by step, together</p>
                  </div>
                  <span className="text-xs font-semibold text-teal bg-teal-50 px-3 py-1.5 rounded-full">On track</span>
                </div>
                <ul className="space-y-5">
                  {[
                    { t: "Eligibility assessment", s: "Complete", done: true },
                    { t: "Document review", s: "In progress", done: true },
                    { t: "Case file preparation", s: "Up next", done: false },
                    { t: "Legal process guidance", s: "Pending", done: false },
                    { t: "Completion documentation", s: "Pending", done: false },
                  ].map((step, i) => (
                    <li key={step.t} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step.done ? "bg-teal text-white" : "bg-primary-50 text-text-secondary"}`}>
                          {step.done ? <Check /> : i + 1}
                        </span>
                        {i < 4 && <span className={`w-0.5 h-6 mt-1 ${step.done ? "bg-teal/30" : "bg-divider"}`} />}
                      </div>
                      <div className="pt-1">
                        <p className="text-sm font-semibold">{step.t}</p>
                        <p className="text-xs text-text-secondary">{step.s}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 hidden sm:block">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-royal-50 flex items-center justify-center text-royal font-bold text-lg">✓</span>
                  <div>
                    <p className="text-xs text-text-secondary">Dedicated support</p>
                    <p className="text-sm font-bold text-primary">Real people, real updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-surface border-b border-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { n: "Case-by-case", l: "Honest eligibility assessment" },
              { n: "Transparent", l: "Clear fees, no hidden costs" },
              { n: "Lawful", l: "Guided by the NCA process" },
              { n: "Private", l: "POPIA-conscious handling" },
            ].map((x) => (
              <div key={x.n}>
                <p className="font-heading font-bold text-primary">{x.n}</p>
                <p className="text-xs text-text-secondary mt-1">{x.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-teal">The process</span>
          <h2 className="mt-3">A structured path, every step of the way</h2>
          <p className="mt-4">
            We keep the process clear and manageable. Here&apos;s how the journey typically unfolds.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { n: "01", t: "Assess", d: "Answer a few questions so we can understand your situation and flag any obvious exclusions." },
            { n: "02", t: "Prepare", d: "Gather the required documents. We review them and prepare your case file properly." },
            { n: "03", t: "Guide", d: "A case manager guides you through the appropriate legal process and tracks progress." },
            { n: "04", t: "Complete", d: "Receive completion documentation where applicable, with support through verification." },
          ].map((s) => (
            <div key={s.n} className="bg-surface rounded-xl border border-divider p-6 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-3xl font-heading font-bold text-royal-50">{s.n}</span>
              <h3 className="mt-2 text-lg">{s.t}</h3>
              <p className="text-sm mt-2">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/how-it-works" className="inline-flex items-center gap-2 text-royal font-semibold hover:underline">
            See the full process <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="bg-background border-y border-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-teal">Transparent pricing</span>
            <h2 className="mt-3">Choose the level of support that fits</h2>
            <p className="mt-4">Three clear packages. Every fee is disclosed and accepted before any work begins.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {PACKAGES.map((p) => (
              <div key={p.code} className={`relative bg-surface rounded-2xl border p-7 flex flex-col ${p.featured ? "border-royal shadow-lg ring-2 ring-royal/10" : "border-divider shadow-sm"}`}>
                {p.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-royal text-white text-xs font-bold px-3 py-1 rounded-full">Most popular</span>}
                <p className="text-xs font-semibold uppercase tracking-wide text-teal">{p.tier}</p>
                <h3 className="mt-2 text-xl">{p.name}</h3>
                <p className="mt-1 text-sm">{p.description}</p>
                <div className="mt-6 mb-2">
                  <span className="text-4xl font-heading font-bold text-primary">{p.priceLabel}</span>
                  <span className="text-sm text-text-secondary ml-2">/ {p.durationLabel} target</span>
                </div>
                <ul className="mt-6 space-y-3 flex-1">
                  {p.features.slice(0, 6).map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm"><Check /><span>{f}</span></li>
                  ))}
                </ul>
                <Link href={`/eligibility?package=${p.code.toLowerCase()}`} className={`mt-7 block text-center font-semibold px-5 py-3 rounded-lg transition-colors ${p.featured ? "bg-royal text-white hover:bg-primary" : "bg-primary-50 text-primary hover:bg-primary-600 hover:text-white"}`}>
                  Get started
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/packages" className="inline-flex items-center gap-2 text-royal font-semibold hover:underline">Compare all features →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-royal to-primary rounded-2xl px-8 py-14 text-center text-white">
          <h2 className="text-3xl sm:text-4xl">Not sure where to start?</h2>
          <p className="mt-4 text-white/75 max-w-xl mx-auto">
            Take our short, no-obligation eligibility check. We&apos;ll tell you honestly whether we can help.
          </p>
          <Link href="/eligibility" className="inline-flex items-center justify-center bg-teal text-white font-semibold px-8 py-3.5 rounded-lg mt-8 hover:bg-teal-500 transition-colors">
            Start eligibility check
          </Link>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-primary-50 border border-divider rounded-lg p-5 text-xs text-text-secondary leading-relaxed">
          <strong className="text-primary">Important notice.</strong> {COMPLIANCE_DISCLAIMER}
        </div>
      </section>
    </>
  );
}
