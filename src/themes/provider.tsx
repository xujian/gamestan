import React from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { useAppSelector } from '../store/hooks'
import { defaultTheme } from '.'
import { selectColorMode } from '../store/theme'

const AppThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const colorMode = useAppSelector(selectColorMode)
  const theme = createTheme({
    palette: {
      mode: colorMode
    }
  }, defaultTheme)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  )
}

export default AppThemeProvider