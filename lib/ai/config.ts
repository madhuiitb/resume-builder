import { AiConfigError } from "./errors";

export type AiProviderName = "gemini" | "groq";

export interface AiConfig {
  provider: AiProviderName;
  apiKey: string;
  model: string;
}

const DEFAULT_MODELS: Record<AiProviderName, string> = {
  gemini: "gemini-3.8-flash",
  groq: "openai/gpt-oss-20b",
};

/**
 * Reads the AI settings from server environment variables.
 * Never import this from client components: it touches secret keys.
 *
 *   AI_PROVIDER   "gemini" (default) or "groq"
 *   GEMINI_API_KEY / GROQ_API_KEY
 *   GEMINI_MODEL / GROQ_MODEL   optional overrides
 */
export function getAiConfig(): AiConfig {
  const provider = (process.env.AI_PROVIDER ?? "gemini").toLowerCase();

  if (provider === "gemini") {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new AiConfigError("GEMINI_API_KEY is not set");

    return {
      provider,
      apiKey,
      model: process.env.GEMINI_MODEL || DEFAULT_MODELS.gemini,
    };
  }

  if (provider === "groq") {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new AiConfigError("GROQ_API_KEY is not set");

    return {
      provider,
      apiKey,
      model: process.env.GROQ_MODEL || DEFAULT_MODELS.groq,
    };
  }

  throw new AiConfigError(`Unknown AI_PROVIDER "${provider}"`);
}