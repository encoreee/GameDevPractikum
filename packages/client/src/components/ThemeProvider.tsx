import { FC, PropsWithChildren } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { getTheme } from '../themes/getTheme';
import { createTheme } from '@mui/material/styles';

const ThemeProviderExtended: FC<PropsWithChildren> = (props) => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = createTheme(getTheme(themeMode));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

export default ThemeProviderExtended;
