import Link from "next/link";
import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";
import { organizationStructuredData } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About and Editorial Process",
  description:
    "Learn who publishes Car Second Opinion, how its repair-or-replace guidance is created and updated, and where its calculator and content stop.",
  path: "/about"
});

export default function AboutPage() {
  const jsonLd = organizationStructuredData();

  return (
    <ContentPage
      title="About Car Second Opinion"
      intro="Car Second Opinion is an independent educational decision-support site for people comparing a major car repair with realistic replacement options."
      lastUpdated="July 25, 2026"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="rounded-lg border border-brand-100 bg-brand-50 p-5">
        <h2 className="text-2xl font-bold text-ink-950">What this site does</h2>
        <p className="mt-3 leading-7">
          The calculator organizes estimates you provide into three paths: repair and keep your current car, replace it
          with a used car, or replace it with a new car. The guides explain the evidence, costs, safety questions, and
          uncertainty that can affect the same decision.
        </p>
        <p className="mt-3 leading-7">
          Car Second Opinion does not inspect vehicles, diagnose mechanical problems, decide whether a vehicle is safe
          to drive, verify a repair quote, look up exact market prices, arrange financing, or tell you which option you
          must choose.
        </p>
      </section>

      <section id="editorial-process" className="scroll-mt-24">
        <h2 className="text-2xl font-bold text-ink-950">How guidance is created and updated</h2>
        <p className="mt-3 leading-7">
          Each guide follows the same repair-or-replace framework used across the site. It starts with a direct,
          qualified answer, then separates the reasons to consider repairing, reasons to consider replacing, numbers to
          compare, safety questions, a practical example, and next steps.
        </p>
        <p className="mt-3 leading-7">
          Content is reviewed for consistency with the published calculator methodology, the site&apos;s educational
          limits, and the questions a reader should verify with a qualified professional. A guide&apos;s review date is
          changed only when its decision guidance, factual content, examples, or structure receives a substantive
          review. Routine builds and formatting changes do not make a page newly reviewed.
        </p>
        <p className="mt-3 leading-7">
          When a factual statement depends on an outside source, the editorial standard is to use a directly relevant,
          authoritative source and connect it to the claim it supports. A source is not added merely to make a page look
          researched.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Publisher and bylines</h2>
        <p className="mt-3 leading-7">
          Car Second Opinion is the publisher named on the site&apos;s guides. Guide bylines link to this page so readers
          can see the publisher, editorial process, and limits behind the content.
        </p>
        <p className="mt-3 leading-7">
          The site does not claim that every guide was written or reviewed by a mechanic, financial professional, safety
          inspector, attorney, insurer, or lender. A page will name a reviewer and their role only if that review
          actually occurred and can be described accurately.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Geographic scope</h2>
        <p className="mt-3 leading-7">
          Car Second Opinion is initially designed for users in the {siteConfig.audienceRegion}. Its terminology,
          examples, and general assumptions may not reflect taxes, fees, financing practices, insurance markets, vehicle
          markets, or legal requirements in other countries.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">How the calculator reaches a result</h2>
        <p className="mt-3 leading-7">
          The calculator compares estimated cash paid over 12, 24, or 36 months using the values and assumptions you
          enter. It keeps cash flow, loan balance, ending value, and equity separate where the available inputs support
          them. It also identifies close comparisons, missing information, and reported safety concerns.
        </p>
        <p className="mt-3 leading-7">
          The complete calculation boundaries and assumptions are published on the{" "}
          <Link href="/methodology" className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800">
            Methodology page
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Editorial independence and monetization</h2>
        <p className="mt-3 leading-7">
          Calculator results are based on user-entered assumptions and the published calculation logic. They are not
          changed by paid rankings, sponsored placements, repair-shop relationships, dealer relationships,
          lender relationships, or affiliate commissions.
        </p>
        <p className="mt-3 leading-7">
          The site&apos;s current and future commercial policies are explained in the{" "}
          <Link href="/affiliate-disclosure" className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800">
            Affiliate Disclosure
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Limits, corrections, and questions</h2>
        <p className="mt-3 leading-7">
          The site provides educational estimates and general decision factors, not individualized mechanical, safety,
          legal, financial, insurance, or purchasing advice. Read the{" "}
          <Link href="/disclaimer" className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800">
            Disclaimer
          </Link>{" "}
          before relying on a comparison.
        </p>
        <p className="mt-3 leading-7">
          To ask a question or report a possible correction, email{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
          >
            {siteConfig.contactEmail}
          </a>
          . Please do not send sensitive financial, legal, insurance, medical, or vehicle-identifying information.
        </p>
      </section>
    </ContentPage>
  );
}
