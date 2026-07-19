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
import { calculatorAssumptions } from "@/lib/calculator-constants";
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

function outcomeNextStep(result: ReturnType<typeof calculateRepairOrReplace>, input: CalculatorInput) {
  if (result.outcome === "safety") {
    return {
      title: "Safety comes before the cost comparison",
      copy:
        "The estimate flagged possible safety uncertainty. Before using the lower-cost option as a deciding factor, ask a qualified professional whether the car can be driven, moved, repaired, or inspected safely.",
      primaryLabel: "Find an inspection or repair professional",
      primaryHref: buildSearchUrl("google", input),
      primaryExternal: true,
      primaryEvent: analyticsEvents.externalRepairSearchClicked,
      secondaryLabel: "Review the safety disclaimer",
      secondaryHref: "/disclaimer",
      trackingContext: "safety_professional"
    };
  }

  if (result.outcome === "replace") {
    return {
      title: "Replacing may be the lower-cost path",
      copy:
        "Before shopping, compare your replacement budget, monthly payment, insurance change, taxes and fees, and trade-in or private-sale options. Keep the replacement assumption realistic so the decision does not drift toward wishful math.",
      primaryLabel: "Adjust replacement assumptions",
      primaryHref: "/calculator?edit=replacement",
      secondaryLabel: "Compare trade-in and private-sale options",
      secondaryHref: "https://www.google.com/search?q=trade+in+private+sale+car+options",
      secondaryExternal: true,
      trackingContext: "replace_budget"
    };
  }

  if (result.outcome === "close") {
    return {
      title: "The numbers are close",
      copy:
        "A second written estimate, a clearer warranty, or a more realistic replacement budget could change the decision. If the car can be inspected safely, slow the decision down before committing.",
      primaryLabel: "Find shops for another written estimate",
      primaryHref: buildSearchUrl("google", input),
      primaryExternal: true,
      primaryEvent: analyticsEvents.externalRepairSearchClicked,
      secondaryLabel: "Use the repair decision checklist",
      secondaryHref: "/checklist",
      trackingContext: "close_call_second_estimate"
    };
  }

  return {
    title: "Repair may be the lower-cost option",
    copy:
      "Before approving the work, get the estimate in writing and ask what the repair does and does not fix. A second estimate can be useful when the diagnosis, urgency, warranty, or price is unclear.",
    primaryLabel: "Find shops for a written second estimate",
    primaryHref: buildSearchUrl("google", input),
    primaryExternal: true,
    primaryEvent: analyticsEvents.externalRepairSearchClicked,
    secondaryLabel: "Questions to ask before approving repair",
    secondaryHref: "/guides/is-it-worth-getting-a-second-opinion-on-a-car-repair",
    trackingContext: "repair_second_estimate"
  };
}

function buildVerificationSteps(input: CalculatorInput, result: ReturnType<typeof calculateRepairOrReplace>) {
  const steps: string[] = [];
  if (input.itemizedEstimate !== "yes") steps.push("Ask for an itemized estimate with parts, labor, fees, and taxes.");
  if (input.testingExplained !== "yes") steps.push("Ask what testing confirmed the failed part or system.");
  if (input.secondShopConfirmed !== "yes") steps.push("Consider another qualified inspection or written estimate before committing.");
  if (input.wholeVehicleCondition !== "no") steps.push("Confirm whether a broader inspection found other major work likely within 12 months.");
  if (result.safetyFlag) steps.unshift("Ask a qualified mechanic whether the vehicle is safe to drive before delaying or declining a repair.");
  if (result.outcome === "replace") steps.push("Verify the replacement price, APR, insurance change, taxes, and fees with real quotes.");
  else steps.push("Confirm the repair warranty and what the quoted work does and does not address.");
  return steps.slice(0, 5);
}

