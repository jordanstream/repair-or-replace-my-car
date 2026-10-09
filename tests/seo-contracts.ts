import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { metadata as resultsMetadata } from "@/app/results/page";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { getGuide, guides } from "@/data/guides";
import { pageMetadata } from "@/lib/metadata";
import { guideStructuredData } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import nextConfig from "@/next.config";

async function main() {
assert.equal(siteConfig.url, "https://carsecondopinion.com", "canonical origin must be non-www HTTPS");
assert.equal(siteConfig.host, "carsecondopinion.com", "canonical host must be non-www");

const redirectRules = await nextConfig.redirects?.();
assert.ok(redirectRules, "Next.js redirects must be configured");
const wwwRedirect = redirectRules.find((rule) =>
  rule.has?.some((condition) => condition.type === "host" && condition.value === "www.carsecondopinion.com")
);
assert.ok(wwwRedirect, "www host redirect must exist");
assert.equal(wwwRedirect.source, "/:path*", "www redirect must preserve every path");
assert.equal(wwwRedirect.destination, "https://carsecondopinion.com/:path*", "www redirect must target canonical host");
assert.equal(wwwRedirect.permanent, true, "www redirect must be permanent");
const opinionRedirect = redirectRules.find((rule) => rule.source === "/guides/is-it-worth-getting-a-second-opinion-on-car-repair");
assert.ok(opinionRedirect, "historical second-opinion URL must redirect");
assert.equal(opinionRedirect.destination, "/guides/is-it-worth-getting-a-second-opinion-on-a-car-repair");
assert.equal(opinionRedirect.permanent, true, "historical redirect must be permanent");

const sitemapEntries = sitemap();
const sitemapUrls = sitemapEntries.map((entry) => entry.url);
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, "sitemap URLs must be unique");
const newGuideSlugs = [
  "repair-costs-more-than-car-value",
  "how-to-compare-auto-repair-estimates",
  "is-my-car-a-money-pit",
  "car-needs-multiple-repairs-what-to-fix-first",
  "check-recalls-and-warranty-before-car-repair"
];
assert.ok(sitemapUrls.includes(`${siteConfig.url}/about`), "About page must be in the sitemap");
assert.ok(!sitemapUrls.includes(`${siteConfig.url}/results`), "noindex results page must not be in the sitemap");
assert.ok(
  sitemapUrls.every((url) => url.startsWith(`${siteConfig.url}/`) && !url.includes("www.carsecondopinion.com")),
  "sitemap entries must use the canonical non-www origin"
);
const legacyGuideRedirects = {
  "is-a-3000-dollar-repair-worth-it": "is-a-3000-dollar-car-repair-worth-it",
  "is-a-5000-dollar-repair-worth-it": "is-a-5000-dollar-car-repair-worth-it",
  "is-a-car-worth-fixing": "should-i-fix-my-old-car-or-buy-another-one",
  "is-a-transmission-replacement-worth-it": "is-transmission-replacement-worth-it",
  "is-an-engine-replacement-worth-it": "is-engine-replacement-worth-it"
} as const;

for (const [legacySlug, canonicalSlug] of Object.entries(legacyGuideRedirects)) {
  assert.ok(
    !sitemapUrls.includes(`${siteConfig.url}/guides/${legacySlug}`),
    `legacy redirected guide must not be in the sitemap: ${legacySlug}`
  );
  assert.ok(
    sitemapUrls.includes(`${siteConfig.url}/guides/${canonicalSlug}`),
    `redirect target must be in the sitemap: ${canonicalSlug}`
  );

  const legacyGuideSource = readFileSync(
    resolve(process.cwd(), `app/guides/${legacySlug}/page.tsx`),
    "utf8"
  );
  assert.ok(
    legacyGuideSource.includes(`permanentRedirect("/guides/${canonicalSlug}")`),
    `legacy guide must permanently redirect to its canonical replacement: ${legacySlug}`
  );
}

for (const guide of guides) {
  const guideUrl: string = `${siteConfig.url}/guides/${guide.slug}`;
  const sitemapEntry: (typeof sitemapEntries)[number] | undefined = sitemapEntries.find(
    (item) => item.url === guideUrl
  );
  assert.ok(sitemapEntry, `canonical guide missing from sitemap: ${guide.slug}`);
  assert.equal(sitemapEntry.lastModified, guide.lastReviewedDate, `incorrect lastModified for ${guide.slug}`);

  for (const relatedSlug of guide.related) {
    assert.ok(getGuide(relatedSlug), `invalid related guide slug ${relatedSlug} on ${guide.slug}`);
  }
}

