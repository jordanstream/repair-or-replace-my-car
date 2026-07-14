"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-h-11 shrink-0 items-center rounded-md" aria-label="Car Second Opinion home">
          <Image
            src="/brand/car-second-opinion-icon-nav.png"
            alt=""
            width={41}
            height={44}
            priority
            className="h-11 w-auto lg:hidden"
          />
          <Image
            src="/brand/car-second-opinion-primary-nav.png"
            alt="Car Second Opinion"
            width={248}
            height={60}
            priority
            className="hidden h-14 w-auto lg:block"
          />
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-ink-700 hover:text-brand-700">
              {item.label}
            </Link>
          ))}
          <Button href="/calculator">Compare My Options</Button>
        </nav>
        <button
          type="button"
          className="min-h-11 rounded-md border border-line px-3 text-sm font-semibold text-ink-800 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="border-t border-line bg-white px-4 py-4 md:hidden">
          <div className="mx-auto grid max-w-6xl gap-3">
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md px-2 py-3 font-semibold text-ink-800" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Button href="/calculator">Compare My Options</Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
