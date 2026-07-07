import { calculateRepairOrReplace, type CalculatorInput } from "../lib/calculator";
import { calculatorAssumptions, safetyConcernLabels } from "../lib/calculator-constants";

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
