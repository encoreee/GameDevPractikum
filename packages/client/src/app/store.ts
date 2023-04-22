import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
<<<<<<< HEAD
} from '@reduxjs/toolkit'
import user from './user/userSlice'

export const store = configureStore({
  reducer: { user },
})
=======
} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});
>>>>>>> sprint_1

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
