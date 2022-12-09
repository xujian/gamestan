import React, { useState } from 'react'
import { AppBar, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import { changeColorMode, selectColorMode, changeScheme } from '../../themes/theme.slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SearchIcon from '@mui/icons-material/Search'
import { selectIsNavOpen, toggleNav } from './layout.slice'
import Loading from './Loading';

const Header: React.FC = () => {
  const colorMode = useAppSelector(selectColorMode),
    dispatch = useAppDispatch(),
    toggleColorMode = () => {
      dispatch(changeColorMode(colorMode === 'dark' ? 'light' : 'dark'))
    },
    isNavOpen = useAppSelector(selectIsNavOpen),
    theme = useTheme(),
    matchDownSm = useMediaQuery(theme.breakpoints.down('sm')),
    left = isNavOpen
      ? matchDownSm ? 0 : 250
      : 0
  const [schemesMenuAnchor, setSchemesMenuAnchor]
    = useState<null | HTMLElement>(null),
    closeSchemesMenu = () => {
      setSchemesMenuAnchor(null)
    },
    openSchemesMenu = (event: React.MouseEvent<HTMLElement>) => {
      setSchemesMenuAnchor(event.currentTarget)
    },
    onSchemeSelected = (scheme: string) => {
      dispatch(changeScheme(scheme))
    }

  return (
    <AppBar component="header"
      // enableColorOnDark
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
          onClick={() => dispatch(toggleNav())}>
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
        <IconButton
          id="scheme-button"
          size="large"
          aria-label="colorScheme"
          onClick={openSchemesMenu}>
          <ColorLensIcon />
        </IconButton>
        <Menu
          id="scheme-menu"
          anchorEl={schemesMenuAnchor}
          open={Boolean(schemesMenuAnchor)}
          onClose={closeSchemesMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>
          <MenuItem onClick={() => onSchemeSelected('klein')}>Klein</MenuItem>
          <MenuItem onClick={() => onSchemeSelected('aura')}>Aura</MenuItem>
          <MenuItem onClick={() => onSchemeSelected('solarized')}>Solarized</MenuItem>
        </Menu>
      </Toolbar>
      <Loading />
    </AppBar>
  )
}

export default Header