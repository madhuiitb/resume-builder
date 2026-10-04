import type { AiConfig } from "../config";
import { createGeminiProvider } from "./gemini";
import { createGroqProvider } from "./groq";
import type { AiProvider } from "./types";

export function createProvider(config: AiConfig): AiProvider {
  switch (config.provider) {
    case "gemini":
      return createGeminiProvider(config.apiKey, config.model);
    case "groq":
      return createGroqProvider(config.apiKey, config.model);
  }
}