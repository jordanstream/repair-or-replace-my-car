import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description: "Important limitations for Repair or Replace My Car.",
  path: "/disclaimer"
});

export default function DisclaimerPage() {
  return (
    <ContentPage title="Disclaimer" intro="Repair or Replace My Car is for educational and informational use only.">
      <p className="leading-7">This site is not mechanical advice, vehicle safety advice, legal advice, financial advice, insurance advice, or purchasing advice. It does not guarantee that repair estimates, vehicle values, financing assumptions, ownership costs, or outcomes are accurate.</p>
      <p className="leading-7">Users should obtain written repair estimates, ask qualified mechanics about diagnosis and safety, and consult relevant licensed professionals when decisions involve financial, insurance, legal, or safety issues.</p>
      <p className="leading-7">You are responsible for your own repair, replacement, driving, and purchasing decisions. Safety-related concerns should be reviewed promptly by a qualified professional.</p>
    </ContentPage>
  );
}
