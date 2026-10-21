"use client";

import { FormEvent, useRef, useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Fields";
import { checklistDownloadPath } from "@/components/ChecklistDownloadLink";
import { analyticsEvents, trackEvent } from "@/lib/analytics";

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ChecklistSignup({
  placement,
  variant = "panel"
}: {
  placement: "results" | "guide" | "footer" | "checklist";
  variant?: "modal" | "panel";
}) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | null>(null);
  const isModal = variant === "modal";

  function mountTurnstile() {
    if (!turnstileSiteKey || !window.turnstile || !containerRef.current || widgetRef.current) return;
    widgetRef.current = window.turnstile.render(containerRef.current, {
      sitekey: turnstileSiteKey,
      callback: (value: string) => setToken(value),
      "expired-callback": () => setToken(""),
      "error-callback": () => setToken("")
    });
  }

  function resetCaptcha() {
    setToken("");
    if (widgetRef.current && window.turnstile) window.turnstile.reset(widgetRef.current);
  }

  async function requestChecklist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!token) {
      setStatus("error");
      setMessage("Complete the spam protection check before submitting.");
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch("/api/checklist/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, marketingConsent, company, turnstileToken: token })
      });
      const data = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(response.status === 429
          ? "Too many requests. Please wait a few minutes before trying again."
          : data.error ?? "We couldn't save your request. Please try again.");
        resetCaptcha();
        return;
      }
      setStatus("success");
      setMessage("Thanks! Your checklist is ready to download.");
      setFirstName("");
      setEmail("");
      setMarketingConsent(false);
      trackEvent(analyticsEvents.checklistEmailClicked, { placement, action: "saved_signup" });
    } catch {
      setStatus("error");
      setMessage("We couldn't save your request. Please try again.");
      resetCaptcha();
    }
  }

  if (status === "success") {
    return (
      <section className={isModal ? "" : "rounded-lg border border-line bg-white p-5"} aria-live="polite">
        <h2 className="text-xl font-bold text-ink-950">Your checklist is ready</h2>
        <p className="mt-2 text-ink-700">{message}</p>
        <a
          href={checklistDownloadPath}
          download
          className="mt-4 inline-flex min-h-11 items-center rounded-md bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
          onClick={() => trackEvent(analyticsEvents.checklistDownloadClicked, { placement })}
        >
          Download your checklist (PDF)
        </a>
      </section>
    );
  }

  return (
    <section className={isModal ? "" : "rounded-lg border border-line bg-white p-5"}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={mountTurnstile}
      />
      {!isModal && (
        <>
          <h2 className="text-xl font-bold text-ink-950">Get the repair-vs-replace checklist</h2>
          <p className="mt-3 leading-6 text-ink-700">
            Enter your first name and email to download the free checklist immediately.
          </p>
        </>
      )}
      <form className="mt-4 grid gap-3" onSubmit={requestChecklist}>
        <label className="grid gap-1 text-sm font-medium text-ink-800">
          First name
          <TextInput
            name="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            autoComplete="given-name"
            maxLength={80}
            required
          />
        </label>
        <label className="grid gap-1 text-sm font-medium text-ink-800">
          Email address
          <TextInput
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            maxLength={254}
            spellCheck={false}
            required
          />
        </label>
        <label className="sr-only" aria-hidden="true">
          Company, leave this blank
          <input tabIndex={-1} autoComplete="off" value={company} onChange={(event) => setCompany(event.target.value)} />
        </label>
        <label className="flex items-start gap-2 text-sm text-ink-700">
          <input
            className="mt-1"
            type="checkbox"
            checked={marketingConsent}
            onChange={(event) => setMarketingConsent(event.target.checked)}
          />
          I would also like occasional practical car-repair decision tips by email. (Optional)
        </label>
        <p className="text-xs leading-5 text-ink-600">
          We save your name, email, and consent choice only when the request succeeds. Marketing emails require your optional permission. See our <a href="/privacy" className="underline">privacy policy</a>.
        </p>
        {turnstileSiteKey ? <div ref={containerRef} /> : (
          <p role="status" className="text-sm text-ink-700">Checklist signup is not configured yet.</p>
        )}
        <div>
          <Button type="submit" disabled={status === "loading" || !turnstileSiteKey || !token}>
            {status === "loading" ? "Saving…" : "Get My Free Checklist"}
          </Button>
        </div>
      </form>
      {message && <p className="mt-3 text-sm text-ink-700" role="alert">{message}</p>}
    </section>
  );
}
