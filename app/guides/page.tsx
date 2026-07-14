import Link from "next/link";
import { GuideCtaLink } from "@/components/GuideCtaLink";
import { guides } from "@/data/guides";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Repair or Replace Guides",
  description: "Balanced guides for deciding whether a major car repair is worth it.",
  path: "/guides"
});

export default function GuidesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-ink-950">Repair or Replace Guides</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-700">
        Practical, non-salesy guides for comparing repair bills with replacement costs. Each guide is educational and
        works best when paired with your own written repair estimate.
      </p>
      <div className="mt-6">
        <GuideCtaLink guideSlug="guides-index" placement="index" />
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="rounded-lg border border-line bg-white p-6 shadow-sm hover:bg-brand-50">
            <h2 className="text-xl font-bold text-ink-950">{guide.title}</h2>
            <p className="mt-3 leading-7 text-ink-700">{guide.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
