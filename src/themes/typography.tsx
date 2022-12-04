import { ThemeOptions } from '@mui/material'

const typography = (theme: ThemeOptions) => ({
  htmlFontSize: 12,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightBold: 600,
  h1: {
    fontWeight: 600,
    fontSize: '2rem'
  }
})

export default typography