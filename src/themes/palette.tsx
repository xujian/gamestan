import { createTheme, PaletteMode } from '@mui/material'
import defaultTheme from './default'

const palette = (mode: PaletteMode) => {
  console.log('palette.tsx........mode:', mode)
  return createTheme({
    palette: {
      mode,
    },
    ...defaultTheme
  })
}

export default palette