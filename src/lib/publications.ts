import { Cite, plugins } from "@citation-js/core";
import "@citation-js/plugin-bibtex";
import { existsSync } from "node:fs";
import bibSource from "../data/publications.bib?raw";
import { publicationsConfig as config } from "../config/publications";
import { findCcf, guessAbbr, type CcfLevel, type VenueType } from "./ccf";

export interface Author {
  name: string;
  highlight: boolean;
}

export interface Publication {
  id: string;
  type: string;
  category: string;
  year?: number;
  authors: Author[];
  fields: Record<string, string>;
  /** Original BibTeX entry collapsed onto a single line. */
  bibtex: string;
  venueType?: VenueType;
  ccf?: CcfLevel;
  /** Short venue name; also available as `fields.abbr`. */
  abbr?: string;
}

export interface PublicationGroup {
  key: string;
  titles: Record<string, string>;
  items: Publication[];
}

const clean = (value: unknown): string =>
  String(value ?? "")
    .replace(/\\([&%$#_])/g, "$1")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const hasCJK = (s: string) => /[\u3400-\u9fff]/.test(s);

function formatName(a: { given?: string; family?: string; literal?: string }): string {
  if (a.literal) return clean(a.literal);
  const given = clean(a.given);
  const family = clean(a.family);
  if (hasCJK(given + family)) return family + given;
  return [given, family].filter(Boolean).join(" ");
}

// Cuts the entry out of the .bib source (brace matching) and puts it on one line.
function extractEntry(id: string): string {
  const start = new RegExp(`@\\w+\\s*\\{\\s*${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*,`).exec(bibSource);
  if (!start) return "";
  let depth = 0;
  for (let i = start.index; i < bibSource.length; i++) {
    if (bibSource[i] === "{") depth++;
    else if (bibSource[i] === "}" && --depth === 0) {
      return bibSource.slice(start.index, i + 1).replace(/\s*\n\s*/g, " ").trim();
    }
  }
  return "";
}

const CONFERENCE_TYPES = ["inproceedings", "conference", "proceedings", "incollection"];

function resolveVenueType(bibType: string, fields: Record<string, string>): VenueType | undefined {
  const manual = fields.venuetype?.toLowerCase();
  if (manual === "conference" || manual === "journal") return manual;
  if (CONFERENCE_TYPES.includes(bibType)) return "conference";
  if (bibType === "article") return "journal";
  return undefined;
}

function load(): Publication[] {
  const csl = new Cite(bibSource).data as any[];
  const raw = plugins.input.chain(bibSource, {
    type: "@biblatex/text",
    target: "@biblatex/entries+list",
  }) as { type: string; label: string; properties: Record<string, unknown> }[];
  const rawById = new Map(raw.map((r) => [r.label, r]));

  const pubs = csl.map((c) => {
    const r = rawById.get(c.id);
    const props = r?.properties ?? {};
    const type = r?.type ?? "misc";

    const fields: Record<string, string> = {};
    for (const [k, v] of Object.entries(props)) fields[k.toLowerCase()] = clean(v);

    // Prefer citation-js's decoded values (LaTeX accents etc.) for standard fields.
    const parts = c.issued?.["date-parts"]?.[0] ?? [];
    const year = parts[0] ? Number(parts[0]) : undefined;
    const sortKey = (parts[0] ?? 0) * 10000 + (parts[1] ?? 0) * 100 + (parts[2] ?? 0);
    fields.title = clean(c.title) || fields.title || "";
    fields.venue =
      clean(c["container-title"]) ||
      fields.howpublished ||
      fields.school ||
      fields.institution ||
      fields.publisher ||
      "";
    if (year) fields.year = String(year);
    if (c.volume) fields.volume = clean(c.volume);
    if (c.issue) fields.number = clean(c.issue);
    if (c.page) fields.pages = clean(c.page).replace(/-/g, "–");

    // Venue type, CCF level and abbreviation: BibTeX fields win over auto-detection.
    const venueType = resolveVenueType(type, fields);
    const match = findCcf(fields.venue, venueType, fields.abbr);
    const manualCcf = fields.ccf?.trim().toUpperCase();
    const ccf = (manualCcf ? manualCcf : match?.level) as string | undefined;
    const abbr = fields.abbr || match?.abbr || guessAbbr(fields.venue);
    if (abbr) fields.abbr = abbr;

    // No explicit pdf field: fall back to public/<dir>/<citation key>.pdf if it exists.
    const pdfDir = `public/${config.pdf.dir}`;
    if (!fields[config.pdf.field] && existsSync(`${pdfDir}/${c.id}.pdf`)) {
      fields[config.pdf.field] = `${c.id}.pdf`;
    }
    const pdf = fields[config.pdf.field];
    if (pdf && !/^(https?:)?\/\//.test(pdf) && !pdf.startsWith("/") && !existsSync(`${pdfDir}/${pdf}`)) {
      console.warn(`[publications] ${c.id}: PDF not found at ${pdfDir}/${pdf}`);
    }

    const authors = ((c.author ?? []) as any[]).map((a) => {
      const name = formatName(a);
      return { name, highlight: config.highlightAuthors.includes(name) };
    });

    return {
      pub: {
        id: c.id as string,
        type,
        category: config.typeMap[type] ?? config.defaultCategory,
        year,
        authors,
        fields,
        bibtex: extractEntry(c.id),
        venueType: venueType ?? match?.type,
        ccf: ccf === "A" || ccf === "B" || ccf === "C" ? ccf : undefined,
        abbr,
      } satisfies Publication,
      sortKey,
    };
  });

  pubs.sort((a, b) => (config.order === "desc" ? b.sortKey - a.sortKey : a.sortKey - b.sortKey));
  return pubs.map(({ pub }) => pub);
}

export function getPublications(): Publication[] {
  return load();
}

export function groupPublications(pubs: Publication[]): PublicationGroup[] {
  const { groupBy } = config;
  if (groupBy === "none") return [{ key: "all", titles: {}, items: pubs }];

  if (groupBy === "type") {
    return config.categories
      .map((c) => ({ key: c.key, titles: c.title as Record<string, string>, items: pubs.filter((p) => p.category === c.key) }))
      .filter((g) => g.items.length > 0);
  }

  const groups = new Map<string, Publication[]>();
  for (const p of pubs) {
    const key = p.year ? String(p.year) : "—";
    (groups.get(key) ?? groups.set(key, []).get(key)!).push(p);
  }
  return [...groups].map(([key, items]) => ({ key, titles: { en: key, zh: key }, items }));
}
