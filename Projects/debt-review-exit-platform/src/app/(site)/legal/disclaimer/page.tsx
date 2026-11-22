import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BUSINESS, LEGAL_NAV, COMPLIANCE_DISCLAIMER } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Disclaimer | Debt Review Exit",
  description:
    "Important disclaimers about independence, no guaranteed outcomes, target durations and the nature of our debt-review exit assistance.",
};

const LAST_UPDATED = "17 November 2026";

function PageHero() {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-royal blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[380px] h-[380px] rounded-full bg-teal blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-teal" /> Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-[1.1] tracking-tight mb-4">
            <span className="text-teal">Disclaimer</span>
          </h1>
          <p className="text-white/70 leading-relaxed max-w-2xl">
            Please read this carefully. It explains the limits of our service and the basis on which
            we provide assistance. Last updated: {LAST_UPDATED}.
          </p>
        </div>
      </div>
    </section>
  );
}

function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-heading font-bold text-primary mb-4">{title}</h2>
      <div className="space-y-4 text-sm text-text-secondary leading-relaxed">{children}</div>
    </section>
  );
}

function LegalNav() {
  return (
    <div className="rounded-xl border border-divider bg-surface p-6 shadow-sm">
      <h2 className="font-heading font-semibold text-primary">Other policies</h2>
      <ul className="mt-4 space-y-3">
        {LEGAL_NAV.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-royal hover:underline">
              {item.label} →
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t border-divider pt-5">
        <p className="text-xs text-text-secondary leading-relaxed">
          Questions? Email{" "}
          <a className="text-royal hover:underline" href={`mailto:${BUSINESS.email}`}>
            {BUSINESS.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default function DisclaimerPage() {
  return (
    <>
      <PageHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <div className="mb-10 rounded-xl border border-warning/40 bg-yellow-50/60 p-5 text-sm text-text-secondary leading-relaxed">
              <strong className="text-primary">In short:</strong> we are an independent private
              company, not a government body or financial institution. We do not guarantee removal
              from debt review or any outcome, and all service periods are targets only.
            </div>

            <LegalSection title="1. Independent status">
              <p>
                {BUSINESS.legalName} is an independent private company. We provide debt-review exit
                assistance for a fee. We are not a state entity, a regulator, a court, or a division
                of any bank or credit provider.
              </p>
            </LegalSection>

            <LegalSection title="2. No affiliation or endorsement">
              <p>
                We are not affiliated with, endorsed by, or acting on behalf of the National Credit
                Regulator, any credit bureau, any court, or any financial institution. Any
                reference to those bodies is descriptive only and does not imply a relationship,
                authorisation or endorsement.
              </p>
            </LegalSection>

            <LegalSection title="3. No guaranteed outcomes">
              <p>
                We do not guarantee removal from debt review, a particular result, an improvement in
                your credit record, or that any creditor or third party will act in a certain way.
                Any indicative assessment or self-check we provide is a general guide, not a promise
                or a decision in your favour.
              </p>
            </LegalSection>

            <LegalSection title="4. Target durations only">
              <p>
                Package periods are target durations only. The actual time a matter takes depends on
                your eligibility, how complete and accurate your documents are, the need for
                professional review, the workload of relevant third parties and other factors outside
                our control. We do not promise a fixed completion date.
              </p>
            </LegalSection>

            <LegalSection title="5. Not legal or financial advice">
              <p>
                Our services are administrative and guided assistance. We do not provide legal
                advice, financial advice or credit counselling regulated by any authority. If you
                need advice of that nature, please consult an appropriately qualified professional.
              </p>
            </LegalSection>

            <LegalSection title="6. Case-by-case assessment">
              <p>
                Every matter is different. Eligibility and the appropriate scope of work are
                assessed case by case. Information on this website is general and may not apply to
                your specific circumstances.
              </p>
            </LegalSection>

            <LegalSection title="7. Third-party processing">
              <p>
                Much of the relevant process is handled by parties outside our control, including
                credit bureaus, debt counsellors, creditors and courts. We cannot direct or bind
                those parties, and delays or decisions by them are not within our control.
              </p>
            </LegalSection>

            <LegalSection title="8. Accuracy of website information">
              <p>
                We aim to keep information on this website accurate and current, but we do not
                warrant that it is complete or error-free. Published fees and package details may
                change; the version agreed with you in writing before work begins will apply.
              </p>
            </LegalSection>

            <LegalSection title="9. Jurisdiction">
              <p>
                This website and our services are intended for use by people in South Africa. The
                content is governed by South African law and does not constitute an offer or
                solicitation in any other jurisdiction.
              </p>
            </LegalSection>

            <LegalSection title="10. Contact">
              <p>
                If anything on this website is unclear, please contact us before relying on it. You
                can reach {BUSINESS.name} at{" "}
                <a className="text-royal hover:underline" href={`mailto:${BUSINESS.email}`}>
                  {BUSINESS.email}
                </a>{" "}
                or via our{" "}
                <Link href="/contact" className="text-royal hover:underline">
                  contact page
                </Link>
                .
              </p>
            </LegalSection>
          </article>
          <aside>
            <LegalNav />
          </aside>
        </div>
      </div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-primary-50 border border-divider rounded-lg p-5 text-xs text-text-secondary leading-relaxed">
          <strong className="text-primary">Important notice.</strong> {COMPLIANCE_DISCLAIMER}
        </div>
      </section>
    </>
  );
}
