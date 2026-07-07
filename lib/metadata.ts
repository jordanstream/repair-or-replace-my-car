import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function pageMetadata({ title, description, path, type = "website" }: PageMeta): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description
    }
  };
}
