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
  const router = useRouter();

  function update<K extends keyof CalculatorInput>(key: K, value: CalculatorInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit() {
    trackEvent(analyticsEvents.calculatorCompleted, { comparisonMonths: form.comparisonMonths });
    localStorage.setItem("repair-or-replace-input", JSON.stringify(form));
    router.push("/results");
  }

  return (
    <Card className="p-5 sm:p-7">
      <div className="mb-8" aria-label={`Step ${step} of 3`}>
        <div className="mb-3 flex items-center justify-between text-sm font-semibold text-ink-700">
          <span>Step {step} of 3</span>
          <span>{Math.round((step / 3) * 100)}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-brand-600 transition-[width]" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
      </div>

      {step === 1 ? (
        <section aria-labelledby="current-vehicle-heading">
          <h2 id="current-vehicle-heading" className="text-2xl font-bold text-ink-950">Your Current Vehicle</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="Vehicle year"><TextInput type="number" min="1950" value={form.vehicleYear} onChange={(e) => update("vehicleYear", numberValue(e.target.value))} /></Field>
            <Field label="Mileage"><TextInput type="number" min="0" value={form.mileage} onChange={(e) => update("mileage", numberValue(e.target.value))} /></Field>
            <Field label="Make"><TextInput value={form.make} onChange={(e) => update("make", e.target.value)} placeholder="Toyota" /></Field>
            <Field label="Model"><TextInput value={form.model} onChange={(e) => update("model", e.target.value)} placeholder="Camry" /></Field>
            <Field label="Current estimated vehicle value"><TextInput type="number" min="0" value={form.currentValue} onChange={(e) => update("currentValue", numberValue(e.target.value))} /></Field>
            <Field label="Remaining loan balance"><TextInput type="number" min="0" value={form.remainingLoanBalance} onChange={(e) => update("remainingLoanBalance", numberValue(e.target.value))} /></Field>
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
            <Field label="Repair quote amount"><TextInput type="number" min="0" value={form.repairQuote} onChange={(e) => update("repairQuote", numberValue(e.target.value))} /></Field>
            <Field label="Estimated additional repair costs in the next 12 months"><TextInput type="number" min="0" value={form.additionalRepairs} onChange={(e) => update("additionalRepairs", numberValue(e.target.value))} /></Field>
            <Field label="Estimated months this repair will keep the car usable"><TextInput type="number" min="1" value={form.usableMonthsAfterRepair} onChange={(e) => update("usableMonthsAfterRepair", numberValue(e.target.value))} /></Field>
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
            <Field label="Used replacement purchase price"><TextInput type="number" min="0" value={form.usedPurchasePrice} onChange={(e) => update("usedPurchasePrice", numberValue(e.target.value))} /></Field>
            <Field label="New replacement purchase price"><TextInput type="number" min="0" value={form.newPurchasePrice} onChange={(e) => update("newPurchasePrice", numberValue(e.target.value))} /></Field>
            <Field label="Down payment"><TextInput type="number" min="0" value={form.downPayment} onChange={(e) => update("downPayment", numberValue(e.target.value))} /></Field>
            <Field label="Estimated APR"><TextInput type="number" min="0" step="0.1" value={form.apr} onChange={(e) => update("apr", numberValue(e.target.value))} /></Field>
            <Field label="Loan term in months"><TextInput type="number" min="1" value={form.loanTermMonths} onChange={(e) => update("loanTermMonths", numberValue(e.target.value))} /></Field>
            <Field label="Estimated monthly insurance increase or decrease"><TextInput type="number" value={form.insuranceMonthlyDelta} onChange={(e) => update("insuranceMonthlyDelta", numberValue(e.target.value))} /></Field>
            <Field label="Estimated monthly fuel-cost difference"><TextInput type="number" value={form.fuelMonthlyDelta} onChange={(e) => update("fuelMonthlyDelta", numberValue(e.target.value))} /></Field>
            <Field label="Estimated monthly maintenance-cost difference"><TextInput type="number" value={form.maintenanceMonthlyDelta} onChange={(e) => update("maintenanceMonthlyDelta", numberValue(e.target.value))} /></Field>
            <Field label="Estimated sales tax, registration, and dealer-fee total"><TextInput type="number" min="0" value={form.taxesAndFees} onChange={(e) => update("taxesAndFees", numberValue(e.target.value))} /></Field>
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
