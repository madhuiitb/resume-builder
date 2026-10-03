import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "./base-query";

/**
 * The one API slice for the whole app. Feature endpoints are added with
 * `baseApi.injectEndpoints(...)` in ai-api.ts and ats-api.ts.
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});