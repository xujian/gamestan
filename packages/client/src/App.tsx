import React from 'react'
import Routes from './Routes'
import { AppThemeProvider } from './themes'
import { HttpProvider } from './contexts/http'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
  queries: {
    staleTime: 1000 * 60 * 60,
  },
}})

const App: React.FC = () => {
  return (
    <AppThemeProvider>
      <HttpProvider>
        <QueryClientProvider client={queryClient}>
          <Routes />
        </QueryClientProvider>
      </HttpProvider>
    </AppThemeProvider>
  )
}

export default App
