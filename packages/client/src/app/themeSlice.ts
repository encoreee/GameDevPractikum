import { createSlice } from '@reduxjs/toolkit';

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
    toggleTheme: (state) => {
      state.mode =
        state.mode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
