import { ThemeMode } from '@/app/themeSlice';
import { themeBaseline } from './themeBaseline';
import BackgroundLight from '../assets/background_light.png'; // Import using relative path

export const lightTheme = {
  palette: {
    mode: ThemeMode.LIGHT,
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
      primary: '#fff',
      secondary: '#fff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `url(${BackgroundLight})`,
        },
      },
    },
  },
};

export default Object.assign({}, themeBaseline, lightTheme);
