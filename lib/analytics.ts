export const analyticsEvents = {
  calculatorStarted: "calculator_started",
  calculatorCompleted: "calculator_completed",
  resultRepair: "result_repair",
  resultReplace: "result_replace",
  resultCloseCall: "result_close_call",
  safetyWarningResult: "safety_warning_result",
  guideCtaClicked: "guide_cta_clicked",
  externalRepairSearchClicked: "external_repair_search_clicked",
  externalReplacementLinkClicked: "external_replacement_link_clicked",
  printResultsClicked: "print_results_clicked"
} as const;

export type AnalyticsEvent = (typeof analyticsEvents)[keyof typeof analyticsEvents];

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      parameters?: Record<string, string | number | boolean>
    ) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, string | number | boolean>) {
  const eventProperties = properties ?? {};

  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && window.gtag) {
    window.gtag("event", event, eventProperties);
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, eventProperties);
  }
}
