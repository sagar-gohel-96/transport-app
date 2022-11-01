import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { merchantApi } from "../api";
import { partiesApi } from "../api/parties";
import { authSlice } from "./auth-slice";

export const Store = configureStore({
  reducer: {
    [merchantApi.reducerPath]: merchantApi.reducer,
    [partiesApi.reducerPath]: partiesApi.reducer,

    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      merchantApi.middleware,
      partiesApi.middleware
    ),
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
