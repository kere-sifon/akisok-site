import { cx } from "@/lib/utils";

type SourceTagProps = {
  name: string;
  url: string;
  tone?: "on-cream" | "on-ink";
};

export function SourceTag({ name, url, tone = "on-cream" }: SourceTagProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors",
        tone === "on-ink"
          ? "text-cream/70 hover:text-cream"
          : "text-ink/60 hover:text-accent",
      )}
    >
      Source: {name} <span aria-hidden>↗</span>
    </a>
  );
}
