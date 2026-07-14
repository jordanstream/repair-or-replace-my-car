"use client";

import { analyticsEvents, trackEvent } from "@/lib/analytics";

export const checklistDownloadPath = "/downloads/major-car-repair-decision-checklist.txt";

export function ChecklistDownloadLink({
  placement,
  children = "Download the Checklist",
  className = "inline-flex min-h-11 items-center justify-center rounded-md border border-brand-600 bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
}: {
  placement: "results" | "guide" | "footer" | "checklist";
  children?: string;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={checklistDownloadPath}
      download
      onClick={() => trackEvent(analyticsEvents.checklistDownloadClicked, { placement })}
    >
      {children}
    </a>
  );
}
