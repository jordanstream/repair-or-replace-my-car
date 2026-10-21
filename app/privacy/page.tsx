import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { affiliateOffersConfigured } from "@/lib/partner-offers";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Car Second Opinion handles calculator inputs, analytics, email, local storage, and third-party links.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <ContentPage
      title="Privacy Policy"
      lastUpdated="October 21, 2026"
      showBottomLinks
      intro="Car Second Opinion is designed as a lightweight educational tool. The calculator does not require an account and does not store your calculation on our servers."
    >
      <section>
        <h2 className="text-2xl font-bold text-ink-950">Information you enter into the calculator</h2>
        <p className="mt-3 leading-7">
          The calculator asks for information such as your repair quote, vehicle situation, estimated value, loan
          balance, and replacement assumptions. This information is used to create your repair-or-replace comparison.
          In this MVP, calculator inputs are stored in your browser local storage so the results page can display your
          estimate. They are not submitted to a server, saved to a database, or tied to an account.
        </p>
        <p className="mt-3 leading-7">
          You can clear saved calculator results by clearing your browser storage for this site or by using a private
          browsing session for calculations you do not want saved locally.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Information collected automatically</h2>
        <p className="mt-3 leading-7">
          Like most websites, hosting and infrastructure providers may process basic technical information needed to
          deliver the site, such as IP address, browser type, device information, requested pages, timestamps, and error
          logs. This information helps keep the site available, secure, and reliable.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Search measurement and optional analytics</h2>
        <p className="mt-3 leading-7">
          We use Google Search Console to understand how pages appear in Google Search, including search queries,
          impressions, clicks, indexing status, and crawl issues. Search Console is not used to track individual
          calculator inputs.
        </p>
        <p className="mt-3 leading-7">
          We currently use Google Analytics 4 (GA4) on the live website to understand site visits and how people use
          features such as the calculator. Analytics loads only when explicitly enabled in the site configuration.
          We do not currently use Vercel Speed Insights.
        </p>
        <p className="mt-3 leading-7">
          GA4 may process general usage information such as page URL, page title, referrer, approximate location,
          browser and device information, session information, cookies or similar identifiers, and interaction events.
          We send limited event details such as calculator step number or broad result category. Our analytics event
          design excludes repair amounts, vehicle make and model, ZIP code, free text, email address, and complete
          calculation payloads. Google processes the analytics information it receives under its own policies.
          Learn more about{" "}
          <a className="underline underline-offset-4" href="https://www.google.com/policies/privacy/partners/">how Google uses information from sites using its services</a>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Cookies and local storage</h2>
        <p className="mt-3 leading-7">
          The calculator uses browser local storage for the limited purpose of showing your results after you complete
          the calculator. GA4 may use analytics cookies or similar identifiers to measure site activity. You can
          manage or block cookies through your browser settings, or use the{" "}
          <a className="underline underline-offset-4" href="https://support.google.com/analytics/answer/181881">Google Analytics opt-out browser add-on</a>
          {" "}where supported. Blocking cookies or local storage may affect some site functionality.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Advertising and affiliate monetization</h2>
        <p className="mt-3 leading-7">
          {affiliateOffersConfigured()
            ? "Car Second Opinion may include a clearly disclosed optional affiliate link on a calculator result page. Clicking it opens a third-party website with its own privacy practices. We do not transmit your calculator entries to the partner through that link. We do not currently run display ads, paid rankings, sponsored directories, or ad networks."
            : "Car Second Opinion does not currently use display advertising, Google AdSense, affiliate links, paid rankings, sponsored placements, or vendor directories. We will update this policy before enabling advertising networks or monetized affiliate relationships."}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Contact information and checklist downloads</h2>
        <p className="mt-3 leading-7">
          When you request the free checklist, we collect the first name and email address you enter, the date and time,
          and whether you separately consented to receive occasional tips. Successful requests are stored in a private
          Google Sheets spreadsheet administered by Car Second Opinion. The download link appears after the request is saved.
          Google processes this information as our storage provider.
        </p>
        <p className="mt-3 leading-7">
          Marketing emails are optional and require you to select the separate, unchecked consent checkbox. Providing
          an email address to request the checklist does not, by itself, authorize marketing emails. We do not currently
          send a marketing series from this signup. Email addresses supplied through the form are not independently verified.
          We keep these signup records while they are needed to manage requested downloads or consent, and will review
          records for deletion periodically; you can request access or deletion at{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
        <p className="mt-3 leading-7">
          The signup form uses Cloudflare Turnstile to help prevent automated abuse. Cloudflare may process technical
          information required for bot detection under its own privacy terms. We verify the challenge on the server
          before saving a form submission.
        </p>
        <p className="mt-3 leading-7">
          If you email us at{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>, we receive the email address
          and content you choose to send. Do not email sensitive financial, medical, vehicle-identifying, or other
          confidential information. The &quot;Email My Results&quot; feature creates a draft in your own email app; we do
          not receive that draft unless you send it to us.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Third-party links</h2>
        <p className="mt-3 leading-7">
          The site may link to third-party search results or websites, including search engines, repair-related searches,
          vehicle-shopping resources, and informational pages. Those sites have their own privacy practices. We are not
          responsible for how third-party websites collect, use, or share information.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Children&apos;s privacy</h2>
        <p className="mt-3 leading-7">
          This site is intended for a general audience making vehicle repair or replacement decisions. It is not directed
          to children under 13, and we do not knowingly collect personal information from children.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Your choices</h2>
        <p className="mt-3 leading-7">
          You can avoid entering information into the calculator, clear local storage in your browser, use private
          browsing, disable or delete cookies where your browser allows it, or contact us with privacy questions.
          Because the MVP does not use accounts or a calculator database, we may not be able to identify calculator data
          that only exists in your browser.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Changes to this policy</h2>
        <p className="mt-3 leading-7">
          We may update this privacy policy as the site changes, including if we add analytics, email features, or other
          services. The current version will be posted on this page.
        </p>
      </section>
    </ContentPage>
  );
}
