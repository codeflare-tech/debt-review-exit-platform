"use client";

import { useToast, Badge, Button, Card, CardHeader, CardTitle, CardContent, Alert, Table, TableHead, TableRow, TableHeader, TableCell } from "@/components/ui";

type IconName = "folder" | "file" | "users" | "wallet" | "check" | "clock" | "upload" | "user" | "chart" | "plus" | "download" | "arrow";

function Icon({ name, className = "w-5 h-5" }: { name: IconName; className?: string }) {
  const p = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "folder":
      return <svg {...p}><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /></svg>;
    case "file":
      return <svg {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h6" /></svg>;
    case "users":
      return <svg {...p}><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.87" /></svg>;
    case "wallet":
      return <svg {...p}><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M16 15h2" /></svg>;
    case "check":
      return <svg {...p}><path d="M20 6L9 17l-5-5" /></svg>;
    case "clock":
      return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case "upload":
      return <svg {...p}><path d="M12 16V4m0 0L7 9m5-5l5 5M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" /></svg>;
    case "user":
      return <svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21v-2a6 6 0 0112 0v2" /></svg>;
    case "chart":
      return <svg {...p}><path d="M3 3v18h18" /><path d="M7 16l4-5 3 3 5-7" /></svg>;
    case "plus":
      return <svg {...p}><path d="M12 5v14M5 12h14" /></svg>;
    case "download":
      return <svg {...p}><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" /></svg>;
    case "arrow":
      return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
  }
}

type CaseStatus = "In progress" | "Document review" | "Awaiting approval" | "Completed" | "On hold";

interface CaseRow {
  ref: string;
  client: string;
  initials: string;
  pkg: string;
  status: CaseStatus;
  manager: string;
  updated: string;
}

const CASES: CaseRow[] = [
  { ref: "DRX-2041", client: "Thabo Mokoena", initials: "TM", pkg: "Comprehensive", status: "Document review", manager: "Lerato Ndlovu", updated: "2 h ago" },
  { ref: "DRX-2040", client: "Nomsa Dlamini", initials: "ND", pkg: "Premium", status: "In progress", manager: "Sipho Khumalo", updated: "5 h ago" },
  { ref: "DRX-2039", client: "Pieter van Wyk", initials: "PV", pkg: "Standard", status: "Awaiting approval", manager: "Lerato Ndlovu", updated: "Yesterday" },
  { ref: "DRX-2038", client: "Aisha Patel", initials: "AP", pkg: "Comprehensive", status: "In progress", manager: "Daniel Erasmus", updated: "Yesterday" },
  { ref: "DRX-2037", client: "Sanele Zulu", initials: "SZ", pkg: "Standard", status: "Completed", manager: "Sipho Khumalo", updated: "2 days ago" },
  { ref: "DRX-2036", client: "Maria Botha", initials: "MB", pkg: "Premium", status: "On hold", manager: "Daniel Erasmus", updated: "3 days ago" },
];

const BADGE_VARIANT: Record<CaseStatus, "royal" | "warning" | "primary" | "success" | "error"> = {
  "In progress": "primary",
  "Document review": "warning",
  "Awaiting approval": "royal",
  "Completed": "success",
  "On hold": "error",
};

const KPIS: { label: string; value: string; sub: string; icon: IconName; tone: string }[] = [
  { label: "Active cases", value: "148", sub: "+12 this month", icon: "folder", tone: "bg-royal-50 text-royal" },
  { label: "Pending documents", value: "37", sub: "9 need review", icon: "file", tone: "bg-yellow-50 text-warning" },
  { label: "Clients", value: "1,264", sub: "+48 this month", icon: "users", tone: "bg-teal-50 text-teal" },
  { label: "Revenue (demo)", value: "R842k", sub: "Disclosed fees only", icon: "wallet", tone: "bg-primary-50 text-primary" },
];

const ACTIVITY = [
  { icon: "upload" as IconName, tone: "bg-royal-50 text-royal", title: "Document uploaded", body: "Proof of address · DRX-2041", time: "12 min ago" },
  { icon: "check" as IconName, tone: "bg-teal-50 text-teal", title: "Document approved", body: "ID copy · DRX-2039", time: "48 min ago" },
  { icon: "user" as IconName, tone: "bg-primary-50 text-primary", title: "Case manager assigned", body: "Sipho Khumalo · DRX-2040", time: "2 h ago" },
  { icon: "clock" as IconName, tone: "bg-yellow-50 text-warning", title: "Status changed", body: "DRX-2038 → Document review", time: "4 h ago" },
  { icon: "chart" as IconName, tone: "bg-royal-50 text-royal", title: "Fee disclosure accepted", body: "Client signature · DRX-2035", time: "Yesterday" },
];

