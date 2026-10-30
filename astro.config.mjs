// @ts-check
import { defineConfig } from "astro/config";
import { mkdirSync, renameSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Moves the generated plain-text file (for pasting into another homepage)
// from dist/ to plain/, so that it is not deployed with the site.
const plainMarkdown = {
  name: "plain-markdown",
  hooks: {
    "astro:build:done": ({ dir }) => {
      const out = new URL("./plain/", import.meta.url);
      mkdirSync(out, { recursive: true });
      renameSync(fileURLToPath(new URL("plain-homepage.txt", dir)), fileURLToPath(new URL("homepage.txt", out)));
    },
  },
};

export default defineConfig({
  site: "https://nougatca.github.io",

  output: "static",

  integrations: [plainMarkdown],

  i18n: {
    locales: ["en", "zh"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
});