import { PaletteMode } from '@mui/material';
import { ThemeMode } from '@/app/themeSlice';
import darkTheme from './darkTheme';
import lightTheme from './lightTheme';

export const getTheme = (mode: PaletteMode) => {
  return mode === ThemeMode.DARK ? darkTheme : lightTheme;
};
