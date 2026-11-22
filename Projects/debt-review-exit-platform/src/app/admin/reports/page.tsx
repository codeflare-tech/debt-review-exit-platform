"use client";

import { useToast, Badge, Button, Card, CardContent, Alert } from "@/components/ui";

const MONTHLY = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 55 },
  { month: "Mar", value: 61 },
  { month: "Apr", value: 48 },
  { month: "May", value: 70 },
  { month: "Jun", value: 66 },
  { month: "Jul", value: 82 },
  { month: "Aug", value: 74 },
  { month: "Sep", value: 91 },
  { month: "Oct", value: 104 },
  { month: "Nov", value: 118 },
];

const STATUS_VOLUMES = [
  { status: "In progress", count: 58, share: "39%", variant: "primary" as const },
  { status: "Document review", count: 37, share: "25%", variant: "warning" as const },
  { status: "Awaiting approval", count: 24, share: "16%", variant: "royal" as const },
  { status: "Completed", count: 21, share: "14%", variant: "success" as const },
  { status: "On hold", count: 8, share: "6%", variant: "error" as const },
];

const REVENUE = [
  { pkg: "Standard", cases: 58, disclosed: "R261,000", collected: "R0", note: "Gated" },
  { pkg: "Comprehensive", cases: 62, disclosed: "R483,600", collected: "R0", note: "Gated" },
  { pkg: "Premium", cases: 28, disclosed: "R350,000", collected: "R0", note: "Gated" },
];

const TURNAROUND = [
  { category: "Identity document", avg: "1.2 days", reviewed: 214, sla: "Within 2 days" },
  { category: "Proof of address", avg: "1.8 days", reviewed: 168, sla: "Within 2 days" },
  { category: "Bank statement", avg: "2.4 days", reviewed: 141, sla: "Within 3 days" },
  { category: "Proof of income", avg: "1.6 days", reviewed: 132, sla: "Within 2 days" },
];

const DONUT = [
  { label: "Standard", value: 58, color: "#315FEA" },
  { label: "Comprehensive", value: 62, color: "#20B99A" },
  { label: "Premium", value: 28, color: "#101D35" },
];

