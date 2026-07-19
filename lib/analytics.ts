export const analyticsEvents = {
  calculatorStarted: "calculator_started",
  calculatorStepCompleted: "calculator_step_completed",
  calculatorStepBack: "calculator_step_back",
  calculatorValidationError: "calculator_validation_error",
  calculatorCompleted: "calculator_completed",
  resultRepair: "result_repair",
  resultReplace: "result_replace",
  resultCloseCall: "result_close_call",
  safetyWarningResult: "safety_warning_result",
  guideCtaClicked: "guide_cta_clicked",
  checklistEmailClicked: "checklist_email_clicked",
  checklistDownloadClicked: "checklist_download_clicked",
  emailResultsClicked: "email_results_clicked",
  resultNextStepClicked: "result_next_step_clicked",
  resultDetailsOpened: "result_details_opened",
  assumptionsEdited: "assumptions_edited",
  methodologyOpened: "methodology_opened",
  quoteConfidenceCompleted: "quote_confidence_completed",
  shopQuestionsOpened: "shop_questions_opened",
  nextStepClicked: "next_step_clicked",
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
