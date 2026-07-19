"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, RadioGroup, Select, TextInput } from "@/components/ui/Fields";
import { analyticsEvents, trackEvent } from "@/lib/analytics";
import { calculatorAssumptions, repairCategories, safetyConcernLabels } from "@/lib/calculator-constants";
import type { CalculatorInput, QuoteConfirmation, ThreeWay } from "@/lib/calculator";
import { parseStoredCalculatorInput } from "@/lib/storage";

const stepNames = ["Current vehicle", "Repair estimate", "Replacement costs"] as const;

const threeWayOptions = [
  { label: "Yes", value: "yes" },
  { label: "Not sure", value: "not-sure" },
  { label: "No", value: "no" }
];

const concernOptions = [
  { label: "No", value: "no" },
  { label: "Not sure", value: "not-sure" },
  { label: "Yes", value: "yes" }
];

const defaults: CalculatorInput = {
  vehicleYear: 0,
  make: "",
  model: "",
  mileage: 0,
  currentValue: 0,
  currentLoanPayoff: 0,
  currentMonthlyPayment: 0,
  currentPaymentsRemaining: 0,
  safeToDrive: "yes",
  safetyConcerns: Object.fromEntries(Object.keys(safetyConcernLabels).map((key) => [key, "no"])) as Record<string, ThreeWay>,
  repairCategory: "Transmission",
  repairQuote: 0,
  itemizedEstimate: undefined,
  testingExplained: undefined,
  secondShopConfirmed: undefined,
  wholeVehicleCondition: undefined,
  firstMajorRepair: "yes",
  expectedFutureMaintenance: 0,
  usableMonthsAfterRepair: 0,
  reliabilityImportance: "medium",
  essentialVehicleUse: false,
  replacementPreference: "both",
  usedPurchasePrice: 0,
  newPurchasePrice: 0,
  usedEndingValue: undefined,
  newEndingValue: undefined,
  downPayment: 0,
  apr: 0,
  loanTermMonths: 0,
  insuranceMonthlyDelta: 0,
  fuelMonthlyDelta: 0,
  maintenanceMonthlyDelta: 0,
  taxesAndFees: 0,
  comparisonMonths: calculatorAssumptions.defaultComparisonMonths,
  zipCode: ""
};

function numberValue(value: string) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

