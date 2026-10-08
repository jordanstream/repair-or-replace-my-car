import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type CommonButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  className?: string;
};

type ButtonProps =
  | (CommonButtonProps &
      Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonButtonProps | "href"> & {
        href: string;
      })
  | (CommonButtonProps &
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonButtonProps> & {
        href?: undefined;
      });

const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 border-brand-600",
  secondary: "bg-white text-ink-950 hover:bg-brand-50 border-line-strong",
  ghost: "bg-transparent text-brand-700 hover:bg-brand-50 border-transparent",
  danger: "bg-danger-700 text-white hover:bg-danger-800 border-danger-700"
};

export function Button({ children, variant = "primary", href, className = "", ...props }: ButtonProps) {
  const classes = `motion-button inline-flex min-h-12 items-center justify-center rounded-lg border px-5 py-2.5 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-55 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
