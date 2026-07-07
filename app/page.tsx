import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { guides } from "@/data/guides";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Should You Repair or Replace Your Car?",
  description: "Compare the likely cost of fixing your current vehicle versus replacing it.",
  path: "/"
});

const problems = [
  {
    title: "Large Repair Bill",
    copy: "Your mechanic gave you an expensive estimate. You want to know whether putting more money into your current car makes sense."
  },
  {
    title: "Uncertain Reliability",
    copy: "Even after the repair, you may be worried about future breakdowns, mileage, and other upcoming costs."
  },
  {
    title: "Replacement Costs",
    copy: "Buying another car can mean down payments, monthly loans, insurance increases, taxes, fees, and depreciation."
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:px-8 lg:py-20">
        <div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-ink-950 md:text-6xl">
            Should You Repair or Replace Your Car?
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-ink-700">
            Compare the likely cost of fixing your current vehicle versus replacing it, so you can make a more informed
            next decision.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/calculator">Start the Calculator</Button>
            <Button href="/how-it-works" variant="secondary">How the comparison works</Button>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-ink-600">
            Free decision-support tool. No account required. Estimates are not mechanical, safety, legal, or financial advice.
          </p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <div className="grid gap-4">
            {["Repair and keep", "Replace with used", "Replace with new"].map((label, index) => (
              <div key={label} className="rounded-md border border-line p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink-950">{label}</span>
                  <span className="tabular text-sm font-semibold text-brand-700">{index === 0 ? "$" : "$$$"}</span>
                </div>
                <div className="mt-4 h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-brand-600" style={{ width: `${52 + index * 16}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {problems.map((problem) => (
              <Card key={problem.title} className="hover-lift p-6">
                <h2 className="text-xl font-bold text-ink-950">{problem.title}</h2>
                <p className="mt-3 leading-7 text-ink-700">{problem.copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader title="How It Works" intro="A short, practical comparison built around the costs you can estimate today." />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {["Enter your car and repair situation", "Compare likely costs over time", "Review practical next steps"].map((step, index) => (
            <Card key={step} className="p-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 font-bold text-brand-700">{index + 1}</span>
              <h3 className="mt-4 text-lg font-bold text-ink-950">{step}</h3>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-wash py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <SectionHeader title="Calculator Preview" intro="See repair costs, used replacement, and new replacement in one clean comparison." />
            <div className="grid gap-4 md:grid-cols-3">
              {["Repair and Keep", "Replace with Used", "Replace with New"].map((option) => (
                <Card key={option} className="p-5">
                  <h3 className="font-bold text-ink-950">{option}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-700">Total cost, monthly equivalent, and the assumptions behind the estimate.</p>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <Button href="/calculator">Compare My Options</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader title="Guides" intro="Balanced explainers for the repair decisions people search for most often." />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {guides.slice(0, 6).map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="rounded-lg border border-line bg-white p-5 shadow-sm hover:bg-brand-50">
              <h3 className="font-bold text-ink-950">{guide.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-700">{guide.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