export function CalculatorForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CalculatorInput>(defaults);
  const [formError, setFormError] = useState("");
  const [invalidFieldId, setInvalidFieldId] = useState("");
  const stepContainerRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const editTarget = searchParams.get("edit");

  useEffect(() => {
    if (!editTarget) return;
    const stored = parseStoredCalculatorInput(window.localStorage.getItem("repair-or-replace-input"));
    if (!stored) return;
    const targetStep = editTarget === "vehicle" ? 1 : editTarget === "repair" ? 2 : 3;
    trackEvent(analyticsEvents.assumptionsEdited, { section: editTarget });
    requestAnimationFrame(() => {
      setForm(stored);
      setStep(targetStep);
      requestAnimationFrame(() => {
        stepHeadingRef.current?.focus({ preventScroll: true });
        stepContainerRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    });
  }, [editTarget]);

  function update<K extends keyof CalculatorInput>(key: K, value: CalculatorInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function numericUpdate<K extends keyof CalculatorInput>(key: K, value: string, min = 0) {
    update(key, (value === "" ? 0 : Math.max(min, numberValue(value))) as CalculatorInput[K]);
  }

  function optionalNumericUpdate(key: "usedEndingValue" | "newEndingValue", value: string) {
    update(key, value === "" ? undefined : Math.max(0, numberValue(value)));
  }

  function showValidationError(message: string, fieldId: string) {
    setFormError(message);
    setInvalidFieldId(fieldId);
    trackEvent(analyticsEvents.calculatorValidationError, { step, field: fieldId });
    requestAnimationFrame(() => {
      errorSummaryRef.current?.focus({ preventScroll: true });
      errorSummaryRef.current?.scrollIntoView({ behavior: "auto", block: "center" });
    });
  }

  function validateStep(stepToValidate: number) {
    if (stepToValidate === 1) {
      if (form.vehicleYear < 1950) return ["Enter a vehicle year of 1950 or later.", "vehicle-year"] as const;
      if (form.currentValue <= 0) return ["Enter your current estimated vehicle value.", "current-value"] as const;
      if (form.currentLoanPayoff > 0 && form.currentMonthlyPayment <= 0) return ["Enter your current monthly payment.", "current-monthly-payment"] as const;
      if (form.currentLoanPayoff > 0 && form.currentPaymentsRemaining < 1) return ["Enter the number of monthly payments remaining.", "current-payments-remaining"] as const;
      if (form.currentLoanPayoff === 0 && (form.currentMonthlyPayment > 0 || form.currentPaymentsRemaining > 0)) return ["Enter the current loan payoff amount, or set the other current-loan fields to $0.", "current-loan-payoff"] as const;
    }
    if (stepToValidate === 2) {
      if (form.repairQuote <= 0) return ["Enter the repair estimate you received.", "repair-quote"] as const;
      if (form.usableMonthsAfterRepair < 1) return ["Enter at least 1 expected usable month after repair.", "usable-months"] as const;
    }
    if (stepToValidate === 3) {
      if (form.replacementPreference !== "new" && form.usedPurchasePrice <= 0) return ["Enter a used replacement purchase price.", "used-price"] as const;
      if (form.replacementPreference !== "used" && form.newPurchasePrice <= 0) return ["Enter a new replacement purchase price.", "new-price"] as const;
      if (form.loanTermMonths < 1) return ["Enter a loan term of at least 1 month.", "loan-term"] as const;
    }
    return null;
  }

  function moveToStep(nextStep: number, direction: "forward" | "back") {
    if (direction === "forward") {
      const validation = validateStep(step);
      if (validation) {
        showValidationError(validation[0], validation[1]);
        return;
      }
      if (step === 1) trackEvent(analyticsEvents.calculatorStarted);
      trackEvent(analyticsEvents.calculatorStepCompleted, { step });
      if (step === 2 && (form.itemizedEstimate || form.testingExplained || form.secondShopConfirmed)) {
        trackEvent(analyticsEvents.quoteConfidenceCompleted);
      }
    } else {
      trackEvent(analyticsEvents.calculatorStepBack, { from_step: step, to_step: nextStep });
    }

    setFormError("");
    setInvalidFieldId("");
    setStep(nextStep);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        stepHeadingRef.current?.focus({ preventScroll: true });
        stepContainerRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    });
  }

  function submit() {
    const validation = validateStep(3);
    if (validation) {
      showValidationError(validation[0], validation[1]);
      return;
    }

    setFormError("");
    setInvalidFieldId("");
    trackEvent(analyticsEvents.calculatorStepCompleted, { step: 3 });
    trackEvent(analyticsEvents.calculatorCompleted, { comparisonMonths: form.comparisonMonths });
    localStorage.setItem("repair-or-replace-input", JSON.stringify(form));
    router.push("/results");
  }

  const headingProps = {
    ref: stepHeadingRef,
    tabIndex: -1,
    className: "text-2xl font-bold text-ink-950 focus:outline-none"
  };

  return (
    <Card className="p-5 sm:p-7">
      <div ref={stepContainerRef} className="scroll-mt-24">
        <div
          className="mb-8"
          role="progressbar"
          aria-label="Calculator progress"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={step}
          aria-valuetext={`Step ${step} of 3: ${stepNames[step - 1]}`}
        >
          <div className="mb-3 flex items-center justify-between text-sm font-semibold text-ink-700">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-brand-600 transition-[width]" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        </div>

        {formError ? (
          <div ref={errorSummaryRef} tabIndex={-1} className="mb-6 scroll-mt-24 focus:outline-none">
            <Alert tone="danger">
              <p className="font-semibold">Check this entry before continuing</p>
              <p className="mt-1">{formError}</p>
              <a className="mt-2 inline-block font-semibold underline underline-offset-4" href={`#${invalidFieldId}`}>Go to the field</a>
            </Alert>
          </div>
        ) : null}

        {step === 1 ? (
          <section aria-labelledby="current-vehicle-heading">
            <h2 id="current-vehicle-heading" {...headingProps}><span className="sr-only">Step 1 of 3: </span>Your current vehicle</h2>
            <p className="mt-2 max-w-2xl leading-7 text-ink-700">Start with the vehicle you own today. Use estimates you can verify rather than ideal values.</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field label="Vehicle year"><TextInput id="vehicle-year" type="number" min="1950" value={form.vehicleYear || ""} aria-invalid={invalidFieldId === "vehicle-year"} onChange={(e) => numericUpdate("vehicleYear", e.target.value, 1950)} /></Field>
              <Field label="Mileage"><TextInput type="number" min="0" value={form.mileage || ""} onChange={(e) => numericUpdate("mileage", e.target.value)} /></Field>
              <Field label="Make"><TextInput value={form.make} onChange={(e) => update("make", e.target.value)} placeholder="Toyota" /></Field>
              <Field label="Model"><TextInput value={form.model} onChange={(e) => update("model", e.target.value)} placeholder="Camry" /></Field>
              <Field label="Estimated current vehicle value" helper="Use a realistic trade-in or private-sale estimate."><TextInput id="current-value" type="number" min="0" value={form.currentValue || ""} aria-invalid={invalidFieldId === "current-value"} onChange={(e) => numericUpdate("currentValue", e.target.value)} /></Field>
              <Field label="Current loan payoff amount" helper="Enter $0 if you do not have a loan on this vehicle."><TextInput id="current-loan-payoff" type="number" min="0" value={form.currentLoanPayoff || ""} aria-invalid={invalidFieldId === "current-loan-payoff"} onChange={(e) => numericUpdate("currentLoanPayoff", e.target.value)} /></Field>
              <Field label="Current monthly payment" helper="Enter $0 if you do not have a current vehicle loan."><TextInput id="current-monthly-payment" type="number" min="0" value={form.currentMonthlyPayment || ""} aria-invalid={invalidFieldId === "current-monthly-payment"} onChange={(e) => numericUpdate("currentMonthlyPayment", e.target.value)} /></Field>
              <Field label="Number of monthly payments remaining" helper="Use the remaining payment count from your lender, not the original loan term."><TextInput id="current-payments-remaining" type="number" min="0" step="1" value={form.currentPaymentsRemaining || ""} aria-invalid={invalidFieldId === "current-payments-remaining"} onChange={(e) => numericUpdate("currentPaymentsRemaining", e.target.value)} /></Field>
            </div>
            <div className="mt-6">
              <RadioGroup label="Is the vehicle currently safe to drive?" name="safeToDrive" options={threeWayOptions} value={form.safeToDrive} onChange={(value) => update("safeToDrive", value as ThreeWay)} />
            </div>
            <div className="mt-6 grid gap-4">
              <p className="text-sm font-semibold text-ink-800">Does the vehicle have any of the following?</p>
              {Object.entries(safetyConcernLabels).map(([key, label]) => (
                <RadioGroup key={key} label={label} name={key} options={concernOptions} value={form.safetyConcerns[key]} onChange={(value) => setForm((current) => ({ ...current, safetyConcerns: { ...current.safetyConcerns, [key]: value as ThreeWay } }))} />
              ))}
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section aria-labelledby="repair-heading">
            <h2 id="repair-heading" {...headingProps}><span className="sr-only">Step 2 of 3: </span>Your repair estimate</h2>
            <p className="mt-2 max-w-2xl leading-7 text-ink-700">Enter the written or verbal estimate provided by the repair shop. This tool does not estimate the repair price.</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field label="Repair category"><Select value={form.repairCategory} onChange={(e) => update("repairCategory", e.target.value)}>{repairCategories.map((category) => <option key={category}>{category}</option>)}</Select></Field>
              <Field label="Repair estimate you received" helper="Use the amount the shop gave you, including known fees and taxes when available."><TextInput id="repair-quote" type="number" min="0" value={form.repairQuote || ""} aria-invalid={invalidFieldId === "repair-quote"} onChange={(e) => numericUpdate("repairQuote", e.target.value)} /></Field>
              <Field label="Estimated months this repair will keep the car usable" helper="Use your own assumption or ask the shop what the repair is expected to address."><TextInput id="usable-months" type="number" min="1" value={form.usableMonthsAfterRepair || ""} aria-invalid={invalidFieldId === "usable-months"} onChange={(e) => numericUpdate("usableMonthsAfterRepair", e.target.value, 1)} /></Field>
            </div>

            <div className="mt-8 rounded-lg border border-line bg-wash p-5">
              <h3 className="text-lg font-bold text-ink-950">A quick confidence check</h3>
              <p className="mt-2 text-sm leading-6 text-ink-700">Optional. These answers tailor what to verify next. They do not change the repair amount or decide whether the shop is right.</p>
              <div className="mt-5 grid gap-6">
                <RadioGroup label="Did the shop provide an itemized estimate?" name="itemizedEstimate" options={threeWayOptions} value={form.itemizedEstimate ?? ""} onChange={(value) => update("itemizedEstimate", value as ThreeWay)} />
                <RadioGroup label="Did the shop explain what testing confirmed the repair?" name="testingExplained" options={threeWayOptions} value={form.testingExplained ?? ""} onChange={(value) => update("testingExplained", value as ThreeWay)} />
                <RadioGroup label="Has another qualified shop confirmed the repair?" name="secondShopConfirmed" options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }, { label: "Not yet", value: "not-yet" }]} value={form.secondShopConfirmed ?? ""} onChange={(value) => update("secondShopConfirmed", value as QuoteConfirmation)} />
              </div>
            </div>

            <div className="mt-8 grid gap-6">
              <RadioGroup label="Did a broader inspection identify other major repairs likely within the next 12 months?" name="wholeVehicleCondition" options={concernOptions} value={form.wholeVehicleCondition ?? ""} onChange={(value) => update("wholeVehicleCondition", value as ThreeWay)} />
              <Field label="Expected future maintenance and repairs" helper="Enter maintenance and other repairs you expect during the comparison period. Do not include the repair quote entered above."><TextInput id="expected-future-maintenance" type="number" min="0" value={form.expectedFutureMaintenance} onChange={(e) => numericUpdate("expectedFutureMaintenance", e.target.value)} /></Field>
              <RadioGroup label="Is this the first major repair in the past 12 months?" name="firstMajorRepair" options={threeWayOptions} value={form.firstMajorRepair} onChange={(value) => update("firstMajorRepair", value as ThreeWay)} />
              <RadioGroup label="How important is reliability for your household?" name="reliability" options={[{ label: "Low", value: "low" }, { label: "Medium", value: "medium" }, { label: "High", value: "high" }]} value={form.reliabilityImportance} onChange={(value) => update("reliabilityImportance", value as CalculatorInput["reliabilityImportance"])} />
              <RadioGroup label="Is the vehicle needed for work, caregiving, school, or long-distance commuting?" name="essential" options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} value={form.essentialVehicleUse ? "yes" : "no"} onChange={(value) => update("essentialVehicleUse", value === "yes")} />
            </div>
          </section>
        ) : null}

        {step === 3 ? (
          <section aria-labelledby="replacement-heading">
            <h2 id="replacement-heading" {...headingProps}><span className="sr-only">Step 3 of 3: </span>Replacement costs</h2>
            <p className="mt-2 max-w-2xl leading-7 text-ink-700">Use a realistic vehicle price and financing terms you could actually obtain.</p>
            <div className="mt-5"><Alert tone="info">This site does not look up market values, financing offers, insurance quotes, or local taxes.</Alert></div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field label="Replacement comparison preference"><Select value={form.replacementPreference} onChange={(e) => update("replacementPreference", e.target.value as CalculatorInput["replacementPreference"])}><option value="used">Used vehicle</option><option value="new">New vehicle</option><option value="both">Compare both</option></Select></Field>
              <Field label="Comparison period"><Select value={form.comparisonMonths} onChange={(e) => update("comparisonMonths", numberValue(e.target.value) as 12 | 24 | 36)}><option value={12}>12 months</option><option value={24}>24 months</option><option value={36}>36 months</option></Select></Field>
              {form.replacementPreference !== "new" ? <Field label="Used replacement purchase price"><TextInput id="used-price" type="number" min="0" value={form.usedPurchasePrice || ""} aria-invalid={invalidFieldId === "used-price"} onChange={(e) => numericUpdate("usedPurchasePrice", e.target.value)} /></Field> : null}
              {form.replacementPreference !== "used" ? <Field label="New replacement purchase price"><TextInput id="new-price" type="number" min="0" value={form.newPurchasePrice || ""} aria-invalid={invalidFieldId === "new-price"} onChange={(e) => numericUpdate("newPurchasePrice", e.target.value)} /></Field> : null}
              <Field label="Down payment"><TextInput type="number" min="0" value={form.downPayment || ""} onChange={(e) => numericUpdate("downPayment", e.target.value)} /></Field>
              <Field label="Estimated APR"><TextInput type="number" min="0" step="0.1" value={form.apr || ""} onChange={(e) => numericUpdate("apr", e.target.value)} /></Field>
              <Field label="Loan term in months"><TextInput id="loan-term" type="number" min="1" value={form.loanTermMonths || ""} aria-invalid={invalidFieldId === "loan-term"} onChange={(e) => numericUpdate("loanTermMonths", e.target.value, 1)} /></Field>
              <Field label="Estimated monthly insurance increase or decrease"><TextInput type="number" value={form.insuranceMonthlyDelta} onChange={(e) => update("insuranceMonthlyDelta", numberValue(e.target.value))} /></Field>
              <Field label="Estimated monthly fuel-cost difference"><TextInput type="number" value={form.fuelMonthlyDelta} onChange={(e) => update("fuelMonthlyDelta", numberValue(e.target.value))} /></Field>
              <Field label="Estimated monthly maintenance-cost difference"><TextInput type="number" value={form.maintenanceMonthlyDelta} onChange={(e) => update("maintenanceMonthlyDelta", numberValue(e.target.value))} /></Field>
              <Field label="Estimated sales tax, registration, and dealer-fee total" helper="Counted as upfront cash, not added to the financed amount."><TextInput type="number" min="0" value={form.taxesAndFees || ""} onChange={(e) => numericUpdate("taxesAndFees", e.target.value)} /></Field>
              <Field label="ZIP code for optional search links" helper="Optional. Used only to create outbound search links."><TextInput inputMode="numeric" maxLength={10} value={form.zipCode} onChange={(e) => update("zipCode", e.target.value)} /></Field>
            </div>
            <details className="mt-6 rounded-lg border border-line bg-wash p-5">
              <summary className="cursor-pointer font-semibold text-ink-950">Advanced assumptions</summary>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-700">Optional ending-value estimates let us show depreciation and end-of-period equity separately. They do not change the cash-flow total.</p>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {form.replacementPreference !== "new" ? <Field label="Estimated vehicle value at the end of the comparison period" helper="Used replacement. Leave blank if you do not have a supportable estimate."><TextInput type="number" min="0" value={form.usedEndingValue ?? ""} onChange={(e) => optionalNumericUpdate("usedEndingValue", e.target.value)} /></Field> : null}
                {form.replacementPreference !== "used" ? <Field label="Estimated vehicle value at the end of the comparison period" helper="New replacement. Leave blank if you do not have a supportable estimate."><TextInput type="number" min="0" value={form.newEndingValue ?? ""} onChange={(e) => optionalNumericUpdate("newEndingValue", e.target.value)} /></Field> : null}
              </div>
            </details>
          </section>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
          {step > 1 ? <Button type="button" variant="secondary" onClick={() => moveToStep(step - 1, "back")}>Back</Button> : <span aria-hidden="true" className="hidden sm:block" />}
          {step < 3 ? <Button type="button" onClick={() => moveToStep(step + 1, "forward")}>Continue</Button> : <Button type="button" onClick={submit}>See my results</Button>}
        </div>
      </div>
    </Card>
  );
}
