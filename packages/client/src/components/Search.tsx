import React, { useState, KeyboardEvent } from 'react'
import { Button, ButtonProps, Chip, IconButton,
  InputBase, Popover, PopoverProps, Stack, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { styled, useTheme } from '@mui/material/styles'
import { useQuery } from '@tanstack/react-query'
import { useHttp } from '../contexts'
import { Game } from '@gamestan/models'
import { platforms } from '../consts'

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
    backdropFilter: 'blur(50px)'
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
    width: 320,
  },
  '> .title': {
    fontSize: 12,
    my: .5
  }
}))

type SearchProps = {
  onFocus?: () => void
  onBlur?: () => void
  onResults?: (data: Game[]) => void
}

const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const 
    { onResults } = props,
    theme = useTheme(),
    [keyword, setKeyword] = useState<string>(''),
    [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null),
    isOpen = Boolean(anchorEl),
    handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    },
    handleClose = () => {
      setAnchorEl(null)
    },
    { http } = useHttp()
  const platformsForSearch = platforms.filter(p => p.level === 0),
    [selectedPlatforms, setSelectedPlatforms] =
      useState<Set<number>>(new Set<number>()),
    tooglePlatform = (id: number) => {
      const value = new Set<number>(selectedPlatforms)
      value.has(id)
        ? value.delete(id)
        : value.add(id)
      setSelectedPlatforms(value)
    },
    params = { platforms: Array.from(selectedPlatforms).join(',')},
    search = (keyword: string) => {
      http.get<Game[]>(`/api/search/${keyword}`, params).then(games => {
        onResults && onResults(games)
      })
    },
    onSearchKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key.toLowerCase() !== 'enter') {
        return
      }
      search(keyword)
    },
    onKeywordChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setKeyword(event.target.value)
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
        onChange={onKeywordChange}
        onFocus={() => props.onFocus?.()}
        onBlur={() => props.onBlur?.()}
        onKeyUp={onSearchKeyUp} />
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
            {platformsForSearch.map(p => (
              <Chip key={p.id} label={p.name}
                size="small"
                color="secondary"
                variant={
                  selectedPlatforms.has(p.id)
                    ? 'filled'
                    : 'outlined'
                  }
                onClick={() => tooglePlatform(p.id)}
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