import { calculateRepairOrReplace, type CalculatorInput } from "../lib/calculator";
import { calculatorAssumptions, safetyConcernLabels } from "../lib/calculator-constants";
import { parseStoredCalculatorInput } from "../lib/storage";

const base: CalculatorInput = {
  vehicleYear: 2015,
  make: "Honda",
  model: "Accord",
  mileage: 120000,
  currentValue: 7500,
  remainingLoanBalance: 0,
  safeToDrive: "yes",
  safetyConcerns: Object.fromEntries(Object.keys(safetyConcernLabels).map((key) => [key, "no"])) as Record<string, "no">,
  repairCategory: "Transmission",
  repairQuote: 2500,
  firstMajorRepair: "yes",
  additionalRepairs: 500,
  usableMonthsAfterRepair: calculatorAssumptions.defaultUsableMonthsAfterRepair,
  reliabilityImportance: "medium",
  essentialVehicleUse: false,
  replacementPreference: "both",
  usedPurchasePrice: 19000,
  newPurchasePrice: 34000,
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

const scenarios = [
  {
    name: "repair clearly cheaper",
    input: base,
    expected: "repair"
  },
  {
    name: "replacement clearly cheaper",
    input: {
      ...base,
      mileage: 190000,
      currentValue: 3000,
      repairQuote: 12500,
      additionalRepairs: 4000,
      usableMonthsAfterRepair: 12,
      reliabilityImportance: "high",
      usedPurchasePrice: 10500,
      downPayment: 3500,
      taxesAndFees: 800,
      insuranceMonthlyDelta: 15,
      maintenanceMonthlyDelta: -120
    },
    expected: "replace"
  },
  {
    name: "close financial comparison",
    input: {
      ...base,
      repairQuote: 7000,
      additionalRepairs: 1000,
      usedPurchasePrice: 17000,
      downPayment: 2500,
      taxesAndFees: 900,
      insuranceMonthlyDelta: 10,
      maintenanceMonthlyDelta: -80,
      apr: 6
    },
    expected: "close"
  },
  {
    name: "safety warning scenario",
    input: {
      ...base,
      safeToDrive: "not-sure",
      safetyConcerns: { ...base.safetyConcerns, severeRust: "not-sure" }
    },
    expected: "safety"
  }
] as const;

for (const scenario of scenarios) {
  const result = calculateRepairOrReplace(scenario.input);
  if (result.outcome !== scenario.expected) {
    throw new Error(`${scenario.name}: expected ${scenario.expected}, received ${result.outcome}`);
  }
  console.log(`${scenario.name}: ${result.outcome}, ${result.confidence}`);
}

const zeroApr = calculateRepairOrReplace({
  ...base,
  apr: 0,
  loanTermMonths: 48,
  usedPurchasePrice: 17000,
  downPayment: 1000,
  taxesAndFees: 0,
  currentValue: 0
});
const zeroAprUsed = zeroApr.options.find((option) => option.key === "used");
if (!zeroAprUsed || zeroAprUsed.monthlyLoanPayment !== zeroAprUsed.financedAmount! / 48) {
  throw new Error("0% APR should divide financed amount evenly across the loan term");
}
console.log("0% APR loan calculation: passed");

const veryHighRepairQuote = calculateRepairOrReplace({
  ...base,
  currentValue: 4500,
  repairQuote: 30000,
  additionalRepairs: 5000,
  usableMonthsAfterRepair: 12,
  usedPurchasePrice: 14000,
  downPayment: 3000,
  taxesAndFees: 1200
});
if (veryHighRepairQuote.outcome !== "replace") {
  throw new Error("Very high repair quote should favor replacement when replacement assumptions are materially cheaper");
}
console.log("very high repair quote handling: passed");

const negativeEquity = calculateRepairOrReplace({
  ...base,
  currentValue: 5000,
  remainingLoanBalance: 12000,
  repairQuote: 3500,
  usedPurchasePrice: 18000,
  downPayment: 2000,
  taxesAndFees: 1200
});
const negativeEquityUsed = negativeEquity.options.find((option) => option.key === "used");
if (!negativeEquityUsed || negativeEquityUsed.financedAmount !== 24200) {
  throw new Error("Remaining loan balance greater than car value should roll negative equity into replacement path");
}
console.log("negative equity handling: passed");

const shortLoan = calculateRepairOrReplace({
  ...base,
  loanTermMonths: 12,
  comparisonMonths: 36,
  usedPurchasePrice: 12000,
  downPayment: 2000,
  taxesAndFees: 0,
  insuranceMonthlyDelta: 0,
  fuelMonthlyDelta: 0,
  maintenanceMonthlyDelta: 0
});
const shortLoanUsed = shortLoan.options.find((option) => option.key === "used");
if (!shortLoanUsed || shortLoanUsed.loanPaymentMonths !== 12 || !shortLoanUsed.drivers.some((driver) => driver.includes("payments stop"))) {
  throw new Error("Loan payments should stop after a shorter entered loan term");
}
console.log("short loan term handling: passed");

const usedOnly = calculateRepairOrReplace({ ...base, replacementPreference: "used" });
if (usedOnly.options.some((option) => option.key === "new")) {
  throw new Error("Used-only comparison should not include new replacement option");
}
const newOnly = calculateRepairOrReplace({ ...base, replacementPreference: "new" });
if (newOnly.options.some((option) => option.key === "used")) {
  throw new Error("New-only comparison should not include used replacement option");
}
console.log("used-only and new-only comparisons: passed");

const sanitized = calculateRepairOrReplace({
  ...base,
  currentValue: -5000,
  repairQuote: -1000,
  additionalRepairs: -200,
  remainingLoanBalance: -300,
  usedPurchasePrice: -15000,
  newPurchasePrice: -30000,
  downPayment: -500,
  apr: -4,
  loanTermMonths: -12,
  taxesAndFees: -700,
  usableMonthsAfterRepair: -3
});
if (sanitized.options.some((option) => option.totalCost < 0 || option.monthlyEquivalent < 0)) {
  throw new Error("Sanitized negative inputs should not produce negative totals");
}
console.log("negative numeric input sanitization: passed");

if (parseStoredCalculatorInput(null) !== null) {
  throw new Error("Missing localStorage should not produce calculator input");
}
if (parseStoredCalculatorInput("{not valid json") !== null) {
  throw new Error("Malformed localStorage JSON should not produce calculator input");
}
if (parseStoredCalculatorInput(JSON.stringify({ repairQuote: 1000 })) !== null) {
  throw new Error("Partial localStorage payload should not produce calculator input");
}
if (!parseStoredCalculatorInput(JSON.stringify(base))) {
  throw new Error("Valid localStorage payload should produce calculator input");
}
console.log("localStorage result parsing: passed");
