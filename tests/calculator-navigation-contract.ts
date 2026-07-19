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
  ["step announcement text", /Step \$\{step\} of 3:/],
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

console.log(`calculator navigation contracts: ${contracts.length} passed`);
