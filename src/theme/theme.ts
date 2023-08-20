import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0ca678'
    }
  },
  typography: {
    fontFamily: ['Open Sans', '-apple-system', 'Arial', 'sans-serif'].join(', ')
  }
})
