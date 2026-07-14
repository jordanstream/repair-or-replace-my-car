import { CalculatorForm } from "@/components/CalculatorForm";
import { EstimateDisclaimer } from "@/components/EstimateDisclaimer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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
          This calculator uses your repair quote, vehicle situation, and replacement assumptions to compare estimated
          costs. It does not look up exact vehicle values or local repair prices.
        </p>
        <EstimateDisclaimer className="mt-6" />
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-brand-700">
          <a href="/methodology" className="rounded-md px-1 py-1 underline underline-offset-4">Methodology</a>
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
          <Button href="/methodology" variant="secondary">Read the Methodology</Button>
        </div>
      </Card>
      <CalculatorForm />
    </main>
  );
}
