import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, OauthRequest } from '../infrastructure/api/auth/contracts';
import { API_ADDRESS, LOCAL_ADDRESS } from '@/infrastructure/apiFetch';
import { setLightTheme } from './themeSlice';
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
          const userInDb = await fetch(
            `${LOCAL_ADDRESS}/api/users/${user.id}`
          ).then((res) => res.json());

          if (!userInDb) {
            fetch(`${LOCAL_ADDRESS}/api/users`, {
              method: 'post',
              body: JSON.stringify(user),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            });
            return;
          }

          dispatch(setLightTheme());
        } catch (error) {
          console.error('Failed to update user info');
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
