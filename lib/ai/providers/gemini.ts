import { AiProviderError } from "../errors";
import type { AiProvider } from "./types";

const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

interface GeminiResponse {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
}

export function createGeminiProvider(apiKey: string, model: string): AiProvider {
  return {
    async generateJson({ system, user, signal }) {
      const res = await fetch(`${BASE_URL}/${model}:generateContent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Key goes in a header, never in the URL (URLs end up in logs).
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: "user", parts: [{ text: user }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
        signal,
      });

      if (!res.ok) {
        throw new AiProviderError(
          res.status === 429 ? "rate_limited" : "upstream",
          `Gemini responded with HTTP ${res.status}`,
          res.status,
        );
      }

      const data = (await res.json()) as GeminiResponse;
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new AiProviderError("bad_output", "Gemini returned no text");
      }

      return text;
    },
  };
}