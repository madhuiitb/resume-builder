import { generateMockBulletSuggestions } from "../mocks/ai-suggestions-mock";
import type { BulletEnhanceRequest, BulletSuggestion } from "../types/ai";

const MOCK_LATENCY_MS = 900;

/**
 * Single entry point the UI uses to enhance a bullet.
 *
 * Phase 5: resolves mocked suggestions after a short delay.
 * Phase 6/7: replace the body with the RTK Query mutation / `/api/ai/rewrite`
 * call. The signature must stay the same so no component changes are needed.
 */
export async function enhanceBullet(
  request: BulletEnhanceRequest,
  signal?: AbortSignal,
): Promise<BulletSuggestion[]> {
  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, MOCK_LATENCY_MS);

    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });

  return generateMockBulletSuggestions(request.bulletText);
}