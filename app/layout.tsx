import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { LayoutShell } from "@/components/LayoutShell";
import { Motion } from "@/components/Motion";
import { siteConfig } from "@/lib/site";

const archivo = localFont({
  src: "../public/fonts/Archivo-Variable-Latin.woff2",
  variable: "--font-archivo",
  display: "swap",
  weight: "400 900"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={archivo.variable}>
        <GoogleAnalytics />
        <Motion />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
