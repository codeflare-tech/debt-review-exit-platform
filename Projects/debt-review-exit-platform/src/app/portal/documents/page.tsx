"use client";

import { useState } from "react";
import { Badge, Card, CardContent, CardHeader, CardTitle, Alert, FileUploader, type FileItem } from "@/components/ui";

type DocState = "approved" | "pending_review" | "needs_attention";

const CHECKLIST: { id: string; name: string; description: string; required: boolean; state: DocState | null }[] = [
  { id: "id", name: "Identity document", description: "Certified copy of your ID or passport", required: true, state: "approved" },
  { id: "address", name: "Proof of address", description: "Utility bill or bank statement (last 3 months)", required: true, state: "pending_review" },
  { id: "payslip", name: "Proof of income", description: "Latest payslip or bank statements", required: true, state: "needs_attention" },
  { id: "statement", name: "Debt reviewer statement", description: "Current statement from your debt counsellor", required: true, state: "approved" },
  { id: "court", name: "Court order (if applicable)", description: "Any relevant court documentation", required: false, state: null },
  { id: "clearance", name: "Clearance letter (if applicable)", description: "Any clearance correspondence", required: false, state: null },
];

function DocBadge({ state }: { state: DocState | null }) {
  if (!state) return <Badge variant="ghost" size="sm">Not uploaded</Badge>;
  if (state === "approved") return <Badge variant="success" size="sm">Approved</Badge>;
  if (state === "needs_attention") return <Badge variant="error" size="sm">Needs attention</Badge>;
  return <Badge variant="warning" size="sm">Pending review</Badge>;
}

export default function DocumentsPage() {
  const [tab, setTab] = useState<"all" | DocState | "missing">("all");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploadTarget, setUploadTarget] = useState<string | null>(null);

  const visible = CHECKLIST.filter((d) => {
    if (tab === "all") return true;
    if (tab === "missing") return d.state === null;
    return d.state === tab;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Documents</h1>
        <p className="text-sm mt-1">Upload, track and manage the documents for your case. 4 of 6 required documents received.</p>
      </div>

      <Alert variant="info" title="Demo preview">
        Uploads are held locally in this preview and are not stored on a server yet. File storage integration is pending configuration.
      </Alert>

      <div className="flex flex-wrap gap-2">
        {(["all", "approved", "pending_review", "needs_attention", "missing"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-sm font-semibold px-4 py-2 rounded-lg border transition-colors ${
              tab === t ? "bg-primary text-white border-primary" : "bg-surface text-text-secondary border-divider hover:border-royal"
            }`}
          >
            {t === "all" ? "All documents" : t === "pending_review" ? "Pending review" : t === "needs_attention" ? "Needs attention" : t === "missing" ? "Not uploaded" : "Approved"}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Document checklist</CardTitle></CardHeader>
        <CardContent>
          <div className="divide-y divide-divider">
            {visible.map((d) => (
              <div key={d.id} className="py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{d.name}</p>
                    {d.required && <span className="text-xs text-error">Required</span>}
                  </div>
                  <p className="text-sm text-text-secondary">{d.description}</p>
                </div>
                <DocBadge state={d.state} />
                <button
                  onClick={() => setUploadTarget(uploadTarget === d.id ? null : d.id)}
                  className="text-sm font-semibold text-royal hover:underline px-2"
                >
                  {d.state ? "Replace" : "Upload"}
                </button>
              </div>
            ))}
            {visible.length === 0 && <p className="py-8 text-center text-sm text-text-secondary">No documents in this category.</p>}
          </div>
        </CardContent>
      </Card>

      {uploadTarget && (
        <Card>
          <CardHeader>
            <CardTitle>Upload — {CHECKLIST.find((d) => d.id === uploadTarget)?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUploader
              files={files}
              onFilesSelected={(newFiles) => {
                setFiles((prev) => [
                  ...prev,
                  ...newFiles.map((f) => ({
                    id: `${Date.now()}-${f.name}`,
                    name: f.name,
                    size: f.size,
                    category: CHECKLIST.find((d) => d.id === uploadTarget)?.name ?? "Other",
                    status: "done" as const,
                    progress: 100,
                  })),
                ]);
              }}
            />
            <p className="mt-3 text-xs text-text-secondary">Accepted: PDF, JPG, PNG, DOC, DOCX · Max 25 MB per file.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
