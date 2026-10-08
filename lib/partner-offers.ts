export type PartnerOutcome = "repair" | "replace" | "close" | "safety";
export type PartnerKind = "repair" | "replacement";
export type PartnerConfig = { repairUrl?: string; replacementUrl?: string };
export type PartnerOfferDetails = {
  href: string;
  kind: PartnerKind;
  label: string;
  description: string;
};

function validExternalHttpsUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    if (
      url.protocol !== "https:" ||
      !url.hostname.includes(".") ||
      url.username ||
      url.password ||
      url.port ||
      url.hostname === "localhost" ||
      url.hostname.endsWith(".local")
    ) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function selectPartnerOffer(
  outcome: PartnerOutcome,
  safetyFlag: boolean,
  config: PartnerConfig
): PartnerOfferDetails | null {
  if (safetyFlag || outcome === "safety") return null;
  if (outcome === "repair" || outcome === "close") {
    const href = validExternalHttpsUrl(config.repairUrl);
    return href ? {
      href,
      kind: "repair",
      label: "Explore a repair-related option",
      description: "An optional third-party resource for comparing a repair estimate or seeking another qualified opinion."
    } : null;
  }
  if (outcome === "replace") {
    const href = validExternalHttpsUrl(config.replacementUrl);
    return href ? {
      href,
      kind: "replacement",
      label: "Explore a vehicle replacement option",
      description: "An optional third-party resource for comparing replacement shopping or vehicle-value options."
    } : null;
  }
  return null;
}

export function configuredPartnerOffer(outcome: PartnerOutcome, safetyFlag: boolean) {
  return selectPartnerOffer(outcome, safetyFlag, {
    repairUrl: process.env.NEXT_PUBLIC_REPAIR_PARTNER_URL,
    replacementUrl: process.env.NEXT_PUBLIC_REPLACEMENT_PARTNER_URL
  });
}

export function affiliateOffersConfigured() {
  return Boolean(configuredPartnerOffer("repair", false) || configuredPartnerOffer("replace", false));
}