export default function AdminReportsPage() {
  const { pushToast } = useToast();
  const max = Math.max(...MONTHLY.map((m) => m.value));
  const donutTotal = DONUT.reduce((a, d) => a + d.value, 0);
  const circumference = 2 * Math.PI * 60;
  let running = 0;
  const donutSegments = DONUT.map((d) => {
    const length = (d.value / donutTotal) * circumference;
    const segment = { ...d, dash: `${length} ${circumference - length}`, offset: -running, pct: Math.round((d.value / donutTotal) * 100) };
    running += length;
    return segment;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-text">Reports</h1>
          <p className="text-sm text-text-secondary mt-1">Case, fee and document-turnaround reporting.</p>
        </div>
        <Button size="sm" onClick={() => pushToast({ type: "info", title: "Report generation is a demo preview", description: "No file was produced." })}>
          Generate report
        </Button>
      </div>

      <Alert variant="info" title="Demo preview">
        All charts and tables are built from realistic sample data. Live reporting against the database is not yet
        connected, and no amounts shown represent collected payments.
      </Alert>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-text">Case intake by month</h2>
              <p className="text-xs text-text-secondary mt-1">New cases opened, rolling 11 months.</p>
            </div>
            <Badge variant="primary" size="sm">2026</Badge>
          </div>
          <div className="flex items-end gap-2 sm:gap-3 h-52 border-b border-divider pb-0">
            {MONTHLY.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center justify-end gap-2 group">
                <span className="text-[10px] font-semibold text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                  {m.value}
                </span>
                <div
                  className="w-full rounded-t-md bg-royal hover:bg-primary transition-colors"
                  style={{ height: `${(m.value / max) * 100}%` }}
                  title={`${m.month}: ${m.value} cases`}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 sm:gap-3 mt-2">
            {MONTHLY.map((m) => (
              <span key={m.month} className="flex-1 text-center text-[10px] text-text-secondary">{m.month}</span>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-base font-semibold text-text">Cases by package</h2>
          <p className="text-xs text-text-secondary mt-1 mb-4">Mix across the three service tiers.</p>
          <div className="flex items-center gap-5">
            <svg viewBox="0 0 160 160" className="w-36 h-36 shrink-0" role="img" aria-label="Donut chart of cases by package">
              <circle cx="80" cy="80" r="60" fill="none" stroke="var(--color-primary-50)" strokeWidth={18} />
              {donutSegments.map((s) => (
                <circle
                  key={s.label}
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke={s.color}
                  strokeWidth={18}
                  strokeDasharray={s.dash}
                  strokeDashoffset={s.offset}
                  transform="rotate(-90 80 80)"
                />
              ))}
              <text x="80" y="76" textAnchor="middle" className="fill-text" fontSize="22" fontWeight="700">{donutTotal}</text>
              <text x="80" y="94" textAnchor="middle" className="fill-text-secondary" fontSize="10">cases</text>
            </svg>
            <ul className="space-y-3 flex-1">
              {DONUT.map((d) => (
                <li key={d.label} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-text-secondary flex-1">{d.label}</span>
                  <span className="font-semibold text-text">{Math.round((d.value / donutTotal) * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="px-5 py-4 border-b border-divider">
          <h2 className="text-base font-semibold text-text">Case volumes by status</h2>
          <p className="text-xs text-text-secondary mt-1">Current distribution across the active pipeline.</p>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-primary-50/50">
                <tr className="border-b border-divider">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Cases</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Share</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Distribution</th>
                </tr>
              </thead>
              <tbody>
                {STATUS_VOLUMES.map((r) => (
                  <tr key={r.status} className="border-b border-divider/60 hover:bg-primary-50/30">
                    <td className="px-4 py-3"><Badge variant={r.variant} size="sm">{r.status}</Badge></td>
                    <td className="px-4 py-3 text-sm font-semibold text-text">{r.count}</td>
                    <td className="px-4 py-3 text-xs text-text-secondary">{r.share}</td>
                    <td className="px-4 py-3">
                      <div className="w-full max-w-xs h-2 rounded-full bg-primary-50 overflow-hidden">
                        <div className="h-full rounded-full bg-teal" style={{ width: r.share }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b border-divider">
            <h2 className="text-base font-semibold text-text">Revenue by package</h2>
            <p className="text-xs text-text-secondary mt-1">Disclosed fee values. Collected amounts remain R0 while workflows are gated.</p>
          </div>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-primary-50/50">
                  <tr className="border-b border-divider">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Package</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Cases</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Disclosed</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Collected</th>
                  </tr>
                </thead>
                <tbody>
                  {REVENUE.map((r) => (
                    <tr key={r.pkg} className="border-b border-divider/60 hover:bg-primary-50/30">
                      <td className="px-4 py-3 text-sm font-medium text-text">{r.pkg}</td>
                      <td className="px-4 py-3 text-xs text-text-secondary">{r.cases}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-text">{r.disclosed}</td>
                      <td className="px-4 py-3"><Badge variant="default" size="sm">{r.collected} · {r.note}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b border-divider">
            <h2 className="text-base font-semibold text-text">Document turnaround</h2>
            <p className="text-xs text-text-secondary mt-1">Average review time by document category.</p>
          </div>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-primary-50/50">
                  <tr className="border-b border-divider">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Avg. time</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Reviewed</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Target</th>
                  </tr>
                </thead>
                <tbody>
                  {TURNAROUND.map((r) => (
                    <tr key={r.category} className="border-b border-divider/60 hover:bg-primary-50/30">
                      <td className="px-4 py-3 text-sm font-medium text-text">{r.category}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-text">{r.avg}</td>
                      <td className="px-4 py-3 text-xs text-text-secondary">{r.reviewed}</td>
                      <td className="px-4 py-3 text-xs text-teal">{r.sla}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
