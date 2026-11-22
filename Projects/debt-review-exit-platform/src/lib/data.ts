// ============================================================
// DATA-ACCESS LAYER
// Typed Prisma queries. Field names match schema.prisma exactly.
// ============================================================

import { PrismaClient, Prisma, RoleSlug as PrismaRoleSlug, type Prisma as PrismaNamespace } from "@prisma/client";
import { RoleSlug, PermissionSlug, UserPrimary } from "@/types";
import prisma from "./prisma";

const prismaClient = prisma as PrismaClient;

// ---- Core RFC 4122 UUID generator (used by create() calls that require @id without @default) ----
function uid(): string {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return require("crypto").randomUUID();
}
const uid$1 = uid;

// ---- Auth ----
export async function findUserByEmail(email: string) {
  return prismaClient.user.findUnique({
    where: { email },
    select: {
      id: true, email: true, fullName: true, roleId: true,
      isEmailVerified: true, isEmailConfirmed: true, isPhoneVerified: true,
      isTwoFactorEnabled: true, isActive: true, isSuspended: true,
      failedLoginCount: true, lockoutUntil: true, passwordHash: true,
    },
  });
}

export async function findUserById(id: string) {
  return prismaClient.user.findUnique({
    where: { id },
    select: {
      id: true, email: true, fullName: true, roleId: true,
      isEmailVerified: true, isEmailConfirmed: true, isPhoneVerified: true,
      isTwoFactorEnabled: true, isActive: true, isSuspended: true,
      failedLoginCount: true, lockoutUntil: true, passwordHash: true,
    },
  });
}

export async function createUser(input: {
  email: string; passwordHash: string; fullName: string; roleSlug: RoleSlug;
}) {
  return prismaClient.user.create({
    data: {
      id: uid(),
      email: input.email,
      passwordHash: input.passwordHash,
      fullName: input.fullName,
      roleId: input.roleSlug as PrismaRoleSlug,
      isEmailVerified: true,
      isEmailConfirmed: true,
      isPhoneVerified: false,
      isActive: true,
      isSuspended: false,
      failedLoginCount: 0,
      lockoutUntil: null,
    },
  });
}

export async function updateUser(id: string, data: Partial<{
  isActive: boolean; isSuspended: boolean; email: string; fullName: string;
}>) {
  return prismaClient.user.update({ where: { id }, data });
}

// ---- Roles & permissions (RBAC) ----
export async function findRoleBySlug(slug: PrismaRoleSlug) {
  return prismaClient.role.findUnique({ where: { slug } });
}

export async function findRoleById(id: string) {
  return prismaClient.role.findUnique({ where: { id } });
}

export async function findPermissionBySlug(slug: PermissionSlug) {
  return prismaClient.permission.findUnique({ where: { slug } });
}

export async function listRoles() {
  return prismaClient.role.findMany({ orderBy: { name: "asc" } });
}

export async function listPermissions() {
  return prismaClient.permission.findMany({ orderBy: [{ category: "asc" }, { name: "asc" }] });
}

// ---- Applications ----
export async function findApplication(id: string) {
  return prismaClient.application.findUnique({ where: { id } });
}

export async function findApplicationByUserId(userId: string, statusId?: string) {
  return prismaClient.application.findMany({
    where: { userId, ...(statusId ? { statusId } : {}) },
    orderBy: { createdAt: "desc" },
    include: { eligibilityAssessments: true },
  });
}

export async function countApplicationsByUser(userId: string) {
  return prismaClient.application.count({ where: { userId } });
}

export async function updateApplicationStatus(id: string, statusId: string) {
  return prismaClient.application.update({
    where: { id },
    data: { statusId, statusHistory: { create: { id: crypto.randomUUID(), statusId } } },
  });
}

// ---- Case management (CaseAssignment) ----
export async function findCaseAssignment(id: string) {
  return prismaClient.caseAssignment.findUnique({ where: { id } });
}

export async function findCaseAssignmentByApplicationId(applicationId: string) {
  return prismaClient.caseAssignment.findUnique({ where: { applicationId } });
}

