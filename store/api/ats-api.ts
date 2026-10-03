import type { AtsAnalyzeRequest, AtsAnalyzeResponse } from "@/types/api";

import { baseApi } from "./base-api";

export const atsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    analyzeAts: build.mutation<AtsAnalyzeResponse, AtsAnalyzeRequest>({
      query: (body) => ({
        url: "/ats/analyze",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAnalyzeAtsMutation } = atsApi;