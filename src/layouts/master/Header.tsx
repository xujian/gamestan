import React, { useState } from 'react'
import { AppBar, ButtonGroup, IconButton, InputBase, Menu, MenuItem, Paper, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
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
    downSm = useMediaQuery(theme.breakpoints.down('sm')),
    left = isNavOpen
      ? downSm
        ? 0
        : 250
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
    <AppBar className="app-bar" component="header"
      // enableColorOnDark
      color='transparent'
      position='fixed'
      elevation={0}
      sx={{
        left,
        right: 0,
        alignItems: 'stretch',
        justifyContent: 'center'
      }}>
      <Toolbar className="toolbar"
        sx={{
          width: '100%',
          maxWidth:'1280px',
          margin: 'auto',
          px: {
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0,
          },
        }}>
        <a href="/">
          <img className='logo' src="/logo.svg" height={24} />
        </a>
        <IconButton
          disableRipple
          size="large"
          color="inherit"
          onClick={() => dispatch(toggleNav())}>
          <MenuIcon />
        </IconButton>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            display: 'flex',
            flexGrow: 1,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: '#ffffff33',
            backdropFilter: 'blur(20px)',
          }}>
          <InputBase placeholder='Search games...'
            inputProps={{'aria-label': 'Search games...'}}
            sx={{
              flexGrow: 1,
              height: '40px',
              mx: 2,
              px: 1,
            }} />
          <IconButton type='button' aria-label='search'
            color="inherit">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: '#ffffff33',
            backdropFilter: 'blur(20px)',
            marginLeft: '1em'
          }}>
          <IconButton
            color="inherit"
            aria-label="account">
              <AccountBoxIcon />
            </IconButton>
          <IconButton 
            color="inherit"
            aria-label="colorMode"
            onClick={toggleColorMode}>
              {colorMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          <IconButton
            id="scheme-button"
            color="inherit"
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
        </Paper>
      </Toolbar>
      <Loading />
    </AppBar>
  )
}

export default Header