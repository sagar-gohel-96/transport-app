import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { AddPartyData } from '../types';
import { config } from '../utils';

export const partiesApi = createApi({
  reducerPath: 'partiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', token);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getParties: builder.query<any, string>({
      query: (id: string) => `get-parties/${id}`,
    }),
    addParty: builder.mutation<AddPartyData, Partial<AddPartyData>>({
      query: (body) => {
        return {
          url: `add-party/`,
          method: 'POST',
          body,
        };
      },
    }),
    updateParty: builder.mutation<
      void,
      Pick<AddPartyData, '_id'> & Partial<AddPartyData>
    >({
      query: ({ _id, ...patch }) => ({
        url: `update-party/${_id}`,
        method: 'PUT',
        body: patch,
      }),
      // invalidatesTags: (result, error, { _id }) => [{ type: "Post", _id }],
    }),
    deleteParty: builder.mutation({
      query: (id) => ({
        url: `/delete-party/${id}`,
        method: 'DELETE',
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