export async function listCaseAssignments() {
  return prismaClient.caseAssignment.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createCaseAssignment(input: { applicationId: string; staffId: string; status?: string }) {
  return prismaClient.caseAssignment.create({
    data: {
      id: crypto.randomUUID(),
      applicationId: input.applicationId,
      staffId: input.staffId,
      status: input.status ?? "active",
    },
  });

}

export async function updateCaseAssignment(id: string, data: Partial<{ status: string; notes: string }>) {
  return prismaClient.caseAssignment.update({ where: { id }, data });
}

// ---- Documents ----
export async function uploadDocument(input: {
  applicationId: string; clientId: string; categoryId: string; fileName: string; originalName: string; mimeType: string; sizeBytes: number; sha256: string;
}) {
  return prismaClient.document.create({
    data: {
      id: crypto.randomUUID(),
      applicationId: input.applicationId, clientId: input.clientId, categoryId: input.categoryId,
      fileName: input.fileName, originalName: input.originalName, mimeType: input.mimeType,
      sizeBytes: input.sizeBytes, sha256: input.sha256,
      storageKey: input.fileName.replace(/[^a-zA-Z0-9-]/g, "_"),
      reviewState: "pending_review", version: 1,
    },
  });

}

export async function listDocuments() {
  return prismaClient.document.findMany({
    orderBy: { uploadedAt: "desc" },
    include: { category: true },
  });
}

export async function findDocument(id: string) {
  return prismaClient.document.findUnique({ where: { id }, include: { category: true, reviews: true } });
}

export async function updateDocumentStatus(id: string, status: string) {
  return prismaClient.document.update({ where: { id }, data: { reviewState: status } });
}

// ---- Messages ----
export async function listMessages() {
  return prismaClient.message.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { sender: { select: { id: true, fullName: true, email: true } }, recipient: { select: { id: true, fullName: true, email: true } } },
  });
}

export async function createMessage(input: { applicationId: string; senderId: string; recipientId: string; body: string }) {
  return prismaClient.message.create({
    data: {
      id: crypto.randomUUID(),
      applicationId: input.applicationId, senderId: input.senderId, recipientId: input.recipientId, body: input.body,
    },
  });

}

// ---- Support tickets ----
export async function listSupportTickets() {
  return prismaClient.supportTicket.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createSupportTicket(input: { userId: string; subject: string; body: string; priority: "low" | "medium" | "high" | "urgent" }) {
  return prismaClient.supportTicket.create({
    data: {
      id: crypto.randomUUID(),
      userId: input.userId, subject: input.subject, body: input.body, priority: input.priority,
    },
  });

}

// ---- Packages ----
export async function listPackages() {
  return prismaClient.package.findMany({ where: { status: "active" }, orderBy: { name: "asc" } });
}

export async function findPackageById(id: string) {
  return prismaClient.package.findUnique({ where: { id }, include: { packageFeatures: true } });
}

export async function findPackageBySlug(slug: string) {
  return prismaClient.package.findUnique({ where: { slug } });
}

// ---- Case notes ----
export async function findCaseNotes() {
  return prismaClient.caseNote.findMany({ orderBy: { createdAt: "desc" }, include: { staff: true } });
}

export async function createCaseNote(input: { applicationId: string; staffId: string; note: string; clientVisible?: boolean }) {
  return prismaClient.caseNote.create({
    data: {
      id: crypto.randomUUID(),
      applicationId: input.applicationId, staffId: input.staffId, note: input.note, clientVisible: input.clientVisible ?? false,
    },
  });

}

// ---- Payment / financial ----
export async function listPayments() {
  return prismaClient.payment.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createPayment(input: {
  applicationId: string; amountCents: number; currency: string; status: string; method?: string;
}) {
  return prismaClient.payment.create({
    data: {
      id: crypto.randomUUID(),
      applicationId: input.applicationId, amountCents: input.amountCents, currency: input.currency, status: input.status, method: input.method ?? null,
    },
  });

}

export async function listPaymentsByApplication(applicationId: string) {
  return prismaClient.payment.findMany({ where: { applicationId }, orderBy: { createdAt: "desc" } });
}

// ---- Audit ----
export async function createAuditLog(input: {
  actorId: string | null; actorName: string | null; action: string; targetTable: string | null; targetId: string | null; applicationId: string | null; ipAddress: string | null; userAgent: string | null; metadata?: Record<string, unknown>;
}) {
  return prismaClient.auditLog.create({
    data: {
      id: uid(),
      actorId: input.actorId, action: input.action,
      targetTable: input.targetTable, targetId: input.targetId, applicationId: input.applicationId,
      ipAddress: input.ipAddress, userAgent: input.userAgent,
    },
  });
}

// ---- Website content ----
export async function findWebsiteContent(key: string) {
  return prismaClient.websiteContent.findUnique({ where: { page_section_key: { page: "home", section: "hero", key } } });
}

export async function listWebsiteContent() {
  return prismaClient.websiteContent.findMany({ orderBy: { updatedAt: "desc" } });
}

// ---- Sessions (prisma-native) ----
export async function findSession(id: string) {
  return prismaClient.session.findUnique({ where: { id } });
}

export async function findSessionByToken(token: string) {
  return prismaClient.session.findUnique({ where: { token } });
}

export async function createSession(input: { userId: string; token: string; expiresAt: Date }) {
  return prismaClient.session.create({ data: { id: crypto.randomUUID(), userId: input.userId, token: input.token, expiresAt: input.expiresAt } });
}

export async function deleteSession(id: string) {
  return prismaClient.session.delete({ where: { id } });
}
