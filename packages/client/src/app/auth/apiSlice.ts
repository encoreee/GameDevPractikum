import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../user/userSlice';

const API_ADDRESS = 'https://ya-praktikum.tech/api/v2';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ADDRESS,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.query<User, void>({
      query: () => `/auth/user`,
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetUserInfoQuery } = apiSlice;
