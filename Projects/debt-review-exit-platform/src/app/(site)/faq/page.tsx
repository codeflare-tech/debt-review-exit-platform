import Link from "next/link";
import type { Metadata } from "next";
import { BUSINESS, COMPLIANCE_DISCLAIMER } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Debt Review Exit",
  description:
    "Answers to common questions about debt-review exit assistance, eligibility, fees, timelines, documents and compliance.",
};

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
            <span className="w-2 h-2 rounded-full bg-teal" /> Good to know
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-[1.1] tracking-tight mb-6">
            Frequently asked <span className="text-teal">questions.</span>
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            Clear answers to the questions we hear most often. If yours is not here, please get in
            touch — we are happy to explain anything in more detail.
          </p>
        </div>
      </div>
    </section>
  );
}

interface Faq {
  q: string;
  a: string;
}

interface FaqGroup {
  category: string;
  items: Faq[];
}

const groups: FaqGroup[] = [
  {
    category: "Getting started",
    items: [
      {
        q: "What exactly do you do?",
        a: "We are an independent private company that provides structured assistance to eligible consumers seeking to exit debt review. That includes assessing your circumstances, reviewing your documents, preparing a case file and guiding you through the appropriate lawful process with a dedicated case manager.",
      },
      {
        q: "Am I guaranteed to be removed from debt review?",
        a: "No. We do not guarantee removal from debt review or any particular outcome. Every case is assessed on its own facts, and the final decision rests with the relevant third parties and the law. Our service is the assistance we provide, not a promised result.",
      },
      {
        q: "How do I know if I qualify?",
        a: "Complete our short, no-obligation eligibility check. It asks a few simple questions about your debt-review status, documents and circumstances and gives you an indicative response. A final assessment is always done case by case by our team before any service begins.",
      },
      {
        q: "Does the eligibility check cost anything?",
        a: "No. The initial eligibility check is free and does not obligate you to purchase any package. We will tell you honestly if we do not believe we can help.",
      },
    ],
  },
  {
    category: "Process & timelines",
    items: [
      {
        q: "How long does the process take?",
        a: "Our package durations (16, 24 and 32 weeks) are target periods only. Actual timeframes depend on your eligibility, how quickly documents are provided, professional review and third-party processing. We do not promise a fixed completion date.",
      },
      {
        q: "What documents will I need?",
        a: "Typically these include your ID, correspondence from your debt counsellor, a clearance certificate if one has been issued, recent account statements, any court papers and proof of income. Your case manager will confirm the exact list for your situation.",
      },
      {
        q: "Will I have one person to deal with?",
        a: "Yes. You are allocated a case manager who is your main point of contact, with the level of contact depending on your chosen package. They will explain each stage and keep you updated.",
      },
      {
        q: "What if I am unsure about something during the process?",
        a: "Ask your case manager. We would rather explain something twice than have you uncertain about your own matter. You can also contact us using the details on our Contact page.",
      },
    ],
  },
  {
    category: "Fees & payment",
    items: [
      {
        q: "How much do your packages cost?",
        a: "Our three packages are priced at R4,500 (Standard), R7,800 (Comprehensive) and R12,500 (Premium). Each has a clear scope of work. Full details are on our Packages page and in our Payment & Fee Policy.",
      },
      {
        q: "Are there hidden costs?",
        a: "No. The package fee covers the assistance described. We explain exactly what is included and you accept the scope and the fee in writing before any work begins.",
      },
      {
        q: "Do I pay for a guaranteed outcome?",
        a: "No. Fees are for professional assistance and time provided. They are not payment for a guaranteed removal from debt review or any other result.",
      },
    ],
  },
  {
    category: "Compliance & privacy",
    items: [
      {
        q: "Are you affiliated with the National Credit Regulator or a credit bureau?",
        a: "No. We are an independent private company and are not affiliated with, endorsed by, or acting on behalf of the National Credit Regulator, any credit bureau, any court or any financial institution.",
      },
      {
        q: "Is this legal advice?",
        a: "No. We provide administrative and guided assistance, not legal advice. If you need legal advice, you should consult a qualified legal practitioner.",
      },
      {
        q: "How is my personal information handled?",
        a: "We handle personal information in a POPIA-conscious manner, using it only for the purpose of assisting with your matter and sharing it only where necessary. Please see our POPIA Notice and Privacy Policy for full detail.",
      },
    ],
  },
];

function FaqSection({ group }: { group: FaqGroup }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-heading font-bold text-primary mb-5 flex items-center gap-3">
        <span className="w-1.5 h-6 bg-teal rounded-full" aria-hidden="true" />
        {group.category}
      </h2>
      <div className="space-y-3">
        {group.items.map((item) => (
          <details
            key={item.q}
            className="group bg-surface rounded-xl border border-divider shadow-sm open:border-royal/30"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-medium text-text marker:hidden">
              <span>{item.q}</span>
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center text-primary transition-transform group-open:rotate-45" aria-hidden="true">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <div className="px-6 pb-5 text-sm text-text-secondary leading-relaxed border-t border-divider pt-4">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function FaqPage() {
  return (
    <>
      <PageHero />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {groups.map((g) => (
          <FaqSection key={g.category} group={g} />
        ))}
        <div className="bg-primary-50 border border-divider rounded-lg p-6 text-sm text-text-secondary leading-relaxed">
          <strong className="text-primary">Still have a question?</strong> Email us at{" "}
          <a className="text-royal hover:underline" href={`mailto:${BUSINESS.email}`}>
            {BUSINESS.email}
          </a>{" "}
          or use our{" "}
          <Link className="text-royal hover:underline" href="/contact">
            contact form
          </Link>
          . We are available {BUSINESS.hours}.
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="bg-gradient-to-br from-royal to-primary rounded-2xl px-8 py-14 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold">Ready to take the first step?</h2>
          <p className="mt-4 text-white/75 max-w-xl mx-auto">
            A short, no-obligation check is the quickest way to understand where you stand.
          </p>
          <Link
            href="/eligibility"
            className="inline-flex items-center justify-center bg-teal text-white font-semibold px-8 py-3.5 rounded-lg mt-8 hover:bg-teal-500 transition-colors"
          >
            Start eligibility check
          </Link>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-4">
        <div className="bg-primary-50 border border-divider rounded-lg p-5 text-xs text-text-secondary leading-relaxed">
          <strong className="text-primary">Important notice.</strong> {COMPLIANCE_DISCLAIMER}
        </div>
      </section>
    </>
  );
}
