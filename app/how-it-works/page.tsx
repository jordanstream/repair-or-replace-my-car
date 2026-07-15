import { ContentPage } from "@/components/ContentPage";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "How It Works",
  description: "Learn how the repair or replace calculator compares your car ownership options.",
  path: "/how-it-works"
});

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Enter your current vehicle and repair situation",
      copy: "You provide your current value estimate, loan balance, mileage, repair quote, expected additional repairs, and safety uncertainty."
    },
    {
      title: "Add replacement assumptions",
      copy: "You estimate purchase price, down payment, APR, loan term, taxes, fees, and monthly ownership changes. No external vehicle-value or dealer data is used."
    },
    {
      title: "Review the drivers",
      copy: "The result shows total cost, confidence, the biggest factors, what could change the result, and safety reminders when relevant."
    }
  ];

  return (
    <ContentPage title="How It Works" intro="The calculator compares the repair path with used and new replacement paths over a period you choose.">
      <section className="grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.title} className="rounded-lg border border-line bg-white p-5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 font-bold text-brand-700">
              {index + 1}
            </span>
            <h2 className="mt-4 text-xl font-bold text-ink-950">{step.title}</h2>
            <p className="mt-3 leading-7">{step.copy}</p>
          </div>
        ))}
      </section>
      <section className="rounded-lg border border-line bg-wash p-5">
        <h2 className="text-2xl font-bold text-ink-950">What you&apos;ll need before starting</h2>
        <ul className="mt-4 space-y-2 leading-7">
          <li>Your written repair quote or best estimate.</li>
          <li>Your current vehicle value estimate and any remaining loan balance.</li>
          <li>Realistic replacement purchase, financing, tax, fee, insurance, and maintenance assumptions.</li>
        </ul>
      </section>
      <Button href="/calculator">Compare My Options</Button>
    </ContentPage>
  );
}
