const rawSiteUrl =
  (import.meta.env["VITE_SITE_URL"] as string | undefined) || "https://keymasterr.netlify.app";

export const SITE_URL = rawSiteUrl.replace(/\/$/, "");

export const ALLOW_INDEXING =
  (import.meta.env["VITE_ALLOW_INDEXING"] as string | undefined) === "true";

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
