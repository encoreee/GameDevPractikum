import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, OauthRequest } from '../infrastructure/api/auth/contracts';
import { API_ADDRESS, ApiFetchInstance } from '@/infrastructure/apiFetch';
import { setTheme } from './themeSlice';
import AuthApi from '@/infrastructure/api/auth/authApi';

const fetchFn = ApiFetchInstance.fetchFn;

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
    fetchFn,
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
            await AuthApi.registerUserInDb(user);
            return;
          }

          dispatch(setTheme({ theme: userInDb.theme?.name }));
        } catch (error) {
          //continue despite the error
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
          await AuthApi.updateUserInDb(result.data);
        } catch (error) {
          console.error('Failed to update user info in DB');
        }
      },
    }),
    updateUserAvatar: build.mutation<User, FormData>({
      query: (body) => ({
        url: '/user/profile/avatar',
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
          await AuthApi.updateUserInDb(result.data);
        } catch (error) {
          console.error('Failed to update user avatar in DB');
        }
      },
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  usePostOauthQuery,
  useUpdateUserAvatarMutation,
} = apiSlice;
