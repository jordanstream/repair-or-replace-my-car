# Validation Baseline — 2026-10-07

Car Second Opinion is now in validation mode. The product remains a narrow repair-vs-replace decision tool; this phase is for proving search demand, calculator use, next-step intent, and monetization fit before investing in broader features or content.

## Production baseline

Google Search Console property: `sc-domain:carsecondopinion.com`

Settled 28-day window through 2026-10-04:

- Search clicks: 10
- Search impressions: 1,520
- Search CTR: 0.66%
- Average search position: 10.90
- Prior-period change: +3 clicks, +677 impressions, average position improved by about 7.6 positions
- Sitemap: submitted and downloadable with zero reported warnings/errors

Strongest search pages in the same window:

- `/guides/is-a-5000-dollar-car-repair-worth-it`: 3 clicks, 370 impressions, average position 5.40
- `/guides/is-a-3000-dollar-car-repair-worth-it`: 2 clicks, 414 impressions, average position 5.50
- `/guides/is-it-worth-getting-a-second-opinion-on-a-car-repair`: 1 click, 60 impressions, average position 8.37

Canonical-host issue observed:

- Google had `https://www.carsecondopinion.com/guides/is-it-worth-fixing-a-car-with-200000-miles` indexed.
- The apex equivalent was only discovered and not indexed at audit time.
- From 2026-07-01 through 2026-10-04 the indexed www URL recorded 49 impressions and 1 click.
- Both apex and www were attached to the same Vercel production deployment with no domain redirect configured.

Analytics readiness at audit time:

- Production has `NEXT_PUBLIC_GA_MEASUREMENT_ID` configured.
- The Google tag is installed in the application.
- Funnel events are defined for calculator starts, step movement, validation errors, completions, outcomes, result interactions, checklist actions, and next-step clicks.
- GA4 is not linked to the GSC Wizard account used for this audit, so event totals could not be independently read here. Link the GA4 property before using analytics conversion rates as an investment signal.

## Changes in this validation branch

1. Force `www.carsecondopinion.com/:path*` to the apex host with a permanent redirect.
2. Redirect the observed legacy `/guides/is-a-5000-car-repair-worth-it` URL to the current dollar-slug URL.
3. Remove `/results` from the XML sitemap because it is personalized/browser-state content and explicitly noindex.
4. Keep `/results` noindex but allow link following.
5. Add `/about` to the sitemap.
6. Stop assigning build-time `lastModified` timestamps to every static URL; guide URLs now use their actual last-reviewed dates.
7. Harden custom-event tracking so it uses the same loaded Google tag even when the built-in fallback measurement ID is active.
8. Add an optional, outcome-matched affiliate CTA that only renders when a partner URL is explicitly configured:
   - repair/close-call -> repair partner
   - replace -> replacement partner
   - safety -> no affiliate offer
9. Affiliate CTA includes an adjacent disclosure, uses `rel="sponsored"`, and tracks `affiliate_cta_clicked`.
10. No generic automotive expansion, directory, marketplace, account system, or new broad content program was added.

## Validation metrics

Review weekly; make the first investment decision after enough volume exists to avoid reacting to tiny samples.

Primary product metric:
- Calculator completion rate = `calculator_completed / calculator_started`

Acquisition metrics:
- Organic impressions and clicks
- Non-branded decision-intent impressions
- CTR on pages ranking in positions 1–10
- Number of apex URLs receiving impressions
- Any reappearance of www URLs in Search Console

Activation metrics:
- Calculator starts
- Calculator completions
- Step 1 -> 2 and Step 2 -> 3 continuation
- Validation-error rate
- Outcome mix: repair / replace / close-call / safety

Commercial-intent metrics:
- Result next-step CTR
- Repair-search CTR
- Replacement-next-step CTR
- Affiliate CTA CTR when a partner is configured
- Checklist signup/download rate
- Email-results click rate

## Invest-further thresholds

Use these as validation gates, not guarantees.

Continue modest SEO/conversion investment if, over a rolling 28-day window:
- organic impressions grow at least 20% period over period or qualified clicks grow at least 15%;
- calculator completion is at least 45% of starts once there are 100+ starts;
- at least 15% of completed-result sessions click a useful next step;
- a configured affiliate offer gets at least 5% CTR from eligible result views without reducing calculator completion or increasing exits materially.

Increase investment only after stronger proof:
- 500+ calculator starts and 200+ completions accumulated;
- 25+ organic clicks per 28 days with at least three decision-intent pages independently generating clicks;
- result next-step CTR at or above 20%;
- at least 25 affiliate clicks with a measurable downstream conversion or lead signal from a partner;
- host duplication is no longer appearing in new Search Console impressions.

Hold or reduce investment if, after 8–12 weeks of clean measurement:
- impressions are flat/declining and decision-intent pages are not gaining rankings;
- calculator completion is below 30%;
- result next-step CTR is below 8%;
- affiliate CTR is below 2% after 200+ eligible result views;
- monetization requires pushing irrelevant offers or weakening the site's neutral decision framing.

## Validation-mode operating rule

Do not add major features or broaden into generic automotive content. During validation, ship only fixes or experiments tied directly to one of these questions:

1. Can decision-intent search traffic grow?
2. Do visitors complete the calculator?
3. Do results produce useful next-step intent?
4. Can one or two tightly matched partner offers monetize that intent without damaging trust?
