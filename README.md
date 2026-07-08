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
5. Optionally set analytics placeholders when a real provider is chosen.
6. Deploy.

## Environment Variables

No real secrets are required for the MVP.

```bash
NEXT_PUBLIC_SITE_URL=https://repairorreplacemycar.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
NEXT_PUBLIC_ANALYTICS_PROVIDER=
```

Analytics placeholders are in `lib/analytics.ts`. Event names are prepared for calculator start, completion, result type, safety-warning results, external clicks, and print actions. The current utility is a safe no-op unless a provider is added later.

## Architecture

- `app/`: Next.js App Router routes, metadata, sitemap, robots, and pages.
- `components/`: Reusable layout, form, result, chart, table, FAQ, and UI primitives.
- `data/guides.ts`: Structured guide content used by the guide pages.
- `lib/calculator.ts`: Client-side calculator formulas and recommendation logic.
- `lib/calculator-constants.ts`: Central calculator assumptions and thresholds.
- `lib/metadata.ts`: Reusable metadata helper.
- `tests/calculator-scenarios.ts`: Scenario checks for core calculator outcomes.

## Calculator Assumptions

Calculator assumptions are centralized in `lib/calculator-constants.ts`.

The MVP intentionally uses transparent estimates:

- Current vehicle repair path includes repair quote, expected additional repairs, remaining loan exposure, and a monthly ownership reserve.
- Replacement path includes purchase price, down payment, financed amount, amortized loan payment, taxes and fees, monthly insurance/fuel/maintenance changes, equity or negative equity, and a simple depreciation reserve.
- Current vehicle depreciation is not modeled.
- Replacement depreciation reserve is a configurable estimate, not a market prediction.
- Safety flags continue showing financial output but change the recommendation to professional safety review.
- Results depend entirely on user-entered estimates. The app does not know exact vehicle values, repair quality, local labor rates, taxes, insurance premiums, financing offers, or future repair needs.
- The `/results` page uses browser `localStorage` for this MVP. It is not shareable across browsers or devices, and clearing browser storage removes the saved estimate.

## Future Planned Integrations

The code is organized so future APIs, analytics, affiliate links, email capture, local vendor matching, authentication, user accounts, and saved comparisons can be added later. Any affiliate relationship should be disclosed clearly before launch.

## Limitations

This tool is educational and informational only. It is not mechanical, safety, legal, financial, insurance, or purchasing advice. It does not inspect vehicles, verify repair shops, scrape listings, or call paid vehicle-value APIs.
