"use client";

import { useToast, Badge, Button, Card, CardContent, Alert, Table, TableHead, TableRow, TableHeader, TableCell } from "@/components/ui";

type PayStatus = "Awaiting acceptance" | "Disclosure accepted" | "Admin approval required" | "Not released";

interface InvoiceRow {
  ref: string;
  client: string;
  caseRef: string;
  pkg: string;
  amount: number;
  status: PayStatus;
  issued: string;
  due: string;
}

const INVOICES: InvoiceRow[] = [
  { ref: "INV-1088", client: "Pieter van Wyk", caseRef: "DRX-2039", pkg: "Standard", amount: 4500, status: "Admin approval required", issued: "2026-11-10", due: "2026-11-24", },
  { ref: "INV-1087", client: "Elize Hertzog", caseRef: "DRX-2034", pkg: "Standard", amount: 4500, status: "Disclosure accepted", issued: "2026-11-08", due: "2026-11-22", },
  { ref: "INV-1086", client: "Nomsa Dlamini", caseRef: "DRX-2040", pkg: "Premium", amount: 12500, status: "Awaiting acceptance", issued: "2026-11-05", due: "2026-11-19", },
  { ref: "INV-1085", client: "Kwame Mensah", caseRef: "DRX-2035", pkg: "Comprehensive", amount: 7800, status: "Not released", issued: "2026-11-02", due: "2026-11-16", },
  { ref: "INV-1084", client: "Thabo Mokoena", caseRef: "DRX-2041", pkg: "Comprehensive", amount: 7800, status: "Awaiting acceptance", issued: "2026-10-30", due: "2026-11-13", },
];

const STATUS_VARIANT: Record<PayStatus, "warning" | "royal" | "primary" | "default"> = {
  "Awaiting acceptance": "warning",
  "Disclosure accepted": "royal",
  "Admin approval required": "primary",
  "Not released": "default",
};

const GATES = [
  { label: "Full fee disclosed in writing", done: true },
  { label: "Client acceptance recorded", done: true },
  { label: "Admin approval of fee release", done: false },
  { label: "Legal sign-off to enable workflows", done: false },
];

export default function AdminFinancePage() {
  const { pushToast } = useToast();
  const disclosed = INVOICES.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-text">Finance</h1>
        <p className="text-sm text-text-secondary mt-1">Fee disclosure, invoices and payment compliance.</p>
      </div>

      <Alert variant="warning" title="Payment workflows are disabled until legal approval">
        <p className="mb-2">
          No payment may be collected, released or processed in this preview. The workflow is gated pending legal
          approval and the live database/RBAC integration. All figures shown are realistic demo data only.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>No upfront deposits, instalments or subscriptions are offered or accepted.</li>
          <li>A full fee disclosure must be provided in writing before any work begins.</li>
          <li>Written client acceptance of the fee must be recorded.</li>
          <li>Explicit administrator approval is required before any fee release.</li>
        </ul>
      </Alert>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Disclosed fees (demo)", value: `R${disclosed.toLocaleString("en-ZA")}`, tone: "text-primary" },
          { label: "Awaiting acceptance", value: String(INVOICES.filter((i) => i.status === "Awaiting acceptance").length), tone: "text-warning" },
          { label: "Awaiting admin approval", value: String(INVOICES.filter((i) => i.status === "Admin approval required").length), tone: "text-royal" },
          { label: "Amount released", value: "R0", tone: "text-teal" },
        ].map((s) => (
          <Card key={s.label} className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">{s.label}</p>
            <p className={`text-2xl font-heading font-bold mt-3 ${s.tone}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="px-5 py-4 border-b border-divider">
            <h2 className="text-base font-semibold text-text">Invoices &amp; payments</h2>
            <p className="text-xs text-text-secondary mt-1">Every row is gated — release is intentionally disabled.</p>
          </div>
          <CardContent className="p-0">
            <Table>
              <TableHead>
                <TableHeader>Invoice</TableHeader>
                <TableHeader>Client / case</TableHeader>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader><span className="block text-right">Action</span></TableHeader>
              </TableHead>
              <tbody>
                {INVOICES.map((i) => (
                  <TableRow key={i.ref}>
                    <TableCell>
                      <p className="text-sm font-medium font-mono text-royal">{i.ref}</p>
                      <p className="text-[11px] text-text-secondary">{i.issued} · due {i.due}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs font-medium whitespace-nowrap">{i.client}</p>
                      <p className="text-[11px] font-mono text-text-secondary">{i.caseRef} · {i.pkg}</p>
                    </TableCell>
                    <TableCell className="text-sm font-semibold whitespace-nowrap">R{i.amount.toLocaleString("en-ZA")}</TableCell>
                    <TableCell><Badge variant={STATUS_VARIANT[i.status]} size="sm">{i.status}</Badge></TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <span
                          title="Disabled: payment release is gated until legal approval, written fee disclosure, client acceptance and admin sign-off are complete."
                          className="inline-block cursor-not-allowed"
                        >
                          <Button variant="outline" size="sm" disabled>Release payment</Button>
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>

        <Card className="p-5">
          <h2 className="text-base font-semibold text-text">Compliance gates</h2>
          <p className="text-xs text-text-secondary mt-1 mb-5">A release requires every gate below to pass.</p>
          <ul className="space-y-4">
            {GATES.map((g) => (
              <li key={g.label} className="flex items-start gap-3">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${g.done ? "bg-teal text-white" : "bg-primary-50 text-text-secondary"}`}>
                  {g.done ? (
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                  ) : (
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 8v5M12 17h.01" /><circle cx="12" cy="12" r="9" /></svg>
                  )}
                </span>
                <div>
                  <p className="text-sm text-text">{g.label}</p>
                  <p className={`text-[11px] mt-0.5 ${g.done ? "text-teal" : "text-text-secondary"}`}>
                    {g.done ? "Recorded (demo)" : "Pending / locked"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-divider">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => pushToast({ type: "info", title: "Approval workflow is a demo preview", description: "No approval or payment action was performed." })}
            >
              Review approval policy
            </Button>
          </div>
        </Card>
      </div>

      <p className="text-xs text-text-secondary text-center pb-2">
        Independent company · Not affiliated with the NCR, any credit bureau, court or financial institution.
        No outcome is guaranteed.
      </p>
    </div>
  );
}
