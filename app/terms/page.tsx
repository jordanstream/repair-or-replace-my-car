import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms of use for Car Second Opinion, including calculator limitations and educational-use disclaimers.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <ContentPage
      title="Terms of Use"
      lastUpdated="July 15, 2026"
      showBottomLinks
      intro="Use Car Second Opinion as an educational decision-support tool, not as a substitute for professional advice."
    >
      <section>
        <h2 className="text-2xl font-bold text-ink-950">Acceptance of these terms</h2>
        <p className="mt-3 leading-7">
          By using this site, you agree to these terms. If you do not agree, do not use the site. These terms apply to
          the website, calculator, guides, results pages, and related content provided by Car Second Opinion.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Educational use only</h2>
        <p className="mt-3 leading-7">
          The site provides educational estimates based on the information you enter and simplified assumptions. It is
          not mechanical, safety, legal, financial, insurance, tax, lending, purchasing, or investment advice. The site
          does not inspect vehicles, diagnose mechanical issues, determine vehicle safety, arrange financing, sell cars,
          recommend specific vendors, or guarantee outcomes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Calculator limitations</h2>
        <p className="mt-3 leading-7">
          Calculator results depend on your inputs. The site does not know exact vehicle values, local repair labor
          rates, repair quality, taxes, fees, insurance premiums, financing terms, resale values, market inventory, or
          future repair needs. Results are estimates for comparison, not predictions. Before making a major decision,
          get written repair estimates, compare realistic replacement costs, and consult qualified professionals when
          safety or finances are involved.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Safety decisions</h2>
        <p className="mt-3 leading-7">
          This site cannot evaluate whether a vehicle is safe to drive. If you have possible brake, steering, airbag,
          structural, rust, flood, collision, electrical, drivetrain, or other safety-related concerns, have the vehicle
          inspected by a qualified professional before driving it or relying on a repair-or-replace comparison.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">No professional relationship</h2>
        <p className="mt-3 leading-7">
          Using the site or emailing us does not create a mechanic-client, advisor-client, attorney-client,
          lender-borrower, insurer-insured, dealer-customer, or fiduciary relationship. Any response to an email is
          general information unless a separate written agreement says otherwise.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Third-party links and search results</h2>
        <p className="mt-3 leading-7">
          The site may provide links to third-party websites or search results as optional starting points. We do not
          verify, rate, license, insure, endorse, or guarantee third-party businesses, listings, services, lenders,
          dealers, repair shops, insurers, marketplaces, or search results. You are responsible for evaluating any
          third-party service before relying on it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Analytics and site measurement</h2>
        <p className="mt-3 leading-7">
          We may use Google Search Console, Google Analytics 4, hosting logs, and similar tools to understand search
          visibility, page usage, calculator engagement, technical errors, and general site performance. Analytics data
          is not a professional review of your vehicle, repair quote, finances, insurance, or purchasing decision. More
          detail is provided in the privacy policy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Your responsibilities</h2>
        <p className="mt-3 leading-7">
          You are responsible for the accuracy of the information you enter, the assumptions you choose, and the repair,
          replacement, driving, purchasing, financing, and insurance decisions you make. Do not misuse the site, attempt
          to disrupt it, reverse engineer it, or use it for unlawful activity.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Availability and changes</h2>
        <p className="mt-3 leading-7">
          We may change, suspend, or discontinue any part of the site at any time. We may update calculator assumptions,
          copy, pages, disclaimers, analytics, or these terms as the MVP evolves.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">No warranties</h2>
        <p className="mt-3 leading-7">
          The site is provided as is and as available. We do not warrant that the site will be uninterrupted,
          error-free, complete, accurate, secure, or suitable for your particular decision.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Limitation of liability</h2>
        <p className="mt-3 leading-7">
          To the fullest extent allowed by law, Car Second Opinion and its operators are not liable for losses or damages
          arising from your use of the site, reliance on estimates, third-party links, vehicle decisions, repair
          decisions, safety decisions, purchasing decisions, financing decisions, or site unavailability.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Contact</h2>
        <p className="mt-3 leading-7">
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      </section>
    </ContentPage>
  );
}
