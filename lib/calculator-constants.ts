export const calculatorAssumptions = {
  currentOwnershipReserveMonthly: 95,
  remainingLoanBalanceMonthlyDivisor: 24,
  usedReplacementDepreciationReserveAnnualRate: 0.12,
  newReplacementDepreciationReserveAnnualRate: 0.18,
  closeCallThresholdPercent: 0.12,
  highMileageThreshold: 150000,
  repairToValueConcernRatio: 0.65,
  highRepairPerUsableMonth: 325,
  defaultComparisonMonths: 24,
  defaultUsableMonthsAfterRepair: 24
} as const;

export const repairCategories = [
  "Transmission",
  "Engine",
  "Hybrid battery",
  "Electrical system",
  "Air conditioning",
  "Suspension or steering",
  "Brakes",
  "Other major repair"
] as const;

export const safetyConcernLabels = {
  frameDamage: "Frame damage",
  severeRust: "Severe rust",
  floodDamage: "Flood damage",
  airbagDamage: "Airbag damage",
  brakeSteeringFailure: "Serious brake or steering failure"
} as const;
