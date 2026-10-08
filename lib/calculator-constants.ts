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

export const methodologyVersion = "1.0" as const;

export const vehicleValueRanges = {
  "under-3000": { label: "Under $3,000", assumedValue: 1500 },
  "3000-7000": { label: "$3,000–$7,000", assumedValue: 5000 },
  "7000-15000": { label: "$7,000–$15,000", assumedValue: 11000 },
  "15000-25000": { label: "$15,000–$25,000", assumedValue: 20000 },
  "over-25000": { label: "More than $25,000", assumedValue: 30000 }
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
