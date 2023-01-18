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
    background: {
      default: mode === 'dark'
        ? '#073642'
        : '#eee'
    }
  }
})

export default theme
