import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "",
  "/calculator",
  "/how-it-works",
  "/guides",
  "/checklist",
  "/about",
  "/methodology",
  "/disclaimer",
  "/affiliate-disclosure",
  "/privacy",
  "/terms"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: route === "" || route === "/calculator" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/calculator" ? 0.9 : 0.6
  }));

  const guideEntries: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${siteConfig.url}/guides/${guide.slug}`,
    lastModified: guide.lastReviewedDate,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [...staticEntries, ...guideEntries];
}
