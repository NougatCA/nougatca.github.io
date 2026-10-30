import type { APIRoute } from "astro";
import { buildPlainText } from "../lib/plain";

// Emitted at build time; astro.config.mjs moves it from dist/ to plain/ so it is not deployed.
export const GET: APIRoute = () =>
  new Response(buildPlainText(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
