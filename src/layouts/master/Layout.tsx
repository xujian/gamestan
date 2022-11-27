import React, { useEffect } from 'react'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import Nav from './Nav'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { closeNav, selectIsNavOpen } from './layout.slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

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
