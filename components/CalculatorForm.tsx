"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, RadioGroup, Select, TextInput } from "@/components/ui/Fields";
import { analyticsEvents, trackEvent } from "@/lib/analytics";
import { calculatorAssumptions, repairCategories, safetyConcernLabels } from "@/lib/calculator-constants";
import type { CalculatorInput, ThreeWay } from "@/lib/calculator";

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
  vehicleYear: 2014,
  make: "",
  model: "",
  mileage: 132000,
  currentValue: 6500,
  remainingLoanBalance: 0,
  safeToDrive: "yes",
  safetyConcerns: Object.fromEntries(Object.keys(safetyConcernLabels).map((key) => [key, "no"])) as Record<string, ThreeWay>,
  repairCategory: "Transmission",
  repairQuote: 3200,
  firstMajorRepair: "yes",
  additionalRepairs: 800,
  usableMonthsAfterRepair: calculatorAssumptions.defaultUsableMonthsAfterRepair,
  reliabilityImportance: "medium",
  essentialVehicleUse: false,
  replacementPreference: "both",
  usedPurchasePrice: 18500,
  newPurchasePrice: 32500,
  downPayment: 2500,
  apr: 8.5,
  loanTermMonths: 60,
  insuranceMonthlyDelta: 45,
  fuelMonthlyDelta: 0,
  maintenanceMonthlyDelta: -25,
  taxesAndFees: 1800,
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
  const router = useRouter();

  function update<K extends keyof CalculatorInput>(key: K, value: CalculatorInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function numericUpdate<K extends keyof CalculatorInput>(key: K, value: string, min = 0) {
    update(key, Math.max(min, numberValue(value)) as CalculatorInput[K]);
  }

  function validate() {
    const invalid = [
      form.vehicleYear < 1950 && "Enter a vehicle year of 1950 or later.",
      form.mileage < 0 && "Mileage cannot be negative.",
      form.currentValue < 0 && "Current vehicle value cannot be negative.",
      form.remainingLoanBalance < 0 && "Remaining loan balance cannot be negative.",
      form.repairQuote < 0 && "Repair quote cannot be negative.",
      form.additionalRepairs < 0 && "Additional repair costs cannot be negative.",
      form.usableMonthsAfterRepair < 1 && "Expected usable months must be at least 1.",
      form.usedPurchasePrice < 0 && "Used replacement price cannot be negative.",
      form.newPurchasePrice < 0 && "New replacement price cannot be negative.",
      form.downPayment < 0 && "Down payment cannot be negative.",
      form.apr < 0 && "APR cannot be negative.",
      form.loanTermMonths < 1 && "Loan term must be at least 1 month.",
      form.taxesAndFees < 0 && "Taxes and fees cannot be negative."
    ].filter(Boolean);

    return invalid[0] || "";
  }

  function submit() {
    const error = validate();
    if (error) {
      setFormError(error);
      return;
    }

    setFormError("");
    trackEvent(analyticsEvents.calculatorCompleted, { comparisonMonths: form.comparisonMonths });
    localStorage.setItem("repair-or-replace-input", JSON.stringify(form));
    router.push("/results");
  }

  return (
    <Card className="p-5 sm:p-7">
      <div
        className="mb-8"
        role="progressbar"
        aria-label="Calculator progress"
        aria-valuemin={1}
        aria-valuemax={3}
        aria-valuenow={step}
        aria-valuetext={`Step ${step} of 3`}
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
        <div className="mb-6">
          <Alert tone="danger">{formError}</Alert>
        </div>
      ) : null}

      {step === 1 ? (
        <section aria-labelledby="current-vehicle-heading">
          <h2 id="current-vehicle-heading" className="text-2xl font-bold text-ink-950">Your Current Vehicle</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="Vehicle year"><TextInput type="number" min="1950" value={form.vehicleYear} onChange={(e) => numericUpdate("vehicleYear", e.target.value, 1950)} /></Field>
            <Field label="Mileage"><TextInput type="number" min="0" value={form.mileage} onChange={(e) => numericUpdate("mileage", e.target.value)} /></Field>
            <Field label="Make"><TextInput value={form.make} onChange={(e) => update("make", e.target.value)} placeholder="Toyota" /></Field>
            <Field label="Model"><TextInput value={form.model} onChange={(e) => update("model", e.target.value)} placeholder="Camry" /></Field>
            <Field label="Current estimated vehicle value"><TextInput type="number" min="0" value={form.currentValue} onChange={(e) => numericUpdate("currentValue", e.target.value)} /></Field>
            <Field label="Remaining loan balance"><TextInput type="number" min="0" value={form.remainingLoanBalance} onChange={(e) => numericUpdate("remainingLoanBalance", e.target.value)} /></Field>
          </div>
          <div className="mt-6">
            <RadioGroup label="Is the vehicle currently safe to drive?" name="safeToDrive" options={threeWayOptions} value={form.safeToDrive} onChange={(value) => update("safeToDrive", value as ThreeWay)} />
          </div>
          <div className="mt-6 grid gap-4">
            <p className="text-sm font-semibold text-ink-800">Does the vehicle have any of the following?</p>
            {Object.entries(safetyConcernLabels).map(([key, label]) => (
              <RadioGroup
                key={key}
                label={label}
                name={key}
                options={concernOptions}
                value={form.safetyConcerns[key]}
                onChange={(value) => setForm((current) => ({ ...current, safetyConcerns: { ...current.safetyConcerns, [key]: value as ThreeWay } }))}
              />
            ))}
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section aria-labelledby="repair-heading">
          <h2 id="repair-heading" className="text-2xl font-bold text-ink-950">Repair Situation</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="Repair category">
              <Select value={form.repairCategory} onChange={(e) => update("repairCategory", e.target.value)}>
                {repairCategories.map((category) => <option key={category}>{category}</option>)}
              </Select>
            </Field>
            <Field label="Repair quote amount"><TextInput type="number" min="0" value={form.repairQuote} onChange={(e) => numericUpdate("repairQuote", e.target.value)} /></Field>
            <Field label="Estimated additional repair costs in the next 12 months"><TextInput type="number" min="0" value={form.additionalRepairs} onChange={(e) => numericUpdate("additionalRepairs", e.target.value)} /></Field>
            <Field label="Estimated months this repair will keep the car usable"><TextInput type="number" min="1" value={form.usableMonthsAfterRepair} onChange={(e) => numericUpdate("usableMonthsAfterRepair", e.target.value, 1)} /></Field>
          </div>
          <div className="mt-6 grid gap-6">
            <RadioGroup label="Is this the first major repair in the past 12 months?" name="firstMajorRepair" options={threeWayOptions} value={form.firstMajorRepair} onChange={(value) => update("firstMajorRepair", value as ThreeWay)} />
            <RadioGroup label="How important is reliability for your household?" name="reliability" options={[{ label: "Low", value: "low" }, { label: "Medium", value: "medium" }, { label: "High", value: "high" }]} value={form.reliabilityImportance} onChange={(value) => update("reliabilityImportance", value as CalculatorInput["reliabilityImportance"])} />
            <RadioGroup label="Is the vehicle needed for work, caregiving, school, or long-distance commuting?" name="essential" options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} value={form.essentialVehicleUse ? "yes" : "no"} onChange={(value) => update("essentialVehicleUse", value === "yes")} />
          </div>
        </section>
      ) : null}

      {step === 3 ? (
        <section aria-labelledby="replacement-heading">
          <h2 id="replacement-heading" className="text-2xl font-bold text-ink-950">Replacement Assumptions</h2>
          <Alert tone="info">Use realistic estimates. This site does not look up market values, financing offers, or insurance quotes.</Alert>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="Replacement comparison preference">
              <Select value={form.replacementPreference} onChange={(e) => update("replacementPreference", e.target.value as CalculatorInput["replacementPreference"])}>
                <option value="used">Used vehicle</option>
                <option value="new">New vehicle</option>
                <option value="both">Compare both</option>
              </Select>
            </Field>
            <Field label="Comparison period">
              <Select value={form.comparisonMonths} onChange={(e) => update("comparisonMonths", numberValue(e.target.value) as 12 | 24 | 36)}>
                <option value={12}>12 months</option>
                <option value={24}>24 months</option>
                <option value={36}>36 months</option>
              </Select>
            </Field>
            <Field label="Used replacement purchase price"><TextInput type="number" min="0" value={form.usedPurchasePrice} onChange={(e) => numericUpdate("usedPurchasePrice", e.target.value)} /></Field>
            <Field label="New replacement purchase price"><TextInput type="number" min="0" value={form.newPurchasePrice} onChange={(e) => numericUpdate("newPurchasePrice", e.target.value)} /></Field>
            <Field label="Down payment"><TextInput type="number" min="0" value={form.downPayment} onChange={(e) => numericUpdate("downPayment", e.target.value)} /></Field>
            <Field label="Estimated APR"><TextInput type="number" min="0" step="0.1" value={form.apr} onChange={(e) => numericUpdate("apr", e.target.value)} /></Field>
            <Field label="Loan term in months"><TextInput type="number" min="1" value={form.loanTermMonths} onChange={(e) => numericUpdate("loanTermMonths", e.target.value, 1)} /></Field>
            <Field label="Estimated monthly insurance increase or decrease"><TextInput type="number" value={form.insuranceMonthlyDelta} onChange={(e) => update("insuranceMonthlyDelta", numberValue(e.target.value))} /></Field>
            <Field label="Estimated monthly fuel-cost difference"><TextInput type="number" value={form.fuelMonthlyDelta} onChange={(e) => update("fuelMonthlyDelta", numberValue(e.target.value))} /></Field>
            <Field label="Estimated monthly maintenance-cost difference"><TextInput type="number" value={form.maintenanceMonthlyDelta} onChange={(e) => update("maintenanceMonthlyDelta", numberValue(e.target.value))} /></Field>
            <Field label="Estimated sales tax, registration, and dealer-fee total"><TextInput type="number" min="0" value={form.taxesAndFees} onChange={(e) => numericUpdate("taxesAndFees", e.target.value)} /></Field>
            <Field label="ZIP code for optional search links" helper="Optional. Used only to create outbound search links."><TextInput inputMode="numeric" maxLength={10} value={form.zipCode} onChange={(e) => update("zipCode", e.target.value)} /></Field>
          </div>
        </section>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
        <Button type="button" variant="secondary" disabled={step === 1} onClick={() => setStep((value) => Math.max(1, value - 1))}>
          Back
        </Button>
        {step < 3 ? (
          <Button type="button" onClick={() => { if (step === 1) trackEvent(analyticsEvents.calculatorStarted); setStep((value) => Math.min(3, value + 1)); }}>
            Continue
          </Button>
        ) : (
          <Button type="button" onClick={submit}>See My Results</Button>
        )}
      </div>
    </Card>
  );
}
