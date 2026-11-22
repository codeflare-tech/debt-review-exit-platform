import { PrismaClient, type RoleSlug, type PermissionSlug } from "@prisma/client"
import crypto from "crypto"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()
const uid = () => crypto.randomUUID()
const permissionMap: Record<string, string> = {}
let superAdmin: { id: string } | null = null

// ----------------------------------------------------------------
// SEED DATA
// ----------------------------------------------------------------
async function main() {
  // ----------------------------------------------------------------
  // ROLES
  // ----------------------------------------------------------------
  const roleIds: Record<string, string> = {}
  const roles: { slug: RoleSlug; name: string; description: string }[] = [
    { slug: "super_admin", name: "Super Administrator", description: "Full platform access" },
    { slug: "administrator", name: "Administrator", description: "Full business management" },
    { slug: "case_manager", name: "Case Manager", description: "Manage client cases" },
    { slug: "document_reviewer", name: "Document Reviewer", description: "Review uploaded documents" },
    { slug: "finance_officer", name: "Finance Officer", description: "Manage invoices and payments" },
    { slug: "customer_support", name: "Customer Support", description: "Client support and communication" },
    { slug: "client", name: "Client", description: "End client" },
  ]
  for (const r of roles) {
    const existing = await prisma.role.findUnique({ where: { slug: r.slug as RoleSlug } })
    const id = existing!.id ?? uid()
    if (!existing) {
      await prisma.role.create({ data: { id, slug: r.slug as RoleSlug, name: r.name, description: r.description } })
    }
    roleIds[r.slug] = existing?.id ?? id
  }

  // ----------------------------------------------------------------
  // PERMISSIONS
  // ----------------------------------------------------------------
  const permissions = [
    { slug: "manage_own_profile", name: "Manage own profile" },
    { slug: "manage_all_profiles", name: "Manage all profiles" },
    { slug: "manage_own_inbox", name: "Manage own inbox" },
    { slug: "manage_all_messages", name: "Manage all messages" },
    { slug: "manage_all_notes", name: "Manage all internal notes" },
    { slug: "manage_all_tickets", name: "Manage all support tickets" },
    { slug: "manage_all_applications", name: "Manage all applications" },
    { slug: "assign_case_managers", name: "Assign case managers" },
    { slug: "update_any_status", name: "Update any application status" },
    { slug: "review_documents", name: "Review documents" },
    { slug: "approve_swift_document_action", name: "Swift document action" },
    { slug: "configure_packages", name: "Configure packages" },
    { slug: "manage_finance", name: "Manage financial records" },
    { slug: "view_reports", name: "View reports" },
    { slug: "manage_staff", name: "Manage staff" },
    { slug: "configure_settings", name: "Configure platform settings" },
    { slug: "manage_chat", name: "Manage messaging" },
    { slug: "manage_support", name: "Manage support tickets" },
    { slug: "mark_application_complete", name: "Mark application complete" },
  ]
  for (const p of permissions) {
    const existing = await prisma.permission.findUnique({ where: { slug: p.slug as unknown as PermissionSlug } })
    const id = existing!.id ?? uid()
    if (!existing) {
      await prisma.permission.create({ data: { id, slug: p.slug as PermissionSlug, name: p.name } })
    }
    permissionMap[p.slug] = existing?.id ?? id
  }

  // ----------------------------------------------------------------
  // CORE SETTING RECORDS
  // ----------------------------------------------------------------
  const websiteContentSeeds = [
    { page: "home", section: "hero_heading", key: "hero_heading", value: { text: "Your journey out of debt review starts here.", html: "Your journey out of debt review starts here." } },
    { page: "home", section: "hero_subtext", key: "hero_subtext", value: "Get professional guidance, understand your eligibility and take the right steps towards financial freedom." },
    { page: "home", section: "cta_primary", key: "cta_primary", value: { text: "Check My Eligibility", href: "/eligibility" } },
    { page: "home", section: "cta_secondary", key: "cta_secondary", value: { text: "Explore Our Packages", href: "/packages" } },
    { page: "faq", section: "questions", key: "questions", value: JSON.stringify([]) },
    { page: "packages", section: "packages", key: "packages", value: JSON.stringify([]) },
    { page: "about", section: "mission", key: "mission", value: "We help South African consumers navigate the debt review exit process with clarity, support and transparency." },
    { page: "contact", section: "email", key: "email", value: "info@debtreviewexit.co.za" },
    { page: "contact", section: "phone", key: "phone", value: "0800 123 456" },
    { page: "contact", section: "whatsapp", key: "whatsapp", value: "+27 82 123 4567" },
    { page: "contact", section: "address", key: "address", value: "12 Ocean Drive, Cape Town, 8000" },
    { page: "contact", section: "hours", key: "hours", value: "Mon-Sat: 08:00-18:00" },
  ]
  for (const w of websiteContentSeeds) {
    const existing = await prisma.websiteContent.findUnique({ where: { page_section_key: { page: w.page, section: w.section, key: w.key } } })
    if (!existing) {
      await prisma.websiteContent.create({
        data: { id: uid(), page: w.page, section: w.section, key: w.key, value: w.value },
      })
    }
  }

  // ----------------------------------------------------------------
  // APPLICATION STATUSES (defaults)
  // ----------------------------------------------------------------
  const statusSeed = [
    { slug: "draft", label: "Draft", sortOrder: 1 },
    { slug: "submitted", label: "Application submitted", sortOrder: 2 },
    { slug: "under_review", label: "Documents under review", sortOrder: 3 },
    { slug: "eligible", label: "Eligibility assessment complete", sortOrder: 4 },
    { slug: "ineligible", label: "Not eligible", sortOrder: 5 },
    { slug: "on_hold", label: "On hold", sortOrder: 6 },
    { slug: "in_progress", label: "In progress", sortOrder: 7 },
    { slug: "completed", label: "Completed", sortOrder: 8, isTerminal: true },
    { slug: "rejected", label: "Rejected", sortOrder: 9, isTerminal: true },
  ]
  for (const s of statusSeed) {
    const existing = await prisma.applicationStatus.findUnique({ where: { slug: s.slug } })
    const id = existing?.id ?? uid()
    if (!existing) {
      await prisma.applicationStatus.create({ data: { id, slug: s.slug, label: s.label, sortOrder: s.sortOrder, isTerminal: s.isTerminal ?? false } })
    }
  }

  // ----------------------------------------------------------------
  // DEMO PACKAGES
  // ----------------------------------------------------------------
  const packageSeed = [
    {
      name: "Standard",
      slug: "standard",
      priceCents: 450000,
      description: "A transparent, structured path out of debt review.",
      longDescription: "A complete, guided experience for consumers who want professional support to understand their eligibility and exit debt review.",
      targetServiceWeeks: 16,
      isFeatured: true,
      status: "active",
      sortOrder: 1,
    },
    {
      name: "Priority",
      slug: "priority",
      priceCents: 900000,
      description: "Everything in Standard, with priority handling.",
      longDescription: "Faster handling, dedicated case management and more frequent progress updates.",
      targetServiceWeeks: 3,
      isFeatured: true,
      status: "active",
      sortOrder: 2,
    },
    {
      name: "Express",
      slug: "express",
      priceCents: 1500000,
      description: "The fastest path to a debt review exit.",
      longDescription: "Senior handling, daily updates and priority escalation for time-sensitive cases.",
      targetServiceWeeks: 7,
      isFeatured: false,
      status: "active",
      sortOrder: 3,
    },
  ]
  const packageIds: Record<string, string> = {}
  for (const pkg of packageSeed) {
    const existing = await prisma.package.findUnique({ where: { slug: pkg.slug } })
    const id = existing?.id ?? uid()
    if (!existing) {
      await prisma.package.create({ data: { id, ...pkg } })
    }
    packageIds[pkg.slug] = existing?.id ?? id
  }

  // ----------------------------------------------------------------
  // DEMO SUPER ADMIN + STAFF
  // ----------------------------------------------------------------
  const email = "admin@debtreviewexit.co.za"
  const passwordHash = bcrypt.hashSync("SuperAdmin123!", 10)
  superAdmin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      id: uid(),
      email,
      passwordHash,
      fullName: "Super Administrator",
      isEmailVerified: true,
      isPhoneVerified: true,
      roleId: "super_admin",
      isActive: true,
      isSuspended: false,
    },
  })
  const existingStaff = await prisma.staffProfile.findUnique({ where: { userId: superAdmin.id } })
  if (!existingStaff) {
    await prisma.staffProfile.create({
      data: {
        id: uid(),
        userId: superAdmin.id,
        employeeNumber: "ADM-0001",
        department: "Administration",
        jobTitle: "Super Administrator",
        notes: "Bootstrap administrator account. Replace with a real registration via the admin setup flow.",
      },
    })
  }

  // ----------------------------------------------------------------
  // PACKAGE FEATURES
  // ----------------------------------------------------------------
  for (const pkg of packageSeed) {
    const features = [
      { feature: "Eligibility assessment", sortOrder: 1 },
      { feature: "Document review", sortOrder: 2 },
      { feature: "Case file preparation", sortOrder: 3 },
      { feature: "Legal process guidance", sortOrder: 4 },
      { feature: "Case manager allocation", sortOrder: 5 },
      { feature: "Application progress tracking", sortOrder: 6 },
      { feature: "Customer support", sortOrder: 7 },
      { feature: "Progress notifications", sortOrder: 8 },
      { feature: "Completion documentation", sortOrder: 9 },
    ]
    for (const f of features) {
      const existing = await prisma.packageFeature.findFirst({ where: { packageId: packageIds[pkg.slug], feature: f.feature } })
      const id = existing?.id ?? uid()
      if (!existing) {
        await prisma.packageFeature.create({
          data: { id, packageId: packageIds[pkg.slug], feature: f.feature, sortOrder: f.sortOrder },
        })
      }
    }
  }

  console.log("Seed complete.")
}

// ----------------------------------------------------------------
// RBAC LINKING (USER_ROLES + ROLE_PERMISSIONS)
// ----------------------------------------------------------------
async function linkRbac(superAdmin: { id: string }, permissionMap: Record<string, string>) {
  // Resolve role IDs (roleId is a FK to Role.id, not the slug).
  const superAdminRole = await prisma.role.findUnique({ where: { slug: "super_admin" } })
  const adminRoleId = superAdminRole?.id

  // Link super admin user to the super_admin role.
  const userRole = await prisma.userRole.findUnique({
    where: { userId_roleId: { userId: superAdmin.id, roleId: adminRoleId! } },
  })
  if (!userRole) {
    await prisma.userRole.create({
      data: {
        id: uid(),
        userId: superAdmin.id,
        roleId: adminRoleId!,
      },
    })
  }

  // Link every permission to the super_admin role.
  const permissionIds = Object.values(permissionMap)
  for (const permId of permissionIds) {
    await prisma.rolePermission.create({
      data: {
        id: uid(),
        roleId: adminRoleId!,
        permissionId: permId,
      },
    })
  }
}

main()
  .then(() => linkRbac(superAdmin!, permissionMap))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
