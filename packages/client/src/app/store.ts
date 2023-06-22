import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import forum from './forum/forumSlice';
import leaderboard from './leaderboardSlice/leaderboardSlice';
import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: {
    forum,
    leaderboard,
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
