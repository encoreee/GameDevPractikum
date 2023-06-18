import { ThemeMode } from '@/app/themeSlice';
import { themeBaseline } from './themeBaseline';
import BackgroundDark from '../assets/background_dark.png'; // Import using relative path

export const darkTheme = {
  palette: {
    mode: ThemeMode.DARK,
    primary: {
      main: '#8F90A6',
      dark: '#28293D',
    },
    secondary: {
      main: '#AC5DD9',
      dark: '#DF4344',
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
