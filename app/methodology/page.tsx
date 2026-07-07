import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Methodology",
  description: "Understand what the repair or replace calculator includes, excludes, and assumes.",
  path: "/methodology"
});

export default function MethodologyPage() {
  return (
    <ContentPage title="Methodology" intro="The calculator is designed to make user-entered assumptions easier to compare, not to predict exact outcomes.">
      <section>
        <h2 className="text-2xl font-bold text-ink-950">What the calculator includes</h2>
        <p className="mt-3 leading-7">Repair quote, expected additional repairs, remaining loan exposure, a current ownership reserve, replacement financing, taxes and fees, monthly ownership differences, current equity or negative equity, and a simple replacement depreciation reserve.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-ink-950">What it does not include</h2>
        <p className="mt-3 leading-7">The tool does not inspect mechanical condition, determine safety, provide exact vehicle values, quote insurance, quote financing, calculate local taxes precisely, or guarantee resale outcomes.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-ink-950">Uncertainty</h2>
        <p className="mt-3 leading-7">Results depend on user-entered information. Future repair needs, vehicle values, insurance, financing, fuel costs, registration, taxes, fees, and resale outcomes vary by person and location.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-ink-950">Future integrations</h2>
        <p className="mt-3 leading-7">Affiliate relationships, analytics, email capture, market-value APIs, and vendor matching may be added later. Any affiliate relationship should be clearly disclosed before launch.</p>
      </section>
    </ContentPage>
  );
}
