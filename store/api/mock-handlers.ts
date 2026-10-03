import { generateMockBulletSuggestions } from "@/features/builder/mocks/ai-suggestions-mock";
import { buildMockAtsEvaluation } from "@/features/ats/mocks/ats-analyzer-mock";
import type {
  AtsAnalyzeRequest,
  AtsAnalyzeResponse,
  BulletEnhanceRequest,
  BulletEnhanceResponse,
} from "@/types/api";

interface MockHandler {
  delayMs: number;
  resolve: (body: unknown) => unknown;
}

/**
 * Fake server. Keys match the `url` used by each RTK Query endpoint
 * (relative to the "/api" base). Used only while NEXT_PUBLIC_USE_MOCK_API
 * is not "false".
 */
export const mockHandlers: Record<string, MockHandler> = {
  "/ai/rewrite": {
    delayMs: 900,
    resolve: (body): BulletEnhanceResponse => {
      const { bulletText } = body as BulletEnhanceRequest;
      return { suggestions: generateMockBulletSuggestions(bulletText) };
    },
  },

  "/ats/analyze": {
    delayMs: 1000,
    resolve: (body): AtsAnalyzeResponse => {
      const { jobDescription } = body as AtsAnalyzeRequest;
      return { evaluation: buildMockAtsEvaluation(jobDescription) };
    },
  },
};