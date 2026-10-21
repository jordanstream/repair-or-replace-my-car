import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const route = readFileSync("app/api/checklist/subscribe/route.ts", "utf8");
const signup = readFileSync("components/ChecklistSignup.tsx", "utf8");
const oldKitRouteExists = (() => {
  try { readFileSync("app/api/kit/subscribe/route.ts"); return true; } catch { return false; }
})();
assert.equal(oldKitRouteExists, false, "old Kit endpoint must be removed");
assert.match(route, /MAX_BODY_BYTES = 6000/, "request size bounded");
assert.match(route, /verifyTurnstile/, "server must verify captcha");
assert.match(route, /data\.hostname === hostname/, "captcha hostname must match request hostname");
assert.match(route, /valueInputOption=RAW/, "prevent spreadsheet formula injection");
assert.match(route, /marketingConsent = payload\.marketingConsent === true/, "only explicit opt-in");
assert.match(route, /CONSENT_VERSION/, "consent version must be recorded");
assert.doesNotMatch(route, /KIT_API_KEY|KIT_FORM_ID|referrer/, "no Kit secrets or referrer collection");
assert.doesNotMatch(signup, /\/api\/kit\/subscribe|mailtoFallback/, "no legacy email signup fallback");
assert.match(signup, /\/api\/checklist\/subscribe/, "new API endpoint used");
assert.match(signup, /status === "success"/, "download must be conditional upon a saved signup");
assert.match(signup, /response\.ok/, "success depends on actual response");
console.log("checklist signup privacy contract: passed");
