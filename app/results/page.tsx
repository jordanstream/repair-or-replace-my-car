import { ResultsClient } from "@/components/ResultsClient";
import { pageMetadata } from "@/lib/metadata";

export const metadata = {
  ...pageMetadata({
  title: "Your Repair or Replace Results",
  description: "Review your estimated repair and replacement cost comparison.",
  path: "/results"
  }),
  robots: {
    index: false,
    follow: false
  }
};

export default function ResultsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Repair or Replace My Car Results",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any"
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ResultsClient />
    </main>
  );
}
