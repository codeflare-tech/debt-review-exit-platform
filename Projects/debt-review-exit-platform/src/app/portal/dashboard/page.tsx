import Link from "next/link";
import { Alert, Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, ProgressTrack } from "@/components/ui";
import { COMPLIANCE_DISCLAIMER } from "@/lib/site-config";

const STAGES = [
  { label: "Eligibility", detail: "Assessment complete" },
  { label: "Document review", detail: "4 of 6 received" },
  { label: "Case file prep", detail: "In progress" },
  { label: "Legal guidance", detail: "Up next" },
  { label: "Completion", detail: "Pending" },
];

const RECENT_DOCS = [
  { name: "ID copy — Thandi Mokoena.pdf", date: "12 Nov 2026", status: "approved" },
  { name: "Proof of address — November.pdf", date: "10 Nov 2026", status: "pending_review" },
  { name: "Latest payslip — October.pdf", date: "08 Nov 2026", status: "needs_attention" },
  { name: "Debt reviewer statement.pdf", date: "05 Nov 2026", status: "approved" },
] as const;

function DocStatus({ status }: { status: (typeof RECENT_DOCS)[number]["status"] }) {
  if (status === "approved") return <Badge variant="success" size="sm">Approved</Badge>;
  if (status === "needs_attention") return <Badge variant="error" size="sm">Needs attention</Badge>;
  return <Badge variant="warning" size="sm">Pending review</Badge>;
}

function StatIcon({ kind }: { kind: "clock" | "file" | "calendar" | "shield" }) {
  if (kind === "clock") {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
  }
  if (kind === "file") {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" /><path d="M14 3v5h5" /></svg>;
  }
  if (kind === "calendar") {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>;
  }
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>;
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome band */}
      <div className="relative overflow-hidden bg-primary rounded-2xl px-6 py-8 sm:px-8 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-royal blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 w-64 h-64 rounded-full bg-teal blur-3xl" />
        </div>
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/15 rounded-full px-3 py-1">
                <span className="w-2 h-2 rounded-full bg-teal" /> On track
              </span>
              <span className="text-xs text-white/50">Case DRX-2026-1148</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-2">Good morning, Thandi 👋</h2>
            <p className="text-sm text-white/70 max-w-xl leading-relaxed">
              Your case is moving forward. We are currently preparing your case file — two documents still need your attention.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/portal/documents" className="inline-flex items-center gap-2 bg-teal text-white font-semibold px-5 py-3 rounded-lg hover:bg-teal-500 transition-colors">
              <StatIcon kind="file" /> Review documents
            </Link>
            <Link href="/portal/messages" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-5 py-3 rounded-lg hover:bg-white/20 transition-colors">
              <StatIcon kind="clock" /> Message manager
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Current phase", value: "Case file prep", note: "Phase 3 of 5", kind: "shield" as const },
          { label: "Documents", value: "4 / 6", note: "2 need attention", kind: "file" as const },
          { label: "Days in process", value: "18", note: "Started 30 Oct 2026", kind: "calendar" as const },
          { label: "Target duration", value: "24 weeks", note: "Comprehensive package", kind: "clock" as const },
        ].map((stat) => (
          <Card key={stat.label} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="w-9 h-9 rounded-lg bg-royal-50 text-royal flex items-center justify-center shrink-0">
                <StatIcon kind={stat.kind} />
              </div>
              <Badge variant="ghost" size="sm">{stat.note}</Badge>
            </div>
            <p className="text-xs text-text-secondary mt-4">{stat.label}</p>
            <p className="font-heading font-bold text-xl text-primary mt-0.5">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Progress tracker */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Case progress</CardTitle>
              <CardDescription>Your journey, step by step</CardDescription>
            </div>
            <Badge variant="royal" size="sm">Phase 3 of 5</Badge>
          </CardHeader>
          <CardContent>
            <ProgressTrack stages={STAGES} currentStage={3} showLabels />
            <div className="mt-6 bg-primary-50 border border-divider rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-primary">Currently in progress</p>
                <p className="text-xs text-text-secondary mt-0.5">Your reviewer is preparing your case file for the next stage.</p>
              </div>
              <Link href="/portal/case" className="text-sm font-semibold text-royal hover:underline shrink-0">View full case →</Link>
            </div>
          </CardContent>
        </Card>

        {/* Next actions */}
        <Card>
          <CardHeader>
            <CardTitle>Your next actions</CardTitle>
            <CardDescription>Small steps that keep things moving</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Upload a clear proof of address", detail: "Requested 10 Nov 2026", href: "/portal/documents", urgent: true },
              { title: "Re-upload your October payslip", detail: "Image was unreadable", href: "/portal/documents", urgent: true },
              { title: "Confirm your contact details", detail: "Takes less than a minute", href: "/portal/profile", urgent: false },
            ].map((item) => (
              <Link key={item.title} href={item.href} className="flex items-start gap-3 p-3 rounded-lg border border-divider hover:border-royal/40 hover:bg-primary-50/40 transition-colors">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${item.urgent ? "bg-yellow-100 text-warning" : "bg-royal-50 text-royal"}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-text leading-snug">{item.title}</span>
                  <span className="block text-xs text-text-secondary mt-0.5">{item.detail}</span>
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent documents */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>Recent documents</CardTitle>
              <CardDescription>Latest uploads and review outcomes</CardDescription>
            </div>
            <Link href="/portal/documents" className="text-sm font-semibold text-royal hover:underline shrink-0">View all</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {RECENT_DOCS.map((doc) => (
              <div key={doc.name} className="flex items-center gap-3 p-3 rounded-lg border border-divider">
                <span className="w-9 h-9 rounded-lg bg-primary-50 text-primary flex items-center justify-center shrink-0">
                  <StatIcon kind="file" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text truncate">{doc.name}</p>
                  <p className="text-xs text-text-secondary">Uploaded {doc.date}</p>
                </div>
                <DocStatus status={doc.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming steps */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming steps</CardTitle>
            <CardDescription>What happens next</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="relative border-l border-divider ml-2 space-y-5">
              {[
                { title: "Case file completion", date: "Week of 24 Nov 2026", done: false },
                { title: "Legal-process guidance", date: "December 2026", done: false },
                { title: "Completion documentation", date: "After legal process", done: false },
              ].map((step) => (
                <li key={step.title} className="pl-5 relative">
                  <span className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-surface border-2 border-royal" />
                  <p className="text-sm font-semibold text-text">{step.title}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{step.date}</p>
                </li>
              ))}
            </ol>
            <p className="text-[11px] text-text-secondary mt-6 leading-relaxed">
              Timelines are targets, not guarantees. Progress depends on complete documentation and third-party processing.
            </p>
          </CardContent>
        </Card>
      </div>

      <Alert variant="warning" title="Important notice">
        {COMPLIANCE_DISCLAIMER}
      </Alert>

      <p className="text-center text-[11px] text-text-secondary">
        Demo preview — all figures and records on this page are sample data. Live database and authentication wiring is pending.
      </p>
    </div>
  );
}
