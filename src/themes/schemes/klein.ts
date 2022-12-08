import { ColorMode, SchemeBuilder } from '../types'

const theme: SchemeBuilder = (mode: ColorMode) => ({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#1F18C0',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#18C050',
      dark: '#ba000d',
      contrastText: '#000',
    },
    text: {
      primary: mode === 'dark'
        ? '#fff'
        : '#93a1a1',
    },
    background: {
      paper: mode === 'dark'
        ? '#001e3c'
        : '#eee',
      default: mode === 'dark'
        ? '#002b36'
        : '#eee'
    }
  }
})

export default theme