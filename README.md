# Repair or Replace My Car

Production-ready MVP for a national U.S. decision-support calculator that helps people compare the likely cost of repairing an aging vehicle versus replacing it with a used or new car.

## Local Installation

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Development Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run test:calculator
npm run build
```

## Deploying to Vercel

Recommended Vercel settings:

- Framework preset: Next.js
- Install command: `npm install`
- Build command: `npm run build`
- Development command: `npm run dev`
- Output directory: use the Vercel default for Next.js

Steps:

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Use the default Next.js framework settings above.
4. Set `NEXT_PUBLIC_SITE_URL` to the deployed production URL.
5. Optionally set `NEXT_PUBLIC_GA_MEASUREMENT_ID` when Google Analytics 4 is ready.
6. Configure Google Sheets and Cloudflare Turnstile for the private checklist signup, then verify on Preview before Production.
7. Deploy.

## Environment Variables

The checklist signup requires server-only secrets. Do not commit these values or share them in public issues.

```bash
NEXT_PUBLIC_SITE_URL=https://carsecondopinion.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-89CL7WMDH1
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
NEXT_PUBLIC_ANALYTICS_PROVIDER=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
```

## Native Checklist Signup (Google Sheets + Turnstile)

This site collects first name and email for a free checklist download, with a separate unchecked checkbox for optional future marketing consent. No Kit, Tally, or mail-delivery provider is required.

**Google Cloud and Sheets setup:**
1. In Google Drive, create a private spreadsheet named `CarSecondOpinion — Checklist Leads`. Rename its first tab exactly `Signups`.
2. Add header cells A1:F1: `Timestamp UTC`, `First Name`, `Email`, `Marketing Consent`, `Consent Version`, `Source`.
3. In Google Cloud Console, create or select a project, enable the **Google Sheets API**, create a service account, and create a JSON private key. Treat the downloaded JSON file as sensitive.
4. Share only this spreadsheet with the service account's `client_email`, granting Editor access. Do not make the sheet public.
5. In Vercel, set the server-only variables `GOOGLE_SHEETS_SPREADSHEET_ID` (from the sheet URL), `GOOGLE_SHEETS_CLIENT_EMAIL` (from the key JSON), and `GOOGLE_SHEETS_PRIVATE_KEY` (the complete JSON `private_key` value). For a line-break-escaped private key, store `\\n` sequences, not literal surrounding quotation marks. Never use `NEXT_PUBLIC_` for these values.
6. In Cloudflare Turnstile, create a widget allowing the Vercel preview hostname, then add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and server-only `TURNSTILE_SECRET_KEY` in Vercel Preview env settings.
7. Redeploy the preview after adding environment variables. Verify invalid/missing Turnstile requests are rejected, one consent-off submission writes `No`, and one consent-on submission writes `Yes`. Confirm the PDF link appears **only** after the successful Sheet append. Remove test rows afterwards.
8. Configure Turnstile for the production hostnames (`carsecondopinion.com` and `www.carsecondopinion.com`) and production Vercel variables; apply narrow per-IP throttling to POST `/api/checklist/subscribe` in the Vercel firewall before merging/deploying.
9. Confirm the privacy policy and restrict Sheet sharing to authorized editors only. Set a deletion and consent-handling process before sending any future marketing messages.

If any variable is missing or Sheets/Turnstile fails, submission fails closed with an error and does not reveal the download in the confirmation UI. The PDF itself remains a public static asset; this is not a secure paywall.

Google Search Console is used for indexing and search-performance reporting. Submit `https://carsecondopinion.com/sitemap.xml` in Search Console and keep `https://carsecondopinion.com/robots.txt` accessible.

Google Analytics 4 should be used for interaction events. `components/GoogleAnalytics.tsx` loads the Google tag using `G-89CL7WMDH1` by default, or `NEXT_PUBLIC_GA_MEASUREMENT_ID` if a different measurement ID is set. `lib/analytics.ts` sends the prepared events:

- `calculator_started`
- `calculator_step_completed`
- `calculator_step_back`
- `calculator_validation_error`
- `calculator_completed`
- `result_repair`
- `result_replace`
- `result_close_call`
- `result_details_opened`
- `assumptions_edited`
- `methodology_opened`
- `quote_confidence_completed`
- `shop_questions_opened`
- `next_step_clicked`
- `safety_warning_result`
- `guide_cta_clicked`
- `checklist_email_clicked`
- `checklist_download_clicked`
- `email_results_clicked`
- `external_repair_search_clicked`
- `external_replacement_link_clicked`

Analytics remains safe and non-breaking if a future provider is unavailable.

## Architecture

- `app/`: Next.js App Router routes, metadata, sitemap, robots, and pages.
- `components/`: Reusable layout, form, result, chart, table, checklist, FAQ, and UI primitives.
- `data/guides.ts`: Structured guide content used by the guide pages.
- `lib/calculator.ts`: Client-side calculator formulas and recommendation logic.
- `lib/calculator-constants.ts`: Central calculator assumptions and thresholds.
- `lib/metadata.ts`: Reusable metadata helper.
- `tests/calculator-scenarios.ts`: Scenario checks for core calculator outcomes.

## Calculator Assumptions

Calculator assumptions are centralized in `lib/calculator-constants.ts`.

The MVP intentionally uses transparent, user-entered estimates:

- The headline is an estimated cash-flow comparison, not a complete economic-cost or ownership-cost total.
- The repair path includes the repair quote, user-entered future maintenance and repairs, and current monthly payments due during the comparison period.
- The replacement path includes entered upfront cash, modeled replacement-loan payments during the period, monthly insurance/fuel/maintenance changes, and current-car equity or negative equity.
- Replacement ending value, depreciation, remaining loan balance, and ending equity are displayed separately. Depreciation is only calculated when an ending value is entered and is never added to headline cash flow.
- Current vehicle depreciation, ending value, and ending equity are not modeled because the current inputs cannot support those estimates accurately.
- Close calls use the documented percentage-or-dollar-minimum decision-confidence threshold in `lib/calculator-constants.ts`; it is not an industry standard.
- Safety flags continue showing financial output but change the recommendation to professional safety review.
- Results depend entirely on user-entered estimates. The app does not know exact vehicle values, repair quality, local labor rates, taxes, insurance premiums, financing offers, or future repair needs.
- The `/results` page uses browser `localStorage` for this MVP. It is not shareable across browsers or devices, and clearing browser storage removes the saved estimate.

## Future Planned Integrations

The code is organized so future APIs, email-service integrations, affiliate links, local vendor matching, authentication, user accounts, and saved comparisons can be added later. Any affiliate relationship should be disclosed clearly before launch.

## Limitations

This tool is educational and informational only. It is not mechanical, safety, legal, financial, insurance, or purchasing advice. It does not inspect vehicles, verify repair shops, scrape listings, or call paid vehicle-value APIs.
