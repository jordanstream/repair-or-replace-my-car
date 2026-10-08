import { calculatorAssumptions } from "@/lib/calculator-constants";

export type ThreeWay = "yes" | "no" | "not-sure";
export type QuoteConfirmation = ThreeWay | "not-yet";
export type ReliabilityImportance = "low" | "medium" | "high";
export type ReplacementPreference = "used" | "new" | "both";
export type RecommendationOutcome = "repair" | "replace" | "close" | "safety";
export type ConfidenceLevel = "Low" | "Medium" | "High";
export type ResultStability = "more_stable" | "sensitive" | "limited_information";
export type VehicleValueStatus = "amount" | "range" | "unknown";
export type VehicleValueRange = "under-3000" | "3000-7000" | "7000-15000" | "15000-25000" | "over-25000";

export type CalculatorInput = {
  vehicleYear: number;
  make: string;
  model: string;
  mileage: number;
  currentValue: number;
  currentValueStatus?: VehicleValueStatus;
  currentValueRange?: VehicleValueRange;
  currentLoanPayoff: number;
  currentMonthlyPayment: number;
  currentPaymentsRemaining: number;
  safeToDrive: ThreeWay;
  safetyConcerns: Record<string, ThreeWay>;
  repairCategory: string;
  repairQuote: number;
  itemizedEstimate?: ThreeWay;
  testingExplained?: ThreeWay;
  secondShopConfirmed?: QuoteConfirmation;
  wholeVehicleCondition?: ThreeWay;
  firstMajorRepair: ThreeWay;
  expectedFutureMaintenance: number;
  usableMonthsAfterRepair: number;
  reliabilityImportance: ReliabilityImportance;
  essentialVehicleUse: boolean;
  replacementPreference: ReplacementPreference;
  usedPurchasePrice: number;
  newPurchasePrice: number;
  usedEndingValue?: number;
  newEndingValue?: number;
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
  upfrontCash: number;
  financedAmount?: number;
  monthlyLoanPayment?: number;
  loanPaymentMonths?: number;
  endingVehicleValue?: number;
  remainingLoanBalanceAtEnd?: number;
  endingEquity?: number;
  depreciationEstimate?: number;
  assumptionsNotIncluded: string[];
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
  resultStability: ResultStability;
  stabilityReasons: string[];
  vehicleValueKnown: boolean;
  headline: string;
  summary: string;
  drivers: string[];
  changeFactors: string[];
  quoteConfidenceLimited: boolean;
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

function sanitizeInput(input: CalculatorInput): CalculatorInput {
  return {
    ...input,
    vehicleYear: Math.max(input.vehicleYear, 1950),
    mileage: Math.max(input.mileage, 0),
    currentValue: Math.max(input.currentValue, 0),
    currentLoanPayoff: Math.max(input.currentLoanPayoff, 0),
    currentMonthlyPayment: Math.max(input.currentMonthlyPayment, 0),
    currentPaymentsRemaining: Math.max(Math.round(input.currentPaymentsRemaining), 0),
    repairQuote: Math.max(input.repairQuote, 0),
    expectedFutureMaintenance: Math.max(input.expectedFutureMaintenance, 0),
    usableMonthsAfterRepair: Math.max(input.usableMonthsAfterRepair, 1),
    usedPurchasePrice: Math.max(input.usedPurchasePrice, 0),
    newPurchasePrice: Math.max(input.newPurchasePrice, 0),
    usedEndingValue: input.usedEndingValue === undefined ? undefined : Math.max(input.usedEndingValue, 0),
    newEndingValue: input.newEndingValue === undefined ? undefined : Math.max(input.newEndingValue, 0),
    downPayment: Math.max(input.downPayment, 0),
    apr: Math.max(input.apr, 0),
    loanTermMonths: Math.max(input.loanTermMonths, 1),
    taxesAndFees: Math.max(input.taxesAndFees, 0)
  };
}

function remainingLoanBalance(principal: number, aprPercent: number, termMonths: number, paymentsMade: number) {
  if (principal <= 0 || paymentsMade >= termMonths) return 0;
  if (paymentsMade <= 0) return principal;
  const payment = loanPayment(principal, aprPercent, termMonths);
  const monthlyRate = aprPercent / 100 / 12;
  if (monthlyRate === 0) return Math.max(principal - payment * paymentsMade, 0);
  const growth = Math.pow(1 + monthlyRate, paymentsMade);
  return Math.max(principal * growth - payment * ((growth - 1) / monthlyRate), 0);
}

function buildReplacementOption(
  input: CalculatorInput,
  kind: "used" | "new",
  equity: number,
  vehicleValueKnown: boolean
): OptionCost {
  const purchasePrice = kind === "used" ? input.usedPurchasePrice : input.newPurchasePrice;
  const endingVehicleValue = kind === "used" ? input.usedEndingValue : input.newEndingValue;

  // Negative equity is treated as extra financed cost; positive equity offsets the amount financed.
  const equityOffset = Math.max(equity, 0);
  const negativeEquity = Math.abs(Math.min(equity, 0));
  // Taxes and fees are counted as upfront cash below, so they are not also financed and double-counted.
  const financedAmount = Math.max(purchasePrice + negativeEquity - input.downPayment - equityOffset, 0);
  const monthlyLoanPayment = loanPayment(financedAmount, input.apr, input.loanTermMonths);
  const loanPaymentMonths = Math.min(input.comparisonMonths, Math.max(input.loanTermMonths, 0));
  const paidDuringPeriod = monthlyLoanPayment * loanPaymentMonths;
  const remainingLoanBalanceAtEnd = remainingLoanBalance(
    financedAmount,
    input.apr,
    input.loanTermMonths,
    loanPaymentMonths
  );
  const ownershipDeltas =
    (input.insuranceMonthlyDelta + input.fuelMonthlyDelta + input.maintenanceMonthlyDelta) * input.comparisonMonths;

  const depreciationEstimate = endingVehicleValue === undefined
    ? undefined
    : Math.max(purchasePrice - endingVehicleValue, 0);
  const endingEquity = endingVehicleValue === undefined
    ? undefined
    : endingVehicleValue - remainingLoanBalanceAtEnd;
  // Headline totals compare cash flow only. Ending value, loan balance, equity, and depreciation stay separate.
  const totalCost = Math.max(input.downPayment + paidDuringPeriod + input.taxesAndFees + ownershipDeltas, 0);

  return {
    key: kind,
    label: kind === "used" ? "Replace with Used" : "Replace with New",
    totalCost,
    monthlyEquivalent: totalCost / input.comparisonMonths,
    upfrontCash: input.downPayment + input.taxesAndFees,
    financedAmount,
    monthlyLoanPayment,
    loanPaymentMonths,
    endingVehicleValue,
    remainingLoanBalanceAtEnd,
    endingEquity,
    depreciationEstimate,
    assumptionsNotIncluded: [
      ...(!vehicleValueKnown ? ["A verified current vehicle value; replacement financing assumes no positive sale or trade-in value"] : []),
      ...(endingVehicleValue === undefined ? ["Vehicle depreciation and ending equity"] : []),
      "Unentered repairs, insurance, fuel, taxes, fees, and financing changes"
    ],
    drivers: [
      `${money(financedAmount)} estimated financed amount`,
      `${money(monthlyLoanPayment)} estimated monthly loan payment counted for ${loanPaymentMonths} month${loanPaymentMonths === 1 ? "" : "s"}`,
      ...(loanPaymentMonths < input.comparisonMonths ? [`Loan payments stop after the entered ${input.loanTermMonths}-month term`] : []),
      equity >= 0
        ? vehicleValueKnown
          ? `${money(equity)} current-car equity applied toward replacement financing`
          : "No positive current-car equity applied because the vehicle value is unknown"
        : `${money(Math.abs(equity))} current-car negative equity added to replacement financing`,
      ...(depreciationEstimate === undefined
        ? ["Depreciation excluded because no ending value was entered"]
        : [`${money(depreciationEstimate)} estimated depreciation shown separately from cash flow`])
    ]
  };
}

export function calculateRepairOrReplace(rawInput: CalculatorInput): CalculatorResult {
  const input = sanitizeInput(rawInput);
  const vehicleValueKnown = input.currentValueStatus !== "unknown" && input.currentValue > 0;
  const safetyFlag = hasSafetyFlag(input);
  const comparisonMonths = input.comparisonMonths;
  const equity = (vehicleValueKnown ? input.currentValue : 0) - input.currentLoanPayoff;
  const repairCostToValueRatio = vehicleValueKnown ? input.repairQuote / input.currentValue : 0;
  const usableMonths = Math.max(input.usableMonthsAfterRepair, 1);
  const repairCostPerUsableMonth = input.repairQuote / usableMonths;
  const quoteConfidenceAnswers = [input.itemizedEstimate, input.testingExplained, input.secondShopConfirmed];
  const quoteConfidenceLimited = quoteConfidenceAnswers.some(
    (answer) => answer === "no" || answer === "not-sure" || answer === "not-yet"
  );

  const currentLoanPaymentMonths = Math.min(comparisonMonths, input.currentPaymentsRemaining);
  const currentLoanCashFlow = input.currentMonthlyPayment * currentLoanPaymentMonths;
  const repairTotal =
    input.repairQuote +
    input.expectedFutureMaintenance +
    currentLoanCashFlow;

  const repairOption: OptionCost = {
    key: "repair",
    label: "Repair and Keep",
    totalCost: repairTotal,
    monthlyEquivalent: repairTotal / comparisonMonths,
    upfrontCash: input.repairQuote,
    remainingLoanBalanceAtEnd: input.currentPaymentsRemaining <= comparisonMonths ? 0 : undefined,
    assumptionsNotIncluded: [
      vehicleValueKnown
        ? "Current vehicle depreciation and ending equity"
        : "Current vehicle value, depreciation, and ending equity",
      ...(input.currentPaymentsRemaining > comparisonMonths ? ["Current vehicle loan balance at the end of the period"] : []),
      ...(input.expectedFutureMaintenance === 0 ? ["Additional future maintenance and repairs"] : []),
      "Unentered repairs, insurance, fuel, taxes, and other ownership changes"
    ],
    drivers: [
      `${money(input.repairQuote)} repair quote`,
      `${money(input.expectedFutureMaintenance)} expected future maintenance and repairs`,
      `${money(currentLoanCashFlow)} current loan payments counted for ${currentLoanPaymentMonths} month${currentLoanPaymentMonths === 1 ? "" : "s"}`
    ]
  };

  const options = [
    repairOption,
    buildReplacementOption(input, "used", equity, vehicleValueKnown),
    buildReplacementOption(input, "new", equity, vehicleValueKnown)
  ];
  const lowestOption = options.reduce((lowest, option) => (option.totalCost < lowest.totalCost ? option : lowest));
  const bestReplacement = options
    .filter((option) => option.key !== "repair")
    .reduce<OptionCost | null>((lowest, option) => (!lowest || option.totalCost < lowest.totalCost ? option : lowest), null);
  const replacementGap = bestReplacement ? Math.abs(bestReplacement.totalCost - repairOption.totalCost) : 0;
  const largerComparedTotal = Math.max(repairOption.totalCost, bestReplacement?.totalCost ?? repairOption.totalCost);
  const closeThreshold = Math.max(
    largerComparedTotal * calculatorAssumptions.closeCallThresholdPercent,
    calculatorAssumptions.closeCallMinimumDollars
  );

  const riskFactors = [
    input.mileage >= calculatorAssumptions.highMileageThreshold,
    input.expectedFutureMaintenance > input.repairQuote * 0.35,
    input.firstMajorRepair !== "yes",
    input.reliabilityImportance === "high",
    vehicleValueKnown && repairCostToValueRatio >= calculatorAssumptions.repairToValueConcernRatio,
    repairCostPerUsableMonth >= calculatorAssumptions.highRepairPerUsableMonth,
    safetyFlag
  ].filter(Boolean).length;

  let outcome: RecommendationOutcome = lowestOption.key === "repair" ? "repair" : "replace";
  if (bestReplacement && replacementGap <= closeThreshold) outcome = "close";
  if (safetyFlag) outcome = "safety";

  // Confidence is reduced by uncertainty and safety issues, and increased by a large cost separation.
  const largeCostSeparation = bestReplacement ? replacementGap > closeThreshold * 2.2 : false;
  const confidence: ConfidenceLevel = safetyFlag || riskFactors >= 5
    ? "Low"
    : quoteConfidenceLimited
      ? "Medium"
      : largeCostSeparation && riskFactors <= 2
        ? "High"
        : "Medium";

  const missingQuoteEvidence = quoteConfidenceAnswers.some((answer) => answer === undefined);
  const resultStability: ResultStability = safetyFlag || !vehicleValueKnown || missingQuoteEvidence
    ? "limited_information"
    : outcome === "close" || quoteConfidenceLimited || !largeCostSeparation || riskFactors >= 3
      ? "sensitive"
      : "more_stable";
  const stabilityReasons = resultStability === "limited_information"
    ? [
        ...(!vehicleValueKnown ? ["Your current vehicle value is unknown, so sale, trade-in, and equity effects are provisional."] : []),
        ...(missingQuoteEvidence ? ["One or more repair-evidence checks have not been answered."] : []),
        ...(safetyFlag ? ["A possible safety concern requires professional review before relying on the financial comparison."] : [])
      ]
    : resultStability === "sensitive"
      ? [
          ...(outcome === "close" ? ["The leading repair and replacement estimates are within the close-call range."] : []),
          ...(quoteConfidenceLimited ? ["The repair estimate has evidence questions that are still unresolved."] : []),
          ...(!largeCostSeparation && outcome !== "close" ? ["A realistic change to a key assumption could narrow or reverse the difference."] : []),
          ...(riskFactors >= 3 ? ["Several reliability or cost assumptions could materially affect the comparison."] : [])
        ]
      : ["The leading option remains ahead by more than the tested close-call range and the key evidence inputs are present."];

  const period = `${comparisonMonths} months`;
  const winningFinancialOption = outcome === "replace" ? (bestReplacement ?? lowestOption) : repairOption;
  const comparisonOption = outcome === "replace" ? repairOption : bestReplacement;
  const savings = comparisonOption ? Math.abs(winningFinancialOption.totalCost - comparisonOption.totalCost) : 0;

  const headline =
    outcome === "safety"
      ? "Safety or structural concerns need professional review before relying on this comparison"
      : !vehicleValueKnown
        ? `${lowestOption.label} is currently lower, but your vehicle value is still missing.`
      : outcome === "close"
        ? "The estimated costs are close enough that another repair quote, a different replacement price, or one changed assumption could change the result."
        : `${lowestOption.label} appears less expensive under the assumptions you entered.`;

  const summary =
    outcome === "safety"
      ? "This tool cannot evaluate vehicle safety. Have a qualified professional inspect the vehicle before making a decision or continuing to drive it."
      : !vehicleValueKnown
        ? `The current estimates differ by ${money(replacementGap)} before positive sale, trade-in, or repair-to-value effects are included. Add a ballpark value to strengthen the comparison.`
      : outcome === "close"
        ? `The cash-flow estimates differ by ${money(replacementGap)}. The close-call limit for these totals is ${money(closeThreshold)}.`
        : `Over ${period}, the estimated cash paid is approximately ${money(savings)} lower than ${
            outcome === "replace" ? "repairing your current vehicle" : "the lowest replacement estimate"
          }.`;

  const drivers = [
    `${repairOption.label}: ${money(repairOption.totalCost)} estimated cash paid over ${period}`,
    bestReplacement ? `${bestReplacement.label}: ${money(bestReplacement.totalCost)} estimated cash paid over ${period}` : "Replacement option limited by your preference",
    vehicleValueKnown && repairCostToValueRatio > 0.5
      ? `Repair quote equals about ${Math.round(repairCostToValueRatio * 100)}% of current estimated value`
      : vehicleValueKnown
        ? `Repair quote is about ${money(repairCostPerUsableMonth)} per expected usable month`
        : "Current vehicle value is unknown, so the repair-to-value comparison is not available"
  ];

  const changeFactors = [
    ...(quoteConfidenceLimited
      ? ["A second inspection or itemized estimate could change the repair diagnosis or amount used in this comparison."]
      : []),
    ...(!vehicleValueKnown
      ? ["A ballpark current vehicle value could materially change replacement equity and the repair-to-value comparison."]
      : []),
    input.wholeVehicleCondition === "not-sure"
      ? "A broader inspection could identify other near-term work that is not in the amount you entered."
      : `If future maintenance and repairs rise above ${money(input.expectedFutureMaintenance + closeThreshold)}, replacement may become more competitive.`,
    "A lower replacement purchase price, larger down payment, or lower APR could reduce replacement cost.",
    "A second diagnosis, safety inspection, or shorter usable-life estimate could materially change the repair side."
  ].slice(0, 4);

  return {
    safetyFlag,
    equity,
    repairCostToValueRatio,
    repairCostPerUsableMonth,
    options,
    lowestOption,
    outcome,
    confidence,
    resultStability,
    stabilityReasons,
    vehicleValueKnown,
    headline,
    summary,
    drivers,
    changeFactors,
    quoteConfidenceLimited
  };
}
