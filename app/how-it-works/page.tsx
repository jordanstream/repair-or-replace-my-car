import { ContentPage } from "@/components/ContentPage";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "How It Works",
  description: "Learn how the guided repair-or-replace comparison works and what you need before starting.",
  path: "/how-it-works"
});

const steps = [
  {
    title: "Describe your current situation",
    copy: "Add the vehicle, loan, safety, and household context you know. For current value, enter a ballpark, choose a broad range, or say you do not know."
  },
  {
    title: "Add the repair evidence",
    copy: "Enter the estimate you received and note whether it is itemized, supported by testing, or confirmed by another qualified shop."
  },
  {
    title: "Build realistic replacement paths",
    copy: "Enter used and new purchase prices, financing, fees, and monthly ownership changes. The result keeps all three paths visible."
  },
  {
    title: "Review, compare, and choose a next step",
    copy: "Check the high-impact assumptions, then see estimated cash paid, result stability, what could change the comparison, and what to verify next."
  }
];

export default function HowItWorksPage() {
  return (
    <ContentPage title="How it works" intro="A guided comparison that helps you organize what you know, see what remains uncertain, and identify the next useful action.">
      <section className="motion-list divide-y divide-line border-y border-line" data-reveal="up">
        {steps.map((step, index) => (
          <div key={step.title} className="motion-list-item grid gap-3 py-6 sm:grid-cols-[3rem_1fr]">
            <span className="tabular text-lg font-bold text-brand-700">{String(index + 1).padStart(2, "0")}</span>
            <div><h2 className="text-xl font-bold text-ink-950">{step.title}</h2><p className="mt-2 leading-7">{step.copy}</p></div>
          </div>
        ))}
      </section>
      <section className="rounded-2xl border border-line bg-white p-6" data-reveal="soft">
        <h2 className="text-2xl font-bold text-ink-950">What you’ll need before starting</h2>
        <ul className="mt-4 space-y-2 leading-7">
          <li>Your written repair quote or best estimate.</li>
          <li>A ballpark current value if you have one; you can continue without leaving the product to look it up.</li>
          <li>Your loan payoff, monthly payment, and payments remaining when applicable.</li>
          <li>Realistic used and new replacement prices, financing, taxes, fees, insurance, and maintenance assumptions.</li>
        </ul>
      </section>
      <Button href="/calculator">Compare the three paths</Button>
    </ContentPage>
  );
}
