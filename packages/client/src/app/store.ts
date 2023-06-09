import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import forum from './forum/forumSlice';
import leaderboard from './leaderboardSlice/leaderboardSlice';
import theme from './themeSlice';

export const store = configureStore({
  reducer: {
    forum,
    theme,
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
