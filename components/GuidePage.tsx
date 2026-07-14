import Link from "next/link";
import { GuideCtaLink } from "@/components/GuideCtaLink";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FAQ } from "@/components/ui/FAQ";
import { siteConfig } from "@/lib/site";
import { getGuide } from "@/data/guides";

export function GuidePage({ slug }: { slug: string }) {
  const guide = getGuide(slug);
  if (!guide) return null;

  const canonicalUrl = `${siteConfig.url}/guides/${guide.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      datePublished: guide.publishedDate,
      dateModified: guide.lastReviewedDate,
      author: { "@type": "Organization", name: "Car Second Opinion" },
      publisher: { "@type": "Organization", name: "Car Second Opinion" },
      mainEntityOfPage: canonicalUrl
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
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-ink-600">
          <span>By Car Second Opinion</span>
          <span aria-hidden="true">|</span>
          <span>
            Last reviewed: <time dateTime={guide.lastReviewedDate}>July 14, 2026</time>
          </span>
        </div>
        <p className="mt-5 text-xl leading-8 text-ink-700">{guide.directAnswer}</p>
        <div className="mt-6 space-y-4 leading-7 text-ink-700">
          {guide.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <GuideCtaLink guideSlug={guide.slug} placement="top" />
          <Button href="/methodology" variant="secondary">Read the Methodology</Button>
        </div>
        <p className="mt-4 text-sm leading-6 text-ink-600">
          Want to compare your own numbers? Use the Car Second Opinion calculator to compare repairing your current car
          with replacing it used or new.
        </p>

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
          <h2 className="text-2xl font-bold text-ink-950">What to do next</h2>
          <p className="mt-3 leading-7 text-ink-700">
            If you have a repair quote in hand, the next step is to compare it against the real cost of replacing the
            car. The calculator can help you organize the numbers before you decide.
          </p>
          <ul className="mt-4 space-y-3 leading-7 text-ink-700">
            {guide.nextSteps.map((step) => <li key={step}>{step}</li>)}
          </ul>
          <div className="mt-5">
            <GuideCtaLink guideSlug={guide.slug} placement="body" />
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

        <section className="mt-10 rounded-lg border border-line bg-white p-5">
          <h2 className="text-2xl font-bold text-ink-950">About Car Second Opinion</h2>
          <p className="mt-3 leading-7 text-ink-700">
            Car Second Opinion helps drivers compare the estimated cost of repairing their current vehicle versus
            replacing it used or new. The calculator uses the numbers you enter, including repair quote, vehicle value,
            loan balance, and replacement assumptions. It does not diagnose mechanical problems or look up exact market
            prices. The goal is to help you organize the decision before you talk with a mechanic, lender, dealer,
            buyer, or other professional.
          </p>
        </section>

        <section className="mt-10 rounded-lg border border-line bg-wash p-5 text-sm leading-6 text-ink-700">
          <h2 className="text-base font-bold text-ink-950">Disclaimer</h2>
          <p className="mt-2">
            This guide is for educational purposes only and is based on general decision factors. It is not mechanical,
            safety, legal, financial, insurance, or purchasing advice. Consider getting written repair estimates and
            consulting qualified professionals before making a major repair or replacement decision.
          </p>
          <p className="mt-3">
            Read more about <Link href="/methodology" className="font-semibold text-brand-700 hover:text-brand-800">how
            the calculator works</Link> and the <Link href="/disclaimer" className="font-semibold text-brand-700 hover:text-brand-800">educational
            disclaimer</Link>.
          </p>
        </section>
      </article>
    </main>
  );
}
