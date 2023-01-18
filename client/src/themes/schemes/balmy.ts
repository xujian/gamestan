import { ColorMode, SchemeBuilder } from '../types'

const theme: SchemeBuilder = (mode: ColorMode) => ({
  palette: {
    primary: {
      light: '#ffc017',
      main: '#ffc017',
      dark: '#ffc017',
      contrastText: '#444',
    },
    secondary: {
      light: '#ff7961',
      main: '#18C050',
      dark: '#ba000d',
      contrastText: '#000',
    },
    background: {
      default: mode === 'dark'
        ? '#333'
        : '#eee'
    }
  }
})

export default theme