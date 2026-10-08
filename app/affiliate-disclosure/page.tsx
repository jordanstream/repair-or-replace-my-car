import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { affiliateOffersConfigured } from "@/lib/partner-offers";

export const metadata = pageMetadata({
  title: "Affiliate Disclosure",
  description: "Affiliate, advertising, and monetization disclosure for Car Second Opinion.",
  path: "/affiliate-disclosure"
});

export default function AffiliateDisclosurePage() {
  const affiliateActive = affiliateOffersConfigured();
  return (
    <ContentPage
      title="Affiliate Disclosure"
      lastUpdated={affiliateActive ? "October 7, 2026" : "July 15, 2026"}
      showBottomLinks
      intro={affiliateActive ? "Some optional result-page links are affiliate links. They are clearly labeled, and commissions do not influence the calculator result." : "Car Second Opinion does not currently use affiliate links, paid rankings, sponsored placements, or display advertising."}
    >
      <section>
        <h2 className="text-2xl font-bold text-ink-950">Current status</h2>
        <p className="mt-3 leading-7">
          {affiliateActive
            ? "The calculator remains free. We may receive a commission from a clearly labeled optional partner link on a result page. Other repair and replacement search links are not paid placements."
            : "This MVP is currently a free educational tool. We do not currently receive compensation when you click a link, use the calculator, search for repair options, shop for a vehicle, or visit a third-party website from this site."}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Future monetization</h2>
        <p className="mt-3 leading-7">
          We may consider additional monetization later, but there are no paid rankings, sponsored listings, ad networks,
          or vendor directories in this MVP. If that changes, we will update the relevant disclosures before enabling it.
          A compensated link is clearly identified so you can make an informed choice.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Editorial independence</h2>
        <p className="mt-3 leading-7">
          Calculator results are based on the assumptions you enter and the calculator logic described in the
          methodology. Results are not adjusted because of advertising, affiliate commissions, repair-shop
          relationships, dealer relationships, lender relationships, or vendor rankings.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Advertising and privacy</h2>
        <p className="mt-3 leading-7">
          If third-party ads or ad networks such as Google AdSense are added later, those services may use cookies or
          similar technologies to serve, personalize, measure, or limit ads. The privacy policy will be updated with any
          required disclosures before ads are enabled.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Questions</h2>
        <p className="mt-3 leading-7">
          Questions about monetization or disclosures can be sent to{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      </section>
    </ContentPage>
  );
}
