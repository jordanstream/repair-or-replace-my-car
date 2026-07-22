export const calculatorAssumptions = {
  // A decision-confidence setting, not an industry benchmark.
  closeCallThresholdPercent: 0.1,
  closeCallMinimumDollars: 750,
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
