import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms",
  description: "Terms overview for Repair or Replace My Car.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <ContentPage title="Terms" intro="Use this site as a decision-support tool, not as a substitute for professional advice.">
      <p className="leading-7">By using this MVP, you understand that estimates are based on information you enter and simplified assumptions. Repair or Replace My Car does not sell vehicles, arrange financing, inspect cars, recommend specific vendors, or guarantee outcomes.</p>
      <p className="leading-7">Third-party search links are provided only as optional starting points. We do not verify, rate, license, insure, or guarantee third-party businesses or services.</p>
    </ContentPage>
  );
}
