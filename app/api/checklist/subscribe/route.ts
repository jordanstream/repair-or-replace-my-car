import { createSign } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 6000;
const CONSENT_VERSION = "2026-10-21";
const emailPattern = /^[a-z0-9][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/i;
const namePattern = /^[\p{L}\p{M}][\p{L}\p{M} '\u2019-]{0,79}$/u;

type SignupPayload = {
  firstName?: unknown;
  email?: unknown;
  marketingConsent?: unknown;
  company?: unknown;
  turnstileToken?: unknown;
};

async function readLimitedJson(request: Request): Promise<SignupPayload | null> {
  const declaredSize = request.headers.get("content-length");
  if (declaredSize && Number(declaredSize) > MAX_BODY_BYTES) return null;
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      total += chunk.value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(chunk.value);
    }
    const bytes = new Uint8Array(total);
    let index = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, index);
      index += chunk.byteLength;
    }
    const value: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    return value && typeof value === "object" && !Array.isArray(value) ? value as SignupPayload : null;
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

function isConfigured() {
  return Boolean(
    process.env.TURNSTILE_SECRET_KEY &&
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL &&
    process.env.GOOGLE_SHEETS_PRIVATE_KEY &&
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  );
}

async function verifyTurnstile(token: string, hostname: string): Promise<boolean> {
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY!,
      response: token
    }),
    signal: AbortSignal.timeout(6000)
  });
  if (!response.ok) return false;
  const data = await response.json() as { success?: boolean; hostname?: string };
  return data.success === true && data.hostname === hostname;
}

function encodeBase64Url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

async function accessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL!;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, "\n");
  const header = encodeBase64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = encodeBase64Url(JSON.stringify({
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600
  }));
  const message = header + "." + claims;
  const signer = createSign("RSA-SHA256");
  signer.update(message);
  signer.end();
  const assertion = message + "." + signer.sign(privateKey).toString("base64url");

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    }),
    signal: AbortSignal.timeout(8000)
  });
  if (!response.ok) throw new Error("Google auth unavailable");
  const data = await response.json() as { access_token?: string };
  if (!data.access_token) throw new Error("Google access token unavailable");
  return data.access_token;
}

async function saveSignup(firstName: string, email: string, consent: boolean): Promise<boolean> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
  const token = await accessToken();
  const range = encodeURIComponent("'Signups'!A:F");
  const response = await fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/" + encodeURIComponent(spreadsheetId) +
      "/values/" + range + ":append?valueInputOption=RAW&insertDataOption=INSERT_ROWS",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
      body: JSON.stringify({
        values: [[new Date().toISOString(), firstName, email, consent ? "Yes" : "No", CONSENT_VERSION, "checklist"]]
      }),
      signal: AbortSignal.timeout(8000)
    }
  );
  return response.ok;
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "Send a JSON request." }, { status: 415 });
  }

  const payload = await readLimitedJson(request);
  if (!payload) return NextResponse.json({ error: "Invalid or oversized request." }, { status: 400 });

  // Basic honeypot: avoid writing spam submissions to the private contact sheet.
  if (payload.company) return NextResponse.json({ ok: true });

  const firstName = typeof payload.firstName === "string" ? payload.firstName.trim().replace(/\s+/g, " ") : "";
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const marketingConsent = payload.marketingConsent === true;
  const token = typeof payload.turnstileToken === "string" ? payload.turnstileToken : "";

  if (!namePattern.test(firstName) || email.length > 254 || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Enter a valid first name and email address." }, { status: 400 });
  }

  if (!isConfigured()) {
    return NextResponse.json({ error: "The form is temporarily unavailable. Please try again later." }, { status: 503 });
  }

  if (!token || token.length > 4096) {
    return NextResponse.json({ error: "Please complete the spam protection check." }, { status: 400 });
  }

  try {
    const hostname = new URL(request.url).hostname;
    if (!await verifyTurnstile(token, hostname)) {
      return NextResponse.json({ error: "Spam protection failed. Please retry." }, { status: 403 });
    }
    if (!await saveSignup(firstName, email, marketingConsent)) {
      return NextResponse.json({ error: "We couldn't save your request. Please try again." }, { status: 503 });
    }
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "We couldn't save your request. Please try again." }, { status: 503 });
  }
}
