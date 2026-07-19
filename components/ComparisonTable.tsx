import type { OptionCost } from "@/lib/calculator";

const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function ComparisonTable({ options, lowestKey }: { options: OptionCost[]; lowestKey: OptionCost["key"] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-white">
      <table className="min-w-full divide-y divide-line text-left text-sm">
        <caption className="sr-only">Estimated cost comparison by option</caption>
        <thead className="bg-wash">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold text-ink-800">Option</th>
            <th scope="col" className="px-4 py-3 font-semibold text-ink-800">Upfront cash</th>
            <th scope="col" className="px-4 py-3 font-semibold text-ink-800">Estimated total</th>
            <th scope="col" className="px-4 py-3 font-semibold text-ink-800">Monthly equivalent</th>
            <th scope="col" className="px-4 py-3 font-semibold text-ink-800">Note</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line bg-white">
          {options.map((option) => (
            <tr key={option.key} className={option.key === lowestKey ? "bg-success-50" : undefined}>
              <th scope="row" className="px-4 py-4 font-semibold text-ink-950">{option.label}</th>
              <td className="tabular px-4 py-4 text-ink-800">{formatter.format(option.upfrontCash)}</td>
              <td className="tabular px-4 py-4 text-ink-800">{formatter.format(option.totalCost)}</td>
              <td className="tabular px-4 py-4 text-ink-800">{formatter.format(option.monthlyEquivalent)}</td>
              <td className="px-4 py-4 text-ink-700">{option.key === lowestKey ? "Lowest estimated cost" : "Compare assumptions carefully"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
