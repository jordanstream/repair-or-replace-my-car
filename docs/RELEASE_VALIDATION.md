# Car Second Opinion — Recovery and validation release

## Origin and safety

- Recovered from a locally uploaded ZIP. All 144 Vercel production source-file SHA-1 fingerprints matched (October 7, 2026).
- Original upload was not modified. The ZIP contained `.env.local`; it was **never read or copied** into these worktrees.
- This release candidate excludes dependencies, runtime caches, logs, temporary exports, and existing operational/business documentation.
- The separate verified source must be kept unchanged as a rollback reference. Never force-push the Git default or original production branch.

## Scope: only three changes

1. Permanent redirect of legacy $5,000 guide slug to its canonical destination.
2. Optional outcome-matched repair or replacement offer, suppressed completely for safety outcomes and when no approved partner URL is configured.
3. GA4 `affiliate_offer_viewed` (viewport observed) and `affiliate_cta_clicked` events containing only outcome and partner_type.

An affiliate disclosure, privacy paragraph, About page wording, and optional-results clarification were updated as required to keep statements accurate when offers are configured.

## Environment and activation

Keep `NEXT_PUBLIC_REPAIR_PARTNER_URL` and `NEXT_PUBLIC_REPLACEMENT_PARTNER_URL` **unset** until appropriate commercial partnerships and reviews exist. Both must be public HTTPS destinations, and credentials/PII must never be embedded in those URLs. They are publicly exposed client config, never secrets. Do not modify existing GA4 or Kit credentials.

## Verification and production safeguards

- First inspect the diff from verified, unmodified production source and test the unmodified source.
- Run `npm ci --ignore-scripts`, `npm run typecheck`, `npm run lint`, `npm run test:calculator`, `npm run test:navigation`, `npm run test:seo`, `node --import tsx tests/affiliate-release-contracts.ts`, and `npm run build` from a clean, secret-free workspace.
- Verify no offer appears with partner URLs unset, correct offer type for repair/close/replace outcomes, and zero offers when safety is flagged.
- Verify HTTPS-only link selection, `rel=sponsored`, affiliate disclosure, privacy language, event names/parameters, and redirect behavior.
- Commit on a **new review branch**, open PR, review source parity and CI checks before production branch merge.
- Authorize and test a preview deployment; preserve current production deployment as rollback point. Do not change DNS/domain routing or replace production from a stale branch.
- After successful cutover, make Git the deployable source of truth and prohibit CLI deployments from uncommitted worktrees.

## Feature freeze

No marketplace, mechanic directory, AI mechanic, generic automotive content expansion, or affiliate carousel. Prioritize organic search, calculator completion, next-step intent, and measurable downstream commercial value before further investment.