const shopQuestions = [
  "What testing confirmed that this part or system failed?",
  "Is the recommendation based mainly on a diagnostic trouble code, or was the component tested?",
  "Can I receive an itemized estimate showing labor hours, labor rate, parts, fees, and taxes?",
  "Are all quoted parts necessary now?",
  "What parts and labor warranty is included?",
  "Is there a lower-cost repair option or staged approach?",
  "What happens if this repair does not solve the problem?"
];

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
  const nextStep = outcomeNextStep(result, input);
  const usedOption = result.options.find((option) => option.key === "used");
  const newOption = result.options.find((option) => option.key === "new");
  const verificationSteps = buildVerificationSteps(input, result);
  const showShopQuestions =
    result.quoteConfidenceLimited ||
    result.repairCostToValueRatio >= calculatorAssumptions.repairToValueConcernRatio;
  const hasFinancing = result.options.some((option) => (option.financedAmount ?? 0) > 0);

  return (
    <div className="space-y-8">
      {result.safetyFlag ? (
        <Alert tone="danger">
          Financial comparisons should not override safety. Ask a qualified mechanic whether the vehicle is safe to drive
          before delaying or declining a repair. {safetyWarningText}
        </Alert>
      ) : null}

      {result.quoteConfidenceLimited ? (
        <Alert tone="warning">
          This comparison uses the estimate you entered. The result may change if another inspection identifies a
          different repair or price.
        </Alert>
      ) : null}

      <Card className="p-6 sm:p-8">
        <ResultBadge outcome={result.outcome} />
        <p className="mt-5 text-sm font-semibold text-brand-700">Our financial perspective</p>
        <h1 className="mt-2 text-2xl font-bold leading-tight text-ink-950 sm:text-3xl md:text-5xl">{result.headline}</h1>
        <p className="mt-4 max-w-3xl font-semibold leading-7 text-ink-800">Based on the information you entered:</p>
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
        <h2 className="text-2xl font-bold text-ink-950">What you entered</h2>
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

      <section aria-label="Cost details by option" className="grid gap-5 md:grid-cols-3">
        {result.options.map((option) => (
          <Card key={option.key} className={`print-break-inside-avoid p-5 ${option.key === result.lowestOption.key ? "border-success-700" : ""}`}>
            <h2 className="text-xl font-bold text-ink-950">{option.label}</h2>
            <dl className="mt-4 space-y-3">
              <div><dt className="text-sm font-semibold text-ink-600">Upfront cash</dt><dd className="tabular mt-1 text-xl font-bold text-ink-950">{formatter.format(option.upfrontCash)}</dd></div>
              <div><dt className="text-sm font-semibold text-ink-600">Monthly equivalent</dt><dd className="tabular mt-1 text-xl font-bold text-ink-950">{formatter.format(option.monthlyEquivalent)}</dd></div>
              <div><dt className="text-sm font-semibold text-ink-600">Total over {input.comparisonMonths} months</dt><dd className="tabular mt-1 text-3xl font-bold text-ink-950">{formatter.format(option.totalCost)}</dd></div>
            </dl>
            <p className="mt-3 text-xs leading-5 text-ink-600">Monthly equivalent is the total estimate divided by the comparison period. It is not the same as a loan payment.</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-ink-700">
              {option.drivers.map((driver) => <li key={driver}>{driver}</li>)}
            </ul>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-ink-950">What is driving this result?</h2>
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
        <h2 className="text-2xl font-bold text-ink-950">What to verify next</h2>
        <ul className="mt-4 space-y-3 leading-7 text-ink-700">
          {verificationSteps.map((step) => <li key={step} className="flex gap-3"><span aria-hidden="true" className="mt-1 font-bold text-brand-700">✓</span><span>{step}</span></li>)}
        </ul>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold text-ink-950">Important safety and reliability notes</h2>
        <p className="mt-4 leading-7 text-ink-700">
          This comparison is financial only. Reliability needs, household disruption, and safety concerns may outweigh a
          lower estimated cost. Get a written diagnosis and ask what the repair does not address.
        </p>
      </Card>

      <section aria-label="Decision reminders" className="grid gap-5 md:grid-cols-2">
        {input.firstMajorRepair !== "yes" ? (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-ink-950">Do not let past repair spending make today’s decision for you.</h2>
            <p className="mt-3 leading-7 text-ink-700">Money already spent cannot be recovered. Compare the future cost and likely value of each option from today forward.</p>
          </Card>
        ) : null}
        {hasFinancing ? (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-ink-950">A manageable payment is not always the least expensive option.</h2>
            <p className="mt-3 leading-7 text-ink-700">Compare the full financing and ownership cost, not only the monthly payment.</p>
          </Card>
        ) : null}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-ink-950">Replacing a vehicle involves more than the purchase price.</h2>
          <p className="mt-3 leading-7 text-ink-700">This comparison includes entered down payment, loan payments during the period, taxes and fees, ownership-cost changes, equity or negative equity, and a simple depreciation reserve. Verify every assumption with current quotes.</p>
        </Card>
        {input.wholeVehicleCondition !== "no" ? (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-ink-950">The quoted repair may not be the only near-term cost.</h2>
            <p className="mt-3 leading-7 text-ink-700">Ask whether a broader inspection identified other major repairs. Only the additional amount you entered is included in the repair path.</p>
          </Card>
        ) : null}
      </section>

      {showShopQuestions ? (
        <details
          className="rounded-lg border border-line bg-white p-6"
          onToggle={(event) => {
            if (event.currentTarget.open) trackEvent(analyticsEvents.shopQuestionsOpened, { outcome: result.outcome });
          }}
        >
          <summary className="cursor-pointer text-xl font-bold text-ink-950">Questions to ask the repair shop</summary>
          <p className="mt-3 text-sm leading-6 text-ink-600">Educational prompts only. These questions do not diagnose the vehicle or imply the quoted work is unnecessary.</p>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-ink-700">{shopQuestions.map((question) => <li key={question}>{question}</li>)}</ul>
        </details>
      ) : null}

      <ChecklistSignup placement="results" />

      <Card className="p-6">
        <p className="text-sm font-semibold text-brand-700">Suggested next step</p>
        <h2 className="mt-2 text-2xl font-bold text-ink-950">{nextStep.title}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-ink-700">{nextStep.copy}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {nextStep.primaryExternal ? (
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-brand-600 bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              href={nextStep.primaryHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackEvent(analyticsEvents.resultNextStepClicked, { outcome: result.outcome, step: nextStep.trackingContext });
                trackEvent(analyticsEvents.nextStepClicked, { outcome: result.outcome, step: nextStep.trackingContext });
                trackEvent(nextStep.primaryEvent ?? analyticsEvents.resultNextStepClicked, { outcome: result.outcome });
              }}
            >
              {nextStep.primaryLabel}
            </a>
          ) : (
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-brand-600 bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              href={nextStep.primaryHref}
              onClick={() => {
                trackEvent(analyticsEvents.resultNextStepClicked, { outcome: result.outcome, step: nextStep.trackingContext });
                trackEvent(analyticsEvents.nextStepClicked, { outcome: result.outcome, step: nextStep.trackingContext });
              }}
            >
              {nextStep.primaryLabel}
            </Link>
          )}
          {nextStep.secondaryExternal ? (
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-brand-50"
              href={nextStep.secondaryHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackEvent(analyticsEvents.resultNextStepClicked, { outcome: result.outcome, step: `${nextStep.trackingContext}_secondary` });
                trackEvent(analyticsEvents.nextStepClicked, { outcome: result.outcome, step: `${nextStep.trackingContext}_secondary` });
              }}
            >
              {nextStep.secondaryLabel}
            </a>
          ) : (
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-brand-50"
              href={nextStep.secondaryHref}
              onClick={() => {
                trackEvent(analyticsEvents.resultNextStepClicked, { outcome: result.outcome, step: `${nextStep.trackingContext}_secondary` });
                trackEvent(analyticsEvents.nextStepClicked, { outcome: result.outcome, step: `${nextStep.trackingContext}_secondary` });
              }}
            >
              {nextStep.secondaryLabel}
            </Link>
          )}
        </div>
      </Card>

      <details
        className="rounded-lg border border-line bg-white p-6"
        onToggle={(event) => {
          if (event.currentTarget.open) trackEvent(analyticsEvents.resultDetailsOpened, { outcome: result.outcome });
        }}
      >
        <summary className="cursor-pointer text-xl font-bold text-ink-950">How we calculated this</summary>
        <div className="mt-4 space-y-3 leading-7 text-ink-700">
          <p>Repair cost includes the repair quote, expected additional repairs, a current ownership reserve, and estimated remaining loan exposure.</p>
          <p>Replacement cost includes down payment, financed payments during the comparison period, upfront taxes and fees, monthly ownership deltas, equity or negative equity, and a simple depreciation reserve.</p>
          <p>Recommendation logic weighs total cost, repair-to-value ratio, repair cost per usable month, mileage, future repairs, reliability importance, vehicle-use importance, equity, and safety uncertainty.</p>
        </div>
      </details>

      <section className="rounded-lg border border-line bg-white p-6">
        <h2 className="text-2xl font-bold text-ink-950">Optional next steps</h2>
        <p className="mt-3 text-sm leading-6 text-ink-600">
          External links may take you to third-party services. These are not paid placements or affiliate links right
          now. Ratings, availability, pricing, licensing, insurance, and service quality can change. We do not guarantee
          third-party services or outcomes.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {result.safetyFlag ? (
            <>
              <a className="rounded-md border border-danger-700 bg-danger-50 p-4 font-semibold text-danger-700 hover:bg-white" href={buildSearchUrl("google", input)} target="_blank" rel="noreferrer" onClick={() => trackEvent(analyticsEvents.externalRepairSearchClicked)}>Find a qualified inspection or repair professional</a>
              <Link className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href="/disclaimer">Review safety and decision disclaimer</Link>
              <Link className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href="/calculator?edit=repair">Adjust the estimate after inspection</Link>
            </>
          ) : replacementFocused ? (
            <>
              <Link className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href="/calculator?edit=replacement">Adjust replacement assumptions</Link>
              <a className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href="https://www.google.com/search?q=trade+in+private+sale+car+options" target="_blank" rel="noreferrer" onClick={() => trackEvent(analyticsEvents.externalReplacementLinkClicked)}>Research trade-in and private-sale options</a>
              <a className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href="https://www.google.com/search?q=questions+to+ask+before+buying+a+used+car" target="_blank" rel="noreferrer" onClick={() => trackEvent(analyticsEvents.externalReplacementLinkClicked)}>Questions to ask before buying used</a>
            </>
          ) : (
            <>
              <a className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href={buildSearchUrl("google", input)} target="_blank" rel="noreferrer" onClick={() => trackEvent(analyticsEvents.externalRepairSearchClicked)}>Find shops for a written second estimate</a>
              <a className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href={buildSearchUrl("yelp", input)} target="_blank" rel="noreferrer" onClick={() => trackEvent(analyticsEvents.externalRepairSearchClicked)}>Search Yelp for repair shops near you</a>
              <Link className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href="/guides/is-it-worth-getting-a-second-opinion-on-a-car-repair">Questions to ask before approving repair</Link>
              <Link className="rounded-md border border-line p-4 font-semibold text-ink-800 hover:bg-brand-50" href="/calculator?edit=repair">Adjust the repair estimate</Link>
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
