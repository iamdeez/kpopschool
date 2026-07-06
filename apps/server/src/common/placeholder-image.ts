import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Generates a self-contained SVG placeholder image (data URI) instead of
 * fetching one from a third-party service (picsum.photos, i.pravatar.cc).
 *
 * Found via an actual Lighthouse run (see docs/specs/v1.0.0/CHANGES.md):
 * those third-party image requests were the single biggest driver of a
 * failing mobile Performance score, because Lighthouse's simulated-slow-4G
 * model penalizes cross-origin requests heavily (observed real-world LCP
 * was under 1s; the simulated score treated it as 17s+). A data URI has no
 * network request at all, so there's nothing for that model to penalize.
 */
function toDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/**
 * Encodes a real photo from seed-assets/ as a data URI — same zero-network-request
 * property as the generated SVGs above, but a real face instead of initials
 * (the initials version read as an unfinished placeholder in practice, not a
 * deliberate design choice — see docs/specs/v1.0.0/CHANGES.md).
 */
export function seedPhoto(fileName: string): string {
  const bytes = readFileSync(join(__dirname, "seed-assets", fileName));
  return `data:image/webp;base64,${bytes.toString("base64")}`;
}

export function labelThumbnail(label: string, bgColor: string, width = 600, height = 400): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="sans-serif" font-size="${Math.floor(height / 10)}" font-weight="700" fill="#ffffff">${label}</text>
  </svg>`;
  return toDataUri(svg);
}
