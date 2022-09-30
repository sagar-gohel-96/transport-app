import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// console.log('url', process.env.BASE_URL);

export const merchantApi = createApi({
  reducerPath: 'merchantApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
    // baseUrl: process.env.BASE_URL,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<any, string>({
      query: () => `todos/`,
    }),
  }),
});

export const { useGetUsersQuery } = merchantApi;
