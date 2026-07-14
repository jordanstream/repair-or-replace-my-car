import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribeRequest = {
  email?: unknown;
  placement?: unknown;
  referrer?: unknown;
  company?: unknown;
};

function isString(value: unknown): value is string {
  return typeof value === "string";
}

async function kitRequest(path: string, body: Record<string, unknown>) {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    return { ok: false, status: 503, data: { error: "Kit is not configured yet." } };
  }

  const response = await fetch(`https://api.kit.com/v4${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey
    },
    body: JSON.stringify(body)
  });

  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as SubscribeRequest;

  if (payload.company) {
    return NextResponse.json({ ok: true });
  }

  const email = isString(payload.email) ? payload.email.trim().toLowerCase() : "";
  const placement = isString(payload.placement) ? payload.placement.slice(0, 60) : "unknown";
  const referrer = isString(payload.referrer) ? payload.referrer.slice(0, 500) : "";
  const formId = process.env.KIT_FORM_ID;

  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const subscriberResult = await kitRequest("/subscribers", {
    email_address: email
  });

  if (!subscriberResult.ok) {
    return NextResponse.json({ error: "We could not subscribe that email right now." }, { status: subscriberResult.status });
  }

  if (!formId) {
    return NextResponse.json({ ok: true, mode: "subscriber_created" });
  }

  const formResult = await kitRequest(`/forms/${encodeURIComponent(formId)}/subscribers`, {
    email_address: email,
    referrer: referrer ? `${referrer}${referrer.includes("?") ? "&" : "?"}cso_signup_placement=${encodeURIComponent(placement)}` : undefined
  });

  if (!formResult.ok) {
    return NextResponse.json({ error: "We saved the email, but could not attach it to the checklist form." }, { status: formResult.status });
  }

  return NextResponse.json({ ok: true, mode: "form_subscribed" });
}
