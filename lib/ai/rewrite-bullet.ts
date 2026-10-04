import type { BulletSuggestion } from "@/features/builder/types/ai";
import type { BulletEnhanceRequest } from "@/types/api";

import { getAiConfig } from "./config";
import { AiProviderError } from "./errors";
import {
  REWRITE_SYSTEM_PROMPT,
  buildRewriteUserPrompt,
  getExpectedFocuses,
} from "./prompts/rewrite-bullet";
import { createProvider } from "./providers";

const MAX_SUGGESTION_LENGTH = 300;
const VALID_FOCUSES = ["impact", "brevity", "keywords", "action-oriented"];

/** Models sometimes wrap JSON in ```json fences; remove them. */
function stripFences(raw: string): string {
  return raw.replace(/^\s*```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();
}

/** Removes leading bullet markers and surrounding quotes from a suggestion. */
function cleanSuggestion(text: string): string {
  return text
    .replace(/^\s*[-•*]\s*/, "")
    .replace(/^["“”']+|["“”']+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseSuggestions(
  raw: string,
  input: BulletEnhanceRequest,
): BulletSuggestion[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(stripFences(raw));
  } catch {
    throw new AiProviderError("bad_output", "Model output was not valid JSON");
  }

  const list = (parsed as { suggestions?: unknown })?.suggestions;
  if (!Array.isArray(list)) {
    throw new AiProviderError("bad_output", "Model output had no suggestions");
  }

  const expected = getExpectedFocuses(Boolean(input.targetKeywords?.length));
  const seen = new Set<string>([input.bulletText.toLowerCase()]);
  const result: BulletSuggestion[] = [];

  list.forEach((item, index) => {
    const text =
      typeof (item as { text?: unknown })?.text === "string"
        ? cleanSuggestion((item as { text: string }).text)
        : "";

    // Skip empty, oversized, unchanged, or duplicate suggestions.
    if (!text || text.length > MAX_SUGGESTION_LENGTH) return;
    if (seen.has(text.toLowerCase())) return;
    seen.add(text.toLowerCase());

    const rawFocus = (item as { focus?: unknown }).focus;
    const focus = (
      typeof rawFocus === "string" && VALID_FOCUSES.includes(rawFocus)
        ? rawFocus
        : (expected[index] ?? "impact")
    ) as BulletSuggestion["focus"];

    result.push({
      id: `sug-${result.length + 1}`,
      originalText: input.bulletText,
      enhancedText: text,
      focus,
    });
  });

  if (result.length === 0) {
    throw new AiProviderError("bad_output", "No usable suggestions returned");
  }

  return result.slice(0, 3);
}

export async function rewriteBullet(
  input: BulletEnhanceRequest,
  options: { signal?: AbortSignal } = {},
): Promise<BulletSuggestion[]> {
  const provider = createProvider(getAiConfig());

  const raw = await provider.generateJson({
    system: REWRITE_SYSTEM_PROMPT,
    user: buildRewriteUserPrompt(input),
    signal: options.signal,
  });

  return parseSuggestions(raw, input);
}