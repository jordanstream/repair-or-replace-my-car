"use client";

import { FormEvent, useState } from "react";
import { ChecklistDownloadLink } from "@/components/ChecklistDownloadLink";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Fields";
import { analyticsEvents, trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

export function ChecklistSignup({ placement }: { placement: "results" | "guide" | "footer" | "checklist" }) {
  const [email, setEmail] = useState("");

  function requestChecklist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackEvent(analyticsEvents.checklistEmailClicked, { placement });

    const subject = "Send me the repair-vs-replace checklist";
    const body = [
      "Hi Car Second Opinion,",
      "",
      "Please send me the Major Car Repair Decision Checklist.",
      email ? `Email to send it to: ${email}` : "",
      "",
      "Thanks."
    ].filter(Boolean).join("\n");

    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <h2 className="text-xl font-bold text-ink-950">Get the repair-vs-replace checklist</h2>
      <p className="mt-3 text-sm leading-6 text-ink-700">
        Use a simple checklist for mechanic questions, numbers to compare, warning signs, and replacement assumptions.
        Results are never blocked behind email.
      </p>
      <form className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]" onSubmit={requestChecklist}>
        <label className="block">
          <span className="sr-only">Email address</span>
          <TextInput
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>
        <Button type="submit">Email Me the Checklist</Button>
      </form>
      <p className="mt-3 text-xs leading-5 text-ink-600">
        This opens your email app so you can request the checklist. No signup provider is connected yet.
      </p>
      <div className="mt-4">
        <ChecklistDownloadLink
          placement={placement}
          className="inline-flex min-h-11 items-center rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink-800 hover:bg-brand-50"
        >
          Download the checklist instead
        </ChecklistDownloadLink>
      </div>
    </section>
  );
}
