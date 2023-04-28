import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#8F90A6',
      dark: '#28293D',
    },
    secondary: {
      main: '#AC5DD9',
      dark: '#DF4344',
    },
  },
  typography: {
    fontFamily: ['"Press Start 2P"', 'cursive'].join(','),

    h1: {
      color: 'white',
      fontWeight: '400',
      fontSize: '128px',
    },
    body1: {
      color: 'white',
      fontSize: '24px',
    },
  },
});
