import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import Routes from './Routes'
import { useAppSelector } from './store/hooks'
import { selectColorMode } from './store/theme'

const App: React.FC = () => {
  const colorMode = useAppSelector(selectColorMode)
  const theme = createTheme({
    palette: {
      mode: colorMode
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  )
}

export default App
