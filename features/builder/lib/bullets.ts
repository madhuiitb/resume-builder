/**
 * Experience descriptions are stored as a single string (one bullet per line).
 * These helpers convert between that string and an array for the editor,
 * the live preview and the PDF.
 */

export function toBulletLines(description: string): string[] {
  return description.split("\n");
}

export function fromBulletLines(lines: string[]): string {
  return lines.join("\n");
}

/** Non-empty, trimmed bullets with any leading list markers removed. */
export function toDisplayBullets(description: string): string[] {
  return description
    .split("\n")
    .map((line) => line.replace(/^\s*[-•*]\s*/, "").trim())
    .filter(Boolean);
}