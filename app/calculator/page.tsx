import { CalculatorForm } from "@/components/CalculatorForm";
import { EstimateDisclaimer } from "@/components/EstimateDisclaimer";
import { Card } from "@/components/ui/Card";
import { TrustPreview } from "@/components/TrustPreview";
import { TrackedLink } from "@/components/TrackedLink";
import { analyticsEvents } from "@/lib/analytics";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Repair or Replace My Car Calculator",
  description: "Compare your repair quote with used and new replacement assumptions using an educational car cost calculator.",
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
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-ink-950">Repair or Replace My Car Calculator</h1>
        <p className="mt-4 text-lg leading-8 text-ink-700">
          Start with the repair estimate you already received. The calculator compares that amount with your vehicle
          situation and realistic replacement assumptions. It does not diagnose the vehicle or estimate a fair repair price.
        </p>
        <EstimateDisclaimer className="mt-6" />
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-brand-700">
          <TrackedLink href="/methodology" event={analyticsEvents.methodologyOpened} properties={{ placement: "calculator_intro" }} className="rounded-md px-1 py-1 underline underline-offset-4">Methodology</TrackedLink>
          <a href="/disclaimer" className="rounded-md px-1 py-1 underline underline-offset-4">Full disclaimer</a>
        </div>
      </div>
      <Card className="mb-8 p-5">
        <h2 className="text-xl font-bold text-ink-950">Built to help you compare, not pressure you</h2>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-ink-700 sm:grid-cols-2">
          <p>No account required, no hidden vendor rankings, and no dealer or repair-shop recommendation bias in this MVP.</p>
          <p>Your inputs stay in your browser. The estimate depends on what you enter, and safety concerns should be reviewed by qualified professionals.</p>
        </div>
        <div className="mt-4">
          <TrackedLink href="/methodology" event={analyticsEvents.methodologyOpened} properties={{ placement: "calculator_trust" }} className="inline-flex min-h-11 items-center justify-center rounded-md border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-brand-50">Read the methodology</TrackedLink>
        </div>
      </Card>
      <div className="mb-8">
        <TrustPreview />
      </div>
      <Suspense fallback={<Card className="p-7"><p className="font-semibold text-ink-800">Loading calculator…</p></Card>}>
        <CalculatorForm />
      </Suspense>
    </main>
  );
}
import { Suspense } from "react";
