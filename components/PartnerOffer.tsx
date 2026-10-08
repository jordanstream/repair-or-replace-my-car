"use client";

import { useEffect, useRef } from "react";
import { analyticsEvents, trackEvent } from "@/lib/analytics";
import { configuredPartnerOffer, type PartnerOutcome } from "@/lib/partner-offers";

type PartnerOfferProps = { outcome: PartnerOutcome; safetyFlag: boolean };

export function PartnerOffer({ outcome, safetyFlag }: PartnerOfferProps) {
  const offer = configuredPartnerOffer(outcome, safetyFlag);
  const offerHref = offer?.href;
  const offerKind = offer?.kind;
  const offerElement = useRef<HTMLElement>(null);
  const viewCounted = useRef(false);

  useEffect(() => {
    viewCounted.current = false;
    if (!offerHref || !offerKind || !offerElement.current) return;
    const element = offerElement.current;
    const countView = () => {
      if (viewCounted.current) return;
      viewCounted.current = true;
      trackEvent(analyticsEvents.affiliateOfferViewed, { outcome, partner_type: offerKind });
    };
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) countView();
    }, { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [outcome, offerHref, offerKind]);

  if (!offer) return null;
  return (
    <aside ref={offerElement} className="rounded-lg border border-line bg-white p-6" aria-label="Optional affiliate option">
      <p className="text-sm font-semibold text-brand-700">Optional partner resource</p>
      <p className="mt-2 leading-7 text-ink-700">{offer.description}</p>
      <p className="mt-3 text-sm leading-6 text-ink-600">
        Affiliate disclosure: We may earn a commission if you use this link. It does not change your calculator
        result or what we recommend. Read our <a className="underline underline-offset-4" href="/affiliate-disclosure">affiliate disclosure</a>.
      </p>
      <a
        href={offer.href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-brand-600 bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
        onClick={() => trackEvent(analyticsEvents.affiliateCtaClicked, { outcome, partner_type: offer.kind })}
      >{offer.label}</a>
    </aside>
  );
}
