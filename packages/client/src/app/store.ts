import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import user from './user/userSlice';
import forum from './forum/forumSlice';
import auth from './auth/authSlice';

export const store = configureStore({
  reducer: { auth, user, forum },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
