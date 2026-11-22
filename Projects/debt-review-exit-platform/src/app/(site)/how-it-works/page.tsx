import Link from "next/link";
import type { Metadata } from "next";
import { BUSINESS, COMPLIANCE_DISCLAIMER } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "How It Works | Debt Review Exit",
  description:
    "Understand the step-by-step process of exiting debt review: eligibility checks, document review, case preparation, lawful process guidance and completion support.",
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
            <span className="w-2 h-2 rounded-full bg-teal" /> The process
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-[1.1] tracking-tight mb-6">
            A clear path, <span className="text-teal">step by step.</span>
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            Exiting debt review is a process with defined stages. We make each one understandable,
            manageable and transparent — so you always know where you stand and what happens next.
          </p>
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
    <section className="bg-surface border-b border-divider">
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

const steps = [
  {
    n: "01",
    title: "Eligibility check",
    description:
      "You answer a short set of questions about your current debt-review status, documents and circumstances. We use this to flag obvious exclusions before any work begins.",
    points: [
      "No-obligation, indicative assessment",
      "Reviewed case by case by our team",
      "We tell you honestly if we cannot help",
    ],
    timing: "About 5 minutes",
  },
  {
    n: "02",
    title: "Document review",
    description:
      "You provide the required documents. We check them for completeness and consistency and let you know if anything is missing or needs to be sourced.",
    points: [
      "Clear document checklist",
      "Review of statements and letters",
      "Guidance on what to obtain next",
    ],
    timing: "Depends on document readiness",
  },
  {
    n: "03",
    title: "Case file preparation",
    description:
      "We prepare your case file properly, so that the information presented is accurate, organised and consistent before it enters the relevant process.",
    points: [
      "Structured, accurate case file",
      "Checks for bureau discrepancies",
      "Your case manager assigned",
    ],
    timing: "A target, not a guarantee",
  },
  {
    n: "04",
    title: "Lawful process guidance",
    description:
      "A dedicated case manager guides you through the appropriate lawful process and keeps you updated as your matter progresses through third parties.",
    points: [
      "Dedicated point of contact",
      "Regular progress updates",
      "Honest explanations at every stage",
    ],
    timing: "Subject to third-party processing",
  },
  {
    n: "05",
    title: "Completion support",
    description:
      "Where applicable, we assist with completion documentation and verification, and explain what to check going forward. Outcomes depend on the facts of each case.",
    points: [
      "Completion documentation where applicable",
      "Verification support",
      "Aftercare on selected packages",
    ],
    timing: "Where applicable",
  },
];

function ProcessSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-14">
        <div className="lg:sticky lg:top-24 self-start">
          <span className="text-xs font-bold uppercase tracking-wider text-teal">
            The journey
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold">
            Five stages, one clear route
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed max-w-md">
            Every case is different, but the structure stays the same. You will always know which
            stage you are in, what is required from you and what we are doing on your behalf.
          </p>
          <p className="mt-4 text-xs text-text-secondary max-w-md">
            Timelines shown are targets only. Actual durations depend on your eligibility, the
            completeness of your documents, professional review and third-party processing.
          </p>
          <Link
            href="/eligibility"
            className="inline-flex items-center gap-2 mt-6 text-royal font-semibold hover:underline"
          >
            Start with the eligibility check <span aria-hidden>→</span>
          </Link>
        </div>

        <ol className="relative border-l-2 border-divider ml-4 space-y-10">
          {steps.map((s) => (
            <li key={s.n} className="relative pl-10">
              <span className="absolute -left-[22px] top-0 w-10 h-10 rounded-full bg-royal-50 text-royal font-heading font-bold flex items-center justify-center border-2 border-background">
                {s.n}
              </span>
              <div className="bg-surface rounded-xl border border-divider p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-heading font-semibold text-primary">{s.title}</h3>
                  <span className="text-xs font-semibold text-teal bg-teal-50 px-3 py-1 rounded-full">
                    {s.timing}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mt-3 leading-relaxed">{s.description}</p>
                <ul className="mt-4 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm">
                      <Check />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function DocumentsSection() {
  const documents = [
    { t: "Identity document", d: "A copy of your valid South African ID." },
    { t: "Debt counsellor letters", d: "Any correspondence confirming your debt-review status." },
    { t: "Clearance certificate", d: "If one has been issued, we will review it with you." },
    { t: "Account statements", d: "Recent statements for the accounts in question." },
    { t: "Court papers, if any", d: "Any court order or legal notice that affects your matter." },
    { t: "Proof of income", d: "Recent payslips or proof of income where relevant." },
  ];
  return (
    <section className="bg-background border-y border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal">
            Be prepared
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold">
            What you will typically need
          </h2>
          <p className="mt-4 text-text-secondary">
            Having these ready helps us review your case properly. Your case manager will confirm
            the exact list for your circumstances — requirements differ from case to case.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {documents.map((d, i) => (
            <div
              key={d.t}
              className="bg-surface rounded-xl border border-divider p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center text-primary font-heading font-bold text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading font-semibold text-primary">{d.t}</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{d.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="bg-gradient-to-br from-royal to-primary rounded-2xl px-8 py-14 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold">Ready to find out where you stand?</h2>
        <p className="mt-4 text-white/75 max-w-xl mx-auto">
          Take our short, no-obligation eligibility check. We will tell you honestly whether we can
          help — and what the next step would be.
        </p>
        <Link
          href="/eligibility"
          className="inline-flex items-center justify-center bg-teal text-white font-semibold px-8 py-3.5 rounded-lg mt-8 hover:bg-teal-500 transition-colors"
        >
          Start eligibility check
        </Link>
      </div>
    </section>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <PageHero />
      <TrustStrip />
      <ProcessSection />
      <DocumentsSection />
      <CtaBand />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-primary-50 border border-divider rounded-lg p-5 text-xs text-text-secondary leading-relaxed">
          <strong className="text-primary">Important notice.</strong> {COMPLIANCE_DISCLAIMER}{" "}
          Contact {BUSINESS.name} at {BUSINESS.email} if you have questions about the process.
        </div>
      </section>
    </>
  );
}
