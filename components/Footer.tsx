import Link from "next/link";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/calculator", label: "Calculator" },
  { href: "/guides", label: "Guides" },
  { href: "/methodology", label: "Methodology" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" }
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:flex sm:flex-wrap sm:gap-x-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="min-h-10 rounded-md py-2 text-sm font-semibold text-ink-700 hover:text-brand-700">
              {link.label}
            </Link>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-ink-600">
          This tool provides educational estimates only. It does not replace advice from a qualified mechanic, financial
          professional, or safety inspector.
        </p>
        <p className="mt-4 text-sm leading-6 text-ink-600">
          Contact:{" "}
          <a className="font-semibold text-brand-700 underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
        </p>
        <p className="mt-4 text-sm text-ink-600">&copy; {new Date().getFullYear()} Repair or Replace My Car.</p>
      </div>
    </footer>
  );
}
