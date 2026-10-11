import { Redis } from "@upstash/redis";

let client: Redis | null | undefined;

/**
 * Lazily creates the Upstash Redis client from server env vars.
 * Returns null when they are not set (e.g. local dev without Redis).
 *
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 */
export function getRedis(): Redis | null {
  if (client !== undefined) return client;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  client = url && token ? new Redis({ url, token }) : null;
  return client;
}