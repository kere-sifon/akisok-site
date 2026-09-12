export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function excerptFromBody(content: string, max = 170) {
  const paragraph =
    content
      .split(/\n\n+/)
      .map((block) => block.replace(/^#+\s+/, "").replace(/[*_`>#]/g, "").trim())
      .find((block) => block.length > 40) ?? content.replace(/\s+/g, " ").trim();

  if (paragraph.length <= max) return paragraph;
  return `${paragraph.slice(0, max).replace(/\s+\S*$/, "")}…`;
}
