import React from 'react'
import { AppBar, IconButton, InputBase, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import { changeColorMode, selectColorMode } from '../../store/theme'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import SearchIcon from '@mui/icons-material/Search'
import { selectIsNavOpen, toggleNav } from './layout.slice'

const Header: React.FC = () => {
  const colorMode = useAppSelector(selectColorMode),
    dispatch = useAppDispatch(),
    toggleColorMode = () => {
      dispatch(changeColorMode(colorMode === 'dark' ? 'light' : 'dark'))
    },
    toggle = () => {
      dispatch(toggleNav())
    },
    isNavOpen = useAppSelector(selectIsNavOpen),
    theme = useTheme(),
    matchDownSm = useMediaQuery(theme.breakpoints.down('sm')),
    left = isNavOpen
      ? matchDownSm ? 0 : 250
      : 0
  return (
    <AppBar component="header"
      enableColorOnDark
      position='fixed'
      elevation={0}
      sx={{
        left,
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
          onClick={toggle}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          GameStan
        </Typography>
        <InputBase placeholder='Search games...'
          inputProps={{'aria-label': 'Search games...'}} />
        <IconButton type='button' aria-label='search'>
          <SearchIcon />
        </IconButton>
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