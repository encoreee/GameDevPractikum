import { ThemeMode } from '@/app/themeSlice';
import { themeBaseline } from './themeBaseline';
import BackgroundDark from '../assets/background_dark.png'; // Import using relative path

export const darkTheme = {
  palette: {
    mode: ThemeMode.DARK,
    primary: {
      main: '#28293D',
      dark: '#111111',
    },
    secondary: {
      main: '#CB5DD9',
      dark: '#004FC4',
    },
    error: {
      main: '#DF4344',
    },
    background: {
      default: 'black',
      paper: 'white',
    },
    text: {
      primary: '#f6f6f6',
      secondary: '#c3c3c3',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `url(${BackgroundDark})`,
        },
      },
    },
  },
};

export default Object.assign({}, themeBaseline, darkTheme);
