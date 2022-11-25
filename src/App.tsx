import React from 'react'
import Routes from './Routes'
import { AppThemeProvider } from './themes'

const App: React.FC = () => {
  return (
    <AppThemeProvider>
      <Routes />
    </AppThemeProvider>
  )
}

export default App
