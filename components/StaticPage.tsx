import type { ReactNode } from "react";
import Link from "next/link";

type StaticPageProps = {
  kicker: string;
  title: string;
  lede: string;
  children: ReactNode;
  next?: { href: string; label: string };
};

export function StaticPage({
  kicker,
  title,
  lede,
  children,
  next,
}: StaticPageProps) {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-5 py-16 md:px-10 lg:px-14 lg:py-24">
      <p className="font-mono text-[11px] tracking-[0.2em] text-ink/50 uppercase">
        {kicker}
      </p>
      <h1 className="mt-3 max-w-[18ch] font-display text-4xl leading-[1.15] font-medium tracking-[-0.02em] text-ink md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-xl font-body text-[1.05rem] leading-relaxed text-ink/70">
        {lede}
      </p>
      <article className="post-body mt-10 max-w-[40rem] font-body text-[1.05rem] leading-[1.7] text-ink/85">
        {children}
      </article>
      {next ? (
        <p className="mt-14">
          <Link
            href={next.href}
            className="font-mono text-[10px] tracking-[0.16em] text-ink/60 uppercase transition-colors hover:text-accent"
          >
            {next.label} →
          </Link>
        </p>
      ) : null}
    </main>
  );
}
