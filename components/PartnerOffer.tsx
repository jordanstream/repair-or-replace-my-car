"use client";

import { analyticsEvents, trackEvent } from "@/lib/analytics";
type PartnerOfferProps = {
  outcome: "repair" | "replace" | "close" | "safety";
};

type PartnerOffer = {
  href: string;
  label: string;
  description: string;
  partnerType: "repair" | "replacement";
};

function getPartnerOffer(outcome: PartnerOfferProps["outcome"]): PartnerOffer | null {
  if (outcome === "repair" || outcome === "close") {
    const href = process.env.NEXT_PUBLIC_REPAIR_PARTNER_URL;
    if (!href) return null;
    return {
      href,
      label: "Check a repair option",
      description: "A third-party option that may help you get another estimate or repair-related next step.",
      partnerType: "repair"
    };
  }

  if (outcome === "replace") {
    const href = process.env.NEXT_PUBLIC_REPLACEMENT_PARTNER_URL;
    if (!href) return null;
    return {
      href,
      label: "Explore a replacement option",
      description: "A third-party option that may help you compare a replacement vehicle or related next step.",
      partnerType: "replacement"
    };
  }

  return null;
}

export function PartnerOffer({ outcome }: PartnerOfferProps) {
  const offer = getPartnerOffer(outcome);
  if (!offer) return null;

  return (
    <aside className="rounded-lg border border-line bg-wash p-6" aria-label="Partner option">
      <p className="text-sm font-semibold text-brand-700">Optional partner option</p>
      <p className="mt-2 text-sm leading-6 text-ink-600">
        This is an affiliate link. Car Second Opinion may earn a commission if you use it. It does not affect your
        calculator result or recommendation.
      </p>
      <p className="mt-4 leading-7 text-ink-700">{offer.description}</p>
      <a
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-brand-600 bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        href={offer.href}
        target="_blank"
        rel="sponsored noreferrer"
        onClick={() =>
          trackEvent(analyticsEvents.affiliateCtaClicked, {
            outcome,
            partner_type: offer.partnerType
          })
        }
      >
        {offer.label}
      </a>
    </aside>
  );
}
