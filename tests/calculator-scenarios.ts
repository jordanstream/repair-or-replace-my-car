import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { calculateRepairOrReplace, type CalculatorInput } from "../lib/calculator";
import { safetyConcernLabels } from "../lib/calculator-constants";
import { parseStoredCalculatorInput } from "../lib/storage";

const base: CalculatorInput = {
  vehicleYear: 2015,
  make: "Honda",
  model: "Accord",
  mileage: 120000,
  currentValue: 7500,
  currentLoanPayoff: 0,
  currentMonthlyPayment: 0,
  currentPaymentsRemaining: 0,
  safeToDrive: "yes",
  safetyConcerns: Object.fromEntries(Object.keys(safetyConcernLabels).map((key) => [key, "no"])) as Record<string, "no">,
  repairCategory: "Transmission",
  repairQuote: 2500,
  itemizedEstimate: "yes",
  testingExplained: "yes",
  secondShopConfirmed: "yes",
  wholeVehicleCondition: "no",
  firstMajorRepair: "yes",
  expectedFutureMaintenance: 0,
  usableMonthsAfterRepair: 24,
  reliabilityImportance: "medium",
  essentialVehicleUse: false,
  replacementPreference: "used",
  usedPurchasePrice: 19000,
  newPurchasePrice: 34000,
  usedEndingValue: undefined,
  newEndingValue: undefined,
  downPayment: 2500,
  apr: 8,
  loanTermMonths: 60,
  insuranceMonthlyDelta: 40,
  fuelMonthlyDelta: 0,
  maintenanceMonthlyDelta: -20,
  taxesAndFees: 1800,
  comparisonMonths: 24,
  zipCode: "96815"
};

function option(input: CalculatorInput, key: "repair" | "used" | "new") {
  const found = calculateRepairOrReplace(input).options.find((entry) => entry.key === key);
  if (!found) throw new Error(`Expected ${key} option`);
  return found;
}

const noCurrentLoan = option(base, "repair");
if (noCurrentLoan.totalCost !== base.repairQuote) throw new Error("No current loan should add no loan cash flow");
console.log("no current loan: passed");

const positiveEquity = option({ ...base, currentValue: 12000, currentLoanPayoff: 4000 }, "used");
const noEquity = option({ ...base, currentValue: 4000, currentLoanPayoff: 4000 }, "used");
if ((noEquity.financedAmount ?? 0) - (positiveEquity.financedAmount ?? 0) !== 8000) {
  throw new Error("Positive current-car equity should reduce replacement financing");
}
console.log("positive current-car equity: passed");

const negativeEquityInput = {
  ...base,
  currentValue: 5000,
  currentLoanPayoff: 12000,
  usedPurchasePrice: 18000,
  downPayment: 2000,
  taxesAndFees: 0,
  insuranceMonthlyDelta: 0,
  fuelMonthlyDelta: 0,
  maintenanceMonthlyDelta: 0,
  apr: 0,
  loanTermMonths: 12,
  comparisonMonths: 12 as const
};
const negativeEquity = option(negativeEquityInput, "used");
if (negativeEquity.financedAmount !== 23000) throw new Error("Negative equity should be added to replacement financing");
if (negativeEquity.totalCost !== 25000) throw new Error("Loan payoff must be represented once through negative equity, not duplicated or omitted");
console.log("negative equity and single payoff treatment: passed");

const loanEndsEarly = option({
  ...base,
  currentLoanPayoff: 3000,
  currentMonthlyPayment: 500,
  currentPaymentsRemaining: 6,
  comparisonMonths: 24
}, "repair");
if (loanEndsEarly.totalCost !== base.repairQuote + 3000 || loanEndsEarly.remainingLoanBalanceAtEnd !== 0) {
  throw new Error("Current loan payments should stop when the entered payment count ends");
}
console.log("current loan ending before comparison period: passed");

const loanExtends = option({
  ...base,
  currentLoanPayoff: 15000,
  currentMonthlyPayment: 400,
  currentPaymentsRemaining: 48,
  comparisonMonths: 24
}, "repair");
if (loanExtends.totalCost !== base.repairQuote + 400 * 24 || loanExtends.remainingLoanBalanceAtEnd !== undefined) {
  throw new Error("An extending current loan should count only comparison-period payments and avoid inventing an ending balance");
}
console.log("current loan extending beyond comparison period: passed");

