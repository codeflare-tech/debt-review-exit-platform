"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge, Card, CardContent, CardHeader, CardTitle, Alert, ProgressTrack } from "@/components/ui";

const STAGES = [
  { label: "Eligibility", detail: "Complete" },
  { label: "Documents", detail: "4 of 6 received" },
  { label: "Case file", detail: "In progress" },
  { label: "Legal guidance", detail: "Up next" },
  { label: "Completion", detail: "Pending" },
];

const PHASES = [
  { name: "Assessment & eligibility", state: "done", note: "Completed 02 Nov 2026" },
  { name: "Document collection", state: "active", note: "4 of 6 documents received" },
  { name: "Case file preparation", state: "active", note: "Case manager preparing file" },
  { name: "Legal process guidance", state: "pending", note: "Starts after file is complete" },
  { name: "Completion verification", state: "pending", note: "Final stage" },
];

const TIMELINE = [
  { date: "12 Nov 2026", title: "ID document approved", body: "Your ID copy was reviewed and approved.", kind: "ok" },
  { date: "10 Nov 2026", title: "Proof of address received", body: "Awaiting review by your document reviewer.", kind: "wait" },
  { date: "08 Nov 2026", title: "Payslip needs attention", body: "The October payslip was illegible. Please upload a clearer copy.", kind: "alert" },
  { date: "02 Nov 2026", title: "Case opened", body: "Your case DR-4F2A91 was opened and a case manager assigned.", kind: "ok" },
];

export default function CasePage() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<typeof TIMELINE>(TIMELINE);

  function addNote(e: React.FormEvent) {
    e.preventDefault();
    const text = note.trim();
    if (!text) return;
    setNotes((prev) => [
      { date: new Date().toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric" }), title: "Note from you", body: text, kind: "note" },
      ...prev,
    ]);
    setNote("");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-heading font-bold">My case</h1>
            <Badge variant="teal" size="sm">In progress</Badge>
          </div>
          <p className="text-sm mt-1">Reference DR-4F2A91 · Package A — Standard · Opened 02 Nov 2026</p>
        </div>
        <Link href="/portal/documents" className="inline-flex items-center justify-center bg-royal text-white text-sm font-semibold px-5 py-2.5 rounded-lg">
          Upload documents
        </Link>
      </div>

      <Alert variant="info" title="Demo preview">
        Case data shown here is a realistic preview. Live case records load once backend wiring is complete.
      </Alert>

      <Card>
        <CardHeader><CardTitle>Overall progress</CardTitle></CardHeader>
        <CardContent><ProgressTrack stages={STAGES} currentStage={2} showLabels /></CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Case phases</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-0">
                {PHASES.map((p, i) => (
                  <li key={p.name} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        p.state === "done" ? "bg-teal text-white" : p.state === "active" ? "bg-royal text-white" : "bg-primary-50 text-text-secondary"
                      }`}>
                        {p.state === "done" ? "✓" : i + 1}
                      </span>
                      {i < PHASES.length - 1 && <span className="w-0.5 h-10 bg-divider" />}
                    </div>
                    <div className="pt-1">
                      <p className="text-sm font-semibold">{p.name}</p>
                      <p className="text-xs text-text-secondary">{p.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Case manager</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-royal-50 text-royal flex items-center justify-center font-heading font-bold">TM</span>
                <div>
                  <p className="font-semibold">Thandi Mokoena</p>
                  <p className="text-sm text-text-secondary">Senior Case Manager</p>
                  <p className="text-sm text-text-secondary">thandi.mokoena@example.co.za</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Activity timeline</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {notes.map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                      t.kind === "ok" ? "bg-teal" : t.kind === "alert" ? "bg-error" : t.kind === "note" ? "bg-royal" : "bg-warning"
                    }`} />
                    <div>
                      <p className="text-xs text-text-secondary">{t.date}</p>
                      <p className="text-sm font-semibold">{t.title}</p>
                      <p className="text-sm text-text-secondary">{t.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <form onSubmit={addNote} className="mt-5 pt-5 border-t border-divider">
                <label htmlFor="case-note" className="block text-sm font-semibold mb-2">Add a note</label>
                <textarea
                  id="case-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Write a note to your case manager..."
                  className="w-full rounded-lg border border-divider bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal"
                />
                <button type="submit" className="mt-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg">Add note</button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
