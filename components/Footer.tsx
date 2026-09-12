import Link from "next/link";
import { DashedDivider } from "@/components/DashedDivider";
import { cx } from "@/lib/utils";

const aboutLinks = [
  { href: "/who-we-are", label: "Who we are" },
  { href: "/editorial-standards", label: "Editorial standards & sourcing" },
];

const contactLinks = [
  { href: "mailto:hello@akisok.com", label: "hello@akisok.com" },
  { href: "mailto:pitch@akisok.com", label: "Pitch a story" },
  { href: "https://instagram.com/akisok", label: "Instagram" },
  { href: "#digest", label: "WhatsApp channel" },
];

const showContact = false;

export function Footer() {
  return (
    <footer className="bg-cream text-ink">
      <DashedDivider />
      <div
        id="about"
        className={cx(
          "mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:px-10 lg:px-14 lg:py-20",
          showContact ? "md:grid-cols-3" : "md:grid-cols-2",
        )}
      >
        <div>
          <p className="font-display text-3xl tracking-tight">Akisok</p>
          <p className="mt-1 font-mono text-[9px] tracking-[0.22em] text-ink/55 uppercase">
            Akwa Ibom, curated
          </p>
          <p
            id="digest"
            className="mt-6 max-w-sm font-body text-[15px] leading-relaxed text-ink/75"
          >
            We publish for readers who left and readers who stayed: one
            original 150–800 word take, then the source. The weekly digest is
            the same rule, in your inbox.
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-ink/45 uppercase">
            About
          </p>
          <ul className="mt-5 space-y-3">
            {aboutLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-[15px] hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {showContact ? (
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-ink/45 uppercase">
              Contact
            </p>
            <ul className="mt-5 space-y-3">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[15px] hover:text-accent"
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <DashedDivider />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-5 font-mono text-[10px] tracking-[0.14em] text-ink/50 uppercase md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
        <p>© {new Date().getFullYear()} Akisok. Uyo / wherever you are reading.</p>
        <p>Sources always [linked]</p>
      </div>
    </footer>
  );
}
