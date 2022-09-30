import { configureStore } from '@reduxjs/toolkit';
import { merchantApi } from '../api';

export const Store = configureStore({
  reducer: {
    [merchantApi.reducerPath]: merchantApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(merchantApi.middleware),
});
