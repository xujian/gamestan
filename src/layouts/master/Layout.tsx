import React from 'react'
import { Box } from '@mui/material'
import Nav from './Nav'
import Header from './Header'
import { Outlet } from 'react-router-dom'

/**
 * Vertical splitted layout
 */
const MasterLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Nav />
      <Box component="main"
        sx={{
          bgcolor: 'background.default',
          pt: 8,
          flexGrow: 1,
          height: '100vh'
        }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default MasterLayout
