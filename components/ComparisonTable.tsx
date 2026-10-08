import type { OptionCost } from "@/lib/calculator";

const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function ComparisonTable({ options, lowestKey }: { options: OptionCost[]; lowestKey: OptionCost["key"] }) {
  return (
    <div className="rounded-2xl border border-line bg-white">
      <div className="divide-y divide-line md:hidden">
        {options.map((option) => (
          <section key={option.key} className={option.key === lowestKey ? "bg-success-50 p-5" : "p-5"} aria-label={option.label}>
            <div className="flex items-start justify-between gap-4"><h3 className="font-bold text-ink-950">{option.label}</h3>{option.key === lowestKey ? <span className="rounded-full bg-success-100 px-2.5 py-1 text-xs font-bold text-success-700">Lowest estimate</span> : null}</div>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div><dt className="text-ink-600">Upfront cash</dt><dd className="tabular mt-1 font-bold text-ink-950">{formatter.format(option.upfrontCash)}</dd></div>
              <div><dt className="text-ink-600">Cash paid</dt><dd className="tabular mt-1 font-bold text-ink-950">{formatter.format(option.totalCost)}</dd></div>
              <div className="col-span-2"><dt className="text-ink-600">Monthly cash-flow equivalent</dt><dd className="tabular mt-1 font-bold text-ink-950">{formatter.format(option.monthlyEquivalent)}</dd></div>
            </dl>
          </section>
        ))}
      </div>
      <div className="hidden overflow-x-auto md:block">
      <table className="min-w-full divide-y divide-line text-left text-sm">
        <caption className="sr-only">Estimated cash paid during the comparison period by option</caption>
        <thead className="bg-wash">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold text-ink-800">Option</th>
            <th scope="col" className="px-4 py-3 font-semibold text-ink-800">Upfront cash</th>
            <th scope="col" className="px-4 py-3 font-semibold text-ink-800">Estimated cash paid</th>
            <th scope="col" className="px-4 py-3 font-semibold text-ink-800">Monthly cash-flow equivalent</th>
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
              <td className="px-4 py-4 text-ink-700">{option.key === lowestKey ? "Lowest estimated cash flow" : "Compare assumptions carefully"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
