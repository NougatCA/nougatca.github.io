import ccfList from "../data/ccf.json";

export type VenueType = "conference" | "journal";
export type CcfLevel = "A" | "B" | "C";

export interface CcfEntry {
  abbr: string;
  name: string;
  type: VenueType;
  level: CcfLevel;
}

const entries = ccfList as CcfEntry[];

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "");

const normalizedNames = entries.map((e) => norm(e.name));

const words = (s: string) => new Set(s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2));

// Some abbreviations (e.g. FSE) are shared by several entries of one type;
// the venue's full name decides between them.
function byAbbr(abbr: string, type?: VenueType, venue = ""): CcfEntry | undefined {
  const key = norm(abbr);
  if (!key) return undefined;
  const hits = entries.filter((e) => norm(e.abbr) === key && (!type || e.type === type));
  if (hits.length <= 1) return hits[0];

  const vw = words(venue);
  const scored = hits
    .map((e) => ({ e, score: [...words(e.name)].filter((w) => vw.has(w)).length }))
    .sort((a, b) => b.score - a.score);
  return scored[0].score >= 2 && scored[0].score > scored[1].score ? scored[0].e : undefined;
}

/**
 * Looks a venue up in the CCF list. `type` (from the BibTeX entry type) is
 * needed for automatic matching because some abbreviations (ASE, FSE, ...)
 * exist as both a journal and a conference.
 */
export function findCcf(venue: string, type?: VenueType, abbr?: string): CcfEntry | undefined {
  if (abbr) {
    const hit = byAbbr(abbr, type, venue);
    if (hit) return hit;
  }
  if (!type || !venue) return undefined;

  // 1. Abbreviation in parentheses, e.g. "... Software Engineering (ICSE)".
  for (const m of venue.matchAll(/\(([^)]+)\)/g)) {
    const hit = byAbbr(m[1].replace(/['’]?\d{2,4}$/, ""), type, venue);
    if (hit) return hit;
  }

  // 2. Full name, exact or inside the venue string (longest wins). Text after
  // the name is limited so that e.g. "... Software Engineering in Practice"
  // is not mistaken for the main ICSE track.
  const v = norm(venue.replace(/\([^)]*\)/g, ""));
  let best: CcfEntry | undefined;
  let bestLen = 0;
  entries.forEach((e, i) => {
    const n = normalizedNames[i];
    if (e.type !== type || n.length <= bestLen) return;
    const at = v.indexOf(n);
    if (at >= 0 && (n.length >= 20 || n === v) && v.length - at - n.length <= 8) {
      best = e;
      bestLen = n.length;
    }
  });
  if (best) return best;

  // 3. DBLP-style "..., ICSE 2024, ..." segment.
  const token = abbrFromSegments(venue);
  return token ? byAbbr(token, type, venue) : undefined;
}

const MONTHS = /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*$/i;

/** Finds a "<ABBR> <year>" comma-separated segment, e.g. "ICSE 2024". */
export function abbrFromSegments(venue: string): string | undefined {
  for (const segment of venue.split(",")) {
    const m = segment.trim().match(/^([A-Za-z][A-Za-z0-9@&+-]*)\s*['’]?(?:19|20)?\d{2}$/);
    if (m && !MONTHS.test(m[1])) return m[1];
  }
}

/** Abbreviation from the venue text itself: "(ICSE)" or a "ICSE 2024" segment. */
export function guessAbbr(venue: string): string | undefined {
  const paren = venue.match(/\(([A-Z][A-Za-z0-9&+-]+)\)\s*$/)?.[1];
  return paren ?? abbrFromSegments(venue);
}
