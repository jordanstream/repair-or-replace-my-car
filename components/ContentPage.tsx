import type { ReactNode } from "react";

export function ContentPage({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-ink-950 md:text-5xl">{title}</h1>
      {intro ? <p className="mt-5 text-xl leading-8 text-ink-700">{intro}</p> : null}
      <div className="prose prose-slate mt-10 max-w-none space-y-8 text-ink-700">{children}</div>
    </main>
  );
}
