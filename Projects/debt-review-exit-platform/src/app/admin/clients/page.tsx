"use client";

import { useState } from "react";
import { useToast, Badge, Button, Card, CardContent, Input, Select, Table, TableHead, TableRow, TableHeader, TableCell } from "@/components/ui";

type ClientStatus = "Active" | "Pending" | "Inactive";

interface ClientRow {
  name: string;
  initials: string;
  email: string;
  phone: string;
  status: ClientStatus;
  cases: number;
  joined: string;
  location: string;
}

const CLIENTS: ClientRow[] = [
  { name: "Thabo Mokoena", initials: "TM", email: "thabo.mokoena@example.co.za", phone: "+27 82 555 0141", status: "Active", cases: 1, joined: "2026-10-28", location: "Johannesburg, GP" },
  { name: "Nomsa Dlamini", initials: "ND", email: "nomsa.dlamini@example.co.za", phone: "+27 83 555 0140", status: "Active", cases: 2, joined: "2026-10-24", location: "Durban, KZN" },
  { name: "Pieter van Wyk", initials: "PV", email: "pieter.vanwyk@example.co.za", phone: "+27 84 555 0139", status: "Active", cases: 1, joined: "2026-10-19", location: "Pretoria, GP" },
  { name: "Aisha Patel", initials: "AP", email: "aisha.patel@example.co.za", phone: "+27 72 555 0138", status: "Pending", cases: 1, joined: "2026-10-16", location: "Cape Town, WC" },
  { name: "Sanele Zulu", initials: "SZ", email: "sanele.zulu@example.co.za", phone: "+27 78 555 0137", status: "Active", cases: 1, joined: "2026-09-30", location: "Pietermaritzburg, KZN" },
  { name: "Maria Botha", initials: "MB", email: "maria.botha@example.co.za", phone: "+27 71 555 0136", status: "Inactive", cases: 1, joined: "2026-10-02", location: "Bloemfontein, FS" },
  { name: "Kwame Mensah", initials: "KM", email: "kwame.mensah@example.co.za", phone: "+27 79 555 0135", status: "Active", cases: 2, joined: "2026-10-11", location: "Port Elizabeth, EC" },
  { name: "Elize Hertzog", initials: "EH", email: "elize.hertzog@example.co.za", phone: "+27 76 555 0134", status: "Pending", cases: 1, joined: "2026-10-08", location: "Nelspruit, MP" },
  { name: "Daniel Nkosi", initials: "DN", email: "daniel.nkosi@example.co.za", phone: "+27 60 555 0133", status: "Active", cases: 3, joined: "2026-09-21", location: "Polokwane, LP" },
  { name: "Rene de Beer", initials: "RD", email: "rene.debeer@example.co.za", phone: "+27 65 555 0132", status: "Inactive", cases: 1, joined: "2026-09-15", location: "Kimberley, NC" },
];

const STATUS_VARIANT: Record<ClientStatus, "success" | "warning" | "default"> = {
  Active: "success",
  Pending: "warning",
  Inactive: "default",
};

export default function AdminClientsPage() {
  const { pushToast } = useToast();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const q = query.trim().toLowerCase();
  const filtered = CLIENTS.filter((c) => {
    const statusMatch = status === "all" || c.status === status;
    const textMatch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.location.toLowerCase().includes(q);
    return statusMatch && textMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-text">Clients</h1>
          <p className="text-sm text-text-secondary mt-1">Client directory and linked case counts.</p>
        </div>
        <Button size="sm" variant="outline"
          onClick={() => pushToast({ type: "info", title: "Export is a demo preview", description: "No file was generated." })}>
          Export list
        </Button>
      </div>

      <p className="text-xs text-text-secondary bg-primary-50 border border-divider rounded-lg px-4 py-2.5">
        Demo preview — client details below are realistic sample records, not real people.
      </p>

      <Card className="overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-divider">
          <div className="flex-1">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, phone or location…"
              aria-label="Search clients"
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { value: "all", label: "All statuses" },
                { value: "Active", label: "Active" },
                { value: "Pending", label: "Pending" },
                { value: "Inactive", label: "Inactive" },
              ]}
              aria-label="Filter clients by status"
            />
          </div>
        </div>

        <CardContent className="p-0">
          <Table>
            <TableHead>
              <TableHeader>Client</TableHeader>
              <TableHeader>Contact</TableHeader>
              <TableHeader>Location</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Linked cases</TableHeader>
              <TableHeader>Joined</TableHeader>
            </TableHead>
            <tbody>
              {filtered.map((c) => (
                <TableRow key={c.email}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-royal-50 text-royal text-[11px] font-bold flex items-center justify-center shrink-0">
                        {c.initials}
                      </span>
                      <span className="text-sm font-medium whitespace-nowrap">{c.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-text">{c.email}</p>
                    <p className="text-[11px] text-text-secondary mt-0.5">{c.phone}</p>
                  </TableCell>
                  <TableCell className="text-xs text-text-secondary whitespace-nowrap">{c.location}</TableCell>
                  <TableCell><Badge variant={STATUS_VARIANT[c.status]} size="sm">{c.status}</Badge></TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-text">
                      <span className="w-6 h-6 rounded-md bg-primary-50 text-primary flex items-center justify-center text-[11px]">
                        {c.cases}
                      </span>
                      {c.cases === 1 ? "case" : "cases"}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-text-secondary whitespace-nowrap">{c.joined}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm font-semibold text-text">No clients found</p>
              <p className="text-xs text-text-secondary mt-1">Adjust your search or status filter.</p>
              <Button variant="ghost" size="sm" className="mt-3" onClick={() => { setQuery(""); setStatus("all"); }}>
                Clear filters
              </Button>
            </div>
          )}
        </CardContent>
        <div className="px-4 py-3 border-t border-divider text-xs text-text-secondary">
          Showing {filtered.length} of {CLIENTS.length} clients
        </div>
      </Card>
    </div>
  );
}
