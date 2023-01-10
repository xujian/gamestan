import React from 'react'
import { Box, Container } from '@mui/material'
import Nav from './Nav'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

//TODO: Use Grid to make layout

const MasterLayout: React.FC = () => {
  return (
    <Box className="master-layout" sx={{
      display: 'flex',
      position: 'relative'
      }}>
      <Header />
      <Nav />
      <Container component="main" maxWidth="lg"
        sx={{
          bgcolor: 'background.default',
          px: {
            xs: 0, sm: 0, md: 0,
          },
          pt: 8,
          pb: 40,
          flexGrow: 1,
          minHeight: '100vh'
        }}>
        <Outlet />
      </Container>
      <Footer></Footer>
    </Box>
  )
}

export default MasterLayout
