// ============================================================
// DOMAIN TYPES — Debt Review Exit Platform
// Shared across server components, route handlers, and hooks.
// All public identifiers are UUIDs. Prisma column names map
// via @map decorators in schema.prisma.
// ============================================================

import type { ReactNode } from "react";

// ---- Enums (shadowed by Prisma @map names on the DB) ----
export type RoleSlug =
  | "super_admin"
  | "administrator"
  | "case_manager"
  | "document_reviewer"
  | "finance_officer"
  | "customer_support"
  | "client";

export type PermissionSlug =
  | "manage_own_profile"
  | "manage_all_profiles"
  | "manage_own_inbox"
  | "manage_all_messages"
  | "manage_all_notes"
  | "manage_all_tickets"
  | "manage_all_applications"
  | "assign_case_managers"
  | "update_any_status"
  | "review_documents"
  | "approve_swift_document_action"
  | "configure_packages"
  | "manage_finance"
  | "view_reports"
  | "manage_staff"
  | "configure_settings"
  | "manage_chat"
  | "manage_support"
  | "mark_application_complete";

// ---- Core RBAC ----
export interface Role {
  id: string;
  slug: RoleSlug;
  name: string;
  description: string | null;
  isActive: boolean;
}

export interface Permission {
  id: string;
  slug: PermissionSlug;
  name: string;
  description: string | null;
  category: string | null;
}

export interface UserRoleRow {
  id: string;
  userId: string;
  roleId: string;
  grantedAt: Date;
}

export interface RolePermissionRow {
  id: string;
  roleId: string;
  permissionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  fullName: string | null;
  roleId: RoleSlug | null;
  isEmailVerified: boolean;
  isEmailConfirmed: boolean;
  isPhoneVerified: boolean;
  isTwoFactorEnabled: boolean;
  twoFactorSecret: string | null;
  twoFactorbackupCodes: string | null;
  passwordResetToken: string | null;
  passwordResetAt: Date | null;
  lastLoginAt: Date | null;
  isActive: boolean;
  isSuspended: boolean;
  lockedAt: Date | null;
  failedLoginCount: number;
  lockoutUntil: Date | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastActivityAt: Date | null;
}

