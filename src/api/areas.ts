import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AreaPayload, FetchAreaData } from "../types";
import { config } from "../utils";

export const areasApi = createApi({
  reducerPath: "areasApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiBaseUrl,
  }),
  endpoints: (builder) => ({
    getAreas: builder.query<any, string>({
      query: (id: string) => `get-areas/${id}`,
    }),
    addArea: builder.mutation<AreaPayload, Partial<AreaPayload>>({
      query: (body) => {
        return {
          url: `add-area/`,
          method: "POST",
          body,
        };
      },
    }),
    updateArea: builder.mutation<
      void,
      Pick<FetchAreaData, "_id"> & Partial<AreaPayload>
    >({
      query: ({ _id, ...patch }) => ({
        url: `update-area/${_id}`,
        method: "PUT",
        body: patch,
      }),
      // invalidatesTags: (result, error, { _id }) => [{ type: "Post", _id }],
    }),
    deleteArea: builder.mutation({
      query: (id) => ({
        url: `/delete-area/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAreasQuery,
  useAddAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
} = areasApi;
