import Link from "next/link";

const nav = [
  { href: "/#pillars", label: "Pillars" },
  { href: "/#latest", label: "Latest" },
  { href: "/who-we-are", label: "About" },
];

const showDigest = false;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3.5 md:px-10 lg:px-14">
        <Link href="/" className="shrink-0 leading-none">
          <span className="font-display text-[1.85rem] font-medium tracking-tight text-ink md:text-[2.05rem]">
            Akisok
          </span>
          <span className="mt-1 block font-mono text-[9px] tracking-[0.22em] text-ink/65 uppercase">
            Akwa Ibom, curated
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body text-[15px] text-ink/80 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {showDigest ? (
          <Link
            href="/#digest"
            className="rounded-full border border-ink bg-cream px-4 py-2 text-center font-body text-[13px] text-ink transition-colors hover:bg-ink hover:text-cream md:px-5"
          >
            Get the weekly digest
          </Link>
        ) : null}
      </div>

      <nav className="flex items-center justify-center gap-6 border-t border-ink/8 px-5 py-2 lg:hidden">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-mono text-[10px] tracking-[0.16em] text-ink/70 uppercase"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
