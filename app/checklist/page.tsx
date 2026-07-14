import { ChecklistSignup } from "@/components/ChecklistSignup";
import { ChecklistDownloadLink } from "@/components/ChecklistDownloadLink";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Major Car Repair Decision Checklist",
  description:
    "Download a plain-language checklist for comparing a major car repair quote with repair, replace, sell, or trade-in options.",
  path: "/checklist"
});

const sections = [
  {
    title: "Questions to ask the mechanic",
    items: [
      "What problem did you find, and how did you confirm it?",
      "Is the vehicle safe to drive right now?",
      "What does this repair fix, and what does it not fix?",
      "What parts and labor warranty applies?"
    ]
  },
  {
    title: "Numbers to compare",
    items: [
      "Written repair quote, taxes, fees, and diagnostic charges.",
      "Expected repairs in the next 12 months.",
      "Vehicle value, loan balance, and negative equity.",
      "Replacement price, down payment, APR, insurance, fuel, taxes, and fees."
    ]
  },
  {
    title: "Warning signs before approving repair",
    items: [
      "The diagnosis is unclear or not written down.",
      "The repair has little or no warranty.",
      "The car has safety, rust, structural, brake, steering, airbag, or flood concerns.",
      "The repair only fixes one part of a larger reliability problem."
    ]
  },
  {
    title: "When replacing may make sense",
    items: [
      "The vehicle is unsafe or unreliable.",
      "Several major repairs are likely soon.",
      "A realistic replacement would reduce downtime and uncertainty.",
      "The repaired car still would not meet your household needs."
    ]
  }
];

export default function ChecklistPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-ink-950">Major Car Repair Decision Checklist</h1>
        <p className="mt-4 text-lg leading-8 text-ink-700">
          Use this checklist before approving a major repair, replacing your car, selling it as-is, or trading it in.
          It gives you a calm place to organize mechanic questions, repair costs, replacement assumptions, and warning
          signs.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ChecklistDownloadLink placement="checklist" />
          <Button href="/calculator" variant="secondary">Compare My Options</Button>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.title} className="p-5">
            <h2 className="text-xl font-bold text-ink-950">{section.title}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-700">
              {section.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <ChecklistSignup placement="checklist" />
      </div>

      <p className="mt-8 rounded-lg border border-line bg-wash p-5 text-sm leading-6 text-ink-700">
        Educational note: this checklist does not diagnose mechanical problems and is not safety, legal, financial,
        insurance, or purchasing advice. Ask qualified professionals before making a major repair, purchase, or safety
        decision.
      </p>
    </main>
  );
}
