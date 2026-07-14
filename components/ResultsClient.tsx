"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChecklistSignup } from "@/components/ChecklistSignup";
import { ComparisonTable } from "@/components/ComparisonTable";
import { CostChart } from "@/components/CostChart";
import { EstimateDisclaimer, safetyWarningText } from "@/components/EstimateDisclaimer";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ResultBadge } from "@/components/ui/ResultBadge";
import { analyticsEvents, trackEvent } from "@/lib/analytics";
import { calculateRepairOrReplace, type CalculatorInput } from "@/lib/calculator";
import { parseStoredCalculatorInput } from "@/lib/storage";

const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function loadStoredInput() {
  if (typeof window === "undefined") return null;

  return parseStoredCalculatorInput(window.localStorage.getItem("repair-or-replace-input"));
}

function buildSearchUrl(engine: "google" | "yelp", input: CalculatorInput) {
  const query = `${input.repairCategory} repair shop ${input.zipCode ?? ""}`.trim();
  if (engine === "google") return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  return `https://www.yelp.com/search?find_desc=${encodeURIComponent(`${input.repairCategory} repair`)}&find_loc=${encodeURIComponent(input.zipCode ?? "")}`;
}

function buildEmailResultsHref(input: CalculatorInput, result: ReturnType<typeof calculateRepairOrReplace>) {
  const lines = [
    "Car Second Opinion repair-vs-replace estimate",
    "",
    result.headline,
    result.summary,
    "",
    `Confidence: ${result.confidence}`,
    `Comparison period: ${input.comparisonMonths} months`,
    `Lowest estimate: ${result.lowestOption.label}`,
    "",
    "Estimated totals:",
    ...result.options.map((option) => `${option.label}: ${formatter.format(option.totalCost)} (${formatter.format(option.monthlyEquivalent)} monthly equivalent)`),
    "",
    "Three biggest drivers:",
    ...result.drivers.map((driver) => `- ${driver}`),
    "",
    "Educational note: this estimate is based on user-entered assumptions. It is not mechanical, safety, legal, financial, insurance, or purchasing advice.",
    "",
    "Run or update the calculator:",
    "https://carsecondopinion.com/calculator"
  ];

  return `mailto:?subject=${encodeURIComponent("My Car Second Opinion results")}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export function ResultsClient() {
  const [input] = useState<CalculatorInput | null>(() => loadStoredInput());

  const result = useMemo(() => (input ? calculateRepairOrReplace(input) : null), [input]);

  useEffect(() => {
    if (!result) return;
    const event =
      result.outcome === "safety"
        ? analyticsEvents.safetyWarningResult
        : result.outcome === "repair"
        ? analyticsEvents.resultRepair
        : result.outcome === "replace"
          ? analyticsEvents.resultReplace
          : analyticsEvents.resultCloseCall;
    trackEvent(event, { confidence: result.confidence });
  }, [result]);

  if (!input || !result) {
    return (
      <Card className="p-8">
        <h1 className="text-3xl font-bold text-ink-950">No calculator results yet</h1>
        <p className="mt-4 max-w-2xl leading-7 text-ink-700">
          No saved calculation was found in this browser. Results are created from calculator entries stored locally on
          your device for this MVP, so opening this page directly or clearing browser storage removes the saved estimate.
        </p>
        <div className="mt-6">
          <Button href="/calculator">Start the Calculator</Button>
        </div>
        <EstimateDisclaimer className="mt-6" />
      </Card>
    );
  }

  const replacementFocused = result.outcome === "replace";
  const usedOption = result.options.find((option) => option.key === "used");
  const newOption = result.options.find((option) => option.key === "new");

  return (
    <div className="space-y-8">
      {result.safetyFlag ? (
        <Alert tone="danger">
          {safetyWarningText} Financial estimate only.
        </Alert>
      ) : null}

      <Card className="p-6 sm:p-8">
        <ResultBadge outcome={result.outcome} />
        <h1 className="mt-5 text-2xl font-bold leading-tight text-ink-950 sm:text-3xl md:text-5xl">{result.headline}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-700 sm:text-lg sm:leading-8">{result.summary}</p>
        <div className="mt-5">
          <EstimateDisclaimer />
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-ink-600">Confidence</p>
            <p className="mt-1 text-2xl font-bold text-ink-950">{result.confidence}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-600">Comparison period</p>
            <p className="mt-1 tabular text-2xl font-bold text-ink-950">{input.comparisonMonths} months</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-600">Lowest estimate</p>
            <p className="mt-1 text-2xl font-bold text-ink-950">{result.lowestOption.label}</p>
          </div>
        </div>
      </Card>

      <section aria-labelledby="cost-heading" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <h2 id="cost-heading" className="text-2xl font-bold text-ink-950">Estimated cost comparison</h2>
          <div className="mt-6">
            <CostChart options={result.options} lowestKey={result.lowestOption.key} />
          </div>
        </Card>
        <ComparisonTable options={result.options} lowestKey={result.lowestOption.key} />
      </section>

      <Card className="p-6">
        <h2 className="text-2xl font-bold text-ink-950">Estimate basis</h2>
        <p className="mt-3 leading-7 text-ink-700">
          These totals are calculated from the estimates you entered. They are not quotes, market values, or safety
          findings.
        </p>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-sm font-semibold text-ink-600">Repair quote entered</dt>
            <dd className="tabular mt-1 text-xl font-bold text-ink-950">{formatter.format(input.repairQuote)}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-ink-600">Expected added repairs</dt>
            <dd className="tabular mt-1 text-xl font-bold text-ink-950">{formatter.format(input.additionalRepairs)}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-ink-600">Used replacement total</dt>
            <dd className="tabular mt-1 text-xl font-bold text-ink-950">{usedOption ? formatter.format(usedOption.totalCost) : "Not compared"}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-ink-600">New replacement total</dt>
            <dd className="tabular mt-1 text-xl font-bold text-ink-950">{newOption ? formatter.format(newOption.totalCost) : "Not compared"}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm leading-6 text-ink-600">
          Repair total includes the quote, expected additional repairs, remaining-loan exposure when entered, and an
          ownership reserve. Replacement totals include financing during the comparison period, taxes and fees, ownership
          deltas, equity or negative equity, and a simple depreciation reserve.
        </p>
      </Card>

      <section className="grid gap-5 md:grid-cols-3">
        {result.options.map((option) => (
          <Card key={option.key} className={`print-break-inside-avoid p-5 ${option.key === result.lowestOption.key ? "border-success-700" : ""}`}>
            <h2 className="text-xl font-bold text-ink-950">{option.label}</h2>
            <p className="mt-3 tabular text-3xl font-bold text-ink-950">{formatter.format(option.totalCost)}</p>
            <p className="mt-1 tabular text-sm text-ink-600">{formatter.format(option.monthlyEquivalent)} monthly equivalent</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-ink-700">
              {option.drivers.map((driver) => <li key={driver}>{driver}</li>)}
            </ul>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-ink-950">Three biggest drivers</h2>
          <ul className="mt-4 space-y-3 leading-7 text-ink-700">
            {result.drivers.map((driver) => <li key={driver}>{driver}</li>)}
          </ul>
        </Card>
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-ink-950">What could change this result?</h2>
          <ul className="mt-4 space-y-3 leading-7 text-ink-700">
            {result.changeFactors.map((factor) => <li key={factor}>{factor}</li>)}
          </ul>
        </Card>
      </section>

      <Card className="p-6">
        <h2 className="text-2xl font-bold text-ink-950">Important safety and reliability notes</h2>
        <p className="mt-4 leading-7 text-ink-700">
          This comparison is financial only. Reliability needs, household disruption, and safety concerns may outweigh a
          lower estimated cost. Get a written diagnosis and ask what the repair does not address.
        </p>
      </Card>

      <ChecklistSignup placement="results" />

      <details className="rounded-lg border border-line bg-white p-6">
        <summary className="cursor-pointer text-xl font-bold text-ink-950">How we calculated this</summary>
        <div className="mt-4 space-y-3 leading-7 text-ink-700">
          <p>Repair cost includes the repair quote, expected additional repairs, a current ownership reserve, and estimated remaining loan exposure.</p>
          <p>Replacement cost includes down payment, financed payments during the comparison period, taxes and fees, monthly ownership deltas, equity or negative equity, and a simple depreciation reserve.</p>
          <p>Recommendation logic weighs total cost, repair-to-value ratio, repair cost per usable month, mileage, future repairs, reliability importance, vehicle-use importance, equity, and safety uncertainty.</p>
        </div>
      </details>

      <section className="rounded-lg border border-line bg-white p-6">
        <h2 className="text-2xl font-bold text-ink-950">Optional next steps</h2>
        <p className="mt-3 text-sm leading-6 text-ink-600">
          External links may take you to third-party services. Ratings, availability, pricing, licensing, insurance, and
          service quality can change. We do not guarantee third-party services or outcomes.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {result.safetyFlag ? (
            <>
              <a className="rounded-md border border-danger-700 bg-danger-50 p-4 font-semibold text-danger-700 hover:bg-white" href={buildSearchUrl("google", input)} target="_blank" rel="noreferrer" onClick={() => trackEvent(analyticsEvents.externalRepairSearchClicked)}>Find a qualified inspection or repair professional</a>
              <Link className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href="/disclaimer">Review safety and decision disclaimer</Link>
              <Link className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href="/calculator">Adjust the estimate after inspection</Link>
            </>
          ) : replacementFocused ? (
            <>
              <Link className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href="/calculator">Adjust replacement assumptions</Link>
              <a className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href="https://www.google.com/search?q=trade+in+private+sale+car+options" target="_blank" rel="noreferrer" onClick={() => trackEvent(analyticsEvents.externalReplacementLinkClicked)}>Research trade-in and private-sale options</a>
              <a className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href="https://www.google.com/search?q=questions+to+ask+before+buying+a+used+car" target="_blank" rel="noreferrer" onClick={() => trackEvent(analyticsEvents.externalReplacementLinkClicked)}>Questions to ask before buying used</a>
            </>
          ) : (
            <>
              <a className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href={buildSearchUrl("google", input)} target="_blank" rel="noreferrer" onClick={() => trackEvent(analyticsEvents.externalRepairSearchClicked)}>Find shops for a written second estimate</a>
              <a className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href={buildSearchUrl("yelp", input)} target="_blank" rel="noreferrer" onClick={() => trackEvent(analyticsEvents.externalRepairSearchClicked)}>Search Yelp for repair shops near you</a>
              <Link className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href="/guides/is-it-worth-getting-a-second-opinion-on-a-car-repair">Questions to ask before approving repair</Link>
              <Link className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href="/calculator">Adjust the repair estimate</Link>
            </>
          )}
        </div>
      </section>

      <div className="no-print flex flex-col gap-3 sm:flex-row">
        <Button href="/calculator" variant="secondary">Start Over</Button>
        <a
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-brand-600 bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          href={buildEmailResultsHref(input, result)}
          onClick={() => trackEvent(analyticsEvents.emailResultsClicked, { outcome: result.outcome, confidence: result.confidence })}
        >
          Email My Results
        </a>
      </div>
    </div>
  );
}
