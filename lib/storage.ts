import type { CalculatorInput } from "@/lib/calculator";

const threeWayValues = ["yes", "no", "not-sure"];
const reliabilityValues = ["low", "medium", "high"];
const preferenceValues = ["used", "new", "both"];
const periodValues = [12, 24, 36];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFiniteNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value);
}

export function isStoredCalculatorInput(value: unknown): value is CalculatorInput {
  if (!isRecord(value) || !isRecord(value.safetyConcerns)) return false;

  const numericKeys = [
    "vehicleYear",
    "mileage",
    "currentValue",
    "remainingLoanBalance",
    "repairQuote",
    "additionalRepairs",
    "usableMonthsAfterRepair",
    "usedPurchasePrice",
    "newPurchasePrice",
    "downPayment",
    "apr",
    "loanTermMonths",
    "insuranceMonthlyDelta",
    "fuelMonthlyDelta",
    "maintenanceMonthlyDelta",
    "taxesAndFees"
  ];

  return (
    numericKeys.every((key) => isFiniteNumber(value[key])) &&
    typeof value.make === "string" &&
    typeof value.model === "string" &&
    typeof value.repairCategory === "string" &&
    (value.zipCode === undefined || typeof value.zipCode === "string") &&
    threeWayValues.includes(String(value.safeToDrive)) &&
    Object.values(value.safetyConcerns).every((entry) => threeWayValues.includes(String(entry))) &&
    threeWayValues.includes(String(value.firstMajorRepair)) &&
    reliabilityValues.includes(String(value.reliabilityImportance)) &&
    typeof value.essentialVehicleUse === "boolean" &&
    preferenceValues.includes(String(value.replacementPreference)) &&
    periodValues.includes(Number(value.comparisonMonths))
  );
}

export function parseStoredCalculatorInput(stored: string | null): CalculatorInput | null {
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    return isStoredCalculatorInput(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
