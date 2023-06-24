import { ThemeMode } from '@/app/themeSlice';
import { themeBaseline } from './themeBaseline';
import BackgroundLight from '../assets/background_light.png'; // Import using relative path

export const lightTheme = {
  palette: {
    mode: ThemeMode.LIGHT,
    primary: {
      main: '#d5d5d5',
      dark: '#c9c8c8',
    },
    secondary: {
      main: '#AC5DD9',
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
      primary: '#232222',
      secondary: '#545050',
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
