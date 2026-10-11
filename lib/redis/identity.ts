/**
 * Who is making the request. Phase 7c adds "user" (signed in); until then
 * every visitor is "anonymous" and is told apart by IP address.
 */
export interface ClientIdentity {
  kind: "anonymous" | "user";
  id: string;
}

/**
 * Best-effort client IP. On Vercel the platform sets x-forwarded-for itself,
 * so clients cannot spoof it. Behind other proxies, check how they set it.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();

  return first || request.headers.get("x-real-ip")?.trim() || "unknown";
}

/** We store a hash, not the raw IP address, in Redis. */
async function hash(value: string): Promise<string> {
  const salt = process.env.RATE_LIMIT_SALT ?? "";
  const data = new TextEncoder().encode(salt + value);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}

export async function getClientIdentity(
  request: Request,
): Promise<ClientIdentity> {
  // Phase 7c: if the request has a valid session, return
  // { kind: "user", id: user.id } here instead.
  return { kind: "anonymous", id: await hash(getClientIp(request)) };
}