# Production reconciliation and validation freeze — 2026-10-07

## Release blocker: Git != deployed source

Live Vercel production deployment: `dpl_GRbf1A8rZqNZa2GJ7AC6waVNofDg`.

This was a CLI upload. The deployment metadata reports commit `c3da3b605615261728cbe8c4d6e1c0ec300f5e16`, but production includes extensive newer source absent from that commit, including the About page, September guides, redesigned components and updated calculator logic. **Do not merge a patch based on that stale commit and deploy it**; that would risk reversing production functionality.

The connected Vercel source retrieval endpoint shows the file manifest and SHA-1 identifiers but truncates file content over roughly 2 KB. The required complete source is therefore not recoverable through the connected ChatGPT read endpoint. Vercel preview and sandbox creation also returned 403. A locally authorized Vercel REST token, used only on the owner's machine, is needed to perform byte-for-byte recovery. Do not commit or share that token.

A tested, standalone **Production Recovery Pack** was supplied in the conversation containing:
- `scripts/reconcile-vercel-production.mjs`: downloads deployable production files, verifies SHA-1s, excludes secrets/logs/internal docs, checks required paths, and refuses unsafe branch writes. `--write` restores unpatched production source and generates a SHA-1 provenance manifest; only after inspecting/tests does `--patch` apply the authorized tiny changes.
- `scripts/reconcile-vercel-production.test.mjs`: Node test suite (5 tests passing).
- `docs/VALIDATION_MODE.md`: secure recovery instructions and release QA checklist.

Import the updated recovery pack on the recovery branch. Run inspect-only, then `--write` to restore unmodified production source. Inspect the SHA-1 manifest and diff, run typecheck, lint, calculator/navigation tests and the build. Only then run `--patch`, repeat all tests, and review a working preview. The offer-view event uses intersection visibility rather than counting every mounted offer.

## Small authorized product patch, and nothing else

1. A permanent redirect from `/guides/is-a-5000-car-repair-worth-it` to `/guides/is-a-5000-dollar-car-repair-worth-it`.
2. Exactly one optional result-stage partner offer: repair and close-call -> approved repair partner; replace -> approved replacement partner; safety -> no offer. If no partner URL is configured, do not show an affiliate offer.
3. Adjacent commission disclosure, `rel="sponsored noopener noreferrer"`, an `affiliate_offer_viewed` event and an `affiliate_cta_clicked` event, containing only non-sensitive outcome and partner type.

**Already present in actual production (preserve):** www -> apex permanent redirect, apex canonicals, `/results` noindex/follow and excluded from sitemap, `/about` and real guide review dates in sitemap, strong result/guide decision flow.

## Strict feature freeze

No marketplace, mechanic directory, AI mechanic, generic automotive publishing campaign, redesign, account system or broad affiliate stack. Allow only correctness, accessibility, SEO indexing, analytics validation, and measurement-based experiments on the existing decision funnel.

## Baseline and investment signals

Search Console's 28 settled days through 2026-10-04: 1,520 impressions; 10 clicks; 0.66% CTR; average position 10.90. Calculator GA4 totals were not independently accessible. Establish a clean analytics baseline before evaluating conversions.

After 100+ starts: continue modestly if calculator completion >=45%, 28-day qualified search clicks grow >=15% or impressions grow >=20%, and >=15% of completed results produce a useful next-step click. Scale only with 500+ starts, 200+ completions, >=25 organic clicks/28 days from at least three decision pages, >=20% next-step CTR and real downstream partner conversions. Hold/reduce after 8-12 weeks if completion <30% or next-step CTR <8%. Partner CTR requires eligible offer-view denominators; do not equate outbound clicks with revenue.

## Promotion requirements

- Recover and review source against actual production manifest.
- Run all applicable tests and production build.
- Verify all four result outcomes, empty partner config, affiliate disclosure/events, and legacy/host redirects in preview.
- Merge verified source onto the chosen production branch, connect Vercel to that branch **only after** source parity has been established, and ensure a deployment SHA matches reviewed source.
- Stop deploying uncommitted local code via CLI after the controlled cutover.
