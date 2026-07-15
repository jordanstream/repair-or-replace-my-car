import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description: "Important limitations for Car Second Opinion.",
  path: "/disclaimer"
});

export default function DisclaimerPage() {
  return (
    <ContentPage
      title="Disclaimer"
      lastUpdated="July 15, 2026"
      showBottomLinks
      intro="Car Second Opinion is for educational and informational use only."
    >
      <p className="leading-7">This tool provides educational estimates based on the information you enter. It is not mechanical, safety, legal, financial, insurance, or purchasing advice. Vehicle condition, repair quality, market prices, taxes, fees, financing, insurance, and future repairs can vary.</p>
      <p className="leading-7">This site does not know exact vehicle values, local labor rates, local taxes, insurance premiums, repair quality, lender terms, or future repair needs. It does not guarantee that repair estimates, vehicle values, financing assumptions, ownership costs, or outcomes are accurate.</p>
      <p className="leading-7">Users should obtain written repair estimates, compare realistic replacement costs, ask qualified mechanics about diagnosis and safety, and consult relevant licensed professionals when decisions involve financial, insurance, legal, or safety issues.</p>
      <p className="leading-7">This tool cannot evaluate whether a vehicle is safe to drive. If you reported possible safety, structural, brake, steering, airbag, rust, or flood-related concerns, have the vehicle inspected by a qualified professional before driving it or making a repair-or-replace decision.</p>
      <p className="leading-7">You are responsible for your own repair, replacement, driving, and purchasing decisions. Safety-related concerns should be reviewed promptly by a qualified professional.</p>
    </ContentPage>
  );
}
