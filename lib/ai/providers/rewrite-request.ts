import type { BulletEnhanceRequest } from "@/types/api";

export const REWRITE_LIMITS = {
  bulletText: 500,
  jobTitle: 100,
  keywords: 10,
  keywordLength: 40,
} as const;

type ParseResult =
  | { ok: true; value: BulletEnhanceRequest }
  | { ok: false; error: string };

/** Strip control characters and collapse whitespace. */
function clean(text: string): string {
  return text.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Validates an untrusted request body. Never trust the client: the UI limits
 * are not enforced anywhere except here.
 */
export function parseRewriteRequest(body: unknown): ParseResult {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const { bulletText, jobTitle, targetKeywords } = body as Record<
    string,
    unknown
  >;

  if (typeof bulletText !== "string" || clean(bulletText) === "") {
    return { ok: false, error: "bulletText is required." };
  }

  const text = clean(bulletText);
  if (text.length > REWRITE_LIMITS.bulletText) {
    return {
      ok: false,
      error: `bulletText must be at most ${REWRITE_LIMITS.bulletText} characters.`,
    };
  }

  let title: string | undefined;
  if (jobTitle !== undefined) {
    if (typeof jobTitle !== "string") {
      return { ok: false, error: "jobTitle must be a string." };
    }
    title = clean(jobTitle).slice(0, REWRITE_LIMITS.jobTitle) || undefined;
  }

  let keywords: string[] | undefined;
  if (targetKeywords !== undefined) {
    if (
      !Array.isArray(targetKeywords) ||
      targetKeywords.length > REWRITE_LIMITS.keywords ||
      !targetKeywords.every((k) => typeof k === "string")
    ) {
      return {
        ok: false,
        error: `targetKeywords must be up to ${REWRITE_LIMITS.keywords} strings.`,
      };
    }
    keywords = targetKeywords
      .map((k: string) => clean(k).slice(0, REWRITE_LIMITS.keywordLength))
      .filter(Boolean);
  }

  return {
    ok: true,
    value: {
      bulletText: text,
      jobTitle: title,
      targetKeywords: keywords && keywords.length > 0 ? keywords : undefined,
    },
  };
}