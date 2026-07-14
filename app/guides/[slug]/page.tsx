import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/components/GuidePage";
import { getGuide, guides } from "@/data/guides";
import { pageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return pageMetadata({
    title: guide.seoTitle,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    type: "article"
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return <GuidePage slug={guide.slug} />;
}
