import { createTheme } from '@mui/material/styles'

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
  },
})
