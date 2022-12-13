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
      <Container component="main"
        sx={{
          bgcolor: 'background.default',
          p: 0,
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
