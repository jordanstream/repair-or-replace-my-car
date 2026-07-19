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
    <ContentPage title="Methodology" intro="The calculator organizes user-entered estimates into a cash-flow comparison. It does not verify a diagnosis, predict future repairs, or calculate complete economic ownership cost.">
      <section className="rounded-lg border border-brand-100 bg-brand-50 p-5">
        <h2 className="text-2xl font-bold text-ink-950">What the headline comparison means</h2>
        <p className="mt-3 leading-7">
          The headline compares estimated cash paid during the selected 12-, 24-, or 36-month period. It uses the values
          the user enters. It is decision support—not mechanical, safety, legal, insurance, purchasing, or personalized
          financial advice—and it should not be read as a complete cost of ownership.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <h2 className="text-2xl font-bold text-ink-950">Repair-and-keep cash flow</h2>
        <p className="mt-3 leading-7">
          The repair path adds the entered repair quote, expected future maintenance and repairs, and current vehicle
          loan payments due during the comparison period. Current loan payments equal the entered monthly payment
          multiplied by the lesser of the comparison months or the number of payments remaining.
        </p>
        <p className="mt-3 leading-7">
          If expected future maintenance and repairs is $0, no automatic reserve is substituted. The result warns that
          this may make keeping the current vehicle appear less expensive. The calculator does not project the current
          vehicle’s ending value or loan payoff because the inputs are not enough to do that accurately.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <h2 className="text-2xl font-bold text-ink-950">Current vehicle equity and replacement financing</h2>
        <p className="mt-3 leading-7">
          Current vehicle equity equals estimated current vehicle value minus current loan payoff. Positive equity is
          treated as value available toward the replacement. Negative equity is added to the estimated replacement
          financing, so an unpaid current-car payoff does not disappear from the replacement scenario.
        </p>
        <p className="mt-3 leading-7">
          Replacement cash flow includes the entered down payment, taxes and fees, modeled replacement-loan payments
          during the comparison period, and entered monthly insurance, fuel, and maintenance differences. Taxes and fees
          are treated as upfront cash and are not also added to the financed amount.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <h2 className="text-2xl font-bold text-ink-950">Loan payments, balances, and equity</h2>
        <p className="mt-3 leading-7">
          Loan payments include both principal and interest. Principal payments can build vehicle equity and are not
          identical to an ownership expense. For replacement loans, the calculator uses the entered price, down payment,
          equity, APR, and term to estimate payments and the remaining balance at the end of the comparison period.
        </p>
        <p className="mt-3 leading-7">
          Upfront cash, monthly cash-flow equivalent, remaining loan balance, vehicle value, and vehicle equity are shown
          as separate categories. They should not be added together without a complete economic-cost model.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <h2 className="text-2xl font-bold text-ink-950">Ending value and depreciation</h2>
        <p className="mt-3 leading-7">
          Replacement depreciation is only estimated when the user enters an ending vehicle value. It equals purchase
          price minus ending value and is clamped at $0, so the calculator never reports negative depreciation. Ending
          equity equals the entered ending value minus the estimated replacement-loan balance at that time.
        </p>
        <p className="mt-3 leading-7">
          Depreciation and ending equity are displayed separately and do not change the headline cash-flow total. When
          no ending value is entered, depreciation is excluded and the result warns that replacement may appear less
          expensive. The replacement total is not presented as complete ownership cost.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <h2 className="text-2xl font-bold text-ink-950">Close calls and uncertainty</h2>
        <p className="mt-3 leading-7">
          The calculator compares repair cash flow with the lowest replacement cash flow. A close call is reported when
          the absolute difference is no more than the larger total multiplied by {Math.round(calculatorAssumptions.closeCallThresholdPercent * 100)}%,
          or {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(calculatorAssumptions.closeCallMinimumDollars)}, whichever is greater.
          This threshold is a decision-confidence setting, not an industry standard.
        </p>
        <p className="mt-3 leading-7">
          Quote-confidence answers do not change the entered repair amount. Safety uncertainty overrides the financial
          label so the result asks for professional review first.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <h2 className="text-2xl font-bold text-ink-950">What can change the result</h2>
        <p className="mt-3 leading-7">
          Unknown future repairs, resale values, financing terms, taxes, insurance, fuel costs, maintenance, repair
          warranties, downtime, and transportation needs may change the outcome. The calculator does not inspect the
          vehicle, verify a repair price, look up market values, or obtain lender and insurer quotes.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <h2 className="text-2xl font-bold text-ink-950">Before acting</h2>
        <p className="mt-3 leading-7">
          Verify the diagnosis, itemized estimate, repair warranty, other near-term work, replacement price, financing,
          current payoff, vehicle values, insurance, taxes, and fees that matter to your situation. Financial comparisons
          should not override safety.
        </p>
        <div className="mt-5"><Button href="/calculator">Compare my options</Button></div>
      </section>
    </ContentPage>
  );
}
