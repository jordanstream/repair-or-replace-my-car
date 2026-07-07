import { ContentPage } from "@/components/ContentPage";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "How It Works",
  description: "Learn how the repair or replace calculator compares your car ownership options.",
  path: "/how-it-works"
});

export default function HowItWorksPage() {
  return (
    <ContentPage title="How It Works" intro="The calculator compares the repair path with used and new replacement paths over a period you choose.">
      <section>
        <h2 className="text-2xl font-bold text-ink-950">1. Enter your current vehicle and repair situation</h2>
        <p className="mt-3 leading-7">You provide your current value estimate, loan balance, mileage, repair quote, expected additional repairs, and safety uncertainty.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-ink-950">2. Add replacement assumptions</h2>
        <p className="mt-3 leading-7">You estimate purchase price, down payment, APR, loan term, taxes, fees, and monthly ownership changes. No external vehicle-value or dealer data is used.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-ink-950">3. Review the drivers</h2>
        <p className="mt-3 leading-7">The result shows total cost, confidence, the biggest factors, what could change the result, and safety reminders when relevant.</p>
      </section>
      <Button href="/calculator">Start the Calculator</Button>
    </ContentPage>
  );
}
