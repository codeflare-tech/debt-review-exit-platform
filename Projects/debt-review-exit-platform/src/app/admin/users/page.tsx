"use client";

import { useState } from "react";
import { useToast, Badge, Button, Card, CardContent, Input, Select, Table, TableHead, TableRow, TableHeader, TableCell } from "@/components/ui";

type StaffStatus = "Active" | "Suspended" | "Invited";

interface StaffRow {
  name: string;
  initials: string;
  email: string;
  role: string;
  roleTone: "royal" | "primary" | "teal" | "ghost";
  status: StaffStatus;
  lastActive: string;
}

const STAFF: StaffRow[] = [
  { name: "A. Manager", initials: "AM", email: "admin@debtreviewexit.co.za", role: "Super admin", roleTone: "royal", status: "Active", lastActive: "Now" },
  { name: "Lerato Ndlovu", initials: "LN", email: "lerato.ndlovu@debtreviewexit.co.za", role: "Case manager", roleTone: "primary", status: "Active", lastActive: "12 min ago" },
  { name: "Sipho Khumalo", initials: "SK", email: "sipho.khumalo@debtreviewexit.co.za", role: "Case manager", roleTone: "primary", status: "Active", lastActive: "1 hr ago" },
  { name: "Daniel Erasmus", initials: "DE", email: "daniel.erasmus@debtreviewexit.co.za", role: "Case manager", roleTone: "primary", status: "Active", lastActive: "3 hrs ago" },
  { name: "Zanele Mthembu", initials: "ZM", email: "zanele.mthembu@debtreviewexit.co.za", role: "Document reviewer", roleTone: "teal", status: "Active", lastActive: "2 hrs ago" },
  { name: "Elmarie du Plessis", initials: "ED", email: "elmarie.duplessis@debtreviewexit.co.za", role: "Finance officer", roleTone: "ghost", status: "Active", lastActive: "Yesterday" },
  { name: "Bongani Ngcobo", initials: "BN", email: "bongani.ngcobo@debtreviewexit.co.za", role: "Customer support", roleTone: "ghost", status: "Invited", lastActive: "—" },
  { name: "Charmaine Faber", initials: "CF", email: "charmaine.faber@debtreviewexit.co.za", role: "Document reviewer", roleTone: "teal", status: "Suspended", lastActive: "6 days ago" },
];

const STATUS_VARIANT: Record<StaffStatus, "success" | "error" | "warning"> = {
  Active: "success",
  Suspended: "error",
  Invited: "warning",
};

export default function AdminUsersPage() {
  const { pushToast } = useToast();
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");

  const q = query.trim().toLowerCase();
  const filtered = STAFF.filter((u) => {
    const roleMatch = role === "all" || u.role === role;
    const textMatch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    return roleMatch && textMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-text">Users</h1>
          <p className="text-sm text-text-secondary mt-1">Staff accounts and role assignments.</p>
        </div>
        <Button size="sm" leftIcon={<span className="text-base leading-none">+</span>}
          onClick={() => pushToast({ type: "info", title: "Invitations are a demo preview", description: "No email was sent." })}>
          Invite user
        </Button>
      </div>

      <p className="text-xs text-text-secondary bg-primary-50 border border-divider rounded-lg px-4 py-2.5">
        Demo preview — staff records and roles are sample data. Real RBAC enforcement is being finalised, so
        the roles shown here do not grant actual permissions.
      </p>

      <Card className="overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-divider">
          <div className="flex-1">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name or email…"
              aria-label="Search staff"
            />
          </div>
          <div className="w-full sm:w-52">
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={[
                { value: "all", label: "All roles" },
                { value: "Super admin", label: "Super admin" },
                { value: "Case manager", label: "Case manager" },
                { value: "Document reviewer", label: "Document reviewer" },
                { value: "Finance officer", label: "Finance officer" },
                { value: "Customer support", label: "Customer support" },
              ]}
              aria-label="Filter by role"
            />
          </div>
        </div>

        <CardContent className="p-0">
          <Table>
            <TableHead>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Last active</TableHeader>
              <TableHeader><span className="block text-right">Actions</span></TableHeader>
            </TableHead>
            <tbody>
              {filtered.map((u) => (
                <TableRow key={u.email}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {u.initials}
                      </span>
                      <span className="text-sm font-medium whitespace-nowrap">{u.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-text-secondary">{u.email}</TableCell>
                  <TableCell><Badge variant={u.roleTone} size="sm">{u.role}</Badge></TableCell>
                  <TableCell><Badge variant={STATUS_VARIANT[u.status]} size="sm">{u.status}</Badge></TableCell>
                  <TableCell className="text-xs text-text-secondary whitespace-nowrap">{u.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm"
                        onClick={() => pushToast({ type: "info", title: "Role editing is a demo preview" })}>
                        Edit role
                      </Button>
                      <Button variant="ghost" size="sm"
                        onClick={() => pushToast({
                          type: "warning",
                          title: u.status === "Suspended" ? "Reactivate is a demo preview" : "Suspend is a demo preview",
                          description: u.name,
                        })}>
                        {u.status === "Suspended" ? "Reactivate" : "Suspend"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm font-semibold text-text">No staff match your filters</p>
              <p className="text-xs text-text-secondary mt-1">Try a different role or search term.</p>
              <Button variant="ghost" size="sm" className="mt-3" onClick={() => { setQuery(""); setRole("all"); }}>
                Clear filters
              </Button>
            </div>
          )}
        </CardContent>
        <div className="px-4 py-3 border-t border-divider text-xs text-text-secondary">
          Showing {filtered.length} of {STAFF.length} staff accounts
        </div>
      </Card>
    </div>
  );
}
