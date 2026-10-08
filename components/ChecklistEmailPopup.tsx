"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChecklistSignup } from "@/components/ChecklistSignup";
import { Button } from "@/components/ui/Button";

type Placement = "results" | "guide" | "footer" | "checklist";

export function ChecklistEmailPopup({
  placement,
  children = "Email me the checklist",
  className = "",
  buttonVariant = "primary"
}: {
  placement: Placement;
  children?: string;
  className?: string;
  buttonVariant?: "primary" | "secondary";
}) {
  const [open, setOpen] = useState(false);
  const [dialogMounted, setDialogMounted] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  function openDialog() {
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setDialogMounted(true);
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  useEffect(() => {
    if (!dialogMounted) {
      return;
    }

    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeDialog();
        return;
      }

      if (event.key === "Tab" && openRef.current) {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (!focusable?.length) {
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [dialogMounted]);

  return (
    <>
      <Button type="button" variant={buttonVariant} onClick={openDialog} className={className}>
        {children}
      </Button>
      {dialogMounted ? (
        <div
          className={`${open ? "motion-dialog-backdrop" : "motion-dialog-backdrop-out"} fixed inset-0 z-50 flex items-center justify-center overscroll-contain bg-ink-950/55 px-4 py-6`}
          role="presentation"
          inert={!open}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget && !open) {
              setDialogMounted(false);
            }
          }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            tabIndex={-1}
            aria-label="Close checklist email form"
            onClick={closeDialog}
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={`${open ? "motion-dialog-panel" : "motion-dialog-panel-out"} relative w-full max-w-lg rounded-lg border border-line bg-white p-5 shadow-soft sm:p-6`}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Free PDF</p>
                <h2 id={titleId} className="mt-2 text-2xl font-bold text-ink-950">
                  Email me the checklist
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink-700">
                  Send the printable Major Car Repair Decision Checklist to your inbox.
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line text-xl leading-none text-ink-700 hover:bg-brand-50"
                aria-label="Close"
                onClick={closeDialog}
              >
                ×
              </button>
            </div>
            <ChecklistSignup placement={placement} variant="modal" />
          </div>
        </div>
      ) : null}
    </>
  );
}
