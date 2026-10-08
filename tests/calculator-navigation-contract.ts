import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve(process.cwd(), "components/CalculatorForm.tsx"), "utf8");
const globalStyles = readFileSync(resolve(process.cwd(), "app/globals.css"), "utf8");

const contracts = [
  ["step container ref", /stepContainerRef/],
  ["container-relative scrolling", /stepContainerRef\.current\?\.scrollIntoView/],
  ["non-input heading focus", /stepHeadingRef\.current\?\.focus\(\{ preventScroll: true \}\)/],
  ["programmatically focusable headings", /tabIndex: -1/],
  ["sticky-header scroll offset", /scroll-mt-24/],
  ["instant step positioning", /scrollIntoView\(\{ behavior: "auto"/],
  ["validation summary focus", /errorSummaryRef\.current\?\.focus/],
  ["validation does not advance", /showValidationError\(validation\[0\], validation\[1\]\);\s*return;/],
  ["step announcement text", /Step \$\{step\} of 4:/],
  ["stored-input edit recovery", /parseStoredCalculatorInput/]
] as const;

for (const [name, pattern] of contracts) {
  if (!pattern.test(source)) throw new Error(`Missing calculator navigation contract: ${name}`);
}

if (/autoFocus/.test(source)) {
  throw new Error("Calculator steps must not autofocus an input and open the mobile keyboard");
}

if (!/prefers-reduced-motion: reduce/.test(globalStyles)) {
  throw new Error("Global motion must respect prefers-reduced-motion");
}


// Minimums apply on step validation, never mid-keystroke; these inputs must remain clearable.
for (const key of ["vehicleYear", "usableMonthsAfterRepair", "loanTermMonths"] as const) {
  if (!source.includes(`numericUpdate("${key}", e.target.value)`)) {
    throw new Error(`Numeric field unexpectedly clamps partial input: ${key}`);
  }
}
for (const rule of [
  "form.vehicleYear < 1950",
  "form.usableMonthsAfterRepair < 1",
  "form.loanTermMonths < 1"
]) {
  if (!source.includes(rule)) throw new Error(`Missing step minimum validation: ${rule}`);
}

console.log(`calculator navigation contracts: ${contracts.length} passed`);