// ---- Applicant (one profile per user) ----
export interface UserPrimary {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: Date | null;
  occupation: string;
  idVakantIEerNumber: string;
  identityDocumentUrl: string | null;
  proofOfAddressUrl: string | null;
  avatarUrl: string | null;
  status: string;
  statusNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ---- Application lifecycle ----
export interface Application {
  id: string;
  userId: string;
  packageId: string;
  packageName: string;
  packageCode: string;
  durationWeeks: number;
  status: string;
  eligibilitySummary: string | null;
  applicationSummary: string | null;
  consumerResponsibilities: string | null;
  litigationRisk: string | null;
  consumerWishes: string | null;
  experience: string | null;
  approvedCaseManagerId: string | null;
  approvedCaseManagerName: string | null;
  approvedDocumentReviewerId: string | null;
  approvedDocumentReviewerName: string | null;
  approvedAmount: number | null;
  acceptedFeeDisclosureId: string | null;
  acceptedFeeDisclosureSummary: string | null;
  costCommitmentLetterDocumentId: string | null;
  costCommitmentLetterStoredFileName: string | null;
  statusHistory: StatusHistory[] | null;
  stepProgress: StepProgress[] | null;
  case: Case | null;
  steps: ApplicationStep[] | null;
  casePlanAssignments: CasePlanAssignment[] | null;
  statusHistoryRows: ApplicationStatusHistory[] | null;
  checklists: ChecklistItem[] | null;
  noteStep: NoteStep | null;
  applicationStep: ApplicationStep | null;
  notifications: NotificationPreference[] | null;
  consentRecords: ConsentRecord[] | null;
  applicationDocuments: ApplicationDocument[] | null;
  messages: ApplicationMessage[] | null;
  attachments: ApplicationAttachment[] | null;
  paymentEvents: ApplicationPaymentEvent[] | null;
  payments: ApplicationPayment[] | null;
  invoices: ApplicationInvoice[] | null;
  applicationSupportTickets: ApplicationSupportTicket[] | null;
  legalReview: LegalReview | null;
  supportTickets: SupportTicket[] | null;
  adminNotes: AdminNote[] | null;
  caseNoteStep: CaseNote[] | null;
  feeDisclosure: FeeDisclosure | null;
  feeApproval: FeeApproval | null;
  feeStatements: FeeStatement[] | null;
  auditLogs: AuditLog[] | null;
}

export interface StatusHistory {
  id: string;
  applicationId: string;
  status: string;
  statusId: string | null;
  notes: string | null;
  changedBy: string | null;
  changedByName: string | null;
  changedAt: Date;
  createdAt: Date;
}

export interface ApplicationStatusHistory {
  id: string;
  applicationId: string;
  status: string;
  statusId: string | null;
  notes: string | null;
  changedBy: string | null;
  changedByName: string | null;
  changedAt: Date;
  createdAt: Date;
}

export interface StepProgress {
  id: string;
  applicationId: string;
  step: string;
  completed: boolean;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationStep {
  id: string;
  name: string;
  slug: string;
  isRequired: boolean;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistItem {
  id: string;
  question: string;
  isRequired: boolean;
  answer: string | null;
  step: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteStep {
  id: string;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationDocument {
  id: string;
  applicationId: string;
  documentId: string;
  documentName: string;
  documentCategoryId: string;
  documentCategoryName: string;
  documentTypeSlug: string;
  documentType: string;
  reviewDecision: string | null;
  reviewerName: string | null;
  reviewComments: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationMessage {
  id: string;
  applicationId: string;
  senderId: string;
  senderName: string;
  message: string;
  isInternal: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationAttachment {
  id: string;
  messageId: string;
  documentId: string;
  documentName: string;
  documentStorageFileUrl: string | null;
  documentFileSize: number | null;
  documentMimeType: string | null;
  documentSha256Hash: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationPaymentEvent {
  id: string;
  applicationId: string;
  type: string;
  status: string;
  amount: number;
  metadata: string | null;
  occurredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationPayment {
  id: string;
  applicationId: string;
  paymentId: string;
  amount: number;
  method: string;
  status: string;
  paidAt: Date | null;
  reference: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationInvoice {
  id: string;
  applicationId: string;
  invoiceId: string;
  price: number;
  vatIncluded: boolean;
  totalDue: number;
  issueDate: Date;
  dueDate: Date;
  paidAt: Date | null;
  status: string;
  reference: string | null;
  issuedByStaff: string | null;
  issuedByName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationSupportTicket {
  id: string;
  applicationId: string;
  userId: string;
  subject: string;
  description: string | null;
  status: string;
  priority: string;
  assignedStaffId: string | null;
  assignedStaffName: string | null;
  priorityColor: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LegalReview {
  id: string;
  applicationId: string;
  legalReviewerId: string | null;
  legalReviewerName: string | null;
  status: string;
  comments: string | null;
  docuementUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationLegalReview {
  id: string;
  applicationId: string;
  legalReviewerId: string | null;
  legalReviewerName: string | null;
  status: string;
  comments: string | null;
  documentUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string | null;
  status: string;
  priority: string;
  priorityColor: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminNote {
  id: string;
  applicationId: string;
  userId: string;
  note: string;
  isInternal: boolean;
  isResolved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseNote {
  id: string;
  caseId: string;
  userId: string;
  note: string;
  isInternal: boolean;
  isResolved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Case {
  id: string;
  applicationId: string;
  status: string;
  internalNotes: string | null;
  clientNotes: string | null;
  consumerResponsibilities: string | null;
  litigationRisk: string | null;
  consumerWishes: string | null;
  experience: string | null;
  caseManagerId: string | null;
  documentReviewId: string | null;
  assessmentSummary: string | null;
  startDate: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  sessionTimeline: SessionTimeline[] | null;
  casePhases: CasePhase[] | null;
  eligibilityAssessments: Eligibility[] | null;
  steps: CaseStep[] | null;
  actionForms: ActionForm[] | null;
  invoiceDetails: Invoice[] | null;
  documents: Document[] | null;
  chatMessages: ChatMessage[] | null;
  notificationPreferences: CaseNotificationPreference[] | null;
  consentRecords: CaseConsentRecord[] | null;
  auditLogs: CaseAuditLog[] | null;
  applications: Application[] | null;
}

// ---- Requests-to-reply now ----
export interface CaseStep {
  id: string;
  caseId: string;
  name: string;
  sortOrder: number;
  active: boolean;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActionForm {
  id: string;
  caseId: string;
  name: string;
  sortOrder: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CasePhase {
  id: string;
  caseId: string;
  name: string;
  sortOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionTimeline {
  id: string;
  caseId: string;
  userId: string;
  name: string;
  message: string;
  documentName: string | null;
  documentUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Eligibility {
  id: string;
  applicationId: string;
  status: string;
  noOfDebts: number;
  totalDebt: number;
  noOfCreditSearches: number;
  moreThanOneCreditor: boolean;
  debtBureau: string | null;
  debtBureauCredits: string | null;
  ncr: string | null;
  ncrClaims: string | null;
  reasonForExiting: string | null;
  notes: string | null;
  files: Document[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialProfile {
  id: string;
  applicationId: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  debts: string | null;
  assets: string | null;
  creditBureau: string | null;
  creditBureauAccess: string | null;
  creditBureauRemarks: string | null;
  additionalDetails: string | null;
  completed: boolean;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// ---- Document management ----
export interface Document {
  id: string;
  caseId: string;
  clientId: string;
  categoryId: string;
  typeId: string;
  originalFileName: string;
  storageFileName: string | null;
  storageFileUrl: string | null;
  fileSize: number | null;
  mimeType: string | null;
  sha256Hash: string | null;
  status: string;
  notes: string | null;
  version: number;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  category: DocumentCategory | null;
  type: DocumentType | null;
  review: DocumentReview | null;
  reviews: DocumentReview[] | null;
  attachments: MessageAttachment[] | null;
}

export interface DocumentReview {
  id: string;
  documentId: string;
  reviewerId: string;
  reviewerName: string;
  decision: string;
  comments: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentReviewLog {
  id: string;
  documentId: string;
  action: string;
  byUserId: string;
  byUserName: string;
  actionById: string | null;
  reviewerId: string | null;
  reviewerName: string | null;
  createdAt: Date;
}

export interface DocumentType {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentCategory {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  slug: string;
  categoryId: string | null;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  mimeType: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ---- Payment / finance ----
export interface FeeDisclosure {
  id: string;
  applicationId: string;
  packageId: string;
  packageName: string;
  packageCode: string;
  durationWeeks: number;
  price: number;
  vatIncluded: boolean;
  totalDue: number;
  currency: string;
  paymentMethod: string;
  paymentInstallments: number;
  acceptedBy: string | null;
  acceptedByName: string | null;
  acceptedAt: Date | null;
  acceptedDocumentUrl: string | null;
  signedBy: string | null;
  signedByName: string | null;
  signedAt: Date | null;
  signedDocumentUrl: string | null;
  summary: string;
  status: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeeApproval {
  id: string;
  disclosureId: string;
  packageId: string;
  packageName: string;
  acceptedBy: string | null;
  acceptedByName: string | null;
  signedBy: string | null;
  signedByName: string | null;
  signedAt: Date | null;
  approvalId: string | null;
  status: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeeStructure {
  id: string;
  packageId: string;
  packageName: string;
  durationWeeks: number;
  monthlyPrice: number;
  deposit: number;
  endEndeavoursCost: number;
  vatRate: number;
  priorityProcessing: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeeStatement {
  id: string;
  applicationId: string;
  name: string;
  amount: number;
  periodLabel: string;
  periodType: string;
  dueDate: string;
  status: string;
  paid: boolean;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  applicationId: string;
  userId: string | null;
  customAmount: number | null;
  amount: number;
  status: string;
  method: string;
  reference: string | null;
  paidAt: Date | null;
  confirmedAt: Date | null;
  failureReason: string | null;
  events: PaymentEvent[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentEvent {
  id: string;
  paymentId: string;
  type: string;
  status: string;
  amount: number;
  metadata: string | null;
  occurredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  applicationId: string;
  userId: string;
  packageId: string | null;
  packageName: string | null;
  packageCode: string | null;
  price: number;
  vatIncluded: boolean;
  totalDue: number;
  currency: string;
  issueDate: Date;
  dueDate: Date;
  paidAt: Date | null;
  status: string;
  reference: string | null;
  createdAt: Date;
  updatedAt: Date;
  application: Application | null;
  payment: Payment | null;
}

// ---- Communications ----
export interface ChatMessage {
  id: string;
  caseId: string;
  senderId: string;
  senderName: string;
  message: string;
  isInternal: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageAttachment {
  id: string;
  messageId: string;
  documentId: string;
  documentName: string;
  documentStorageFileUrl: string | null;
  documentFileSize: number | null;
  documentMimeType: string | null;
  documentSha256Hash: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ---- Notifications / consents ----
export interface NotificationPreference {
  id: string;
  userId: string;
  applicationId: string | null;
  email: boolean;
  sms: boolean;
  push: boolean;
  createdAt: Date;
}

export interface ConsentRecord {
  id: string;
  userId: string;
  applicationId: string | null;
  purpose: string;
  grantedAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// ---- Audit / records ----
export interface AuditLog {
  id: string;
  actorId: string | null;
  actorName: string | null;
  action: string;
  targetType: string | null;
  targetId: string | null;
  changes: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ---- Packages / config ----
export interface PackageItem {
  id: string;
  name: string;
  slug: string;
  durationWeeks: number;
  price: number;
  currency: string;
  isActive: boolean;
  description: string | null;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PackageFeature {
  id: string;
  packageId: string;
  name: string;
  slug: string;
  price: number | null;
  durationWeeks: number;
  currency: string;
  isActive: boolean;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebsiteContent {
  id: string;
  key: string;
  value: string;
  valueJson: string | null;
  type: string;
  locale: string;
  createdAt: Date;
  updatedAt: Date;
}

// ---- Admin-safe case view ----
export interface CaseTimeline {
  id: string;
  caseId: string;
  userId: string;
  name: string;
  message: string;
  documentName: string | null;
  documentUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CasePlan {
  id: string;
  caseId: string;
  stepId: string;
  targetCompletionDate: Date | null;
  completed: boolean;
  completedAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CasePlanAssignment {
  id: string;
  casePlanId: string;
  assignedTo: string;
  assignedByName: string;
  assignedAt: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CasePlanDocument {
  id: string;
  casePlanId: string;
  documentId: string;
  documentName: string;
  documentCategoryId: string;
  documentCategoryName: string;
  documentTypeSlug: string;
  documentType: string;
  reviewDecision: string | null;
  reviewerName: string | null;
  reviewDecisionAt: Date | null;
  reviewComments: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseFeeDisclosure {
  id: string;
  caseId: string;
  applicationId: string;
  packageId: string;
  packageName: string;
  packageCode: string;
  durationWeeks: number;
  price: number;
  vatIncluded: boolean;
  totalDue: number;
  currency: string;
  paymentMethod: string;
  paymentInstallments: number;
  acceptedBy: string | null;
  acceptedByName: string | null;
  acceptedAt: Date | null;
  acceptedDocumentUrl: string | null;
  signedBy: string | null;
  signedByName: string | null;
  signedAt: Date | null;
  signedDocumentUrl: string | null;
  summary: string;
  status: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseFeeApproval {
  id: string;
  disclosureId: string;
  packageId: string;
  packageName: string;
  acceptedBy: string | null;
  acceptedByName: string | null;
  signedBy: string | null;
  signedByName: string | null;
  signedAt: Date | null;
  approvalId: string | null;
  status: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseFeeStructure {
  id: string;
  packageId: string;
  packageName: string;
  durationWeeks: number;
  monthlyPrice: number;
  deposit: number;
  endEndeavoursCost: number;
  vatRate: number;
  priorityProcessing: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CasePayment {
  id: string;
  caseId: string;
  applicationId: string;
  userId: string | null;
  customAmount: number | null;
  amount: number;
  status: string;
  method: string;
  reference: string | null;
  paidAt: Date | null;
  confirmedAt: Date | null;
  failureReason: string | null;
  events: CasePaymentEvent[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CasePaymentEvent {
  id: string;
  paymentId: string;
  type: string;
  status: string;
  amount: number;
  metadata: string | null;
  occurredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseApplication {
  id: string;
  caseId: string;
  applicationId: string;
  status: string;
  packageId: string;
  packageName: string;
  packageCode: string;
  durationWeeks: number;
  startDate: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseDocument {
  id: string;
  caseId: string;
  clientId: string;
  categoryId: string;
  typeId: string;
  originalFileName: string;
  storageFileName: string | null;
  storageFileUrl: string | null;
  fileSize: number | null;
  mimeType: string | null;
  sha256Hash: string | null;
  status: string;
  notes: string | null;
  version: number;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseChatMessage {
  id: string;
  caseId: string;
  senderId: string;
  senderName: string;
  message: string;
  isInternal: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseNotificationPreference {
  id: string;
  userId: string;
  caseId: string;
  email: boolean;
  sms: boolean;
  push: boolean;
  createdAt: Date;
}

export interface CaseConsentRecord {
  id: string;
  userId: string;
  caseId: string;
  purpose: string;
  grantedAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseAuditLog {
  id: string;
  actorId: string | null;
  actorName: string | null;
  action: string;
  targetType: string | null;
  targetId: string | null;
  changes: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ---- API-safe DTOs (not Prisma models — input shapes) ----
export interface UserRegistrationInput {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  dateOfBirth: string;
  occupation: string;
  idVakantIEerNumber: string;
  identityDocumentUrl?: string;
  proofOfAddressUrl?: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface CaseAssignmentInput {
  caseId: string;
  caseManagerId: string;
}

export interface DocumentUploadInput {
  file: File;
  caseId: string;
  categoryId: string;
  typeId: string;
}

export interface CaseNoteInput {
  caseId: string;
  note: string;
  isInternal?: boolean;
}

export interface CaseStepInput {
  caseId: string;
  stepId: string;
  status: "not_started" | "in_progress" | "completed";
}

export interface CasePlanAssignmentInput {
  casePlanId: string;
  assignedTo: string;
}

export interface ApplicationStepInput {
  applicationId: string;
  stepSlug: string;
  status: "not_started" | "in_progress" | "completed";
}

export interface PaymentInput {
  applicationId: string;
  amount: number;
  method: string;
  customAmount?: number;
}

export interface CasePlanCreateInput {
  caseId: string;
  stepId: string;
  targetCompletionDate: string;
  notes: string;
}

export interface DocumentUploadInput {
  file: File;
  caseId: string;
  categoryId: string;
  typeId: string;
}

export interface MessageInput {
  caseId: string;
  content: string;
  isInternal?: boolean;
}

export interface SupportTicketInput {
  applicationId: string;
  subject: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
}

export interface NoteInput {
  applicationId: string;
  note: string;
  isInternal?: boolean;
}

export interface Jurisdiction {
  code: string;
  name: string;
}

export interface EligibilitySummary {
  eligibilityOutcome: "INELIGIBLE" | "ELIGIBLE" | "UNDER_REVIEW";
  eligibilityNotes: string;
  noOfDebts: number;
  noOfCreditSearches: number;
  totalDebt: string;
  creditBureau: string;
  isMoreThanOneCreditor: boolean;
  isNationalCreditRegulator: boolean;
  reasonForExiting: string | null;
  debtBureau: string | null;
  debtBureauCredits: string | null;
  ncrClaims: string | null;
  ncrRemarks: string | null;
}

export interface ApplicationSteps {
  applicationId: string;
  steps: Step[];
  questionAnswers: Record<string, string>;
  summary: string;
  eligibilityOutcome: "INELIGIBLE" | "ELIGIBLE" | "UNDER_REVIEW";
  consentGiven: boolean;
  excluded: boolean;
  isDetailedApplication: boolean;
  userFullDetails: {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    ncr: string | null;
    debtBureau: string | null;
    debtBureauCredits: string | null;
    reasonForExiting: string;
  };
}

export interface Step {
  id: string;
  label: string;
  detail?: string;
  icon?: ReactNode;
  slug: string;
  advanced?: boolean;
  documentCount?: number;
}

export interface PackageType {
  id: string;
  name: string;
  docuementUrl: string | null;
  steps: Step[] | null;
  docuements: Step[] | null;
  applicationSteps: Step[];
  packageId: string;
  packageName: string;
  packagePrice: number;
  packageDuration: number;
  debtReviewDocuments: string;
  description: string;
}

export interface CaseStep {
  id: string;
  caseId: string;
  name: string;
  sortOrder: number;
  active: boolean;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActionForm {
  id: string;
  caseId: string;
  name: string;
  sortOrder: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
