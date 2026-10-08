import Link from "next/link";
import { ChecklistSignup } from "@/components/ChecklistSignup";
import { GuideCtaLink } from "@/components/GuideCtaLink";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FAQ } from "@/components/ui/FAQ";
import { getGuide } from "@/data/guides";
import { formatPublishedDate, guideStructuredData } from "@/lib/seo";

export function GuidePage({ slug }: { slug: string }) {
  const guide = getGuide(slug);
  if (!guide) return null;

  const jsonLd = guideStructuredData(guide);
  const publishedLabel = formatPublishedDate(guide.publishedDate);
  const reviewedLabel = formatPublishedDate(guide.lastReviewedDate);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="mb-5 text-sm font-semibold text-ink-600">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link href="/" className="inline-flex min-h-11 items-center rounded-md text-brand-700 underline underline-offset-4 hover:text-brand-800">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-ink-400">/</li>
          <li>
            <Link href="/guides" className="inline-flex min-h-11 items-center rounded-md text-brand-700 underline underline-offset-4 hover:text-brand-800">
              Guides
            </Link>
          </li>
          <li aria-hidden="true" className="text-ink-400">/</li>
          <li aria-current="page" className="py-3 text-ink-700">{guide.title}</li>
        </ol>
      </nav>
      <article className="text-ink-800">
        <h1 className="text-4xl font-bold text-ink-950 md:text-5xl">{guide.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-600">
          <Link href="/about" rel="author" className="inline-flex min-h-11 items-center rounded-md font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800">
            By Car Second Opinion
          </Link>
          <span>
            Published: <time dateTime={guide.publishedDate}>{publishedLabel}</time>
          </span>
          <span>
            Last reviewed: <time dateTime={guide.lastReviewedDate}>{reviewedLabel}</time>
          </span>
        </div>
        <p className="mt-5 text-xl leading-8 text-ink-700">{guide.directAnswer}</p>
        <div className="mt-6 space-y-4 leading-7 text-ink-700">
          {guide.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-ink-600">
          Want to compare your own numbers? Use the Car Second Opinion calculator to compare repairing your current car
          with replacing it used or new.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <GuideCtaLink guideSlug={guide.slug} placement="top" />
          <Button href="/methodology" variant="secondary">Read the Methodology</Button>
        </div>

        <section className="mt-10 rounded-lg border border-brand-100 bg-brand-50 p-5">
          <h2 className="text-2xl font-bold text-ink-950">Short answer</h2>
          <p className="mt-3 leading-7 text-ink-700">{guide.summary}</p>
        </section>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section>
            <h2 className="text-2xl font-bold text-ink-950">
              {guide.sectionLabels?.repairMakesSense ?? "When repairing may make sense"}
            </h2>
            <ul className="mt-4 space-y-3 leading-7 text-ink-700">
              {guide.repairMakesSense.map((factor) => <li key={factor}>{factor}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">
              {guide.sectionLabels?.replaceMakesSense ?? "When replacing may make sense"}
            </h2>
            <ul className="mt-4 space-y-3 leading-7 text-ink-700">
              {guide.replaceMakesSense.map((factor) => <li key={factor}>{factor}</li>)}
            </ul>
          </section>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section>
            <h2 className="text-2xl font-bold text-ink-950">
              {guide.sectionLabels?.numbersToCompare ?? "Numbers to compare"}
            </h2>
            <ul className="mt-4 space-y-3 leading-7 text-ink-700">
              {guide.numbersToCompare.map((factor) => <li key={factor}>{factor}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">
              {guide.sectionLabels?.safetyFactors ?? "Safety and reliability factors"}
            </h2>
            <ul className="mt-4 space-y-3 leading-7 text-ink-700">
              {guide.safetyFactors.map((factor) => <li key={factor}>{factor}</li>)}
            </ul>
          </section>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink-950">
            {guide.sectionLabels?.example ?? "Practical example"}
          </h2>
          <Card className="mt-4 p-6">
            {guide.example.map((paragraph) => (
              <p key={paragraph} className="mt-3 first:mt-0 leading-7 text-ink-700">{paragraph}</p>
            ))}
          </Card>
        </section>

        <section className="mt-10 rounded-lg border border-brand-100 bg-brand-50 p-5">
          <h2 className="text-2xl font-bold text-ink-950">
            {guide.sectionLabels?.nextSteps ?? "What to do next"}
          </h2>
          <p className="mt-3 leading-7 text-ink-700">
            {guide.nextStepIntro ??
              "If you have a repair quote in hand, the next step is to compare it against the real cost of replacing the car. The calculator can help you organize the numbers before you decide."}
          </p>
          <ul className="mt-4 space-y-3 leading-7 text-ink-700">
            {guide.nextSteps.map((step) => <li key={step}>{step}</li>)}
          </ul>
          <div className="mt-5">
            <GuideCtaLink guideSlug={guide.slug} placement="body" />
          </div>
        </section>

        <div className="mt-10">
          <ChecklistSignup placement="guide" />
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink-950">FAQ</h2>
          <div className="mt-4">
            <FAQ items={guide.faqs} />
          </div>
        </section>

        {guide.sources?.length ? (
          <section className="mt-10" aria-labelledby="guide-sources-heading">
            <h2 id="guide-sources-heading" className="text-2xl font-bold text-ink-950">Sources and official tools</h2>
            <p className="mt-3 max-w-3xl leading-7 text-ink-700">
              These sources support the consumer-process information in this guide. They cannot diagnose your vehicle
              or determine whether a specific repair is covered.
            </p>
            <ul className="mt-4 space-y-4 leading-7 text-ink-700">
              {guide.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
                  >
                    {source.label}
                  </a>
                  <span className="block text-sm leading-6 text-ink-600">{source.note}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink-950">Related guides</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {guide.related.map((relatedSlug) => {
              const related = getGuide(relatedSlug);
              return related ? (
                <Link key={related.slug} href={`/guides/${related.slug}`} className="rounded-lg border border-line bg-white p-4 transition-colors hover:bg-brand-50">
                  <span className="block font-semibold text-ink-950">{related.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-ink-700">{related.description}</span>
                </Link>
              ) : null;
            })}
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-line bg-wash p-5">
          <h2 className="text-2xl font-bold text-ink-950">About Car Second Opinion</h2>
          <p className="mt-3 leading-7 text-ink-700">
            Car Second Opinion helps drivers compare the estimated cost of repairing their current vehicle versus
            replacing it used or new. The calculator uses the numbers you enter, including repair quote, vehicle value,
            loan balance, and replacement assumptions. It does not diagnose mechanical problems or look up exact market
            prices. The goal is to help you organize the decision before you talk with a mechanic, lender, dealer,
            buyer, or other professional.
          </p>
          <p className="mt-3">
            <Link href="/about" className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800">
              Read how Car Second Opinion creates and updates its guidance
            </Link>
            .
          </p>
        </section>

        <section className="mt-10 rounded-lg border border-line bg-white p-5 text-sm leading-6 text-ink-700">
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
