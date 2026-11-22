"use client";

import { useState } from "react";
import { Badge, Card, CardContent, CardHeader, CardTitle, Alert, Select } from "@/components/ui";

type Msg = { id: number; from: "them" | "me"; author: string; body: string; time: string };

const INITIAL: Msg[] = [
  { id: 1, from: "them", author: "Thandi Mokoena (Case Manager)", body: "Hi, welcome to your case. I've reviewed your eligibility assessment and everything looks in order. Next we need your proof of address and latest payslip.", time: "12 Nov · 09:14" },
  { id: 2, from: "me", author: "You", body: "Thank you, Thandi. I've uploaded my ID already. Will the bank statement work as proof of address?", time: "12 Nov · 10:02" },
  { id: 3, from: "them", author: "Thandi Mokoena (Case Manager)", body: "Yes, a bank statement from the last three months is perfect. Please make sure your name and address are visible.", time: "12 Nov · 10:20" },
  { id: 4, from: "them", author: "Document Review Team", body: "Your October payslip was illegible. Could you upload a clearer copy at your convenience?", time: "08 Nov · 14:35" },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [draft, setDraft] = useState("");
  const [recipient, setRecipient] = useState("case-manager");

  const recipients = [
    { value: "case-manager", label: "Thandi Mokoena (Case Manager)" },
    { value: "doc-review", label: "Document Review Team" },
    { value: "support", label: "Customer Support" },
  ];

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const label = recipients.find((r) => r.value === recipient)?.label ?? "Case team";
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "me", author: "You", body: text, time: new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setDraft("");
    // recipient is captured for future API wiring; label kept for honest preview
    void label;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Messages</h1>
        <p className="text-sm mt-1">Secure communication with your case team.</p>
      </div>

      <Alert variant="info" title="Demo preview">
        Messages are stored in this browser session only. Secure messaging will be connected to the database once backend wiring is complete.
      </Alert>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Conversation</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-xl px-4 py-3 ${m.from === "me" ? "bg-royal text-white" : "bg-primary-50 text-text"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold ${m.from === "me" ? "text-white/80" : "text-royal"}`}>{m.author}</span>
                        <span className={`text-xs ${m.from === "me" ? "text-white/60" : "text-text-secondary"}`}>{m.time}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{m.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={send} className="mt-6 pt-5 border-t border-divider">
                <div className="mb-3 max-w-xs">
                  <Select label="To" options={recipients} value={recipient} onChange={(e) => setRecipient(e.target.value)} />
                </div>
                <label htmlFor="msg" className="block text-sm font-semibold mb-2">Your message</label>
                <textarea
                  id="msg"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={3}
                  placeholder="Type your message..."
                  className="w-full rounded-lg border border-divider bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal"
                />
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-text-secondary">Demo only — no message leaves your browser.</p>
                  <button type="submit" className="inline-flex items-center gap-2 bg-royal text-white text-sm font-semibold px-5 py-2.5 rounded-lg">
                    Send message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Your team</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recipients.map((r, i) => (
                  <li key={r.value} className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-royal-50 text-royal flex items-center justify-center text-sm font-bold">{["TM", "DR", "CS"][i]}</span>
                    <div>
                      <p className="text-sm font-semibold">{r.label}</p>
                      <p className="text-xs text-text-secondary">{i === 0 ? "Available · replies within 1 business day" : " Replies within 2 business days"}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Need urgent help?</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm">For urgent matters, email us directly and mark your subject &ldquo;Urgent&rdquo;.</p>
              <Badge variant="teal" size="sm" className="mt-3">Response target: 1 business day</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
