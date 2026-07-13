import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FAQ } from "@/components/ui/FAQ";
import { getGuide } from "@/data/guides";

export function GuidePage({ slug }: { slug: string }) {
  const guide = getGuide(slug);
  if (!guide) return null;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer }
      }))
    }
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="text-ink-800">
        <h1 className="text-4xl font-bold text-ink-950 md:text-5xl">{guide.title}</h1>
        <p className="mt-5 text-xl leading-8 text-ink-700">{guide.directAnswer}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/calculator">Compare My Options</Button>
          <Button href="/methodology" variant="secondary">Read the Methodology</Button>
        </div>

        <section className="mt-10 rounded-lg border border-line bg-wash p-5">
          <h2 className="text-2xl font-bold text-ink-950">Short answer</h2>
          <p className="mt-3 leading-7 text-ink-700">{guide.summary}</p>
        </section>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section>
            <h2 className="text-2xl font-bold text-ink-950">When repairing may make sense</h2>
            <ul className="mt-4 space-y-3 leading-7 text-ink-700">
              {guide.repairMakesSense.map((factor) => <li key={factor}>{factor}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">When replacing may make sense</h2>
            <ul className="mt-4 space-y-3 leading-7 text-ink-700">
              {guide.replaceMakesSense.map((factor) => <li key={factor}>{factor}</li>)}
            </ul>
          </section>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section>
            <h2 className="text-2xl font-bold text-ink-950">Numbers to compare</h2>
            <ul className="mt-4 space-y-3 leading-7 text-ink-700">
              {guide.numbersToCompare.map((factor) => <li key={factor}>{factor}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Safety and reliability factors</h2>
            <ul className="mt-4 space-y-3 leading-7 text-ink-700">
              {guide.safetyFactors.map((factor) => <li key={factor}>{factor}</li>)}
            </ul>
          </section>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink-950">Practical example</h2>
          <Card className="mt-4 p-6">
            {guide.example.map((paragraph) => (
              <p key={paragraph} className="mt-3 first:mt-0 leading-7 text-ink-700">{paragraph}</p>
            ))}
          </Card>
        </section>

        <section className="mt-10 rounded-lg border border-brand-100 bg-brand-50 p-5">
          <h2 className="text-2xl font-bold text-ink-950">Compare your own numbers</h2>
          <p className="mt-3 leading-7 text-ink-700">
            A rule of thumb can help you slow down, but your repair quote, replacement budget, loan situation, and
            expected ownership costs are what make the decision personal.
          </p>
          <div className="mt-5">
            <Button href="/calculator">Compare My Options</Button>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink-950">FAQ</h2>
          <div className="mt-4">
            <FAQ items={guide.faqs} />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink-950">Related guides</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {guide.related.map((relatedSlug) => {
              const related = getGuide(relatedSlug);
              return related ? (
                <Link key={related.slug} href={`/guides/${related.slug}`} className="rounded-md border border-line bg-white p-4 font-semibold text-ink-800 hover:bg-brand-50">
                  {related.title}
                </Link>
              ) : null;
            })}
          </div>
        </section>

        <p className="mt-10 rounded-lg border border-line bg-wash p-5 text-sm leading-6 text-ink-700">
          Plain-language disclaimer: this guide is educational only and is based on general decision factors. Repair or
          Replace My Car is not a mechanic, lender, insurer, dealer, or financial advisor. Get written repair estimates,
          compare realistic replacement costs, and ask qualified professionals about safety or major financial decisions.
        </p>
      </article>
    </main>
  );
}
