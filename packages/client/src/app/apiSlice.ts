import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, OauthRequest } from '../infrastructure/api/auth/contracts';
import { API_ADDRESS } from '@/infrastructure/apiFetch';
import { setTheme } from './themeSlice';
import AuthApi from '@/infrastructure/api/auth/authApi';
import fetch from 'isomorphic-fetch';

export const initialState: User = {
  avatar: undefined,
  display_name: undefined,
  email: '',
  first_name: '',
  id: '',
  login: '',
  phone: '',
  second_name: '',
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ADDRESS,
    credentials: 'include',
    fetchFn: fetch,
  }),
  endpoints: (build) => ({
    getUserInfo: build.query<User, void | undefined>({
      query: () => `/auth/user`,
      keepUnusedDataFor: 600,
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const user = (await queryFulfilled).data;
          const userInDb = await AuthApi.findUserInDb(user.id);

          if (!userInDb) {
            AuthApi.registerUserInDb(user);
            return;
          }
          dispatch(setTheme({ theme: userInDb.theme?.name }));
        } catch (error) {
          // continue regardless of error
        }
      },
    }),

    postOauth: build.query<void, OauthRequest>({
      query: (body) => ({
        url: `/oauth/yandex`,
        method: 'POST',
        body,
        responseHandler: 'text',
      }),
      keepUnusedDataFor: 1,
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
          await AuthApi.updateUserInDb(result.data);
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
