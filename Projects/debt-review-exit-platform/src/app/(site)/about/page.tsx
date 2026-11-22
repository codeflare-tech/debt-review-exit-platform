import Link from "next/link";
import type { Metadata } from "next";
import { BUSINESS, COMPLIANCE_DISCLAIMER } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us | Debt Review Exit",
  description:
    "Learn who we are, how we work and what guides our approach to debt-review exit assistance for South African consumers.",
};

function Check() {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-teal-50 shrink-0">
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#20B99A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12l5 5L20 7" />
      </svg>
    </span>
  );
}

function PageHero() {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-royal blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[380px] h-[380px] rounded-full bg-teal blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-teal" /> Who we are
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-[1.1] tracking-tight mb-6">
            Clarity, dignity and <span className="text-teal">a way forward.</span>
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            We are an independent private company offering structured debt-review exit assistance
            to eligible South African consumers — built on honesty, transparency and respect.
          </p>
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal">Our mission</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold">
            Make a difficult process understandable
          </h2>
          <p className="mt-5 text-text-secondary leading-relaxed">
            Being under debt review can feel confusing and overwhelming. Our role is to bring
            structure to that experience: to explain the process in plain language, to prepare your
            case properly, and to keep you informed while your matter moves through the relevant
            channels.
          </p>
          <p className="mt-4 text-text-secondary leading-relaxed">
            We believe good assistance starts with an honest assessment. If we do not think we can
            help, we will tell you — rather than take your money for a process that is unlikely to
            suit your circumstances.
          </p>
        </div>
        <div className="bg-gradient-to-br from-royal to-primary rounded-2xl p-8 text-white">
          <svg
            className="w-10 h-10 text-teal mb-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3l8 4v5c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V7l8-4z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <p className="text-xl font-heading font-semibold leading-snug">
            &ldquo;Honest guidance first. Professional, structured support second. No promises we
            cannot keep.&rdquo;
          </p>
          <p className="mt-5 text-sm text-white/70">— The {BUSINESS.name} approach</p>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const values = [
    {
      t: "Honesty",
      d: "We give straight answers about eligibility, scope and likely outcomes — even when the answer is not what you hoped for.",
    },
    {
      t: "Transparency",
      d: "Clear packages, clear fees and clear communication. You accept the scope and the fee before any work begins.",
    },
    {
      t: "Professionalism",
      d: "Case files are prepared carefully and handled with the attention a sensitive financial matter deserves.",
    },
    {
      t: "Privacy",
      d: "Your information is handled in a POPIA-conscious manner and shared only as needed for your matter.",
    },
    {
      t: "Accountability",
      d: "A named case manager keeps you updated and explains what is happening at each stage.",
    },
    {
      t: "Realism",
      d: "We are clear that durations are targets and outcomes are never guaranteed by us.",
    },
  ];
  return (
    <section className="bg-background border-y border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal">What guides us</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold">Our values in practice</h2>
          <p className="mt-4 text-text-secondary">
            These are not slogans — they shape the way we assess cases, price our services and speak
            to the people we assist.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v) => (
            <div
              key={v.t}
              className="bg-surface rounded-xl border border-divider p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <Check />
                <h3 className="font-heading font-semibold text-primary text-lg">{v.t}</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApproachSection() {
  const can = [
    "Explain the debt-review exit process in plain language",
    "Assess your circumstances case by case, honestly",
    "Review and organise the documents you provide",
    "Prepare a structured, accurate case file",
    "Guide you through the appropriate lawful process",
    "Keep you updated with a dedicated case manager",
  ];
  const cannot = [
    "Guarantee removal from debt review or any outcome",
    "Act as the National Credit Regulator or a credit bureau",
    "Act as a court, lawyer or financial institution",
    "Make decisions on your behalf or give legal advice",
    "Promise a fixed completion date or timeline",
    "Remove accurate information from a credit report",
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-teal">Clear boundaries</span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold">What we do — and what we don&apos;t</h2>
        <p className="mt-4 text-text-secondary">
          Being clear about our role protects you and sets realistic expectations from day one.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-teal/30 bg-teal-50/40 p-7">
          <h3 className="font-heading font-bold text-primary mb-5">We can help you with</h3>
          <ul className="space-y-3">
            {can.map((x) => (
              <li key={x} className="flex items-start gap-2.5 text-sm">
                <Check />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-divider bg-surface p-7">
          <h3 className="font-heading font-bold text-primary mb-5">We cannot and do not</h3>
          <ul className="space-y-3">
            {cannot.map((x) => (
              <li key={x} className="flex items-start gap-2.5 text-sm">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-50 shrink-0">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { n: "Case-by-case", l: "Honest eligibility assessment" },
    { n: "Transparent", l: "Clear fees, no hidden costs" },
    { n: "Lawful", l: "Guided by the NCA process" },
    { n: "Private", l: "POPIA-conscious handling" },
  ];
  return (
    <section className="bg-surface border-y border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {items.map((x) => (
            <div key={x.n}>
              <p className="font-heading font-bold text-primary">{x.n}</p>
              <p className="text-xs text-text-secondary mt-1">{x.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero />
      <TrustStrip />
      <MissionSection />
      <ValuesSection />
      <ApproachSection />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="bg-gradient-to-br from-royal to-primary rounded-2xl px-8 py-14 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold">Want to talk to us?</h2>
          <p className="mt-4 text-white/75 max-w-xl mx-auto">
            Ask a question, request more detail about our approach, or start a no-obligation
            eligibility check. We are here to help you make an informed decision.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-teal text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-teal-500 transition-colors"
            >
              Contact us
            </Link>
            <Link
              href="/eligibility"
              className="inline-flex items-center justify-center bg-white/10 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/20 transition-colors"
            >
              Check my eligibility
            </Link>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-4">
        <div className="bg-primary-50 border border-divider rounded-lg p-5 text-xs text-text-secondary leading-relaxed">
          <strong className="text-primary">Important notice.</strong> {COMPLIANCE_DISCLAIMER}{" "}
          You can reach us at {BUSINESS.email} during {BUSINESS.hours}.
        </div>
      </section>
    </>
  );
}
