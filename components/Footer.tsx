import Link from "next/link";

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
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-ink-700 hover:text-brand-700">
              {link.label}
            </Link>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-ink-600">
          This tool provides educational estimates only. It does not replace advice from a qualified mechanic, financial
          professional, or safety inspector.
        </p>
        <p className="mt-4 text-sm text-ink-600">&copy; {new Date().getFullYear()} Repair or Replace My Car.</p>
      </div>
    </footer>
  );
}
