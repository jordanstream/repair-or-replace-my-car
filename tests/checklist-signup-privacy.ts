import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const route = readFileSync("app/api/kit/subscribe/route.ts", "utf8");
const signup = readFileSync("components/ChecklistSignup.tsx", "utf8");

assert.match(route, /maxBodyBytes = 2048/, "request body must be bounded");
assert.match(route, /getReader\(\)/, "request body must be read with bounded streaming");
assert.match(route, /content-type/, "request type must be validated");
assert.match(route, /email\.length > 254/, "email length must be bounded");
assert.match(route, /subscriberResult\.status === 429/, "upstream throttling should map to 429");
assert.doesNotMatch(route, /referrer|cso_signup_placement/, "do not forward page data to Kit");
assert.doesNotMatch(signup, /window\.location\.href : ""/, "do not post current page URL");
assert.match(signup, /response\.status === 429/, "show a useful rate-limit message");
console.log("checklist signup privacy contract: passed");
