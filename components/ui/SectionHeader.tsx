export function SectionHeader({
  title,
  intro,
  align = "left"
}: {
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <h2 className="text-3xl font-bold tracking-normal text-ink-950 md:text-4xl">{title}</h2>
      {intro ? <p className="mt-4 text-lg leading-8 text-ink-700">{intro}</p> : null}
    </div>
  );
}
