import React, { useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import { AppBar, IconButton, Menu, MenuItem,
  Paper, Toolbar, useTheme,
  PaperProps, 
  Popper,
  ClickAwayListener} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { changeColorMode, selectColorMode, changeScheme } from '../../themes/theme.slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import { toggleAside } from './layout.slice'
import Loading from './Loading'
import Search from '../../components/Search'
import Results from '../../components/Results'

/**
 * semi transparent paper with blur filter
 */
const VibrantPaper = styled(Paper)<PaperProps>(() => ({
  display: 'flex',
  border: `1px solid #ffffff11`,
  backgroundColor: '#33333333',
  backdropFilter: 'saturate(120%) blur(20px)',
}))

const Header: React.FC = () => {
  const colorMode = useAppSelector(selectColorMode),
    dispatch = useAppDispatch(),
    toggleColorMode = () => {
      dispatch(changeColorMode(colorMode === 'dark' ? 'light' : 'dark'))
    }
  const [schemesMenuAnchor, setSchemesMenuAnchor]
    = useState<null | HTMLElement>(null),
    theme = useTheme(),
    closeSchemesMenu = () => {
      setSchemesMenuAnchor(null)
    },
    openSchemesMenu = (event: React.MouseEvent<HTMLElement>) => {
      setSchemesMenuAnchor(event.currentTarget)
    },
    onSchemeSelected = (scheme: string) => {
      dispatch(changeScheme(scheme))
    }
  const [searchFocused, setSearchFocused] = useState<boolean>(false),
    [searchResultsOpen, setSearchResultsOpen] = useState<boolean>(false),
    [searchResults, setSearchResult] = useState<Record<string, any>[]>([])
  const searchBar = useRef(null),
  displaySearchResult = (data: Record<string, any>[]) => {
    setSearchResultsOpen(true)
    setSearchResult(data)
  }

  return (
    <AppBar className="header" component="header"
      color='transparent'
      position='static'
      elevation={0}
      sx={{
        display: 'flex',
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
          onClick={() => dispatch(toggleAside())}>
          <MenuIcon />
        </IconButton>
        <VibrantPaper
          className={searchFocused ? 'focused': ''}
          ref={searchBar}
          elevation={0}
          sx={{flexGrow: 1}}>
          <Search
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onResults={displaySearchResult} />
        </VibrantPaper>
        <VibrantPaper
          elevation={0}
          sx={{marginLeft: '1em'}}>
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
        </VibrantPaper>
        <ClickAwayListener onClickAway={() => setSearchResultsOpen(false)}>
          <Popper open={searchResultsOpen}
            placement="bottom-start"
            className="search-result-popover"
            anchorEl={searchBar.current}
            sx={{
              p: 0
            }}>
            <Results data={searchResults} />
          </Popper>
        </ClickAwayListener>
      </Toolbar>
      <Loading />
    </AppBar>
  )
}

export default Header