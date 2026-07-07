import { CalculatorForm } from "@/components/CalculatorForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Repair or Replace Calculator",
  description: "Compare repair and replacement costs with a transparent, client-side calculator.",
  path: "/calculator"
});

export default function CalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Repair or Replace My Car Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-ink-950">Compare Your Options</h1>
        <p className="mt-4 text-lg leading-8 text-ink-700">
          Enter your repair quote and replacement assumptions. The calculator runs locally in your browser and does not
          store your information on a server.
        </p>
      </div>
      <CalculatorForm />
    </main>
  );
}
