import { configureStore } from "@reduxjs/toolkit";
import { merchantApi } from "../api";
import { partiesApi } from "../api/parties";

export const Store = configureStore({
  reducer: {
    [merchantApi.reducerPath]: merchantApi.reducer,
    [partiesApi.reducerPath]: partiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      merchantApi.middleware,
      partiesApi.middleware
    ),
});
