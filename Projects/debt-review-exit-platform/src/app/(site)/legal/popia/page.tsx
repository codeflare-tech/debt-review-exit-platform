import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BUSINESS, LEGAL_NAV, COMPLIANCE_DISCLAIMER } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "POPIA Notice | Debt Review Exit",
  description:
    "Our POPIA notice: what personal information we process, why, who receives it, how long we keep it and your rights as a data subject.",
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
            POPIA <span className="text-teal">Notice</span>
          </h1>
          <p className="text-white/70 leading-relaxed max-w-2xl">
            This notice explains how we process personal information in terms of the Protection of
            Personal Information Act, 4 of 2013. Last updated: {LAST_UPDATED}.
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
          Privacy questions? Email{" "}
          <a className="text-royal hover:underline" href={`mailto:${BUSINESS.email}`}>
            {BUSINESS.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default function PopiaPage() {
  return (
    <>
      <PageHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <p className="text-sm text-text-secondary leading-relaxed mb-10">
              This notice is provided in terms of POPIA. It should be read together with our{" "}
              <Link href="/legal/privacy" className="text-royal hover:underline">
                Privacy Policy
              </Link>
              , which explains our practices in more detail.
            </p>

            <LegalSection title="1. Responsible party">
              <p>
                The responsible party is {BUSINESS.legalName}. You can contact us at{" "}
                <a className="text-royal hover:underline" href={`mailto:${BUSINESS.email}`}>
                  {BUSINESS.email}
                </a>{" "}
                or via our{" "}
                <Link href="/contact" className="text-royal hover:underline">
                  contact page
                </Link>
                . Registration details will be supplied before launch.
              </p>
            </LegalSection>

            <LegalSection title="2. Personal information we collect">
              <p>
                Depending on the service you request, we may collect identifying information (such
                as your name and ID number), contact details (email address, phone number), financial
                information relating to your debts, and documents you provide such as statements,
                correspondence and certificates. We may also collect limited technical information
                when you use our website.
              </p>
            </LegalSection>

            <LegalSection title="3. Purpose of processing">
              <p>We process personal information to:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>assess your eligibility and respond to enquiries;</li>
                <li>enter into and perform a service agreement with you;</li>
                <li>review documents and prepare and manage your case file;</li>
                <li>communicate progress and provide client support;</li>
                <li>meet our legal, regulatory and record-keeping obligations; and</li>
                <li>protect the security and integrity of our systems.</li>
              </ul>
            </LegalSection>

            <LegalSection title="4. Legal basis">
              <p>
                We process personal information with your consent, where necessary to perform a
                contract with you, to comply with a legal obligation, and for legitimate interests
                that do not override your rights. Where we rely on consent, you may withdraw it,
                subject to any legal obligations that continue to apply.
              </p>
            </LegalSection>

            <LegalSection title="5. Recipients of information">
              <p>
                We may share personal information with employees and service providers who need it
                to assist with your matter, and with third parties where necessary for the lawful
                process or where required by law. We do not sell personal information. Recipients are
                expected to treat it confidentially and use it only for the intended purpose.
              </p>
            </LegalSection>

            <LegalSection title="6. Cross-border transfers">
              <p>
                We aim to keep personal information within South Africa. If a service provider we use
                processes information outside the country, we will take reasonable steps to ensure
                that the transfer is lawful and that the information remains protected.
              </p>
            </LegalSection>

            <LegalSection title="7. Retention of information">
              <p>
                We retain personal information for as long as needed to achieve the purpose for
                which it was collected, including any period required by law. Thereafter we delete
                or securely archive it in line with our retention practices.
              </p>
            </LegalSection>

            <LegalSection title="8. Security of information">
              <p>
                We take appropriate technical and organisational measures to prevent unauthorised
                access, loss, damage or disclosure. These include access controls and secure
                handling practices. Please do not send sensitive documents through unsecured
                channels — we will advise on a secure method when required.
              </p>
            </LegalSection>

            <LegalSection title="9. Your rights as a data subject">
              <p>
                Subject to POPIA, you have the right to: know what personal information we hold
                about you; request access to it; ask us to correct inaccurate information; object
                to processing in certain circumstances; request deletion where appropriate; and
                withdraw consent where processing is based on consent. To exercise these rights,
                contact us using the details in this notice.
              </p>
            </LegalSection>

            <LegalSection title="10. Complaints">
              <p>
                If you are unhappy with how we have handled your personal information, please
                contact us first so we can try to resolve the matter. You may also lodge a complaint
                with the Information Regulator of South Africa, which is the supervisory authority
                established in terms of POPIA.
              </p>
            </LegalSection>

            <LegalSection title="11. Changes to this notice">
              <p>
                We may update this notice from time to time. The current version will be published
                on this page with the date it was last updated.
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
