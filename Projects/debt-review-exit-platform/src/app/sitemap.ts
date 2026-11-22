import { MetadataRoute } from "next";

const BASE = process.env.APP_ORIGIN ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    "", "/how-it-works", "/packages", "/eligibility", "/about", "/faq", "/contact",
    "/legal/privacy", "/legal/terms", "/legal/disclaimer", "/legal/payment-policy", "/legal/popia",
  ];
  return pages.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
