import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddUserPayload } from "../types/userType";
import { config } from "../utils";

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiBaseUrl,
  }),
  endpoints: (builder) => ({
    addUser: builder.mutation<AddUserPayload, Partial<AddUserPayload>>({
      query: (body) => {
        return {
          url: `signup/`,
          method: "POST",
          body,
        };
      },
    }),
    signin: builder.mutation({
      query: (body) => {
        return {
          url: `signin/`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useAddUserMutation, useSigninMutation } = authenticationApi;
