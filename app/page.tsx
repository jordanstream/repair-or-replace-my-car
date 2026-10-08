import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { guides } from "@/data/guides";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "A Clearer Next Step After a Major Car Repair Estimate",
  description:
    "Compare repairing your car with realistic used and new replacement costs, understand what is driving the result, and learn what to verify next.",
  path: "/"
});

const paths = [
  { label: "Repair and keep", value: "$8,420", detail: "Quote, current payments, future repairs" },
  { label: "Replace with used", value: "$13,890", detail: "Price, financing, equity, ownership changes" },
  { label: "Replace with new", value: "$18,240", detail: "Price, financing, fees, ownership changes" }
];

const outputs = [
  ["Estimated cash paid", "See all three paths over the same time period."],
  ["Result stability", "Know whether the lead is strong, close, or limited by missing information."],
  ["Visible assumptions", "Separate what you entered from what the model assumes or cannot know."],
  ["One useful next action", "Leave with a practical question to verify before you decide."]
];

const process = [
  [
    "Bring what you know",
    "Start with the repair estimate and rough planning numbers. “I don’t know” is a valid answer where uncertainty matters."
  ],
  ["Compare the same period", "See repair and keep, used replacement, and new replacement over 12, 24, or 36 months."],
  [
    "Inspect the reasoning",
    "Review result stability, cost drivers, missing information, and assumptions that could change the comparison."
  ],
  [
    "Take one useful action",
    "Leave with a tailored step: verify the diagnosis, value the car, confirm replacement costs, or seek safety review."
  ]
];

const commitments = [
  ["No account required", "Use the complete comparison without creating a profile."],
  ["Your assumptions stay visible", "See the numbers included, missing, and most likely to change the result."],
  ["No hidden provider ranking", "The comparison is not decided by a dealer, lender, or repair-shop payout."],
  ["Saved on this device", "Your calculator draft stays in this browser for the current version."]
];

function CompareIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8" fill="none">
      <path d="M5 10h18M19 6l4 4-4 4M27 22H9M13 18l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

function SafetyIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8" fill="none">
      <path d="M16 4 26 8v7c0 6.2-3.6 10.5-10 13-6.4-2.5-10-6.8-10-13V8l10-4Z" stroke="currentColor" strokeWidth="2" />
      <path d="M16 10v7M16 22h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-line bg-canvas">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          <div className="motion-hero-copy">
            <p className="text-sm font-bold text-brand-600">Already have a major repair estimate?</p>
            <h1 className="mt-4 max-w-[15ch] text-[2.75rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-ink-950 sm:text-6xl lg:text-[4rem]">
              A clearer next step for your repair-or-replace decision.
            </h1>
            <p className="mt-7 max-w-[39rem] text-lg leading-8 text-ink-700">
              Compare repairing your current car with realistic used and new replacement costs. See what is driving the
              result—and what to verify before you decide.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/calculator">Compare the three paths</Button>
              <Button href="/how-it-works" variant="secondary">
                See how it works
              </Button>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-6 text-ink-600">
              About 5–10 minutes · A ballpark vehicle value is enough · No account or email required
            </p>
          </div>

          <figure className="motion-hero-figure overflow-hidden rounded-xl bg-ink-950 text-white">
            <figcaption className="flex items-center justify-between border-b border-[#53605a] px-5 py-4 text-xs text-[#cbd2ce] sm:px-6">
              <span>Three paths</span>
              <span>24-month comparison</span>
            </figcaption>
            <div className="grid sm:grid-cols-3">
              {paths.map((path) => (
                <div key={path.label} className="motion-hero-path border-b border-[#53605a] px-5 py-5 last:border-b-0 sm:border-b-0 sm:border-l sm:px-4 sm:first:border-l-0">
                  <h2 className="min-h-[2.75rem] border-b-4 border-brand-600 pb-2 text-sm font-bold leading-5">{path.label}</h2>
                  <div className="pt-5">
                    <p className="text-xs text-[#cbd2ce]">Estimated cash paid</p>
                    <p className="tabular mt-1 text-xl font-bold">{path.value}</p>
                    <p className="mt-4 text-xs leading-5 text-[#cbd2ce]">{path.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="border-t border-[#53605a] px-5 py-3 text-xs leading-5 text-[#cbd2ce] sm:px-6">
              Illustrative values only. Your result reflects the information you provide.
            </p>
          </figure>
        </div>
      </section>

      <section aria-label="Product boundaries" className="border-b border-line bg-white">
        <div className="motion-list mx-auto grid max-w-6xl px-4 py-7 sm:px-6 md:grid-cols-2 md:px-8 lg:px-8" data-reveal="soft">
          <div className="motion-list-item bg-wash px-6 py-8 sm:px-8">
            <CompareIcon />
            <h2 className="mt-5 text-lg font-bold text-ink-950">Built to help you compare—not pressure you</h2>
            <p className="mt-3 max-w-xl leading-7 text-ink-700">
              The tool does not diagnose your car, price the repair, or guarantee what happens next. It organizes the
              financial decision using the information you provide.
            </p>
          </div>
          <div className="motion-list-item bg-brand-100 px-6 py-8 sm:px-8">
            <SafetyIcon />
            <h2 className="mt-5 text-lg font-bold text-ink-950">Safety remains a separate decision</h2>
            <p className="mt-3 max-w-xl leading-7 text-ink-700">
              Possible safety or structural concerns always point to qualified professional review before the financial
              comparison guides action.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-canvas py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="motion-list grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20" data-reveal="left">
            <div>
              <p className="text-sm font-bold text-brand-600">What the comparison does</p>
              <h2 className="mt-4 text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-ink-950 sm:text-5xl">
                More useful than a winner.
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-ink-700">
                The product helps you organize the decision without pretending every situation has a simple answer.
              </p>
            </div>
            <dl className="border-t border-line">
              {outputs.map(([title, copy], index) => (
                <div key={title} className="motion-list-item grid gap-2 border-b border-line py-5 sm:grid-cols-[3rem_12rem_1fr] sm:gap-5">
                  <span className="tabular text-sm font-bold text-brand-600">{String(index + 1).padStart(2, "0")}</span>
                  <dt className="font-bold text-ink-950">{title}</dt>
                  <dd className="leading-7 text-ink-700">{copy}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="motion-list grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20" data-reveal="right">
            <div>
              <p className="text-sm font-bold text-brand-600">How it works</p>
              <h2 className="mt-4 text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-ink-950 sm:text-5xl">
                From estimate to evidence-based next step.
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-ink-700">
                Four stages keep the decision understandable and show where uncertainty remains.
              </p>
              <Link
                href="/how-it-works"
                className="mt-6 inline-flex min-h-11 items-center font-semibold text-ink-950 underline decoration-brand-600 decoration-2 underline-offset-4"
              >
                See what you’ll need
              </Link>
            </div>
            <ol className="border-t border-line">
              {process.map(([title, copy], index) => (
                <li key={title} className="motion-list-item grid gap-3 border-b border-line py-6 sm:grid-cols-[3rem_1fr]">
                  <span className="tabular text-lg font-bold text-brand-600">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-xl font-bold text-ink-950">{title}</h3>
                    <p className="mt-2 max-w-2xl leading-7 text-ink-700">{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-ink-950 py-20 text-white md:py-28">
        <div className="motion-list mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-8" data-reveal="soft">
          <div>
            <p className="text-sm font-bold text-brand-100">Why trust the process</p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.04] tracking-[-0.03em] sm:text-5xl">Trust is built into the method.</h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-[#cbd2ce]">
              You should be able to see what the product knows, what it assumes, and where professional judgment still
              matters.
            </p>
            <Link
              href="/methodology"
              className="mt-6 inline-flex min-h-11 items-center font-semibold underline decoration-brand-600 decoration-2 underline-offset-4"
            >
              Read the methodology
            </Link>
          </div>
          <dl className="border-t border-[#53605a]">
            {commitments.map(([title, copy]) => (
              <div key={title} className="motion-list-item grid gap-2 border-b border-[#53605a] py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="font-bold">{title}</dt>
                <dd className="leading-7 text-[#cbd2ce]">{copy}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-line bg-canvas py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="motion-list grid gap-8 md:grid-cols-[0.72fr_1.28fr] md:gap-16" data-reveal="left">
            <div>
              <p className="text-sm font-bold text-brand-600">Decision guides</p>
              <h2 className="mt-4 text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-ink-950">
                Guidance for the questions around the decision.
              </h2>
            </div>
            <div className="border-t border-line">
              {guides.slice(0, 4).map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="motion-link-arrow motion-list-item group grid min-h-24 gap-3 border-b border-line py-5 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6"
                >
                  <div>
                    <h3 className="text-lg font-bold text-ink-950 group-hover:text-brand-700">{guide.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-700">{guide.description}</p>
                  </div>
                  <span aria-hidden="true" className="motion-link-arrow-icon text-xl text-brand-600">
                    →
                  </span>
                </Link>
              ))}
              <Button href="/guides" variant="secondary" className="mt-8">
                Browse all guides
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8" data-reveal="up">
          <div>
            <p className="text-sm font-bold text-brand-600">Free printable worksheet</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-ink-950 md:text-4xl">
              Slow the decision down before you approve a big repair.
            </h2>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-ink-700">
              Organize the estimate, evidence, safety questions, and realistic alternatives on one page.
            </p>
          </div>
          <Button href="/checklist" variant="secondary">
            Get the checklist
          </Button>
        </div>
      </section>

      <section className="bg-brand-100 py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-[-0.025em] text-ink-950 md:text-4xl">
              Start with the estimate you already have.
            </h2>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-ink-700">
              A rough vehicle value is enough, and you can mark information you do not know yet.
            </p>
          </div>
          <Button href="/calculator" className="shrink-0">
            Compare the three paths
          </Button>
        </div>
      </section>
    </main>
  );
}
