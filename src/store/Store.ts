import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { authenticationApi, partiesApi, areasApi, companiesApi } from "../api";
import { authSlice } from "./auth-slice";

export const Store = configureStore({
  reducer: {
    [partiesApi.reducerPath]: partiesApi.reducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
    [areasApi.reducerPath]: areasApi.reducer,

    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      partiesApi.middleware,
      authenticationApi.middleware,
      companiesApi.middleware,
      areasApi.middleware
    ),
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
