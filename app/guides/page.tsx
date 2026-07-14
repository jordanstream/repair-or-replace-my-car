import Link from "next/link";
import { GuideCtaLink } from "@/components/GuideCtaLink";
import { guideCategories, guides } from "@/data/guides";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Car Repair Decision Guides",
  description:
    "Decision guides for comparing major car repairs, replacement costs, reliability concerns, safety issues, and next steps before you decide.",
  path: "/guides"
});

export default function GuidesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-ink-950">Car Repair Decision Guides</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-700">
        Major car repairs can be stressful, especially when the repair quote is large enough to make you wonder whether
        keeping the car still makes sense. These guides help you compare repair costs, replacement costs, reliability
        concerns, safety issues, and next steps before you decide.
      </p>
      <p className="mt-4 max-w-3xl leading-7 text-ink-700">
        Use the calculator to compare the cost of repairing your current vehicle versus replacing it over 12, 24, or 36
        months.
      </p>
      <div className="mt-7">
        <GuideCtaLink guideSlug="guides-index" placement="index" />
      </div>

      <div className="mt-10 space-y-10">
        {guideCategories.map((category) => {
          const categoryGuides = guides.filter((guide) => guide.category === category);
          return (
            <section key={category}>
              <h2 className="text-2xl font-bold text-ink-950">{category}</h2>
              <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {categoryGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="rounded-lg border border-line bg-white p-6 shadow-sm transition-colors hover:bg-brand-50"
                  >
                    <h3 className="text-xl font-bold text-ink-950">{guide.title}</h3>
                    <p className="mt-3 leading-7 text-ink-700">{guide.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-12 rounded-lg border border-line bg-wash p-5">
        <h2 className="text-xl font-bold text-ink-950">Built to help you compare, not pressure you</h2>
        <p className="mt-3 leading-7 text-ink-700">
          Car Second Opinion does not diagnose car problems, sell repairs, rank shops, or recommend dealers. The guides
          and calculator are educational tools based on general decision factors and the numbers you enter.
        </p>
        <p className="mt-3 text-sm leading-6 text-ink-700">
          For major repair, safety, legal, insurance, financing, or purchasing decisions, consider written estimates and
          qualified professional advice.
        </p>
      </section>
    </main>
  );
}
