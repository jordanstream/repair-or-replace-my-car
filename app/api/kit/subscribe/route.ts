import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxBodyBytes = 2048;

type SubscribeRequest = {
  email?: unknown;
  company?: unknown;
};

async function readLimitedJson(request: Request): Promise<SubscribeRequest | null> {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > maxBodyBytes) return null;

  const reader = request.body?.getReader();
  if (!reader) return null;

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBodyBytes) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const parsed: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return parsed as SubscribeRequest;
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

async function kitRequest(path: string, body: Record<string, unknown>) {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    return { ok: false, status: 503 };
  }

  try {
    const response = await fetch(`https://api.kit.com/v4${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey
      },
      body: JSON.stringify(body)
    });
    return { ok: response.ok, status: response.status };
  } catch {
    return { ok: false, status: 502 };
  }
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "Send JSON to request a checklist." }, { status: 415 });
  }

  const payload = await readLimitedJson(request);
  if (!payload) {
    return NextResponse.json({ error: "Invalid or oversized request." }, { status: 400 });
  }

  // A hidden field catches basic automated submissions; do not send its value to Kit.
  if (payload.company) return NextResponse.json({ ok: true });

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (email.length > 254 || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const subscriberResult = await kitRequest("/subscribers", { email_address: email });
  if (!subscriberResult.ok) {
    return NextResponse.json(
      { error: "We could not subscribe that email right now." },
      { status: subscriberResult.status === 429 ? 429 : subscriberResult.status === 503 ? 503 : 502 }
    );
  }

  const formId = process.env.KIT_FORM_ID;
  if (!formId) return NextResponse.json({ ok: true, mode: "subscriber_created" });

  const formResult = await kitRequest(`/forms/${encodeURIComponent(formId)}/subscribers`, {
    email_address: email
  });

  if (!formResult.ok) {
    return NextResponse.json(
      { error: "We saved the email, but could not attach it to the checklist form." },
      { status: formResult.status === 429 ? 429 : 502 }
    );
  }

  return NextResponse.json({ ok: true, mode: "form_subscribed" });
}
