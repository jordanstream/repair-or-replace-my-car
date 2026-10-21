import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { displayEditableNumber } from "../lib/numeric-input";

assert.equal(displayEditableNumber(0), "", "untouched zero-backed field may start blank");
assert.equal(displayEditableNumber(0, "0"), "0", "explicit zero must remain visible");
assert.equal(displayEditableNumber(0, ""), "", "cleared field must remain clearable");
assert.equal(displayEditableNumber(0, "00"), "00", "preserve the user's in-progress text");
assert.equal(displayEditableNumber(125, "0"), "0", "draft text must take precedence while editing");
assert.equal(displayEditableNumber(125), 125, "other numerical values must remain visible");

const source = readFileSync(resolve(process.cwd(), "components/CalculatorForm.tsx"), "utf8");
for (const key of ["currentLoanPayoff", "currentMonthlyPayment", "currentPaymentsRemaining", "downPayment", "apr", "taxesAndFees"]) {
  assert.ok(source.includes(`displayEditableNumber(form.${key}, numericDrafts.${key})`), `Explicit zero must be visible in ${key}`);
}
assert.ok(source.includes("setNumericDrafts((current) => ({ ...current, [key]: value }))"), "Numeric changes must preserve the typed text");
assert.ok(source.includes('value === "" ? 0 : Math.max(0, numberValue(value))'), "Numeric calculations must continue to use numeric values");

console.log("numeric display contracts: explicit zero, clearing, and calculation state passed");
