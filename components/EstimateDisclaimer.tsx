import Link from "next/link";
import { Alert } from "@/components/ui/Alert";

export const estimateDisclaimerText =
  "This tool provides educational estimates based on the information you enter. It is not mechanical, safety, legal, financial, insurance, or purchasing advice. Vehicle condition, repair quality, market prices, taxes, fees, financing, insurance, and future repairs can vary. Consult qualified professionals before making a major repair, purchase, or safety decision.";

export const safetyWarningText =
  "This tool cannot evaluate whether a vehicle is safe to drive. If you reported possible safety, structural, brake, steering, airbag, rust, or flood-related concerns, have the vehicle inspected by a qualified professional before driving it or making a repair-or-replace decision.";

export function EstimateDisclaimer({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Alert tone="info">
        <span>{estimateDisclaimerText}</span>{" "}
        <Link href="/disclaimer" className="font-semibold text-brand-700 underline underline-offset-4">
          Read the full disclaimer.
        </Link>
      </Alert>
    </div>
  );
}
