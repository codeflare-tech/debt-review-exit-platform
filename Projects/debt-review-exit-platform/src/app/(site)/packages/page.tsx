import Link from "next/link";
import type { Metadata } from "next";
import {
  BUSINESS,
  PACKAGES,
  COMPLIANCE_DISCLAIMER,
  type PackageConfig,
} from "@/lib/site-config";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  Badge,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Packages & Fees | Debt Review Exit",
  description:
    "Compare our three transparent debt-review exit packages: Standard, Comprehensive and Premium. Clear fees, disclosed before any work begins.",
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
            <span className="w-2 h-2 rounded-full bg-teal" /> Transparent pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-[1.1] tracking-tight mb-6">
            Support that fits <span className="text-teal">your situation.</span>
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            Three clearly defined packages, with every fee disclosed and accepted before any work
            begins. No hidden costs, no surprises — just the level of support you need.
          </p>
        </div>
      </div>
    </section>
  );
}

function PackageCard({ p }: { p: PackageConfig }) {
  return (
    <div
      className={`relative bg-surface rounded-2xl border p-7 flex flex-col h-full ${
        p.featured
          ? "border-royal shadow-lg ring-2 ring-royal/10"
          : "border-divider shadow-sm"
      }`}
    >
      {p.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-royal text-white text-xs font-bold px-3 py-1 rounded-full">
          Most popular
        </span>
      )}
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal">{p.tier}</p>
        <Badge variant={p.featured ? "royal" : "default"} size="sm">
          Package {p.code}
        </Badge>
      </div>
      <h2 className="mt-2 text-2xl font-heading font-bold text-primary">{p.name}</h2>
      <p className="mt-2 text-sm text-text-secondary leading-relaxed">{p.description}</p>
      <div className="mt-6 mb-2">
        <span className="text-4xl font-heading font-bold text-primary">{p.priceLabel}</span>
        <span className="text-sm text-text-secondary ml-2">/ {p.durationLabel} target</span>
      </div>
      <p className="text-xs text-text-secondary">Target duration only — not a guaranteed outcome.</p>
      <ul className="mt-6 space-y-3 flex-1">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/eligibility?package=${p.code.toLowerCase()}`}
        className={`mt-7 block text-center font-semibold px-5 py-3 rounded-lg transition-colors ${
          p.featured
            ? "bg-royal text-white hover:bg-primary"
            : "bg-primary-50 text-primary hover:bg-primary-600 hover:text-white"
        }`}
      >
        Get started
      </Link>
    </div>
  );
}

function ComparisonTable() {
  const rows: { label: string; values: [string, string, string] }[] = [
    { label: "Eligibility assessment", values: ["Included", "Included", "Included"] },
    { label: "Document review", values: ["Standard", "Comprehensive", "Comprehensive"] },
    { label: "Case manager", values: ["Allocated", "Priority", "Senior"] },
    { label: "Progress updates", values: ["Notifications", "Weekly", "Weekly + direct"] },
    { label: "Bureau discrepancy support", values: ["—", "Included", "Included"] },
    { label: "Completion verification", values: ["Basic", "Assisted", "Assisted + follow-up"] },
    { label: "Post-completion support", values: ["—", "Included", "Discretionary aftercare"] },
    { label: "Target duration", values: ["16 weeks", "24 weeks", "32 weeks"] },
  ];
  return (
    <section className="bg-background border-y border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal">
            Side by side
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold">Compare what is included</h2>
          <p className="mt-4 text-text-secondary">
            A quick view of the differences. Your case manager will confirm the full scope for your
            matter before you accept any fee.
          </p>
        </div>
        <div className="bg-surface rounded-xl border border-divider shadow-sm overflow-hidden">
          <Table>
            <TableHead>
              <TableHeader>Feature</TableHeader>
              {PACKAGES.map((p) => (
                <TableHeader key={p.code}>{p.name}</TableHeader>
              ))}
            </TableHead>
            <tbody>
              {rows.map((row) => (
                <TableRow key={row.label}>
                  <TableCell className="font-medium">{row.label}</TableCell>
                  {row.values.map((v, i) => (
                    <TableCell key={i}>{v}</TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium">Price</TableCell>
                {PACKAGES.map((p) => (
                  <TableCell key={p.code} className="font-bold text-primary">
                    {p.priceLabel}
                  </TableCell>
                ))}
              </TableRow>
            </tbody>
          </Table>
        </div>
      </div>
    </section>
  );
}

function FeesSection() {
  const items = [
    {
      t: "One clear fee",
      d: "Each package has a single published fee. We explain exactly what it covers before you commit.",
    },
    {
      t: "Accepted before work",
      d: "No work begins and no fee is payable until you have accepted the scope and the fee in writing.",
    },
    {
      t: "No outcome guarantee",
      d: "Fees cover the assistance and time provided — not a guaranteed removal from debt review.",
    },
    {
      t: "Questions welcome",
      d: "Ask us anything about fees, payment or what is included. See our Payment & Fee Policy for detail.",
    },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-teal">How fees work</span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold">Straightforward by design</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((x) => (
          <div key={x.t} className="bg-surface rounded-xl border border-divider p-6 shadow-sm">
            <h3 className="font-heading font-semibold text-primary">{x.t}</h3>
            <p className="text-sm text-text-secondary mt-2 leading-relaxed">{x.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/legal/payment-policy"
          className="inline-flex items-center gap-2 text-royal font-semibold hover:underline"
        >
          Read the Payment &amp; Fee Policy <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}

export default function PackagesPage() {
  return (
    <>
      <PageHero />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {PACKAGES.map((p) => (
            <PackageCard key={p.code} p={p} />
          ))}
        </div>
        <p className="text-center text-xs text-text-secondary mt-8">
          All prices in South African Rand. Durations are targets only and are subject to eligibility,
          document completeness, professional review and third-party processing.
        </p>
      </section>
      <ComparisonTable />
      <FeesSection />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="bg-gradient-to-br from-royal to-primary rounded-2xl px-8 py-14 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold">Not sure which package fits?</h2>
          <p className="mt-4 text-white/75 max-w-xl mx-auto">
            Start with a free, no-obligation eligibility check. We will help you understand which
            level of support is appropriate for your circumstances.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/eligibility"
              className="inline-flex items-center justify-center bg-teal text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-teal-500 transition-colors"
            >
              Check my eligibility
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white/10 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/20 transition-colors"
            >
              Ask us a question
            </Link>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-4">
        <div className="bg-primary-50 border border-divider rounded-lg p-5 text-xs text-text-secondary leading-relaxed">
          <strong className="text-primary">Important notice.</strong> {COMPLIANCE_DISCLAIMER}{" "}
          Fees are for assistance provided and are not payment for a guaranteed result. Contact{" "}
          {BUSINESS.email} with any pricing questions.
        </div>
      </section>
    </>
  );
}
