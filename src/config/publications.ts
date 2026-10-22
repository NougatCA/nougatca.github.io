// Controls how src/data/publications.bib is displayed.
import type { Lang } from "../data/profile";

type L10n = Record<Lang, string>;

export interface FieldItem {
  /**
   * Built-in: authors, title, venue, year, volume, number, pages, publisher.
   * Anything else is read from the raw BibTeX field of that name.
   */
  name: string;
  before?: string;
  after?: string;
}

export interface LinkItem {
  /** Raw BibTeX field holding the URL (or DOI). */
  field: string;
  /** Prepended to the field value, e.g. "https://doi.org/". */
  prefix?: string;
}

export const publicationsConfig = {
  /** Sort by publication date. */
  order: "desc" as "desc" | "asc",

  /** "year": group by year; "type": group by category below; "none": flat list. */
  groupBy: "year" as "year" | "type" | "none",

  /** Prefix entries with [N], counting up from 1 in display order. */
  numbered: true,

  /** Fields of the citation line, in order. Missing fields are skipped. */
  fields: [
    { name: "authors", after: ". " },
    { name: "title", after: ". " },
    { name: "venue" },
    { name: "volume", before: ", " },
    { name: "number", before: "(", after: ")" },
    { name: "pages", before: ", pp. " },
    { name: "year", before: ", ", after: "." },
  ] as FieldItem[],

  /**
   * Line above the citation, in order. Built-in: "abbr" (venue abbreviation,
   * bold italic), "ccf" (CCF level + conference/journal badge), "type"
   * (conference/journal badge only). Anything else is a raw BibTeX field
   * shown as a tag (e.g. "award").
   */
  head: ["abbr", "ccf", "award"],

  /**
   * Full-text PDF. All PDFs live in `public/papers/`; the BibTeX `pdf` field
   * holds the file name (or a sub-path) inside that directory, e.g.
   * pdf = {niu2024fair.pdf}. A value starting with http(s):// or "/" is used as is.
   * Without a `pdf` field, `public/papers/<citation key>.pdf` is used if it exists.
   */
  pdf: {
    field: "pdf",
    dir: "papers",
    label: { en: "PDF", zh: "PDF" } as L10n,
  },

  /**
   * arXiv link. The BibTeX `arxiv` field holds the arXiv URL, e.g.
   * arxiv = {https://arxiv.org/abs/2401.00000}. A bare ID is also accepted.
   */
  arxiv: {
    field: "arxiv",
    label: { en: "arXiv", zh: "arXiv" } as L10n,
  },

  /**
   * One link per entry: the first field below that exists in the entry.
   * DOI takes priority over URL.
   */
  link: {
    label: { en: "Link", zh: "链接" } as L10n,
    sources: [
      { field: "doi", prefix: "https://doi.org/" },
      { field: "url" },
    ] as LinkItem[],
  },

  /** Collapsible extras. */
  showAbstract: true,
  /** Button that copies the single-line BibTeX entry. */
  showBibtex: true,

  /** Authors to bold (matched against the displayed name). */
  highlightAuthors: ["Changan Niu", "牛长安"],

  /** Maps BibTeX entry types to categories (used by groupBy: "type"). */
  typeMap: {
    inproceedings: "conference",
    conference: "conference",
    proceedings: "conference",
    article: "journal",
    misc: "preprint",
    unpublished: "preprint",
  } as Record<string, string>,
  defaultCategory: "other",

  /** Category display order and titles. */
  categories: [
    { key: "conference", title: { en: "Conference Papers", zh: "会议论文" } },
    { key: "journal", title: { en: "Journal Articles", zh: "期刊论文" } },
    { key: "preprint", title: { en: "Preprints", zh: "预印本" } },
    { key: "other", title: { en: "Other", zh: "其他" } },
  ] as { key: string; title: L10n }[],

  labels: {
    abstract: { en: "Abstract", zh: "摘要" } as L10n,
    bibtex: { en: "BibTeX", zh: "BibTeX" } as L10n,
    copied: { en: "Copied", zh: "Copied" } as L10n,
    conference: { en: "Conference", zh: "会议" } as L10n,
    journal: { en: "Journal", zh: "期刊" } as L10n,
  },
};
