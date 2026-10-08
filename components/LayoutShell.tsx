import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-md bg-ink-950 px-4 py-3 font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <Header />
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
      <Footer />
    </>
  );
}
