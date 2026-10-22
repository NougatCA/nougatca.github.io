// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://nougatca.github.io",

  output: "static",

  i18n: {
    locales: ["en", "zh"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
});