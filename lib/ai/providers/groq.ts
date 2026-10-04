import { AiProviderError } from "../errors";
import type { AiProvider } from "./types";

const ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

interface ChatCompletionResponse {
  choices?: { message?: { content?: string } }[];
}

export function createGroqProvider(apiKey: string, model: string): AiProvider {
  return {
    async generateJson({ system, user, signal }) {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
          max_tokens: 1024,
        }),
        signal,
      });

      if (!res.ok) {
        throw new AiProviderError(
          res.status === 429 ? "rate_limited" : "upstream",
          `Groq responded with HTTP ${res.status}`,
          res.status,
        );
      }

      const data = (await res.json()) as ChatCompletionResponse;
      const text = data.choices?.[0]?.message?.content;

      if (!text) {
        throw new AiProviderError("bad_output", "Groq returned no text");
      }

      return text;
    },
  };
}