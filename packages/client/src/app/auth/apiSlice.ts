import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../infrastructure/api/auth/contracts';

const API_ADDRESS = 'https://ya-praktikum.tech/api/v2';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ADDRESS,
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUserInfo: build.query<User, void>({
      query: () => `/auth/user`,
      keepUnusedDataFor: 600,
    }),
    updateUserInfo: build.mutation<User, Omit<User, 'id' | 'avatar'>>({
      query: (body) => ({
        url: '/user/profile',
        method: 'PUT',
        body,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              'getUserInfo',
              undefined,
              () => result.data
            )
          );
        } catch (error) {
          console.error('Failed to update user info');
        }
      },
    }),
  }),
});

export const { useGetUserInfoQuery, useUpdateUserInfoMutation } = apiSlice;
