import { Ratelimit } from "@upstash/ratelimit";
import type { Redis } from "@upstash/redis";

import { getRedis } from "./client";
import type { ClientIdentity } from "./identity";

/** The part of Upstash's Ratelimit that we use (lets tests swap it out). */
export interface LimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  /** Unix time in ms when the window frees up. */
  reset: number;
  reason?: string;
}

export interface Limiter {
  limit(key: string): Promise<LimitResult>;
}

export interface RewriteLimiters {
  /** Per visitor, short window: stops rapid-fire clicking. */
  burst: Limiter;
  /** Per visitor, long window: the "free tries" allowance. */
  daily: Record<ClientIdentity["kind"], Limiter>;
  /** Everyone together: protects the shared free LLM quota. */
  global: Limiter;
}

export type DenyReason = "burst" | "daily" | "global";

export type RateLimitDecision =
  | {
      allowed: true;
      /** True when limiting is switched off (local dev without Redis). */
      skipped?: boolean;
      limit: number;
      remaining: number;
      reset: number;
    }
  | { allowed: false; reason: DenyReason; limit: number; reset: number }
  | { allowed: false; reason: "unavailable" };

function intFromEnv(name: string, fallback: number): number {
  const value = Number.parseInt(process.env[name] ?? "", 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export function getLimits() {
  return {
    anonymousPerDay: intFromEnv("RATE_LIMIT_ANON_PER_DAY", 5),
    userPerDay: intFromEnv("RATE_LIMIT_USER_PER_DAY", 30),
    perMinute: intFromEnv("RATE_LIMIT_PER_MINUTE", 3),
    globalPerMinute: intFromEnv("RATE_LIMIT_GLOBAL_PER_MINUTE", 10),
  };
}

// If Redis is slow, Upstash lets the request through after this long.
// We treat that as "deny" (see reason === "timeout" below).
const REDIS_TIMEOUT_MS = 2000;

export function createRewriteLimiters(redis: Redis): RewriteLimiters {
  const limits = getLimits();

  const make = (prefix: string, limiter: ReturnType<typeof Ratelimit.slidingWindow>) =>
    new Ratelimit({
      redis,
      prefix,
      limiter,
      timeout: REDIS_TIMEOUT_MS,
      analytics: false,
    });

  return {
    burst: make("rl:rewrite:burst", Ratelimit.slidingWindow(limits.perMinute, "1 m")),
    daily: {
      anonymous: make(
        "rl:rewrite:day:anon",
        Ratelimit.slidingWindow(limits.anonymousPerDay, "1 d"),
      ),
      user: make(
        "rl:rewrite:day:user",
        Ratelimit.slidingWindow(limits.userPerDay, "1 d"),
      ),
    },
    global: make(
      "rl:rewrite:global",
      Ratelimit.slidingWindow(limits.globalPerMinute, "1 m"),
    ),
  };
}

let defaultLimiters: RewriteLimiters | null | undefined;

// Created once per server instance so Upstash's in-memory cache can work.
function getDefaultLimiters(): RewriteLimiters | null {
  if (defaultLimiters !== undefined) return defaultLimiters;

  const redis = getRedis();
  defaultLimiters = redis ? createRewriteLimiters(redis) : null;
  return defaultLimiters;
}

const UNAVAILABLE: RateLimitDecision = { allowed: false, reason: "unavailable" };

function timedOut(): RateLimitDecision {
  console.error(
    `[rate-limit] Redis did not answer within ${REDIS_TIMEOUT_MS} ms; denying request.`,
  );
  return UNAVAILABLE;
}

let warnedAboutDisabled = false;

/**
 * Decides whether this visitor may call the AI right now.
 *
 * Order matters: per-visitor checks run first, so a visitor who is already
 * over their own limit never uses up the shared global allowance.
 * Downside: if the global limit then blocks them, they lose one personal try.
 *
 * Fails CLOSED in production (no Redis, Redis down, or Redis timeout):
 * we would rather show "unavailable" than let the free quota be drained.
 */
export async function rateLimitRewrite(
  identity: ClientIdentity,
  limiters: RewriteLimiters | null = getDefaultLimiters(),
): Promise<RateLimitDecision> {
  if (!limiters) {
    if (process.env.NODE_ENV === "production") {
      console.error("[rate-limit] Upstash env vars missing in production.");
      return UNAVAILABLE;
    }

    if (!warnedAboutDisabled) {
      warnedAboutDisabled = true;
      console.warn(
        "[rate-limit] UPSTASH_REDIS_REST_URL/TOKEN not set: rate limiting is OFF (development only).",
      );
    }
    return { allowed: true, skipped: true, limit: 0, remaining: 0, reset: 0 };
  }

  try {
    const key = `${identity.kind}:${identity.id}`;

    const burst = await limiters.burst.limit(key);
    if (burst.reason === "timeout") return timedOut();
    if (!burst.success) {
      return { allowed: false, reason: "burst", limit: burst.limit, reset: burst.reset };
    }

    const daily = await limiters.daily[identity.kind].limit(key);
    if (daily.reason === "timeout") return timedOut();
    if (!daily.success) {
      return { allowed: false, reason: "daily", limit: daily.limit, reset: daily.reset };
    }

    const global = await limiters.global.limit("rewrite");
    if (global.reason === "timeout") return timedOut();
    if (!global.success) {
      return { allowed: false, reason: "global", limit: global.limit, reset: global.reset };
    }

    return {
      allowed: true,
      limit: daily.limit,
      remaining: daily.remaining,
      reset: daily.reset,
    };
  } catch (error) {
    console.error("[rate-limit] Redis check failed:", error);
    return UNAVAILABLE;
  }
}

/** Standard rate-limit headers for allowed requests. */
export function rateLimitHeaders(
  decision: Extract<RateLimitDecision, { allowed: true }>,
): Record<string, string> {
  if (decision.skipped) return {};

  return {
    "X-RateLimit-Limit": String(decision.limit),
    "X-RateLimit-Remaining": String(decision.remaining),
    "X-RateLimit-Reset": String(Math.ceil(decision.reset / 1000)),
  };
}

/** HTTP status, user-facing message and headers for a denied request. */
export function describeDenial(
  decision: Extract<RateLimitDecision, { allowed: false }>,
  now: number = Date.now(),
): { status: number; message: string; headers: Record<string, string> } {
  if (decision.reason === "unavailable") {
    return {
      status: 503,
      message: "AI suggestions are temporarily unavailable. Please try again later.",
      headers: {},
    };
  }

  const retryAfter = Math.max(1, Math.ceil((decision.reset - now) / 1000));
  const headers = {
    "Retry-After": String(retryAfter),
    "X-RateLimit-Limit": String(decision.limit),
    "X-RateLimit-Remaining": "0",
    "X-RateLimit-Reset": String(Math.ceil(decision.reset / 1000)),
  };

  switch (decision.reason) {
    case "burst":
      return {
        status: 429,
        message: "You're going a bit fast. Please wait a minute and try again.",
        headers,
      };
    case "daily":
      return {
        status: 429,
        message: `You've used your ${decision.limit} free AI enhancements for today. Please come back tomorrow.`,
        headers,
      };
    case "global":
      return {
        status: 429,
        message: "The AI service is busy right now. Please try again in a minute.",
        headers,
      };
  }
}