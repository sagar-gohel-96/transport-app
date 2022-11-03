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
    updateUser: builder.mutation<
      void,
      Pick<AddUserPayload, "_id"> & Partial<AddUserPayload>
    >({
      query: ({ _id, ...patch }) => ({
        url: `update-user/${_id}`,
        method: "PUT",
        body: patch,
      }),
      // invalidatesTags: (result, error, { _id }) => [{ type: "Post", _id }],
    }),
  }),
});

export const { useAddUserMutation, useSigninMutation, useUpdateUserMutation } =
  authenticationApi;
