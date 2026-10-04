/** Server env is missing or invalid (e.g. no API key). */
export class AiConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AiConfigError";
  }
}

export type AiProviderErrorKind = "rate_limited" | "upstream" | "bad_output";

/** The AI provider failed, throttled us, or returned something unusable. */
export class AiProviderError extends Error {
  constructor(
    public readonly kind: AiProviderErrorKind,
    message: string,
    public readonly upstreamStatus?: number,
  ) {
    super(message);
    this.name = "AiProviderError";
  }
}