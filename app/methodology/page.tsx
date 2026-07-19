import { ContentPage } from "@/components/ContentPage";
import { Button } from "@/components/ui/Button";
import { calculatorAssumptions } from "@/lib/calculator-constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Methodology",
  description: "Understand what the repair or replace calculator includes, excludes, and assumes.",
  path: "/methodology"
});

export default function MethodologyPage() {
  return (
    <ContentPage title="Methodology" intro="The calculator organizes user-entered assumptions into a financial comparison. It does not verify a repair diagnosis or predict what a vehicle will do next.">
      <section className="rounded-lg border border-brand-100 bg-brand-50 p-5">
        <h2 className="text-2xl font-bold text-ink-950">What this comparison means</h2>
        <p className="mt-3 leading-7">
          Car Second Opinion starts with the written or verbal repair estimate you enter. It does not determine a fair
          repair price, inspect the vehicle, or confirm that the diagnosis is correct. The result is decision support,
          not mechanical, safety, legal, insurance, purchasing, or personalized financial advice.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <h2 className="text-2xl font-bold text-ink-950">Repair path</h2>
        <p className="mt-3 leading-7">
          The repair total includes the repair estimate entered, any known additional repairs entered, an ownership
          reserve of ${calculatorAssumptions.currentOwnershipReserveMonthly} per month, and estimated remaining-loan
          exposure during the selected comparison period. Loan exposure is modeled as the entered balance divided by
          {` ${calculatorAssumptions.remainingLoanBalanceMonthlyDivisor} months, then multiplied by the comparison period and capped at the entered balance.`}
        </p>
        <p className="mt-3 leading-7">
          Upfront repair cash is the repair estimate plus any known additional repair amount. The monthly equivalent is
          the repair total divided by 12, 24, or 36 months. It is not a bill or predicted monthly payment.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <h2 className="text-2xl font-bold text-ink-950">Replacement path</h2>
        <p className="mt-3 leading-7">
          The financed amount starts with the entered purchase price, adds negative equity when the remaining loan is
          greater than the entered vehicle value, subtracts positive equity and the down payment, and never goes below
          zero. Entered taxes, registration, and dealer fees are counted as upfront cash and are not also financed.
        </p>
        <p className="mt-3 leading-7">
          The total includes the down payment, taxes and fees, amortized loan payments that fall within the comparison
          period, entered monthly insurance, fuel, and maintenance differences, plus a simple depreciation reserve. The
          reserve is {Math.round(calculatorAssumptions.usedReplacementDepreciationReserveAnnualRate * 100)}% of purchase
          price per year for a used replacement and {Math.round(calculatorAssumptions.newReplacementDepreciationReserveAnnualRate * 100)}% for a new replacement. It is a transparent scenario assumption, not a market-value prediction.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <h2 className="text-2xl font-bold text-ink-950">Upfront cash, monthly equivalent, and total cost</h2>
        <p className="mt-3 leading-7">
          These are different concepts. Upfront cash is the amount modeled as due at the start. Total estimated cost is
          the sum of modeled costs during the chosen period. Monthly equivalent is total estimated cost divided by the
          number of months. It should not be read as a lender payment because it can include upfront costs, ownership
          changes, and the depreciation reserve.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <h2 className="text-2xl font-bold text-ink-950">Close calls and uncertainty</h2>
        <p className="mt-3 leading-7">
          A result is labeled a close call when the repair and lowest replacement totals differ by no more than
          {` ${Math.round(calculatorAssumptions.closeCallThresholdPercent * 100)}% of the larger total.`} Quote-confidence
          answers never change the repair amount or financial outcome. A missing itemized estimate, unclear testing, or
          lack of a second confirmation limits confidence and changes the verification guidance. Safety uncertainty
          overrides the repair-or-replace label so the user sees a professional-review warning first.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <h2 className="text-2xl font-bold text-ink-950">Costs and facts not included</h2>
        <p className="mt-3 leading-7">
          The calculator does not include a mechanic’s inspection, repair-price verification, exact vehicle value,
          repair warranty value, downtime, rental transportation, exact loan payoff schedule for the current car, local
          tax calculation, unentered insurance or fuel changes, future market value, or repairs that the user did not
          enter. Any of these may change the real-world decision.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <h2 className="text-2xl font-bold text-ink-950">Why past repair spending is separate</h2>
        <p className="mt-3 leading-7">
          Money already spent cannot be recovered, so it is generally treated as a sunk cost. The calculator compares
          future costs from today forward. Prior work can still provide useful context about vehicle condition, but the
          amount already paid does not make either future option cheaper.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <h2 className="text-2xl font-bold text-ink-950">Before acting</h2>
        <p className="mt-3 leading-7">
          Verify the diagnosis, itemized estimate, repair warranty, other near-term work, replacement price, financing,
          insurance, taxes, and fees that matter to your situation. Financial comparisons should not override safety.
        </p>
        <div className="mt-5"><Button href="/calculator">Compare my options</Button></div>
      </section>
    </ContentPage>
  );
}
