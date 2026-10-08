import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { ChecklistDownloadLink } from "@/components/ChecklistDownloadLink";
import { ChecklistEmailPopup } from "@/components/ChecklistEmailPopup";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Major Car Repair Decision Checklist",
  description:
    "Get a free printable checklist for deciding whether to approve a major car repair or compare replacement options.",
  path: "/checklist"
});

const proofPoints = [
  {
    label: "FTC repair guidance",
    value: "Written estimates",
    detail: "Built around getting the repair, warranty, and approval terms in writing."
  },
  {
    label: "AAA ownership math",
    value: "$11,577",
    detail: "AAA's 2025 annual new-vehicle ownership-cost estimate."
  },
  {
    label: "Replacement market context",
    value: "$49,758",
    detail: "Kelley Blue Book's June 2026 average new-vehicle transaction price."
  },
  {
    label: "Used-car reality check",
    value: "11.43%",
    detail: "Experian's Q1 2026 average used-car loan rate."
  }
];

const confidencePoints = [
  "See the repair path and replacement path over the same time period.",
  "Avoid comparing a one-time repair bill against only a monthly payment.",
  "Bring calmer notes to a repair counter, lender, dealer, or second opinion.",
  "Keep safety uncertainty separate from financial wishful thinking.",
  "Leave with a clearer next step before approving, trading, selling, or shopping."
];

export default function ChecklistPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-line bg-canvas">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-brand-600">Free printable PDF</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-ink-950 sm:text-5xl">
              Before you approve a big repair, slow the decision down.
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink-700">
              Get the Car Second Opinion checklist that helps you compare the repair path against realistic replacement
              assumptions before stress, shop pressure, or a monthly payment makes the decision for you.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ChecklistDownloadLink placement="checklist" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-brand-600 bg-brand-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-700">
                Download the checklist
              </ChecklistDownloadLink>
              <ChecklistEmailPopup
                placement="checklist"
                buttonVariant="secondary"
                className="min-h-12 px-6 text-base"
              >
                Email me the checklist
              </ChecklistEmailPopup>
            </div>
            <p className="mt-4 text-sm leading-6 text-ink-600">
              No account needed. Educational worksheet only. Use qualified professionals for mechanical, safety,
              financial, insurance, or purchasing advice.
            </p>
          </div>

          <div className="lg:pt-4">
            <div className="border border-line bg-white p-5">
              <div className="border border-line bg-canvas p-4">
                <div className="flex items-center justify-between gap-4 border-b-4 border-brand-600 pb-3">
                  <div>
                    <BrandMark compact />
                    <p className="mt-1 text-lg font-bold text-ink-950">Major repair decision worksheet</p>
                  </div>
                  <div className="text-xs font-bold text-brand-700">5 pages</div>
                </div>
                <div className="mt-5 border-t border-line">
                  {["Questions to ask the mechanic", "Numbers to compare", "Warning signs", "Notes and next action"].map((item, index) => (
                    <div key={item} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-line py-3">
                      <span className="tabular text-xs font-bold text-brand-600">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-sm font-semibold text-ink-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-ink-700">
                Designed to print, write on, and bring to a repair shop, lender, dealer, or kitchen-table decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid border-y border-line md:grid-cols-4 md:divide-x md:divide-line">
          {proofPoints.map((point) => (
            <div key={point.label} className="border-b border-line p-5 last:border-b-0 md:border-b-0">
              <p className="text-xs font-bold text-ink-600">{point.label}</p>
              <p className="mt-3 text-2xl font-bold text-ink-950">{point.value}</p>
              <p className="mt-2 text-sm leading-6 text-ink-700">{point.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-wash">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-bold text-brand-600">What it helps clarify</p>
            <h2 className="mt-3 text-3xl font-bold text-ink-950">Make the repair decision with fewer blind spots.</h2>
            <p className="mt-4 text-base leading-7 text-ink-700">
              You do not need a perfect answer before you talk to the shop. You need a cleaner comparison, realistic
              assumptions, and a way to spot when the decision deserves more professional input.
            </p>
          </div>
          <div className="border-t border-line">
            {confidencePoints.map((point) => (
              <div key={point} className="flex gap-4 border-b border-line py-4">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 bg-brand-600" aria-hidden="true" />
                <p className="text-sm leading-6 text-ink-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
        <div>
          <h2 className="text-3xl font-bold text-ink-950">A decision this expensive deserves more than a gut check.</h2>
          <p className="mt-4 text-base leading-7 text-ink-700">
            A repair quote is only one number. The real decision includes downtime, likely follow-up costs, vehicle
            value, loan balance, insurance changes, and the risk of buying another car in a high-cost market.
          </p>
          <p className="mt-4 text-base leading-7 text-ink-700">
            The checklist gives you a printable place to organize those assumptions before you say yes, trade in, sell
            as-is, or keep shopping.
          </p>
        </div>
        <div className="border border-line bg-brand-100 p-6">
          <h3 className="text-xl font-bold text-ink-950">Send it to your inbox</h3>
          <p className="mt-3 text-sm leading-6 text-ink-700">
            Keep it handy for the repair counter, a second opinion, or a replacement-cost comparison.
          </p>
          <div className="mt-5">
            <ChecklistEmailPopup placement="checklist" className="w-full min-h-12 text-base">
              Email me the checklist
            </ChecklistEmailPopup>
          </div>
          <Link
            href="/calculator"
            className="mt-4 inline-flex min-h-11 items-center font-semibold text-ink-950 underline decoration-brand-600 decoration-2 underline-offset-4"
          >
            Compare repair vs replace
          </Link>
        </div>
      </section>
    </main>
  );
}
