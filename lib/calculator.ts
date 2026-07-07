import { calculatorAssumptions } from "@/lib/calculator-constants";

export type ThreeWay = "yes" | "no" | "not-sure";
export type ReliabilityImportance = "low" | "medium" | "high";
export type ReplacementPreference = "used" | "new" | "both";
export type RecommendationOutcome = "repair" | "replace" | "close" | "safety";
export type ConfidenceLevel = "Low" | "Medium" | "High";

export type CalculatorInput = {
  vehicleYear: number;
  make: string;
  model: string;
  mileage: number;
  currentValue: number;
  remainingLoanBalance: number;
  safeToDrive: ThreeWay;
  safetyConcerns: Record<string, ThreeWay>;
  repairCategory: string;
  repairQuote: number;
  firstMajorRepair: ThreeWay;
  additionalRepairs: number;
  usableMonthsAfterRepair: number;
  reliabilityImportance: ReliabilityImportance;
  essentialVehicleUse: boolean;
  replacementPreference: ReplacementPreference;
  usedPurchasePrice: number;
  newPurchasePrice: number;
  downPayment: number;
  apr: number;
  loanTermMonths: number;
  insuranceMonthlyDelta: number;
  fuelMonthlyDelta: number;
  maintenanceMonthlyDelta: number;
  taxesAndFees: number;
  comparisonMonths: 12 | 24 | 36;
  zipCode?: string;
};

export type OptionCost = {
  key: "repair" | "used" | "new";
  label: string;
  totalCost: number;
  monthlyEquivalent: number;
  financedAmount?: number;
  monthlyLoanPayment?: number;
  depreciationReserve?: number;
  drivers: string[];
};

export type CalculatorResult = {
  safetyFlag: boolean;
  equity: number;
  repairCostToValueRatio: number;
  repairCostPerUsableMonth: number;
  options: OptionCost[];
  lowestOption: OptionCost;
  outcome: RecommendationOutcome;
  confidence: ConfidenceLevel;
  headline: string;
  summary: string;
  drivers: string[];
  changeFactors: string[];
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Math.round(value));
}