for (const slug of newGuideSlugs) {
  const guide = getGuide(slug);
  assert.ok(guide, `new guide must exist: ${slug}`);
  assert.equal(guide.publishedDate, "2026-07-22", `new guide must use its actual publication date: ${slug}`);
  assert.ok(guide.faqs.length >= 4, `new guide must answer at least four practical questions: ${slug}`);
  assert.ok(guide.example.length >= 3, `new guide must include a developed worked example: ${slug}`);
  assert.ok(guide.sources && guide.sources.length >= 1, `new guide must cite an official consumer source: ${slug}`);
  assert.ok(
    guide.sources.every((source) => source.url.startsWith("https://")),
    `new guide sources must use HTTPS: ${slug}`
  );
  assert.ok(
    JSON.stringify(guide).split(/\s+/).length >= 500,
    `new guide must contain substantial decision-support content: ${slug}`
  );
}

for (const entry of sitemapEntries.filter((item) => !item.url.includes("/guides/"))) {
  assert.equal(entry.lastModified, undefined, `static route must not receive a synthetic lastModified: ${entry.url}`);
  assert.equal(entry.changeFrequency, undefined, `changeFrequency must be omitted: ${entry.url}`);
  assert.equal(entry.priority, undefined, `priority must be omitted: ${entry.url}`);
}

const robotsOutput = robots();
assert.equal(robotsOutput.sitemap, `${siteConfig.url}/sitemap.xml`, "robots sitemap must use canonical origin");
const resultsRobots = resultsMetadata.robots as { index?: boolean; follow?: boolean };
assert.equal(resultsRobots.index, false, "personalized results must remain noindex");
assert.equal(resultsRobots.follow, true, "links on the noindex results page should remain followable");

const priorityGuide = getGuide("is-a-3000-dollar-car-repair-worth-it");
assert.ok(priorityGuide, "priority guide must exist");
const metadata = pageMetadata({
  title: priorityGuide.seoTitle,
  description: priorityGuide.description,
  path: `/guides/${priorityGuide.slug}`,
  type: "article"
}) as { alternates?: { canonical?: string } };
assert.equal(
  metadata.alternates?.canonical,
  `${siteConfig.url}/guides/${priorityGuide.slug}`,
  "guide canonical metadata must be absolute and self-referencing"
);

const schemas = guideStructuredData(priorityGuide) as unknown as Array<Record<string, unknown>>;
const article = schemas.find((schema) => schema["@type"] === "Article");
const breadcrumbs = schemas.find((schema) => schema["@type"] === "BreadcrumbList");
const faq = schemas.find((schema) => schema["@type"] === "FAQPage");
assert.ok(article && breadcrumbs && faq, "guide schema must include Article, BreadcrumbList, and FAQPage");
assert.equal(article.headline, priorityGuide.title, "Article headline must match visible guide title");
assert.equal(article.description, priorityGuide.description, "Article description must match guide metadata");
assert.equal(article.datePublished, priorityGuide.publishedDate, "Article publication date must match visible data");
assert.equal(article.dateModified, priorityGuide.lastReviewedDate, "Article modified date must match visible data");
assert.equal(
  (faq.mainEntity as unknown[]).length,
  priorityGuide.faqs.length,
  "FAQ schema must match every visible FAQ"
);
const breadcrumbItems = breadcrumbs.itemListElement as Array<Record<string, unknown>>;
assert.deepEqual(
  breadcrumbItems.map((item) => item.position),
  [1, 2, 3],
  "breadcrumb schema positions must be sequential"
);
assert.equal(breadcrumbItems[2].item, `${siteConfig.url}/guides/${priorityGuide.slug}`);

const fiveThousandGuide = getGuide("is-a-5000-dollar-car-repair-worth-it");
assert.ok(fiveThousandGuide, "$5,000 guide must remain available");
assert.equal(fiveThousandGuide.seoTitle, "Is a $5,000 Car Repair Worth It?");
assert.ok(fiveThousandGuide.example.length >= 3, "$5,000 guide must include a comparable worked example");

const homepageSource = readFileSync(resolve(process.cwd(), "app/page.tsx"), "utf8");
for (const slug of ["is-a-3000-dollar-car-repair-worth-it", "is-a-5000-dollar-car-repair-worth-it", "should-i-fix-my-old-car-or-buy-another-one", "repair-costs-more-than-car-value"]) {
  assert.ok(getGuide(slug), `featured homepage guide missing from registry: ${slug}`);
  assert.ok(homepageSource.includes(`"${slug}"`), `featured homepage guide not listed: ${slug}`);
}
const calculatorSource = readFileSync(resolve(process.cwd(), "app/calculator/page.tsx"), "utf8");
assert.ok(calculatorSource.includes("What does this repair-or-replace calculator compare?"), "calculator explainer must remain present");

const guidePageSource = readFileSync(resolve(process.cwd(), "components/GuidePage.tsx"), "utf8");
assert.match(guidePageSource, /aria-label="Breadcrumb"/, "visible breadcrumb navigation must be labeled");
assert.match(guidePageSource, /aria-current="page"/, "current breadcrumb must be identified");
assert.match(guidePageSource, /href="\/about" rel="author"/, "guide byline must link to About page");

console.log("SEO contracts: canonical host, redirects, sitemap, metadata, structured data, and visible navigation passed");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