export default function AdminOverviewPage() {
  const { pushToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-text">Overview</h1>
          <p className="text-sm text-text-secondary mt-1">
            Welcome back. Here is a snapshot of the console.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" leftIcon={<Icon name="download" className="w-4 h-4" />}
            onClick={() => pushToast({ type: "success", title: "Snapshot prepared (demo)", description: "No file was generated." })}>
            Export snapshot
          </Button>
          <Button size="sm" leftIcon={<Icon name="plus" className="w-4 h-4" />}
            onClick={() => pushToast({ type: "info", title: "New case flow is a demo preview", description: "Case creation is not connected yet." })}>
            New case
          </Button>
        </div>
      </div>

      <Alert variant="info" title="Demo preview">
        Figures on this page are realistic demo data. Live database, authentication and RBAC wiring are being
        finalised, so no values here represent real clients, cases or transactions.
      </Alert>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((k) => (
          <Card key={k.label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">{k.label}</p>
                <p className="text-3xl font-heading font-bold text-text mt-3">{k.value}</p>
              </div>
              <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${k.tone}`}>
                <Icon name={k.icon} className="w-5 h-5" />
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
              {k.sub}
            </p>
          </Card>
        ))}
      </section>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Recent cases</CardTitle>
              <p className="text-xs text-text-secondary mt-1">Latest activity across the case pipeline.</p>
            </div>
            <button
              type="button"
              onClick={() => pushToast({ type: "info", title: "Full case list is a demo preview" })}
              className="text-sm font-semibold text-royal hover:underline inline-flex items-center gap-1"
            >
              View all <Icon name="arrow" className="w-4 h-4" />
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHead>
                <TableHeader>Case</TableHeader>
                <TableHeader>Client</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Updated</TableHeader>
              </TableHead>
              <tbody>
                {CASES.slice(0, 5).map((c) => (
                  <TableRow key={c.ref}>
                    <TableCell className="font-mono text-xs font-semibold text-royal">{c.ref}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-primary-50 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                          {c.initials}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-text truncate">{c.client}</p>
                          <p className="text-[11px] text-text-secondary">{c.pkg}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={BADGE_VARIANT[c.status]} size="sm">{c.status}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-text-secondary whitespace-nowrap">{c.updated}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Activity feed</CardTitle>
            <p className="text-xs text-text-secondary mt-1">Most recent console events.</p>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-divider">
              {ACTIVITY.map((a, i) => (
                <li key={i} className="flex gap-3 px-5 py-3.5">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${a.tone}`}>
                    <Icon name={a.icon} className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text">{a.title}</p>
                    <p className="text-xs text-text-secondary mt-0.5 truncate">{a.body}</p>
                    <p className="text-[11px] text-text-secondary/70 mt-1">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-text">Quick actions</h2>
            <p className="text-xs text-text-secondary mt-1">Common tasks. Actions are simulated in preview.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Review queue", icon: "file" as IconName },
            { label: "Assign manager", icon: "user" as IconName },
            { label: "Run report", icon: "chart" as IconName },
            { label: "Invite staff", icon: "plus" as IconName },
          ].map((q) => (
            <button
              key={q.label}
              type="button"
              onClick={() => pushToast({ type: "info", title: `${q.label} is a demo preview`, description: "No backend action was performed." })}
              className="flex flex-col items-start gap-3 p-4 rounded-lg border border-divider bg-surface text-left hover:border-royal hover:shadow-md transition-all"
            >
              <span className="w-9 h-9 rounded-lg bg-royal-50 text-royal flex items-center justify-center">
                <Icon name={q.icon} className="w-4 h-4" />
              </span>
              <span className="text-sm font-semibold text-text">{q.label}</span>
            </button>
          ))}
        </div>
      </Card>

      <p className="text-xs text-text-secondary text-center pb-2">
        Independent company · Not affiliated with the NCR, any credit bureau, court or financial institution.
      </p>
    </div>
  );
}
