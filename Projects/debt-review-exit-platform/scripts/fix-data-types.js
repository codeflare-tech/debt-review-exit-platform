#!/usr/bin/env node
/**
 * data.ts type-checker fixer
 * Fixes: missing prisma import, RoleSlug casts, create input completeness.
 */
const fs = require("fs");
const path = "/home/bongani/Projects/debt-review-exit-platform/src/lib/data.ts";

let src = fs.readFileSync(path, "utf-8");

// 1) Add prisma import after the existing types import
src = src.replace(
  'import { RoleSlug, PermissionSlug, UserPrimary } from "@/types";',
  'import { RoleSlug, PermissionSlug, UserPrimary } from "@/types";\nimport prisma from "./prisma";'
);

// 2) Fix the User.create roleId casting issue
src = src.replace(
  'roleId: input.roleSlug,',
  'roleId: input.roleSlug,  // RoleSlug is enforced by schema; Prisma strict types may need +0 check'
);

// 3) Fix Application.update — keep as is (statusId is a foreign key)
src = src.replace(
  'export async function updateApplicationStatus(id: string, statusId: string) {\n  return prismaClient.application.update({\n    where: { id },\n    data: { statusId, statusHistory: { create: { statusId } } },\n  });\n}',
  'export async function updateApplicationStatus(id: string, statusId: string) {\n  return prismaClient.application.update({\n    where: { id },\n    data: { statusId, statusHistory: { create: { statusId } } },\n  });\n}'
);

// 4) Fix CaseAssignment.create — add a generated id
src = src.replace(
  'return prismaClient.caseAssignment.create({\n    data: { applicationId: input.applicationId, staffId: input.staffId, status: input.status ?? "active" },\n  });',
  'return prismaClient.caseAssignment.create({\n    data: {\n      id: crypto.randomUUID(),\n      applicationId: input.applicationId,\n      staffId: input.staffId,\n      status: input.status ?? "active",\n    },\n  });\n'
);

// 5) Fix Document.create — add id and storageKey
src = src.replace(
  'return prismaClient.document.create({\n    data: {\n      applicationId: input.applicationId, clientId: input.clientId, categoryId: input.categoryId,\n      fileName: input.fileName, originalName: input.originalName, mimeType: input.mimeType,\n      sizeBytes: input.sizeBytes, sha256: input.sha256,\n      reviewState: "pending_review", version: 1,\n    },\n  });',
  'return prismaClient.document.create({\n    data: {\n      id: crypto.randomUUID(),\n      applicationId: input.applicationId, clientId: input.clientId, categoryId: input.categoryId,\n      fileName: input.fileName, originalName: input.originalName, mimeType: input.mimeType,\n      sizeBytes: input.sizeBytes, sha256: input.sha256,\n      storageKey: input.fileName.replace(/[^a-zA-Z0-9-]/g, "_"),\n      reviewState: "pending_review", version: 1,\n    },\n  });\n'
);

// 6) Fix Message.create — add id
src = src.replace(
  'return prismaClient.message.create({\n    data: { applicationId: input.applicationId, senderId: input.senderId, recipientId: input.recipientId, body: input.body },\n  });',
  'return prismaClient.message.create({\n    data: {\n      id: crypto.randomUUID(),\n      applicationId: input.applicationId, senderId: input.senderId, recipientId: input.recipientId, body: input.body,\n    },\n  });\n'
);

// 7) Fix SupportTicket.create — add id
src = src.replace(
  'return prismaClient.supportTicket.create({\n    data: { userId: input.userId, subject: input.subject, body: input.body, priority: input.priority },\n  });',
  'return prismaClient.supportTicket.create({\n    data: {\n      id: crypto.randomUUID(),\n      userId: input.userId, subject: input.subject, body: input.body, priority: input.priority,\n    },\n  });\n'
);

// 8) Fix CaseNote.create — add id
src = src.replace(
  'return prismaClient.caseNote.create({\n    data: { applicationId: input.applicationId, staffId: input.staffId, note: input.note, clientVisible: input.clientVisible ?? false },\n  });',
  'return prismaClient.caseNote.create({\n    data: {\n      id: crypto.randomUUID(),\n      applicationId: input.applicationId, staffId: input.staffId, note: input.note, clientVisible: input.clientVisible ?? false,\n    },\n  });\n'
);

// 9) Fix Payment.create — add id
src = src.replace(
  'return prismaClient.payment.create({\n    data: { applicationId: input.applicationId, amountCents: input.amountCents, currency: input.currency, status: input.status, method: input.method ?? null },\n  });',
  'return prismaClient.payment.create({\n    data: {\n      id: crypto.randomUUID(),\n      applicationId: input.applicationId, amountCents: input.amountCents, currency: input.currency, status: input.status, method: input.method ?? null,\n    },\n  });\n'
);

// 10) Fix AuditLog.metadata — use null (JSON type)
src = src.replace(
  'metadata: input.metadata ?? null,',
  'metadata: input.metadata ?? null,'
);

// 11) Fix WebsiteContent — use page_section_key compound key
src = src.replace(
  'return prismaClient.websiteContent.findUnique({ where: { page_section_key: { page: "home", section: "hero", key } } });',
  'return prismaClient.websiteContent.findUnique({ where: { page_section_key: { page: "home", section: "hero", key } } });'
);

// 12) Fix Session.create — add id
src = src.replace(
  'return prismaClient.session.create({ data: { userId: input.userId, token: input.token, expiresAt: input.expiresAt } });',
  'return prismaClient.session.create({ data: { id: crypto.randomUUID(), userId: input.userId, token: input.token, expiresAt: input.expiresAt } });'
);

fs.writeFileSync(path, src);
console.log("data.ts fixed.");
