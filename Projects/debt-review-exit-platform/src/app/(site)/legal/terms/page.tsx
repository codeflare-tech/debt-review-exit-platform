import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BUSINESS, LEGAL_NAV, COMPLIANCE_DISCLAIMER } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service | Debt Review Exit",
  description:
    "The terms that govern use of the Debt Review Exit website and debt-review exit assistance services.",
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
            Terms of <span className="text-teal">Service</span>
          </h1>
          <p className="text-white/70 leading-relaxed max-w-2xl">
            These terms govern your use of our website and services. Last updated: {LAST_UPDATED}.
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
          Questions about these terms? Email{" "}
          <a className="text-royal hover:underline" href={`mailto:${BUSINESS.email}`}>
            {BUSINESS.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <>
      <PageHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <p className="text-sm text-text-secondary leading-relaxed mb-10">
              These Terms of Service (&ldquo;Terms&rdquo;) are entered into between you and{" "}
              {BUSINESS.legalName}. By accessing this website or using our services, you agree to
              these Terms. If you do not agree, please do not use the website or our services.
            </p>

            <LegalSection title="1. Nature of our service">
              <p>
                We provide administrative and guided assistance to eligible consumers seeking to
                exit debt review. This includes eligibility assessment, document review, case file
                preparation and guidance through the appropriate lawful process. We are an
                independent private company.
              </p>
              <p>
                We are not the National Credit Regulator, a credit bureau, a court, a debt
                counsellor, a financial institution or a law firm, and we do not act on behalf of any
                of them. Our service does not amount to legal advice.
              </p>
            </LegalSection>

            <LegalSection title="2. No guaranteed outcomes">
              <p>
                We do not guarantee removal from debt review, any particular outcome, or any fixed
                timeframe. Any durations we publish are target periods only. Results depend on your
                eligibility, the completeness of your documents, professional review, the facts of
                your case and the decisions of third parties. Please see our{" "}
                <Link href="/legal/disclaimer" className="text-royal hover:underline">
                  Disclaimer
                </Link>
                .
              </p>
            </LegalSection>

            <LegalSection title="3. Eligibility and honesty">
              <p>
                You agree to provide accurate, complete and truthful information and documents.
                Eligibility is assessed case by case, and we reserve the right to decline to assist
                where we believe our service is not appropriate for your circumstances. An
                indicative online check is not a final decision.
              </p>
            </LegalSection>

            <LegalSection title="4. Your obligations">
              <p>
                You agree to cooperate reasonably with your case manager, provide requested
                documents timeously, inform us of material changes to your circumstances, and not
                use our services for any unlawful purpose. You remain responsible for decisions made
                in your own matter.
              </p>
            </LegalSection>

            <LegalSection title="5. Fees and payment">
              <p>
                Our published packages carry the fees shown on our{" "}
                <Link href="/packages" className="text-royal hover:underline">
                  Packages page
                </Link>
                . Fees cover the assistance described and are not payment for a guaranteed result.
                You will be told the scope and fee and asked to accept them before any work begins.
                Payment terms, cancellation and refunds are set out in our{" "}
                <Link href="/legal/payment-policy" className="text-royal hover:underline">
                  Payment &amp; Fee Policy
                </Link>
                .
              </p>
            </LegalSection>

            <LegalSection title="6. Website use and intellectual property">
              <p>
                You may use this website for lawful purposes only. All content, design and branding
                on this website belongs to us or our licensors and may not be copied, reproduced or
                distributed without permission.
              </p>
            </LegalSection>

            <LegalSection title="7. Limitation of liability">
              <p>
                To the extent permitted by law, we are not liable for indirect or consequential loss,
                and our liability arising from our services is limited to the fees paid by you for
                those services. Nothing in these Terms excludes liability that cannot lawfully be
                excluded.
              </p>
            </LegalSection>

            <LegalSection title="8. Termination">
              <p>
                Either party may end the service relationship by giving written notice. Where a
                service has commenced, fees for work already performed may remain payable. See the
                Payment &amp; Fee Policy for how cancellation and refunds are handled.
              </p>
            </LegalSection>

            <LegalSection title="9. Governing law">
              <p>
                These Terms are governed by the laws of the Republic of South Africa. Any dispute
                will be subject to the jurisdiction of the South African courts.
              </p>
            </LegalSection>

            <LegalSection title="10. Changes to these Terms">
              <p>
                We may update these Terms from time to time. The current version will be published
                on this page with the date it was last updated. Changes do not retroactively alter
                fees or scope already agreed in writing.
              </p>
            </LegalSection>

            <LegalSection title="11. Contact">
              <p>
                Questions about these Terms can be sent to {BUSINESS.legalName} at{" "}
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
