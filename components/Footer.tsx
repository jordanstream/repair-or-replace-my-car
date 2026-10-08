"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChecklistSignup } from "@/components/ChecklistSignup";
import { BrandMark } from "@/components/BrandMark";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/calculator", label: "Compare options" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/guides", label: "Guides" },
  { href: "/checklist", label: "Checklist" },
  { href: "/about", label: "About" },
  { href: "/methodology", label: "Methodology" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" }
];

const formlessPaths = new Set(["/about", "/calculator", "/results", "/checklist", "/disclaimer", "/privacy", "/terms", "/affiliate-disclosure"]);

export function Footer() {
  const pathname = usePathname();
  const showChecklistSignup = !formlessPaths.has(pathname);

  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {showChecklistSignup ? (
          <div className="mb-8 max-w-3xl">
            <ChecklistSignup placement="footer" />
          </div>
        ) : null}
        <div className="grid gap-10 border-t border-line pt-9 lg:grid-cols-[15rem_1fr]">
          <div>
            <BrandMark />
            <p className="mt-4 max-w-[15rem] text-sm leading-6 text-ink-600">
              Independent decision support for a major repair estimate.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="min-h-11 rounded-md py-2 text-sm font-semibold text-ink-700 hover:text-brand-700">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-6 text-ink-600">
          This tool provides educational estimates only. It does not replace advice from a qualified mechanic, financial
          professional, or safety inspector.
        </p>
        <p className="mt-4 text-sm leading-6 text-ink-600">
          Contact:{" "}
          <a className="font-semibold text-brand-700 underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
        </p>
        <p className="mt-4 text-sm text-ink-600">&copy; {new Date().getFullYear()} Car Second Opinion.</p>
      </div>
    </footer>
  );
}
