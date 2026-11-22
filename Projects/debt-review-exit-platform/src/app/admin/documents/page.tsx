"use client";

import { useState } from "react";
import { useToast, Badge, Button, Card, CardContent, Table, TableHead, TableRow, TableHeader, TableCell } from "@/components/ui";

type ReviewState = "Pending review" | "Approved" | "Rejected" | "Resubmitted";

interface DocRow {
  id: string;
  file: string;
  client: string;
  initials: string;
  category: string;
  caseRef: string;
  size: string;
  uploaded: string;
  state: ReviewState;
}

const INITIAL_DOCS: DocRow[] = [
  { id: "d1", file: "proof-of-address.pdf", client: "Thabo Mokoena", initials: "TM", category: "Proof of address", caseRef: "DRX-2041", size: "1.2 MB", uploaded: "2026-11-17", state: "Pending review" },
  { id: "d2", file: "id-copy-front.jpg", client: "Nomsa Dlamini", initials: "ND", category: "Identity document", caseRef: "DRX-2040", size: "840 KB", uploaded: "2026-11-17", state: "Pending review" },
  { id: "d3", file: "bank-statement-oct.pdf", client: "Pieter van Wyk", initials: "PV", category: "Bank statement", caseRef: "DRX-2039", size: "2.4 MB", uploaded: "2026-11-16", state: "Resubmitted" },
  { id: "d4", file: "payslip-nov.pdf", client: "Aisha Patel", initials: "AP", category: "Proof of income", caseRef: "DRX-2038", size: "620 KB", uploaded: "2026-11-16", state: "Pending review" },
  { id: "d5", file: "id-copy-back.jpg", client: "Sanele Zulu", initials: "SZ", category: "Identity document", caseRef: "DRX-2037", size: "910 KB", uploaded: "2026-11-15", state: "Approved" },
  { id: "d6", file: "municipal-letter.pdf", client: "Maria Botha", initials: "MB", category: "Proof of address", caseRef: "DRX-2036", size: "1.1 MB", uploaded: "2026-11-14", state: "Rejected" },
  { id: "d7", file: "bank-statement-sep.pdf", client: "Kwame Mensah", initials: "KM", category: "Bank statement", caseRef: "DRX-2035", size: "3.0 MB", uploaded: "2026-11-13", state: "Pending review" },
];

const BADGE_VARIANT: Record<ReviewState, "warning" | "success" | "error" | "royal"> = {
  "Pending review": "warning",
  Approved: "success",
  Rejected: "error",
  Resubmitted: "royal",
};

const FILTERS: ("All documents" | ReviewState)[] = [
  "All documents",
  "Pending review",
  "Resubmitted",
  "Approved",
  "Rejected",
];

function CheckIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>;
}
function XIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>;
}
function FileIcon() {
  return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg>;
}

export default function AdminDocumentsPage() {
  const { pushToast } = useToast();
  const [docs, setDocs] = useState<DocRow[]>(INITIAL_DOCS);
  const [filter, setFilter] = useState<"All documents" | ReviewState>("All documents");

  const pending = docs.filter((d) => d.state === "Pending review" || d.state === "Resubmitted").length;
  const approved = docs.filter((d) => d.state === "Approved").length;
  const rejected = docs.filter((d) => d.state === "Rejected").length;

  const filtered = filter === "All documents" ? docs : docs.filter((d) => d.state === filter);

  const decide = (id: string, file: string, next: ReviewState) => {
    setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, state: next } : d)));
    pushToast({
      type: next === "Approved" ? "success" : "error",
      title: next === "Approved" ? "Document approved" : "Document rejected",
      description: `${file} · demo preview only`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-text">Documents</h1>
        <p className="text-sm text-text-secondary mt-1">Review uploaded documents and record a decision.</p>
      </div>

      <p className="text-xs text-text-secondary bg-primary-50 border border-divider rounded-lg px-4 py-2.5">
        Demo preview — approvals and rejections update this screen only. No file is accepted or stored and no
        client is notified; live review workflow is pending integration.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Awaiting review", value: pending, tone: "bg-yellow-50 text-warning" },
          { label: "Approved", value: approved, tone: "bg-teal-50 text-teal" },
          { label: "Rejected", value: rejected, tone: "bg-red-50 text-error" },
        ].map((s) => (
          <Card key={s.label} className="p-4 flex items-center gap-4">
            <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.tone}`}>
              <FileIcon />
            </span>
            <div>
              <p className="text-2xl font-heading font-bold text-text">{s.value}</p>
              <p className="text-xs text-text-secondary">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap gap-1.5 p-4 border-b border-divider">
          {FILTERS.map((f) => {
            const count = f === "All documents" ? docs.length : docs.filter((d) => d.state === f).length;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filter === f
                    ? "bg-primary text-white"
                    : "bg-background text-text-secondary hover:text-text hover:bg-primary-50"
                }`}
              >
                {f} <span className={(filter === f ? "text-white/60" : "text-text-secondary/60")}>({count})</span>
              </button>
            );
          })}
        </div>

        <CardContent className="p-0">
          <Table>
            <TableHead>
              <TableHeader>File</TableHeader>
              <TableHeader>Client / case</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Uploaded</TableHeader>
              <TableHeader>Review state</TableHeader>
              <TableHeader><span className="block text-right">Decision</span></TableHeader>
            </TableHead>
            <tbody>
              {filtered.map((d) => {
                const actionable = d.state === "Pending review" || d.state === "Resubmitted";
                return (
                  <TableRow key={d.id}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center shrink-0">
                          <FileIcon />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-text truncate max-w-[220px]">{d.file}</p>
                          <p className="text-[11px] text-text-secondary">{d.size}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-royal-50 text-royal text-[10px] font-bold flex items-center justify-center shrink-0">
                          {d.initials}
                        </span>
                        <div>
                          <p className="text-xs font-medium whitespace-nowrap">{d.client}</p>
                          <p className="text-[11px] font-mono text-text-secondary">{d.caseRef}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs whitespace-nowrap">{d.category}</TableCell>
                    <TableCell className="text-xs text-text-secondary whitespace-nowrap">{d.uploaded}</TableCell>
                    <TableCell><Badge variant={BADGE_VARIANT[d.state]} size="sm">{d.state}</Badge></TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        {actionable ? (
                          <>
                            <Button variant="secondary" size="sm" leftIcon={<CheckIcon />}
                              onClick={() => decide(d.id, d.file, "Approved")}>
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" leftIcon={<XIcon />}
                              onClick={() => decide(d.id, d.file, "Rejected")}>
                              Reject
                            </Button>
                          </>
                        ) : (
                          <span className="text-xs text-text-secondary">Decision recorded</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm font-semibold text-text">Nothing in this queue</p>
              <p className="text-xs text-text-secondary mt-1">Documents with this review state will appear here.</p>
            </div>
          )}
        </CardContent>
        <div className="px-4 py-3 border-t border-divider text-xs text-text-secondary">
          Showing {filtered.length} of {docs.length} documents
        </div>
      </Card>
    </div>
  );
}
