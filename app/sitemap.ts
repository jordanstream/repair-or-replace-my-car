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
  const staticEntries = staticRoutes.map((route) => ({
    url: new URL(route, siteConfig.url).toString()
  }));
  const guideEntries = guides.map((guide) => ({
    url: new URL(`/guides/${guide.slug}`, siteConfig.url).toString(),
    lastModified: guide.lastReviewedDate
  }));

  return [...staticEntries, ...guideEntries];
}