const zeroMaintenance = option(base, "repair");
if (!zeroMaintenance.assumptionsNotIncluded.includes("Additional future maintenance and repairs")) {
  throw new Error("Zero future maintenance should be disclosed as not included");
}
const enteredMaintenance = option({ ...base, expectedFutureMaintenance: 1800 }, "repair");
if (enteredMaintenance.totalCost !== base.repairQuote + 1800) throw new Error("Entered future maintenance should be included once");
console.log("zero and entered future maintenance: passed");

const endingValueEntered = option({ ...base, usedPurchasePrice: 20000, usedEndingValue: 14000 }, "used");
if (endingValueEntered.depreciationEstimate !== 6000 || endingValueEntered.endingVehicleValue !== 14000) {
  throw new Error("Entered ending value should produce separately reported depreciation");
}
const sameWithoutEndingValue = option({ ...base, usedPurchasePrice: 20000, usedEndingValue: undefined }, "used");
if (sameWithoutEndingValue.depreciationEstimate !== undefined || sameWithoutEndingValue.totalCost !== endingValueEntered.totalCost) {
  throw new Error("Omitted ending value should exclude depreciation without changing cash flow");
}
console.log("replacement ending value entered and omitted: passed");

const appreciation = option({ ...base, usedPurchasePrice: 20000, usedEndingValue: 24000 }, "used");
if (appreciation.depreciationEstimate !== 0) throw new Error("Depreciation must not be negative");
console.log("no negative depreciation: passed");

function closeCallInput(repairCash: number, replacementCash: number): CalculatorInput {
  return {
    ...base,
    currentValue: 0,
    repairQuote: repairCash,
    expectedFutureMaintenance: 0,
    usedPurchasePrice: replacementCash,
    downPayment: 0,
    taxesAndFees: 0,
    apr: 0,
    loanTermMonths: 12,
    comparisonMonths: 12,
    insuranceMonthlyDelta: 0,
    fuelMonthlyDelta: 0,
    maintenanceMonthlyDelta: 0
  };
}

if (calculateRepairOrReplace(closeCallInput(9050, 10000)).outcome !== "close") {
  throw new Error("Ten-percent close-call threshold should trigger when it is larger than the dollar minimum");
}
if (calculateRepairOrReplace(closeCallInput(5300, 6000)).outcome !== "close") {
  throw new Error("Dollar-minimum close-call threshold should trigger when it is larger than ten percent");
}
if (calculateRepairOrReplace(closeCallInput(8900, 10000)).outcome === "close") {
  throw new Error("A result outside both close-call thresholds should be clear");
}
console.log("close-call percentage, dollar minimum, and clear result: passed");

const safety = calculateRepairOrReplace({ ...base, safeToDrive: "not-sure" });
if (safety.outcome !== "safety") throw new Error("Safety uncertainty should override the financial label");

const limitedQuoteConfidence = calculateRepairOrReplace({
  ...base,
  itemizedEstimate: "no",
  testingExplained: "not-sure",
  secondShopConfirmed: "not-yet"
});
if (!limitedQuoteConfidence.quoteConfidenceLimited || limitedQuoteConfidence.outcome !== calculateRepairOrReplace(base).outcome) {
  throw new Error("Quote-confidence answers should tailor guidance without changing the cash-flow result");
}

if (!parseStoredCalculatorInput(JSON.stringify(base))) throw new Error("Valid saved input should parse");
if (parseStoredCalculatorInput("{not valid json") !== null) throw new Error("Malformed saved input should be rejected");

const filesToScan = [
  "lib/calculator.ts",
  "lib/calculator-constants.ts",
  "components/CalculatorForm.tsx",
  "components/ResultsClient.tsx",
  "app/methodology/page.tsx",
  "app/how-it-works/page.tsx",
  "app/page.tsx",
  "README.md"
];
const source = filesToScan.map((file) => readFileSync(resolve(process.cwd(), file), "utf8")).join("\n");
const removedAssumptionPatterns = [
  /currentOwnershipReserveMonthly/,
  /remainingLoanBalanceMonthlyDivisor/,
  /usedReplacementDepreciationReserveAnnualRate/,
  /newReplacementDepreciationReserveAnnualRate/,
  /ownership reserve/i,
  /simple depreciation reserve/i
];
for (const pattern of removedAssumptionPatterns) {
  if (pattern.test(source)) throw new Error(`Removed hard-coded assumption still referenced: ${pattern}`);
}
console.log("removed hard-coded assumptions: passed");
