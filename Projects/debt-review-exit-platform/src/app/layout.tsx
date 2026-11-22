import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./tailwind.css";

// ============================================================
// METADATA
// ============================================================
export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_ORIGIN ?? "http://localhost:3000"),
  title: {
    default: "Debt Review Exit — Professional South African Debt Review Assistance",
    template: "%s | Debt Review Exit",
  },
  description:
    "Professional debt review exit assistance in South Africa. Understand your eligibility, get case management, and exit debt review with legal guidance.",
  keywords: [
    "debt review assistance South Africa",
    "exit debt review",
    "debt review clearance",
    "debt review removal eligibility",
    "debt review legal process",
  ],
  authors: [{ name: "Debt Review Exit" }, { name: "Debt Review Exit Team" }],
  creator: "Debt Review Exit",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Debt Review Exit",
    title: "Debt Review Exit — Your journey out of debt review starts here.",
    description:
      "Professional debt review exit assistance in South Africa. Understand your eligibility and take the right steps towards financial freedom.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Debt Review Exit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Debt Review Exit — Your journey out of debt review starts here.",
    description:
      "Professional debt review exit assistance in South Africa.",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor:"#101D35",
  colorScheme: "light",
};

// ============================================================
// ROOT LAYOUT
// ============================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased selection:bg-royal selection:text-white">
        {children}
      </body>
    </html>
  );
}
