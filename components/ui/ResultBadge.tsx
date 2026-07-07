import type { RecommendationOutcome } from "@/lib/calculator";

const badgeStyles: Record<RecommendationOutcome, string> = {
  repair: "bg-success-50 text-success-700 ring-success-700/20",
  replace: "bg-brand-50 text-brand-700 ring-brand-700/20",
  close: "bg-caution-50 text-caution-700 ring-caution-700/20",
  safety: "bg-danger-50 text-danger-700 ring-danger-700/20"
};

export function ResultBadge({ outcome }: { outcome: RecommendationOutcome }) {
  const label = {
    repair: "Repair may be favorable",
    replace: "Replacement may be favorable",
    close: "Close comparison",
    safety: "Safety review needed"
  }[outcome];

  return <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ring-1 ${badgeStyles[outcome]}`}>{label}</span>;
}
