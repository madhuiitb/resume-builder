import type {
  BulletEnhanceRequest,
  BulletEnhanceResponse,
} from "@/types/api";

import { baseApi } from "./base-api";

export const aiApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    enhanceBullet: build.mutation<BulletEnhanceResponse, BulletEnhanceRequest>({
      query: (body) => ({
        url: "/ai/rewrite",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useEnhanceBulletMutation } = aiApi;