import { plain, PLAIN_PUBLICATION_IDS, type PlainContent } from "../data/plain";
import type { Lang } from "../data/profile";
import { getPublications, type Publication } from "./publications";

function formatPublication(pub: Publication, index: number, and: string): string {
  const names = pub.authors.map((a) => a.name);
  const authors =
    names.length > 1 ? `${names.slice(0, -1).join(", ")}${and}${names[names.length - 1]}` : names.join("");

  const venue = pub.abbr ? [pub.abbr, pub.year].filter(Boolean).join(" ") : [pub.fields.venue, pub.year].filter(Boolean).join(", ");
  const tags = [pub.ccf && `CCF-${pub.ccf}`, pub.fields.award && pub.fields.award].filter(Boolean);

  const title = /[?!]$/.test(pub.fields.title) ? pub.fields.title : `${pub.fields.title}.`;

  return `[${index}] ${authors}. ${title} ${venue}.${tags.length ? ` (${tags.join(", ")})` : ""}`;
}

function selectedPublications(): Publication[] {
  const byId = new Map(getPublications().map((p) => [p.id, p]));
  return PLAIN_PUBLICATION_IDS.flatMap((id) => {
    const pub = byId.get(id);
    if (!pub) console.warn(`[plain] publication "${id}" not found in publications.bib`);
    return pub ? [pub] : [];
  });
}

function section(c: PlainContent): string {
  const pubs = selectedPublications();

  const block = (title: string, lines: string[]) => [title, ...lines].join("\n\n");

  return [
    block(c.biographyTitle, [...c.biography, c.homepage.join("\n")]),
    block(c.researchTitle, c.research),
    block(c.admissionsTitle, c.admissions),
    block(
      c.publicationsTitle,
      pubs.map((p, i) => formatPublication(p, i + 1, c.and)),
    ),
  ].join("\n\n");
}

/** Unformatted plain text of the homepage, ready to paste elsewhere. Languages set to null are skipped. */
export function buildPlainText(): string {
  const sections = (["zh", "en"] as Lang[]).flatMap((lang) => {
    const c = plain[lang];
    return c ? [section(c)] : [];
  });
  return sections.join("\n\n----------\n\n") + "\n";
}
