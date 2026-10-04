export interface GenerateJsonParams {
  system: string;
  user: string;
  signal?: AbortSignal;
}

/**
 * The only thing the rest of the app needs from an AI provider:
 * send a system + user prompt, get back raw JSON text.
 * Adding a provider = adding one file that implements this.
 */
export interface AiProvider {
  generateJson(params: GenerateJsonParams): Promise<string>;
}