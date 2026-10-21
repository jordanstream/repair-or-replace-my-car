import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve(process.cwd(), "components/ComparisonTable.tsx"), "utf8");
assert.match(
  source,
  /className="overflow-hidden rounded-2xl border border-line-strong bg-white"/,
  "comparison table must have one visible enclosing border and clip to rounded corners"
);
assert.match(source, /className="hidden overflow-x-auto md:block"/, "desktop table must retain horizontal overflow handling");
assert.match(source, /className="divide-y divide-line md:hidden"/, "mobile results must retain internal separators");
console.log("results comparison border contract: passed");
