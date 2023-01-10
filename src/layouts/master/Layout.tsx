import React from 'react'
import { Box, Container, useMediaQuery, useTheme } from '@mui/material'
import Aside from './Aside'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { selectIsAsideOpen } from './layout.slice'

const MasterLayout: React.FC = () => {
  const 
    theme = useTheme(),
    isAsideOpen = useAppSelector(selectIsAsideOpen),
    downSm = useMediaQuery(theme.breakpoints.down('sm')),
    navWidth = isAsideOpen
      ? downSm
        ? 0
        : 250
      : 0
  return (
    <Box className="master-layout" sx={{
      display: 'grid',
      'grid-template-rows': '64px auto 320px',
      'grid-template-columns': `${navWidth}px auto`,
      'grid-template-areas': 
        `'aside header'
        'aside main'
        'aside footer'`,
        '> header': {
          gridArea: 'header',
        },
        '> main': {
          gridArea: 'main',
        },
        '> .app-aside': {
          gridArea: 'aside',
        },
        '> footer': {
          gridArea: 'footer',
        },
      }}>
      <Aside />
      <Header />
      <Container component="main"
        sx={{
          px: {
            xs: 0, sm: 0, md: 0,
          },
          minHeight: '100vh'
        }}>
        <Outlet />
      </Container>
      <Footer></Footer>
    </Box>
  )
}

export default MasterLayout
