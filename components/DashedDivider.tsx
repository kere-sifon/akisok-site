import { cx } from "@/lib/utils";

type DashedDividerProps = {
  tone?: "on-cream" | "on-ink";
  className?: string;
};

export function DashedDivider({
  tone = "on-cream",
  className,
}: DashedDividerProps) {
  return (
    <div
      aria-hidden
      className={cx(
        "h-px w-full",
        tone === "on-ink" ? "text-cream/25" : "text-ink/28",
        className,
      )}
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, currentColor 0 9px, transparent 9px 16px)",
      }}
    />
  );
}
