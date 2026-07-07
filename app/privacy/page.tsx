import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "Privacy overview for Repair or Replace My Car.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <ContentPage title="Privacy" intro="The MVP calculator runs in your browser and does not require an account.">
      <p className="leading-7">Calculator inputs are stored only in your browser local storage so the results page can display your estimate. The MVP does not use authentication, a database, email collection, payment processing, or server-side calculator storage.</p>
      <p className="leading-7">Analytics may be added later using environment variables and clear disclosures. External links may take you to third-party sites with their own privacy practices.</p>
    </ContentPage>
  );
}
