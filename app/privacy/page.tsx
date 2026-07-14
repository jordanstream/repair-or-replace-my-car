import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Car Second Opinion handles calculator inputs, analytics, email, local storage, and third-party links.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <ContentPage
      title="Privacy Policy"
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
        <h2 className="text-2xl font-bold text-ink-950">Google Search Console and Google Analytics</h2>
        <p className="mt-3 leading-7">
          We use Google Search Console to understand how pages appear in Google Search, including search queries,
          impressions, clicks, indexing status, and crawl issues. Search Console is not used to track individual
          calculator inputs.
        </p>
        <p className="mt-3 leading-7">
          We use Google Analytics 4 through the Google tag to understand general site usage. Google Analytics may collect
          information such as page URL, page title, referrer, approximate location, device and browser information,
          session information, and interaction events. The site may send events such as calculator starts, calculator
          completions, result type, safety-warning results, outbound search link clicks, checklist downloads, checklist
          email request clicks, and email-results clicks.
        </p>
        <p className="mt-3 leading-7">
          Analytics events are used in aggregate to improve the site and understand whether the calculator is useful.
          We do not intentionally send your repair quote, vehicle identification number, contact details, or other
          sensitive personal details to Google Analytics. Google may process analytics information according to its own
          policies and controls.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Cookies and local storage</h2>
        <p className="mt-3 leading-7">
          The calculator uses browser local storage for the limited purpose of showing your results after you complete
          the calculator. Google Analytics may use cookies or similar technologies to measure visits and interactions.
          Your browser settings may let you block or delete cookies and local storage, though doing so may affect site
          functionality. Google also provides browser and account-level tools that may limit or opt out of some Google
          Analytics measurement.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Advertising and affiliate monetization</h2>
        <p className="mt-3 leading-7">
          Car Second Opinion does not currently use display advertising, Google AdSense, affiliate links, paid rankings,
          sponsored placements, or vendor directories. If third-party ads or ad networks are added later, those vendors
          may use cookies or similar technologies to serve, personalize, measure, or limit ads. We will update this
          policy and related disclosures before enabling ad networks or monetized affiliate relationships.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink-950">Email</h2>
        <p className="mt-3 leading-7">
          If you email us at{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>, we will receive your email
          address and any information you choose to include. We use that information to read and respond to your message.
          Do not send sensitive financial, insurance, legal, medical, or vehicle-identifying information unless you are
          comfortable sharing it by email.
        </p>
        <p className="mt-3 leading-7">
          Checklist request forms and the &quot;Email My Results&quot; action use your own email app. The checklist request may
          send your email address to us only if you choose to send the message. The results email is a draft for you to
          address and send yourself; Car Second Opinion does not receive that draft unless you choose to send it to us.
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
          browsing, disable or delete cookies where your browser allows it, use available Google privacy controls, or
          contact us with privacy questions. Because the MVP does not use accounts or a calculator database, we may not
          be able to identify calculator data that only exists in your browser.
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