function loanPayment(principal: number, aprPercent: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;
  const monthlyRate = aprPercent / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

function hasSafetyFlag(input: CalculatorInput) {
  return (
    input.safeToDrive !== "yes" ||
    Object.values(input.safetyConcerns).some((value) => value === "yes" || value === "not-sure")
  );
}

function buildReplacementOption(input: CalculatorInput, kind: "used" | "new", equity: number): OptionCost {
  const purchasePrice = kind === "used" ? input.usedPurchasePrice : input.newPurchasePrice;
  const depreciationRate =
    kind === "used"
      ? calculatorAssumptions.usedReplacementDepreciationReserveAnnualRate
      : calculatorAssumptions.newReplacementDepreciationReserveAnnualRate;

  // Negative equity is treated as extra financed cost; positive equity offsets the amount financed.
  const equityOffset = Math.max(equity, 0);
  const negativeEquity = Math.abs(Math.min(equity, 0));
  const financedAmount = Math.max(purchasePrice + negativeEquity + input.taxesAndFees - input.downPayment - equityOffset, 0);
  const monthlyLoanPayment = loanPayment(financedAmount, input.apr, input.loanTermMonths);
  const paidDuringPeriod = monthlyLoanPayment * input.comparisonMonths;
  const ownershipDeltas =
    (input.insuranceMonthlyDelta + input.fuelMonthlyDelta + input.maintenanceMonthlyDelta) * input.comparisonMonths;

  // Depreciation reserve is intentionally simple and centrally configurable, not a market-value prediction.
  const depreciationReserve = purchasePrice * depreciationRate * (input.comparisonMonths / 12);
  const totalCost = input.downPayment + paidDuringPeriod + input.taxesAndFees + ownershipDeltas + depreciationReserve;

  return {
    key: kind,
    label: kind === "used" ? "Replace with Used" : "Replace with New",
    totalCost,
    monthlyEquivalent: totalCost / input.comparisonMonths,
    financedAmount,
    monthlyLoanPayment,
    depreciationReserve,
    drivers: [
      `${money(financedAmount)} estimated financed amount`,
      `${money(monthlyLoanPayment)} estimated monthly loan payment`,
      `${money(depreciationReserve)} simple depreciation reserve`
    ]
  };
}

export function calculateRepairOrReplace(input: CalculatorInput): CalculatorResult {
  const safetyFlag = hasSafetyFlag(input);
  const comparisonMonths = input.comparisonMonths;
  const equity = input.currentValue - input.remainingLoanBalance;
  const repairCostToValueRatio = input.currentValue > 0 ? input.repairQuote / input.currentValue : 1;
  const usableMonths = Math.max(input.usableMonthsAfterRepair, 1);
  const repairCostPerUsableMonth = input.repairQuote / usableMonths;

  // Remaining loan exposure is spread over a conservative period instead of modeling the user's actual note.
  const estimatedLoanCarry =
    (input.remainingLoanBalance / calculatorAssumptions.remainingLoanBalanceMonthlyDivisor) * comparisonMonths;
  const repairTotal =
    input.repairQuote +
    input.additionalRepairs +
    estimatedLoanCarry +
    calculatorAssumptions.currentOwnershipReserveMonthly * comparisonMonths;

  const repairOption: OptionCost = {
    key: "repair",
    label: "Repair and Keep",
    totalCost: repairTotal,
    monthlyEquivalent: repairTotal / comparisonMonths,
    drivers: [
      `${money(input.repairQuote)} repair quote`,
      `${money(input.additionalRepairs)} expected additional repairs`,
      `${money(calculatorAssumptions.currentOwnershipReserveMonthly * comparisonMonths)} ownership reserve`
    ]
  };

  const options = [
    repairOption,
    ...(input.replacementPreference !== "new" ? [buildReplacementOption(input, "used", equity)] : []),
    ...(input.replacementPreference !== "used" ? [buildReplacementOption(input, "new", equity)] : [])
  ];
  const lowestOption = options.reduce((lowest, option) => (option.totalCost < lowest.totalCost ? option : lowest));
  const bestReplacement = options
    .filter((option) => option.key !== "repair")
    .reduce<OptionCost | null>((lowest, option) => (!lowest || option.totalCost < lowest.totalCost ? option : lowest), null);
  const replacementGap = bestReplacement ? Math.abs(bestReplacement.totalCost - repairOption.totalCost) : 0;
  const closeThreshold = Math.max(repairOption.totalCost, bestReplacement?.totalCost ?? repairOption.totalCost) *
    calculatorAssumptions.closeCallThresholdPercent;

  const riskFactors = [
    input.mileage >= calculatorAssumptions.highMileageThreshold,
    input.additionalRepairs > input.repairQuote * 0.35,
    input.firstMajorRepair !== "yes",
    input.reliabilityImportance === "high",
    input.essentialVehicleUse,
    repairCostToValueRatio >= calculatorAssumptions.repairToValueConcernRatio,
    repairCostPerUsableMonth >= calculatorAssumptions.highRepairPerUsableMonth,
    safetyFlag
  ].filter(Boolean).length;

  let outcome: RecommendationOutcome = lowestOption.key === "repair" ? "repair" : "replace";
  if (bestReplacement && replacementGap <= closeThreshold) outcome = "close";
  if (safetyFlag) outcome = "safety";

  // Confidence is reduced by uncertainty and safety issues, and increased by a large cost separation.
  const largeCostSeparation = bestReplacement ? replacementGap > closeThreshold * 2.2 : false;
  const confidence: ConfidenceLevel = safetyFlag || riskFactors >= 5 ? "Low" : largeCostSeparation && riskFactors <= 2 ? "High" : "Medium";

  const period = `${comparisonMonths} months`;
  const financialWinner = outcome === "replace" ? bestReplacement : lowestOption;
  const savings = bestReplacement ? Math.abs((financialWinner?.totalCost ?? 0) - repairOption.totalCost) : 0;

  const headline =
    outcome === "safety"
      ? "Safety or structural concerns need professional review before relying on this comparison"
      : outcome === "close"
        ? "The financial comparison is close, get a second repair opinion"
        : outcome === "repair"
          ? "Repairing is likely the lower-cost option"
          : "Replacing is likely the lower-cost option";

  const summary =
    outcome === "safety"
      ? "This tool cannot evaluate vehicle safety. Have a qualified professional inspect the vehicle before making a decision or continuing to drive it."
      : outcome === "close"
        ? `The options are within about ${money(closeThreshold)} over ${period}, so another written repair estimate could change the result.`
        : `${headline} over the next ${period} by approximately ${money(savings)}.`;

  const drivers = [
    `${repairOption.label}: ${money(repairOption.totalCost)} estimated over ${period}`,
    bestReplacement ? `${bestReplacement.label}: ${money(bestReplacement.totalCost)} estimated over ${period}` : "Replacement option limited by your preference",
    repairCostToValueRatio > 0.5
      ? `Repair quote equals about ${Math.round(repairCostToValueRatio * 100)}% of current estimated value`
      : `Repair quote is about ${money(repairCostPerUsableMonth)} per expected usable month`
  ];

  const changeFactors = [
    `If additional repairs rise above ${money(input.additionalRepairs + Math.max(750, closeThreshold))}, replacement may become more competitive.`,
    "A lower replacement purchase price, larger down payment, or lower APR could reduce replacement cost.",
    "A second diagnosis, safety inspection, or shorter usable-life estimate could materially change the repair side."
  ];

  return {
    safetyFlag,
    equity,
    repairCostToValueRatio,
    repairCostPerUsableMonth,
    options,
    lowestOption,
    outcome,
    confidence,
    headline,
    summary,
    drivers,
    changeFactors
  };
}
