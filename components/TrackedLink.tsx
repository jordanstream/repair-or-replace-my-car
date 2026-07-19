"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { type AnalyticsEvent, trackEvent } from "@/lib/analytics";

export function TrackedLink({
  href,
  event,
  children,
  className,
  properties
}: {
  href: string;
  event: AnalyticsEvent;
  children: ReactNode;
  className?: string;
  properties?: Record<string, string | number | boolean>;
}) {
  return <Link href={href} className={className} onClick={() => trackEvent(event, properties)}>{children}</Link>;
}
