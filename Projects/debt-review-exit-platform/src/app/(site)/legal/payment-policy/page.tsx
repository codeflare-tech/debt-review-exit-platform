import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BUSINESS, LEGAL_NAV, PACKAGES, COMPLIANCE_DISCLAIMER } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Payment & Fee Policy | Debt Review Exit",
  description:
    "Our transparent fee policy: package prices, when payment is due, what is included, cancellations and refunds.",
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
            Payment &amp; Fee <span className="text-teal">Policy</span>
          </h1>
          <p className="text-white/70 leading-relaxed max-w-2xl">
            Clear fees, disclosed up front. Last updated: {LAST_UPDATED}.
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
          Questions about fees? Email{" "}
          <a className="text-royal hover:underline" href={`mailto:${BUSINESS.email}`}>
            {BUSINESS.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default function PaymentPolicyPage() {
  return (
    <>
      <PageHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <p className="text-sm text-text-secondary leading-relaxed mb-10">
              We believe you should know exactly what you are paying for before you commit. This
              policy explains our package fees, when payment becomes due, and how cancellations and
              refunds are handled.
            </p>

            <LegalSection title="1. Our package fees">
              <p>
                Our published fees are set out below and on our{" "}
                <Link href="/packages" className="text-royal hover:underline">
                  Packages page
                </Link>
                . All amounts are in South African Rand and include VAT where applicable.
              </p>
              <div className="not-prose overflow-hidden rounded-lg border border-divider">
                <table className="w-full text-sm">
                  <thead className="bg-primary-50/60">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Package</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Fee</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Target duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PACKAGES.map((p) => (
                      <tr key={p.code} className="border-t border-divider">
                        <td className="px-4 py-3 font-medium text-text">{p.name}</td>
                        <td className="px-4 py-3 font-semibold text-primary">{p.priceLabel}</td>
                        <td className="px-4 py-3 text-text-secondary">{p.durationLabel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Durations are targets only and are not guaranteed. Fees are for the assistance
                described, not for a guaranteed outcome.
              </p>
            </LegalSection>

            <LegalSection title="2. When payment is due">
              <p>
                No fee is payable and no work begins until you have been told the scope and the fee,
                and have accepted them in writing. We will explain any payment schedule clearly
                before you commit. If you do not accept the fee or scope, you are free to walk away
                without charge for work not yet performed.
              </p>
            </LegalSection>

            <LegalSection title="3. Payment methods">
              <p>
                Accepted payment methods and account details will be communicated to you directly
                before any payment is requested. Please do not make a payment based on information
                from an unverified source. If you are unsure, contact us using the details on our
                website before paying.
              </p>
            </LegalSection>

            <LegalSection title="4. What the fee covers">
              <p>
                Each package covers the specific services listed on the{" "}
                <Link href="/packages" className="text-royal hover:underline">
                  Packages page
                </Link>
                , such as assessment, document review, case preparation, process guidance, case
                management and progress updates at the level stated. Anything outside that scope
                will be explained to you before any additional work is done.
              </p>
            </LegalSection>

            <LegalSection title="5. No hidden costs">
              <p>
                We do not add undisclosed charges. If a cost becomes necessary that is not covered by
                your package, we will explain it and obtain your agreement before proceeding. Third
                parties may charge their own fees directly to you; those are not our fees and are
                outside our control.
              </p>
            </LegalSection>

            <LegalSection title="6. Cancellation and refunds">
              <p>
                You may cancel by giving written notice. Where work has already been performed, fees
                for that work may be retained on a fair, proportionate basis, and we will explain the
                calculation to you. Where we have not started work and no third-party costs have been
                incurred, a cancellation may attract a full refund. Each case is reviewed on its
                facts.
              </p>
            </LegalSection>

            <LegalSection title="7. If we cannot assist">
              <p>
                If we determine before commencing that we cannot assist you, no service fee will be
                charged. An initial eligibility check is provided free of charge and does not
                obligate you to purchase anything.
              </p>
            </LegalSection>

            <LegalSection title="8. Questions and disputes">
              <p>
                If you have a question about a fee or a payment, contact us first — we will try to
                resolve it promptly and in writing. You can reach {BUSINESS.legalName} at{" "}
                <a className="text-royal hover:underline" href={`mailto:${BUSINESS.email}`}>
                  {BUSINESS.email}
                </a>{" "}
                or through our{" "}
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
