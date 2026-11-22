import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BUSINESS, LEGAL_NAV, COMPLIANCE_DISCLAIMER } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy | Debt Review Exit",
  description:
    "How Debt Review Exit collects, uses, stores and protects personal information in line with South Africa's POPIA.",
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
            Privacy <span className="text-teal">Policy</span>
          </h1>
          <p className="text-white/70 leading-relaxed max-w-2xl">
            This policy explains how we handle personal information when you use our website and
            services. Last updated: {LAST_UPDATED}.
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
          Questions about privacy? Email{" "}
          <a className="text-royal hover:underline" href={`mailto:${BUSINESS.email}`}>
            {BUSINESS.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <p className="text-sm text-text-secondary leading-relaxed mb-10">
              {BUSINESS.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects
              your privacy. This Privacy Policy describes what personal information we collect, why
              we collect it, how we use it and the choices you have. It should be read alongside our{" "}
              <Link href="/legal/popia" className="text-royal hover:underline">
                POPIA Notice
              </Link>
              .
            </p>

            <LegalSection title="1. Information we collect">
              <p>
                We may collect information you provide directly, such as your name, email address,
                telephone number, the content of messages you send us, answers to our eligibility
                questions, and documents you choose to share with us. We may also collect basic
                technical information such as your browser type and pages visited when you use the
                website.
              </p>
              <p>
                We only ask for information that is relevant to the assistance you request. We do
                not ask for sensitive information unless it is genuinely needed for your matter.
              </p>
            </LegalSection>

            <LegalSection title="2. How we use your information">
              <p>We use personal information to:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>respond to your enquiries and communicate with you;</li>
                <li>carry out an initial, indicative eligibility assessment;</li>
                <li>review documents and prepare a case file where you become a client;</li>
                <li>provide updates about the progress of your matter;</li>
                <li>improve the usability and security of our website; and</li>
                <li>comply with legal and regulatory obligations.</li>
              </ul>
            </LegalSection>

            <LegalSection title="3. Legal basis and POPIA">
              <p>
                We process personal information in accordance with the Protection of Personal
                Information Act, 4 of 2013 (POPIA). We rely on your consent, the need to perform a
                contract with you, compliance with a legal obligation and our legitimate interests
                in providing and protecting our service.
              </p>
            </LegalSection>

            <LegalSection title="4. Sharing and disclosure">
              <p>
                We do not sell your personal information. We share it only where it is necessary to
                assist with your matter, for example with service providers who host our systems or
                support our operations, or where we are legally required to disclose it. Any such
                parties are expected to handle information appropriately and only for the intended
                purpose.
              </p>
            </LegalSection>

            <LegalSection title="5. Retention">
              <p>
                We keep personal information only for as long as it is needed for the purpose it was
                collected, or as required by law. When information is no longer needed, we take
                reasonable steps to delete or securely archive it.
              </p>
            </LegalSection>

            <LegalSection title="6. Security">
              <p>
                We take reasonable technical and organisational measures to protect personal
                information against loss, misuse and unauthorised access. No method of transmission
                or storage is completely secure, and we cannot guarantee absolute security. Please
                avoid sending sensitive documents by ordinary email — we will advise on a secure
                method when needed.
              </p>
            </LegalSection>

            <LegalSection title="7. Your rights">
              <p>
                Subject to POPIA, you may ask us to confirm what personal information we hold about
                you, request access to it, ask us to correct it, object to certain processing, or
                ask us to delete it where appropriate. You may also withdraw consent where processing
                is based on consent. To exercise any of these rights, contact us using the details
                below.
              </p>
            </LegalSection>

            <LegalSection title="8. Cookies and analytics">
              <p>
                Our website may use essential cookies to function properly and, where applicable,
                analytics tools to understand how the site is used. You can adjust your browser
                settings to limit cookies, though this may affect some functionality.
              </p>
            </LegalSection>

            <LegalSection title="9. Children">
              <p>
                Our services are intended for adults. We do not knowingly collect personal
                information from children. If you believe a child has provided us with information,
                please contact us so we can address it.
              </p>
            </LegalSection>

            <LegalSection title="10. Changes to this policy">
              <p>
                We may update this policy from time to time. The current version will always be
                published on this page with the date it was last updated.
              </p>
            </LegalSection>

            <LegalSection title="11. Contact us">
              <p>
                For privacy-related requests or questions, contact {BUSINESS.legalName} at{" "}
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
