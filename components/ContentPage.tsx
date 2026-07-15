import type { ReactNode } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

type ContentPageProps = {
  title: string;
  intro?: string;
  lastUpdated?: string;
  showBottomLinks?: boolean;
  children: ReactNode;
};

export function ContentPage({ title, intro, lastUpdated, showBottomLinks = false, children }: ContentPageProps) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-ink-950 md:text-5xl">{title}</h1>
      {lastUpdated ? <p className="mt-4 text-sm font-semibold text-ink-600">Last updated: {lastUpdated}</p> : null}
      {intro ? <p className="mt-5 text-xl leading-8 text-ink-700">{intro}</p> : null}
      <div className="prose prose-slate mt-10 max-w-none space-y-8 text-ink-700">{children}</div>
      {showBottomLinks ? (
        <nav aria-label="Related site links" className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm font-semibold sm:flex-row sm:flex-wrap">
          <Link href="/calculator" className="rounded-md px-1 py-2 text-brand-700 hover:text-brand-800">
            Back to calculator
          </Link>
          <Link href="/methodology" className="rounded-md px-1 py-2 text-brand-700 hover:text-brand-800">
            Read methodology
          </Link>
          <Link href={`mailto:${siteConfig.contactEmail}`} className="rounded-md px-1 py-2 text-brand-700 hover:text-brand-800">
            Contact
          </Link>
        </nav>
      ) : null}
    </main>
  );
}
