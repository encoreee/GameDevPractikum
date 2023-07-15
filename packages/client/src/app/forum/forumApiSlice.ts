import { LOCAL_ADDRESS } from '@/infrastructure/apiFetch';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import fetch from 'isomorphic-fetch';

export const forumApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: LOCAL_ADDRESS,
    credentials: 'include',
    fetchFn: fetch,
  }),
  endpoints: (build) => ({
    getThreadList: build.query<any, void | undefined>({
      query: () => '/api/topics',
      keepUnusedDataFor: 600,
    }),
    createThread: build.query<any, void | undefined>({
      query: (body) => ({
        url: `/api/topics`,
        method: 'POST',
        body,
        responseHandler: 'text',
      }),
      keepUnusedDataFor: 1,
    }),
  }),
});

export const { useGetThreadListQuery, useCreateThreadQuery } = forumApiSlice;
