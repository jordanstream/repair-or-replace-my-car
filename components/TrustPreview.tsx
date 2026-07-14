export function TrustPreview({ compact = false }: { compact?: boolean }) {
  const items = [
    {
      title: "How this estimate works",
      copy: "The calculator compares the numbers you enter for repairing your car with replacing it used or new over 12, 24, or 36 months."
    },
    {
      title: "No account required",
      copy: "You can use the calculator without creating an account or sharing your contact information."
    },
    {
      title: "No mechanic diagnosis",
      copy: "Car Second Opinion does not diagnose the problem, inspect the car, or replace a written estimate from a qualified professional."
    },
    {
      title: "Your inputs stay in your browser",
      copy: "For this MVP, calculator entries are stored locally on your device so the results page can show your estimate."
    },
    {
      title: "Built to compare, not pressure you",
      copy: "The tool does not rank shops, recommend dealers, or hide the comparison behind an email form."
    }
  ];

  return (
    <section className={compact ? "" : "rounded-lg border border-line bg-white p-5"}>
      <h2 className={compact ? "text-xl font-bold text-ink-950" : "text-2xl font-bold text-ink-950"}>
        How this estimate works
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.title} className="rounded-md border border-line bg-wash p-4">
            <h3 className="text-sm font-bold text-ink-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-700">{item.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
