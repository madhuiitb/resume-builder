import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { mockHandlers } from "./mock-handlers";

/**
 * Endpoints that exist on the real server. Add a URL here when its route
 * handler is built (Phase 7c adds "/ats/analyze").
 */
const LIVE_ENDPOINTS = new Set<string>(["/ai/rewrite"]);

/**
 * Mock mode is ON unless NEXT_PUBLIC_USE_MOCK_API is explicitly "false".
 * When off, endpoints in LIVE_ENDPOINTS call the real API and the rest
 * keep using mocks.
 */
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API !== "false";

const realBaseQuery = fetchBaseQuery({ baseUrl: "/api" });

function wait(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms);

    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

export const baseQuery: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (!USE_MOCK_API && LIVE_ENDPOINTS.has(args.url)) {
    return realBaseQuery(args, api, extraOptions);
  }

  const handler = mockHandlers[args.url];

  if (!handler) {
    return {
      error: { status: 404, data: { error: `No mock for ${args.url}` } },
    };
  }

  try {
    await wait(handler.delayMs, api.signal);
    return { data: handler.resolve(args.body) };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        error: { status: "CUSTOM_ERROR", error: "Request aborted" },
      };
    }

    return {
      error: { status: 500, data: { error: "Mock handler failed" } },
    };
  }
};