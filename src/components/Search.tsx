import React, { useState } from 'react'
import { Button, ButtonProps, Chip, IconButton,
  InputBase, Popover, PopoverProps, Stack, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { styled, useTheme } from '@mui/material/styles'

const SearchButton = styled((props: ButtonProps) => (
  <Button
    id="demo-customized-button"
    variant="contained"
    color="inherit"
    disableRipple
    endIcon={<KeyboardArrowDownIcon />}
    {...props} />
))(({theme}) => ({
  zIndex: 100,
  backgroundColor: 'transparent',
  justifyContent: 'flex-end',
  width: 320,
  border: 'solid 1px #ffffff00',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#00000033',
    borderColor: '#ffffff33',
    'backdrop-filter': 'blur(50px)'
  },
  '&:active': {
    backgroundColor: '#000',
  },
  // '&[aria-expanded]': {
  //   backgroundColor: theme.palette.primary.main,
  // }
}))

const SearchPopover = styled((props: PopoverProps) => (
  <Popover
    elevation={0}
    // TransitionComponent={Fade}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
    />
))(({theme}) => ({
  zIndex: 99,
  top: -2,
  transition: 'all .33s',
  '& .MuiPaper-root': {
    padding: '1em 1em 1em 1em',
    width: 320,
    border: 'solid 1px #ffffff33',
    backgroundColor: '#00000033',
    'backdrop-filter': 'blur(50px)'
  },
  '> .title': {
    fontSize: 12,
    my: .5
  }
}))

type SearchProps = {
  onFocus: () => void
  onBlur: () => void
}

const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const 
    theme = useTheme(),
    [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null),
    isOpen = Boolean(anchorEl),
    handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    },
    handleClose = () => {
      setAnchorEl(null)
    },
    platforms = [
      {name: 'pc', label: 'PC'},
      {name: 'playstation5', label: 'PS5'},
      {name: 'playstation4', label: 'PS4'},
      {name: 'xbox-one', label: 'XBox One'},
      {name: 'xbox-series-x', label: 'XBox Series X'},
      {name: 'nintendo-switch', label: 'Switch'},
      {name: '-', label: '...'},
    ],
    [selectedPlatforms, setSelectedPlatforms] =
      useState<Set<string>>(new Set<string>()),
    tooglePlatform = (name: string) => {
      const value = new Set<string>(selectedPlatforms)
      value.has(name)
        ? value.delete(name)
        : value.add(name)
      setSelectedPlatforms(value)
    }

  return (
    <>
      <IconButton type='button' aria-label='search'
        color="inherit">
        <SearchIcon />
      </IconButton>
      <InputBase placeholder='Search games...'
        inputProps={{'aria-label': 'Search games...'}}
        sx={{
          flexGrow: 1,
          height: '40px',
          px: 1,
        }}
        onFocus={() => props.onFocus()}
        onBlur={() => props.onBlur()} />
      <SearchButton
        id="demo-customized-button"
        aria-controls={isOpen ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}>
          {selectedPlatforms.size === 0
            ? 'In all platforms'
            : `In (${selectedPlatforms.size}) platforms`}</SearchButton>
      <SearchPopover
        id="search-options"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}>
          <Typography className="title">
            Platform
          </Typography>
          <Stack direction="row"
            sx={{
              flexWrap: 'wrap',
            }}>
            {platforms.map(p => (
              <Chip key={p.name} label={p.label}
                size="small"
                color="secondary"
                variant={
                  selectedPlatforms.has(p.name)
                    ? 'filled'
                    : 'outlined'
                  }
                onClick={() => tooglePlatform(p.name)}
                sx={{
                  cursor: 'pointer',
                  mr: 1,
                  my: 0.5,
                  '&.MuiChip-filled': {
                    border: `solid 1px ${theme.palette.secondary.main}`
                  }
                }} />
            ))}
          </Stack>
        </SearchPopover>
    </>
  )
}

export default Search