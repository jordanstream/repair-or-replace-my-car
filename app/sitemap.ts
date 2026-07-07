import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "",
  "/calculator",
  "/results",
  "/how-it-works",
  "/guides",
  "/methodology",
  "/disclaimer",
  "/privacy",
  "/terms"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [...staticRoutes, ...guides.map((guide) => `/guides/${guide.slug}`)];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route.includes("/guides/") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route === "/calculator" ? 0.9 : 0.7
  }));
}
