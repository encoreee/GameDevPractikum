import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserApi from '@/infrastructure/api/user/userApi';
import { RootState } from './store';

export const toggleThemeAsync = createAsyncThunk(
  'theme-slice/toggleThemeAsync',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { mode } = state.theme;

    const updatedMode =
      mode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK;

    try {
      await UserApi.toggleUserTheme(updatedMode);
      return updatedMode;
    } catch (error) {
      console.error('Failed to save theme data to DB');
    }
  }
);

export const ThemeMode = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export interface ThemeState {
  mode: typeof ThemeMode[keyof typeof ThemeMode];
}

const initialState: ThemeState = {
  mode: ThemeMode.DARK,
};

export const themeSlice = createSlice({
  name: 'theme-slice',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const { theme } = action.payload;
      if (Object.values(ThemeMode).includes(theme)) {
        state.mode = theme;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleThemeAsync.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.mode = action.payload;
    });
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
