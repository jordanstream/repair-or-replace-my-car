import { Suspense } from "react";
import { CalculatorForm } from "@/components/CalculatorForm";
import { EstimateDisclaimer } from "@/components/EstimateDisclaimer";
import { TrackedLink } from "@/components/TrackedLink";
import { analyticsEvents } from "@/lib/analytics";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Repair or Replace My Car Calculator",
  description: "Compare repair and keep, used replacement, and new replacement—then see how stable the result is and what to verify next.",
  path: "/calculator"
});

export default function CalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Car Second Opinion Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  return (
    <main className="bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="motion-page-intro mb-10 grid gap-7 lg:grid-cols-[1fr_18rem] lg:items-end">
          <div>
            <p className="font-semibold text-brand-700">A guided financial comparison</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-ink-950 sm:text-5xl">Let’s compare the three paths.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-700">Bring the repair estimate you already received. Use ballpark planning numbers where needed; the result will show which assumptions need more support.</p>
          </div>
          <div className="rounded-xl border border-line bg-white p-5 text-sm leading-6 text-ink-700">
            <p className="font-bold text-ink-950">Before you start</p>
            <p className="mt-1">About 5–10 minutes · four stages · saved on this device</p>
          </div>
        </div>

        <Suspense fallback={<div className="min-h-96 rounded-2xl border border-line bg-white p-7"><p className="font-semibold text-ink-800">Preparing your comparison…</p></div>}>
          <CalculatorForm />
        </Suspense>

        <div className="mt-8 grid gap-6 border-t border-line pt-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <EstimateDisclaimer />
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-brand-700">
            <TrackedLink href="/methodology" event={analyticsEvents.methodologyOpened} properties={{ placement: "calculator_footer", methodology_version: "1.0" }} className="min-h-11 py-2 underline underline-offset-4">Read methodology</TrackedLink>
            <a href="/privacy" className="min-h-11 py-2 underline underline-offset-4">Privacy</a>
          </div>
        </div>
      </div>
    </main>
  );
}
