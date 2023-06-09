import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, OauthRequest } from '../infrastructure/api/auth/contracts';
import { API_ADDRESS } from '@/infrastructure/apiFetch';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ADDRESS,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    getUserInfo: build.query<User, void>({
      query: () => `/auth/user`,
      keepUnusedDataFor: 600,
    }),
    postOauth: build.query<void, OauthRequest>({
      query: (body) => ({ url: `/oauth/yandex`, method: 'POST', body }),
      keepUnusedDataFor: 100,
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

export const {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  usePostOauthQuery,
} = apiSlice;
