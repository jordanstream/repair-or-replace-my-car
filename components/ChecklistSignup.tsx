"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Fields";
import { analyticsEvents, trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

export function ChecklistSignup({ placement }: { placement: "results" | "guide" | "footer" | "checklist" }) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "fallback" | "error">("idle");
  const [message, setMessage] = useState("");

  function mailtoFallback() {
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

  async function requestChecklist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackEvent(analyticsEvents.checklistEmailClicked, { placement });
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/kit/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          placement,
          company,
          referrer: typeof window !== "undefined" ? window.location.href : ""
        })
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (response.ok) {
        setStatus("success");
        setMessage("You're on the checklist list. Check your inbox for Kit's confirmation or checklist email.");
        setEmail("");
        return;
      }

      if (response.status === 503) {
        setStatus("fallback");
        setMessage("Kit is not connected yet, so we opened an email request instead.");
        mailtoFallback();
        return;
      }

      setStatus("error");
      setMessage(data.error ?? "Something went wrong. Please try again, or email us directly if the form keeps failing.");
    } catch {
      setStatus("fallback");
      setMessage("We could not reach Kit, so we opened an email request instead.");
      mailtoFallback();
    }
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
            required
          />
        </label>
        <label className="sr-only" aria-hidden="true">
          Company, leave this field blank
          <input tabIndex={-1} autoComplete="off" value={company} onChange={(event) => setCompany(event.target.value)} />
        </label>
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Email Me the Checklist"}
        </Button>
      </form>
      {message ? (
        <p
          className={`mt-3 text-sm leading-6 ${status === "success" ? "text-success-700" : status === "error" ? "text-danger-700" : "text-ink-600"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
      <p className="mt-3 text-xs leading-5 text-ink-600">
        We use Kit for checklist email delivery when connected. If Kit is unavailable, this falls back to an email
        request to {siteConfig.contactEmail}.
      </p>
    </section>
  );
}
