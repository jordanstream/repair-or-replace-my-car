"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  function toggleMenu() {
    if (open) {
      setOpen(false);
      return;
    }

    setMenuMounted(true);
    setOpen(true);
  }

  function isCurrent(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-h-11 shrink-0 items-center rounded-md" aria-label="Car Second Opinion home">
          <BrandMark />
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => {
            const current = isCurrent(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`nav-link flex min-h-11 items-center rounded-sm border-b-2 px-1 text-sm font-semibold ${
                  current
                    ? "border-brand-600 text-ink-950"
                    : "border-transparent text-ink-700 hover:border-brand-200 hover:text-brand-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Button href="/calculator">Compare options</Button>
        </nav>
        <button
          type="button"
          className="motion-button min-h-11 rounded-[10px] border border-line-strong px-3 text-sm font-semibold text-ink-800 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={toggleMenu}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {menuMounted ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          aria-hidden={!open}
          inert={!open}
          className={`${open ? "motion-menu" : "motion-menu-out"} border-t border-line bg-white px-4 py-4 md:hidden`}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget && !open) {
              setMenuMounted(false);
            }
          }}
        >
          <div className="mx-auto grid max-w-6xl gap-3">
            {siteConfig.nav.map((item) => {
              const current = isCurrent(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`motion-menu-item min-h-12 rounded-[10px] px-3 py-3 font-semibold ${
                    current ? "border-brand-600 bg-brand-50 text-ink-950" : "border-transparent text-ink-800"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button href="/calculator" onClick={() => setOpen(false)}>Compare options</Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
