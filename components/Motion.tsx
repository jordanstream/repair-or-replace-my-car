"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const REVEAL_DURATION = 420;
const ITEM_DURATION = 360;

function revealFrames(style: string | undefined, includeOpacity: boolean): Keyframe[] {
  const opacity = includeOpacity ? 0 : 0.98;

  if (style === "soft") {
    return [
      { opacity, transform: "scale(0.99)" },
      { opacity: 1, transform: "none" }
    ];
  }

  if (style === "right") {
    return [
      { opacity, transform: "translate3d(0, 16px, 0) scale(0.992)", transformOrigin: "right center" },
      { opacity: 1, transform: "none", transformOrigin: "right center" }
    ];
  }

  return [
    { opacity, transform: "translate3d(0, 16px, 0)", transformOrigin: style === "left" ? "left center" : "center" },
    { opacity: 1, transform: "none", transformOrigin: style === "left" ? "left center" : "center" }
  ];
}

export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animations: Animation[] = [];

    if (reducedMotion || !("IntersectionObserver" in window) || !("animate" in Element.prototype)) {
      elements.forEach((element) => {
        element.dataset.revealed = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          const items = Array.from(element.querySelectorAll<HTMLElement>(".motion-list-item"));

          animations.push(
            element.animate(revealFrames(element.dataset.reveal, items.length === 0), {
              duration: REVEAL_DURATION,
              easing: EASE_OUT
            })
          );

          items.forEach((item, index) => {
            animations.push(
              item.animate(
                [
                  { opacity: 0, transform: "translate3d(0, 10px, 0)" },
                  { opacity: 1, transform: "none" }
                ],
                {
                  duration: ITEM_DURATION,
                  delay: Math.min(index * 45, 180),
                  easing: EASE_OUT,
                  fill: "backwards"
                }
              )
            );
          });

          element.dataset.revealed = "true";
          observer.unobserve(element);
        });
      },
      {
        rootMargin: "0px 0px 12% 0px",
        threshold: 0.01
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [pathname]);

  return null;
}
