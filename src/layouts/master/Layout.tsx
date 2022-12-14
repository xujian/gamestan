import React from 'react'
import { Box, Container } from '@mui/material'
import Nav from './Nav'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const MasterLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Nav />
      <Container component="main" maxWidth="md"
        sx={{
          bgcolor: 'background.default',
          px: {
            xs: 0, sm: 0, md: 0,
          },
          pt: 8,
          flexGrow: 1,
          minHeight: '100vh'
        }}>
        <Outlet />
      </Container>
    </Box>
  )
}

export default MasterLayout
