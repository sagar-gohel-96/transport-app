import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TransactionPayload } from "../types";
import { config } from "../utils";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiBaseUrl,
  }),
  endpoints: (builder) => ({
    getTransactions: builder.query<any, string>({
      query: (id: string) => `get-transactions/${id}`,
    }),

    addTransaction: builder.mutation<
      TransactionPayload,
      Partial<TransactionPayload>
    >({
      query: (body) => {
        return {
          url: `add-transaction/`,
          method: "POST",
          body,
        };
      },
    }),
    updateTransaction: builder.mutation<
      void,
      Pick<TransactionPayload, "_id"> & Partial<TransactionPayload>
    >({
      query: ({ _id, ...patch }) => ({
        url: `update-transactions/${_id}`,
        method: "PUT",
        body: patch,
      }),
      // invalidatesTags: (result, error, { _id }) => [{ type: "Post", _id }],
    }),
  }),
});

export const { useGetTransactionsQuery, useAddTransactionMutation } =
  transactionApi;
