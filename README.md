# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## Content

| What | Where |
| :--- | :--- |
| Name, affiliation, address, email, links, About Me, section titles (EN + ZH) | [`src/data/profile.ts`](./src/data/profile.ts) |
| Photo library | images in [`public/photos/`](./public/photos/), metadata in [`src/data/photos.json`](./src/data/photos.json) |
| Publications data | [`src/data/publications.bib`](./src/data/publications.bib) |
| Publications display | [`src/config/publications.ts`](./src/config/publications.ts) |

Both pages render the shared [`Home.astro`](./src/components/Home.astro) component.

### Photos

Put each image in `public/photos/`, then add an entry to `src/data/photos.json`:

```json
{ "file": "lab.jpg", "en": "English caption", "zh": "中文说明" }
```

On every page load one entry is picked at random (client-side), with the caption
in the page's language. Without JavaScript the first entry is shown.

### About sections

`about` in `src/data/profile.ts` is a list of headings (Biography, Experience,
Research Interests, Admissions), each with `paragraphs` (text), `items`
(list; give an item a `period` to get a date column), or both.

### Publications

All entries in `publications.bib` are shown (parsed with `@citation-js/plugin-bibtex`).
`src/config/publications.ts` controls sort order, grouping (`year` / `type` / `none`),
numbering (1..N in display order), the citation-line fields and punctuation, the line
above each entry (`head`), the single link (DOI first, then URL), the copy-BibTeX
button (copies the original entry on one line) and the abstract toggle.

**Full-text PDFs.** Put all PDFs in [`public/papers/`](./public/papers/) and give each
entry its file name in the BibTeX `pdf` field, e.g. `pdf = {niu2024fair.pdf}` (sub-paths
like `2024/fair.pdf` work; a value starting with `http(s)://` or `/` is used as is).
If an entry has no `pdf` field, `public/papers/<citation key>.pdf` is picked up automatically
when that file exists (e.g. `niu2022deep.pdf` for `@inproceedings{niu2022deep, ...}`).
The build prints a warning if an explicit `pdf` file is missing. The directory name is `pdf.dir` in
`src/config/publications.ts`.

**arXiv link.** Add `arxiv = {https://arxiv.org/abs/2401.00000}` to an entry to show an
arXiv link after the PDF link and before the DOI link (a bare ID such as `2401.00000` also works). Label: `arxiv.label`
in `src/config/publications.ts`.

**CCF level and venue abbreviation.** Each entry shows the venue abbreviation
(bold italic), a CCF-A/B/C badge and whether it is a conference or journal. They are
detected from the venue name using [`src/data/ccf.json`](./src/data/ccf.json), a
compact copy of the CCF recommended list taken from
[ccf-recommended-list-google-scholar-extension](https://github.com/FIN-Warrah/ccf-recommended-list-google-scholar-extension)
(MIT). Conference vs. journal comes from the BibTeX entry type. If detection fails or
is wrong, set it in the entry:

```bibtex
abbr      = {ICSE},          % venue abbreviation
ccf       = {A},             % A, B, C, or none
venuetype = {conference},    % or journal; only if the entry type is misleading
```

## Page layout

Both language pages import [`src/styles/global.css`](./src/styles/global.css)
for a centered layout with a maximum width of 960px. On smaller screens, the
layout adapts to the viewport with 1rem of space on each side. Import this
stylesheet in new pages to keep the same layout.

## Fonts

Both language pages use shared font declarations in
[`src/styles/global.css`](./src/styles/global.css). The default font stack is
`"Linux Libertine", serif`: Latin text uses Libertine, while Chinese characters
not covered by Libertine fall back to the browser's default serif font.
This works for mixed Chinese and English text on either page. The exact
Chinese serif font depends on the visitor's system and browser settings.

The site uses self-hosted Linux Libertine 5.3.0 webfonts from
[`public/fonts/linux-libertine/`](./public/fonts/linux-libertine/), loaded with
`@font-face`. Visitors do not need to install the font. Regular, bold, italic,
and bold italic are included; `font-display: swap` keeps text visible while
the fonts load.

The WOFF files come from the
[linlibertine webfont distribution](https://github.com/iliakonnov/linlibertine/tree/adbbf477b8e554087bf8a9856c494d1656b55900/woff).
They are distributed under the SIL Open Font License 1.1; keep the bundled
[`OFL-1.1.txt`](./public/fonts/linux-libertine/OFL-1.1.txt) when redistributing them.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Deployment

Pushing to `main` builds the static site and deploys it to GitHub Pages using
GitHub Actions. The repository's Pages source must be set to **GitHub Actions**.
The site is configured for the root domain `https://nougatca.github.io`.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
