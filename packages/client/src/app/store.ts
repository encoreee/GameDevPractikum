import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import forum from './forum/forumSlice';
import { apiSlice } from './apiSlice';
import profile from '../features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    forum,
    profile,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
