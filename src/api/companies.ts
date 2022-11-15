import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddCompanyData } from "../types";
import { config } from "../utils";

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiBaseUrl,
  }),
  endpoints: (builder) => ({
    getcompanies: builder.query<any, string>({
      query: (id: string) => `get-companies/${id}`,
    }),
    addCompany: builder.mutation<AddCompanyData, Partial<AddCompanyData>>({
      query: (body) => {
        return {
          url: `add-company/`,
          method: "POST",
          body,
        };
      },
    }),
    updateCompany: builder.mutation<
      void,
      Pick<AddCompanyData, "_id"> & Partial<AddCompanyData>
    >({
      query: ({ _id, ...patch }) => ({
        url: `update-company/${_id}`,
        method: "PUT",
        body: patch,
      }),
      // invalidatesTags: (result, error, { _id }) => [{ type: "Post", _id }],
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/delete-company/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddCompanyMutation,
  useGetcompaniesQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companiesApi;
