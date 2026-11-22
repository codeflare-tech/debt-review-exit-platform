// Central business configuration — single source of truth for packages,
// navigation, contact details and compliance copy.

export const BUSINESS = {
  name: "Debt Review Exit",
  legalName: "Debt Review Exit (Pty) Ltd",
  tagline: "Your journey out of debt review starts here.",
  description:
    "Professional, transparent debt-review exit assistance for eligible South African consumers.",
  email: "info@debtreviewexit.co.za",
  phone: "+27 (0) 10 000 0000",
  hours: "Mon–Fri, 08:00–17:00 SAST",
  address: "South Africa",
  // Replace with real registration details before production.
  registrationNote: "Company registration details to be supplied before launch.",
};

export interface PackageConfig {
  code: "A" | "B" | "C";
  slug: string;
  name: string;
  tier: string;
  price: number;
  priceLabel: string;
  durationWeeks: number;
  durationLabel: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export const PACKAGES: PackageConfig[] = [
  {
    code: "A",
    slug: "standard",
    name: "Standard",
    tier: "Essential support",
    price: 4500,
    priceLabel: "R4,500",
    durationWeeks: 12,
    durationLabel: "3 months",
    description:
      "A structured, professionally guided exit process for straightforward cases.",
    features: [
      "Initial eligibility assessment",
      "Review of client documents",
      "Case file preparation",
      "Appropriate legal process guidance",
      "Case manager allocation",
      "Application progress tracking",
      "Standard customer support",
      "Progress notifications",
      "Completion documentation where applicable",
    ],
  },
  {
    code: "B",
    slug: "comprehensive",
    name: "Comprehensive",
    tier: "Most popular",
    price: 7800,
    priceLabel: "R7,800",
    durationWeeks: 3,
    durationLabel: "3 weeks",
    description:
      "End-to-end management with closer support and document handling.",
    features: [
      "Everything in Standard",
      "Priority case manager allocation",
      "Comprehensive document review & preparation",
      "Bureau discrepancy investigation support",
      "Dedicated communication channel",
      "Weekly progress updates",
      "Assisted completion verification",
      "Post-completion support period",
    ],
    featured: true,
  },
  {
    code: "C",
    slug: "premium",
    name: "Premium",
    tier: "White-glove",
    price: 12500,
    priceLabel: "R12,500",
    durationWeeks: 0,
    durationLabel: "Less than 7 days",
    description:
      "Personalised, high-touch assistance for complex or time-sensitive matters.",
    features: [
      "Everything in Comprehensive",
      "Senior case manager",
      "Same-day document turnaround where possible",
      "Direct legal-process liaison",
      "Tailored case strategy",
      "Dedicated support contact",
      "Completion & bureau-follow-up assistance",
      "Discretionary aftercare",
    ],
  },
];

export const PUBLIC_NAV = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Packages", href: "/packages" },
  { label: "Eligibility", href: "/eligibility" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const LEGAL_NAV = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
  { label: "Payment & Fee Policy", href: "/legal/payment-policy" },
  { label: "POPIA Notice", href: "/legal/popia" },
];

// Compliance disclaimer reused across pages. No guaranteed outcomes,
// no NCR/bureau affiliation claims.
export const COMPLIANCE_DISCLAIMER =
  "We are an independent private company and are not affiliated with, endorsed by, or acting on behalf of the National Credit Regulator, any credit bureau, any court, or any financial institution. We do not guarantee removal from debt review or any particular outcome. Eligibility is assessed case by case and all service periods are targets subject to eligibility, document completeness, professional review and third-party processing.";
