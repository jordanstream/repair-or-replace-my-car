"use client";

import Link from "next/link";
import { analyticsEvents, trackEvent } from "@/lib/analytics";

export function GuideCtaLink({ guideSlug, placement }: { guideSlug: string; placement: "top" | "body" | "index" }) {
  return (
    <Link
      href="/calculator"
      className="inline-flex min-h-11 items-center justify-center rounded-md border border-brand-600 bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      onClick={() => trackEvent(analyticsEvents.guideCtaClicked, { guide_slug: guideSlug, placement })}
    >
      Compare My Options
    </Link>
  );
}
