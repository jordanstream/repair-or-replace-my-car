import type { ReactNode } from "react";

const styles = {
  info: "border-brand-600 bg-brand-50 text-ink-800",
  success: "border-success-700 bg-success-50 text-ink-800",
  warning: "border-caution-700 bg-caution-50 text-ink-800",
  danger: "border-danger-700 bg-danger-50 text-ink-800"
};

export function Alert({ children, tone = "info" }: { children: ReactNode; tone?: keyof typeof styles }) {
  return (
    <div
      className={`rounded-lg border p-4 text-sm leading-6 ${styles[tone]}`}
      role={tone === "danger" ? "alert" : "status"}
    >
      {children}
    </div>
  );
}
