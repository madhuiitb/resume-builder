import { AiConfigError, AiProviderError } from "@/lib/ai/errors";
import { rewriteBullet } from "@/lib/ai/rewrite-bullet";
import { parseRewriteRequest } from "@/lib/validation/rewrite-request";
import type { ApiErrorBody, BulletEnhanceResponse } from "@/types/api";

// Upper bound for one request on the hosting platform (seconds).
export const maxDuration = 30;

const UPSTREAM_TIMEOUT_MS = 25_000;
const MAX_BODY_BYTES = 10_000;

function errorResponse(
  error: string,
  status: number,
  headers?: Record<string, string>,
) {
  return Response.json({ error } satisfies ApiErrorBody, { status, headers });
}

export async function POST(request: Request) {
  // Cheap guard before we read the body.
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return errorResponse("Request body is too large.", 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Request body must be valid JSON.", 400);
  }

  const parsed = parseRewriteRequest(body);
  if (!parsed.ok) {
    return errorResponse(parsed.error, 400);
  }

  try {
    const suggestions = await rewriteBullet(parsed.value, {
      signal: AbortSignal.any([
        request.signal,
        AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      ]),
    });

    return Response.json({ suggestions } satisfies BulletEnhanceResponse);
  } catch (error) {
    if (error instanceof AiConfigError) {
      // Detail goes to server logs only, never to the browser.
      console.error("[ai/rewrite] config error:", error.message);
      return errorResponse("AI suggestions are not available right now.", 503);
    }

    if (error instanceof AiProviderError) {
      console.error(`[ai/rewrite] provider ${error.kind}:`, error.message);

      if (error.kind === "rate_limited") {
        return errorResponse(
          "The AI service is busy. Please try again in a minute.",
          429,
          { "Retry-After": "30" },
        );
      }

      return errorResponse(
        "The AI service returned an unusable response. Please try again.",
        502,
      );
    }

    if (error instanceof DOMException && error.name === "TimeoutError") {
      return errorResponse("The AI service took too long. Please try again.", 504);
    }

    console.error("[ai/rewrite] unexpected error:", error);
    return errorResponse("Something went wrong. Please try again.", 500);
  }
}