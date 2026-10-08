"use client";

import { Children, cloneElement, isValidElement, useId } from "react";
import type { InputHTMLAttributes, ReactElement, ReactNode, SelectHTMLAttributes } from "react";

type FieldProps = {
  label: string;
  helper?: string;
  error?: string;
  children: ReactNode;
};

export function Field({ label, helper, error, children }: FieldProps) {
  const generatedId = useId();
  const child = Children.only(children);
  const fieldElement = isValidElement(child)
    ? child as ReactElement<{ id?: string; "aria-describedby"?: string; "aria-invalid"?: boolean }>
    : null;
  const inputId = fieldElement?.props.id ?? `field-${generatedId}`;
  const helperId = helper ? `${inputId}-help` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [fieldElement?.props["aria-describedby"], helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="block">
      <label htmlFor={inputId} className="text-base font-semibold text-ink-800">{label}</label>
      <span className="mt-1 block">
        {fieldElement ? cloneElement(fieldElement, { id: inputId, "aria-describedby": describedBy, "aria-invalid": error ? true : fieldElement.props["aria-invalid"] }) : child}
      </span>
      {helper ? <span id={helperId} className="mt-2 block text-sm leading-5 text-ink-600">{helper}</span> : null}
      {error ? <span id={errorId} className="mt-1 block text-sm font-semibold text-danger-700">{error}</span> : null}
    </div>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="min-h-12 w-full rounded-lg border border-line-strong bg-white px-3.5 py-2.5 text-base text-ink-950 transition-[border-color,box-shadow] placeholder:text-ink-600 focus:border-brand-600 focus:shadow-[0_0_0_3px_rgba(201,71,36,0.15)]"
      {...props}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="min-h-12 w-full rounded-lg border border-line-strong bg-white px-3.5 py-2.5 text-base text-ink-950 transition-[border-color,box-shadow] focus:border-brand-600 focus:shadow-[0_0_0_3px_rgba(201,71,36,0.15)]"
      {...props}
    />
  );
}

export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange
}: {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-base font-semibold text-ink-800">{label}</legend>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex min-h-12 cursor-pointer items-center rounded-lg border px-3.5 py-2.5 text-sm font-semibold transition-[border-color,background-color] ${
              value === option.value ? "border-brand-600 bg-brand-50 text-brand-700 shadow-[inset_0_0_0_1px_#c94724]" : "border-line-strong bg-white text-ink-700 hover:border-brand-600"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(event) => onChange(event.target.value)}
              className="mr-2.5 h-5 w-5 accent-brand-600"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
