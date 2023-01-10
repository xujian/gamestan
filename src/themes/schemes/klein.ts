import { ColorMode, SchemeBuilder } from '../types'

const theme: SchemeBuilder = (mode: ColorMode) => ({
  palette: {
    primary: {
      main: '#010c80',
    },
    secondary: {
      main: '#31c48d',
    },
    text: {
      primary: mode === 'dark'
        ? '#fff'
        : '#666666',
    },
    background: {
      paper: mode === 'dark'
        ? '#010c80'
        : '#eee',
      default: mode === 'dark'
        ? '#000752'
        : '#eee'
    }
  }
})

export default theme