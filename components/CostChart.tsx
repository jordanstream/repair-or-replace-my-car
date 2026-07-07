import type { OptionCost } from "@/lib/calculator";

const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function CostChart({ options, lowestKey }: { options: OptionCost[]; lowestKey: OptionCost["key"] }) {
  const max = Math.max(...options.map((option) => option.totalCost), 1);

  return (
    <div className="space-y-4" aria-label="Estimated cost comparison">
      {options.map((option) => (
        <div key={option.key}>
          <div className="mb-2 flex items-center justify-between gap-4">
            <span className="font-semibold text-ink-800">{option.label}</span>
            <span className="tabular font-bold text-ink-950">{formatter.format(option.totalCost)}</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${option.key === lowestKey ? "bg-success-700" : "bg-brand-600"}`}
              style={{ width: `${Math.max((option.totalCost / max) * 100, 6)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
