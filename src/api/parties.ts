import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddPartyData } from "../types";

console.log("url", process.env.BASE_URL);

export const partiesApi = createApi({
  reducerPath: "partiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),
  endpoints: (builder) => ({
    getParties: builder.query<any, string>({
      query: (id: string) => `getParties/${id}`,
    }),
    addParty: builder.mutation<AddPartyData, Partial<AddPartyData>>({
      query: (body) => {
        return {
          url: `addParty/`,
          method: "POST",
          body,
        };
      },
    }),
    updateParty: builder.mutation<
      void,
      Pick<AddPartyData, "_id"> & Partial<AddPartyData>
    >({
      query: ({ _id, ...patch }) => ({
        url: `updateParty/${_id}`,
        method: "PUT",
        body: patch,
      }),
      // invalidatesTags: (result, error, { _id }) => [{ type: "Post", _id }],
    }),
    deleteParty: builder.mutation({
      query: (id) => ({
        url: `/deleteParty/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPartiesQuery,
  useAddPartyMutation,
  useUpdatePartyMutation,
  useDeletePartyMutation,
} = partiesApi;
