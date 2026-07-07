import { GuidePage } from "@/components/GuidePage";
import { getGuide } from "@/data/guides";
import { pageMetadata } from "@/lib/metadata";

const guide = getGuide("is-a-5000-dollar-repair-worth-it")!;

export const metadata = pageMetadata({ title: guide.title, description: guide.description, path: `/guides/${guide.slug}`, type: "article" });

export default function Page() {
  return <GuidePage slug={guide.slug} />;
}
