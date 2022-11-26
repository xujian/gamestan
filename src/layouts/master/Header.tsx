import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import { changeColorMode, selectColorMode } from '../../store/theme'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { selectIsNavOpen, toggleNav } from './layout.slice';

const Header: React.FC = () => {
  const colorMode = useAppSelector(selectColorMode),
    dispatch = useAppDispatch(),
    toggleColorMode = () => {
      dispatch(changeColorMode(colorMode === 'dark' ? 'light' : 'dark'))
    },
    toggleSidebar = () => {
      dispatch(toggleNav())
    },
    isNavOpen = useAppSelector(selectIsNavOpen)
  return (
    <AppBar component="header"
      enableColorOnDark
      position='fixed'
      elevation={0}
      sx={{
        left: isNavOpen ? 250: 0,
        right: 0,
        width: 'auto',
        transition: 'left 250ms'
      }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <IconButton 
          size="large"
          aria-label="account">
            <AccountBoxIcon />
          </IconButton>
        <IconButton 
          size="large"
          aria-label="colorMode"
          onClick={toggleColorMode}>
            {colorMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header