/**
 * API contracts shared by the client (RTK Query) and the server
 * (route handlers in Phase 7). Keep request/response shapes here only.
 */
import type { AtsEvaluation } from "@/features/ats/types/ats";
import type {
  BulletEnhanceRequest,
  BulletSuggestion,
} from "@/features/builder/types/ai";

/** POST /api/ai/rewrite */
export type { BulletEnhanceRequest };

export interface BulletEnhanceResponse {
  suggestions: BulletSuggestion[];
}

/** POST /api/ats/analyze */
export interface AtsAnalyzeRequest {
  jobDescription: string;
  /** Plain text of the resume. PDF text extraction is added in Phase 7. */
  resumeText?: string;
}

export interface AtsAnalyzeResponse {
  evaluation: AtsEvaluation;
}

/** Shape of every error body returned by our API routes. */
export interface ApiErrorBody {
  error: string;
}