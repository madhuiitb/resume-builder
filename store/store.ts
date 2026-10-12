import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./api/base-api";
import builderReducer from "./slices/builder-slice";

export const store = configureStore({
  reducer: {
    builder: builderReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;