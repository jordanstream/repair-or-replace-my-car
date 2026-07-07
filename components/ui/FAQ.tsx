export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-white">
      {items.map((item) => (
        <details key={item.question} className="group p-5">
          <summary className="cursor-pointer text-base font-semibold text-ink-950 marker:text-brand-600">
            {item.question}
          </summary>
          <p className="mt-3 leading-7 text-ink-700">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
