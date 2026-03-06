import type { APIRoute } from "astro";

export const prerender = true;

const routes = [
  "/",
  "/about.html",
  "/sunday-service.html",
  "/small-gatherings.html",
  "/our-beliefs.html",
  "/get-in-touch.html",
  "/read-learn.html",
  "/stashed_content.html",
];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL("https://bethesdachristiancentre.org");
  const urls = routes
    .map((route) => {
      const loc = new URL(route, base).toString();
      return `<url><loc>${loc}</loc></url>`;
    })
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
