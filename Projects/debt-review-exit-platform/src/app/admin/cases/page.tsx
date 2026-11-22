"use client";

import { useState } from "react";
import { useToast, Badge, Button, Card, CardContent, Input, Select, Table, TableHead, TableRow, TableHeader, TableCell } from "@/components/ui";

type CaseStatus = "In progress" | "Document review" | "Awaiting approval" | "Completed" | "On hold";

interface CaseRow {
  ref: string;
  client: string;
  initials: string;
  email: string;
  phone: string;
  pkg: string;
  status: CaseStatus;
  manager: string;
  opened: string;
  updated: string;
  progress: number;
  note: string;
}

const CASES: CaseRow[] = [
  { ref: "DRX-2041", client: "Thabo Mokoena", initials: "TM", email: "thabo.mokoena@example.co.za", phone: "+27 82 555 0141", pkg: "Comprehensive", status: "Document review", manager: "Lerato Ndlovu", opened: "2026-10-28", updated: "2026-11-17", progress: 45, note: "Awaiting proof of address re-upload. Follow up in 2 days." },
  { ref: "DRX-2040", client: "Nomsa Dlamini", initials: "ND", email: "nomsa.dlamini@example.co.za", phone: "+27 83 555 0140", pkg: "Premium", status: "In progress", manager: "Sipho Khumalo", opened: "2026-10-24", updated: "2026-11-16", progress: 60, note: "Case file prepared. Legal-process guidance scheduled." },
  { ref: "DRX-2039", client: "Pieter van Wyk", initials: "PV", email: "pieter.vanwyk@example.co.za", phone: "+27 84 555 0139", pkg: "Standard", status: "Awaiting approval", manager: "Lerato Ndlovu", opened: "2026-10-19", updated: "2026-11-15", progress: 75, note: "Fee disclosure accepted; awaiting admin approval before any release." },
  { ref: "DRX-2038", client: "Aisha Patel", initials: "AP", email: "aisha.patel@example.co.za", phone: "+27 72 555 0138", pkg: "Comprehensive", status: "In progress", manager: "Daniel Erasmus", opened: "2026-10-16", updated: "2026-11-14", progress: 30, note: "Initial assessment complete. Documents under review." },
  { ref: "DRX-2037", client: "Sanele Zulu", initials: "SZ", email: "sanele.zulu@example.co.za", phone: "+27 78 555 0137", pkg: "Standard", status: "Completed", manager: "Sipho Khumalo", opened: "2026-09-30", updated: "2026-11-10", progress: 100, note: "Completion documentation issued and verified." },
  { ref: "DRX-2036", client: "Maria Botha", initials: "MB", email: "maria.botha@example.co.za", phone: "+27 71 555 0136", pkg: "Premium", status: "On hold", manager: "Daniel Erasmus", opened: "2026-10-02", updated: "2026-11-08", progress: 20, note: "Client requested a pause pending updated statements." },
  { ref: "DRX-2035", client: "Kwame Mensah", initials: "KM", email: "kwame.mensah@example.co.za", phone: "+27 79 555 0135", pkg: "Comprehensive", status: "Document review", manager: "Lerato Ndlovu", opened: "2026-10-11", updated: "2026-11-07", progress: 40, note: "Bank statements received; review in progress." },
  { ref: "DRX-2034", client: "Elize Hertzog", initials: "EH", email: "elize.hertzog@example.co.za", phone: "+27 76 555 0134", pkg: "Standard", status: "Awaiting approval", manager: "Sipho Khumalo", opened: "2026-10-08", updated: "2026-11-05", progress: 70, note: "Ready for reviewer sign-off." },
];

const STATUSES: (CaseStatus | "All cases")[] = [
  "All cases",
  "In progress",
  "Document review",
  "Awaiting approval",
  "Completed",
  "On hold",
];

const BADGE_VARIANT: Record<CaseStatus, "primary" | "warning" | "royal" | "success" | "error"> = {
  "In progress": "primary",
  "Document review": "warning",
  "Awaiting approval": "royal",
  "Completed": "success",
  "On hold": "error",
};

function EyeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function AdminCasesPage() {
  const { pushToast } = useToast();
  const [tab, setTab] = useState<CaseStatus | "All cases">("All cases");
  const [query, setQuery] = useState("");
  const [pkg, setPkg] = useState("all");
  const [selected, setSelected] = useState<CaseRow | null>(null);

  const q = query.trim().toLowerCase();
  const filtered = CASES.filter((c) => {
    const statusMatch = tab === "All cases" || c.status === tab;
    const pkgMatch = pkg === "all" || c.pkg === pkg;
    const textMatch =
      !q ||
      c.ref.toLowerCase().includes(q) ||
      c.client.toLowerCase().includes(q) ||
      c.manager.toLowerCase().includes(q);
    return statusMatch && pkgMatch && textMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-text">Cases</h1>
          <p className="text-sm text-text-secondary mt-1">Track case files, managers and stage progress.</p>
        </div>
        <Button size="sm" leftIcon={<span className="text-base leading-none">+</span>}
          onClick={() => pushToast({ type: "info", title: "Case creation is a demo preview", description: "No case was created." })}>
          Create case
        </Button>
      </div>

      <p className="text-xs text-text-secondary bg-primary-50 border border-divider rounded-lg px-4 py-2.5">
        Demo preview — the records below are realistic sample data. Live case data will appear once the database and RBAC integration is complete.
      </p>

      <Card className="overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border-b border-divider">
          <div className="flex flex-wrap gap-1.5">
            {STATUSES.map((s) => {
              const count = s === "All cases" ? CASES.length : CASES.filter((c) => c.status === s).length;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setTab(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    tab === s
                      ? "bg-primary text-white"
                      : "bg-background text-text-secondary hover:text-text hover:bg-primary-50"
                  }`}
                >
                  {s} <span className={tab === s ? "text-white/60" : "text-text-secondary/60"}>({count})</span>
                </button>
              );
            })}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <div className="w-full sm:w-64">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reference, client or manager…"
                aria-label="Search cases"
              />
            </div>
            <div className="w-full sm:w-44">
              <Select
                value={pkg}
                onChange={(e) => setPkg(e.target.value)}
                options={[
                  { value: "all", label: "All packages" },
                  { value: "Standard", label: "Standard" },
                  { value: "Comprehensive", label: "Comprehensive" },
                  { value: "Premium", label: "Premium" },
                ]}
                aria-label="Filter by package"
              />
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          <Table>
            <TableHead>
              <TableHeader>Case</TableHeader>
              <TableHeader>Client</TableHeader>
              <TableHeader>Package</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Case manager</TableHeader>
              <TableHeader>Opened</TableHeader>
              <TableHeader><span className="block text-right">Action</span></TableHeader>
            </TableHead>
            <tbody>
              {filtered.map((c) => (
                <TableRow key={c.ref}>
                  <TableCell className="font-mono text-xs font-semibold text-royal whitespace-nowrap">{c.ref}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-primary-50 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                        {c.initials}
                      </span>
                      <span className="text-sm font-medium whitespace-nowrap">{c.client}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">{c.pkg}</TableCell>
                  <TableCell><Badge variant={BADGE_VARIANT[c.status]} size="sm">{c.status}</Badge></TableCell>
                  <TableCell className="text-xs whitespace-nowrap">{c.manager}</TableCell>
                  <TableCell className="text-xs text-text-secondary whitespace-nowrap">{c.opened}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" leftIcon={<EyeIcon />} onClick={() => setSelected(c)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm font-semibold text-text">No cases match your filters</p>
              <p className="text-xs text-text-secondary mt-1">Try a different status, package or search term.</p>
              <Button variant="ghost" size="sm" className="mt-3" onClick={() => { setTab("All cases"); setQuery(""); setPkg("all"); }}>
                Clear filters
              </Button>
            </div>
          )}
        </CardContent>
        <div className="px-4 py-3 border-t border-divider text-xs text-text-secondary">
          Showing {filtered.length} of {CASES.length} cases
        </div>
      </Card>

      {selected && (
        <div className="fixed inset-0 z-[1200] flex justify-end bg-black/40 animate-fade-in" onClick={() => setSelected(null)}>
          <div
            className="h-full w-full max-w-lg bg-surface shadow-xl overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Case ${selected.ref} details`}
          >
            <div className="flex items-start justify-between p-6 border-b border-divider">
              <div>
                <p className="text-xs font-mono font-semibold text-royal">{selected.ref}</p>
                <h2 className="text-xl font-heading font-bold text-text mt-1">{selected.client}</h2>
                <div className="mt-2"><Badge variant={BADGE_VARIANT[selected.status]} size="sm">{selected.status}</Badge></div>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-text-secondary hover:text-text p-1.5 rounded-lg hover:bg-primary-50"
                aria-label="Close case details"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { l: "Package", v: selected.pkg },
                  { l: "Case manager", v: selected.manager },
                  { l: "Opened", v: selected.opened },
                  { l: "Last updated", v: selected.updated },
                  { l: "Email", v: selected.email },
                  { l: "Phone", v: selected.phone },
                ].map((f) => (
                  <div key={f.l}>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">{f.l}</p>
                    <p className="text-sm text-text mt-1 break-words">{f.v}</p>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-text">Progress</p>
                  <span className="text-sm font-bold text-royal">{selected.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-primary-50 overflow-hidden">
                  <div className="h-full rounded-full bg-teal transition-all" style={{ width: `${selected.progress}%` }} />
                </div>
              </div>

              <div className="rounded-lg bg-background border border-divider p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Internal note</p>
                <p className="text-sm text-text mt-1.5 leading-relaxed">{selected.note}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button size="sm" onClick={() => pushToast({ type: "info", title: "Status updates are a demo preview" })}>
                  Update status
                </Button>
                <Button variant="outline" size="sm" onClick={() => pushToast({ type: "info", title: "Messaging is a demo preview" })}>
                  Message client
                </Button>
                <Button variant="ghost" size="sm" onClick={() => pushToast({ type: "info", title: "Case notes are a demo preview" })}>
                  Add note
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
