export const analyticsEvents = {
  calculatorStarted: "calculator_started",
  calculatorCompleted: "calculator_completed",
  resultRepair: "result_repair",
  resultReplace: "result_replace",
  resultCloseCall: "result_close_call",
  externalRepairSearchClicked: "external_repair_search_clicked",
  externalReplacementLinkClicked: "external_replacement_link_clicked",
  printResultsClicked: "print_results_clicked"
} as const;

export type AnalyticsEvent = (typeof analyticsEvents)[keyof typeof analyticsEvents];

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, string | number | boolean>) {
  // Placeholder for Google Analytics, Vercel Analytics, or a future first-party event pipeline.
  // Intended environment variables: NEXT_PUBLIC_GA_MEASUREMENT_ID, NEXT_PUBLIC_VERCEL_ANALYTICS_ID.
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, properties ?? {});
  }
}
