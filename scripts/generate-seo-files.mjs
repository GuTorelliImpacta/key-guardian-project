// Gera public/robots.txt e public/sitemap.xml a partir das env vars de build,
// para que trocar SITE_URL/ALLOW_INDEXING não exija editar código (P1-B).
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const siteUrl = (
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  "https://keymasterr.netlify.app"
).replace(/\/$/, "");
const allowIndexing = (process.env.VITE_ALLOW_INDEXING || process.env.ALLOW_INDEXING) === "true";

const routes = ["/", "/servicos", "/sobre", "/contato", "/politica-de-privacidade"];

const robotsTxt = allowIndexing
  ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  : `User-agent: *\nDisallow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map((route) => `  <url>\n    <loc>${siteUrl}${route}</loc>\n  </url>`)
  .join("\n")}\n</urlset>\n`;

writeFileSync(join(publicDir, "robots.txt"), robotsTxt);
writeFileSync(join(publicDir, "sitemap.xml"), sitemapXml);

console.log(
  `[generate-seo-files] SITE_URL=${siteUrl} ALLOW_INDEXING=${allowIndexing} → robots.txt e sitemap.xml gerados.`,
);
