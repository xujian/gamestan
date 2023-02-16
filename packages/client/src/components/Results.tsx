import React from 'react'
import { Avatar, Chip, List, ListItem, ListItemAvatar, 
  ListItemButton, ListItemText, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import * as dayjs from 'dayjs'
import { Game } from '@gamestan/models'
import GameCover from './GameCover'
import { platforms } from '../consts'
import PlatformsChips from './PlatformChips'

type ResultshProps = {
  data: Game[]
}

const formatDate = (unix: number) => {
  const d = dayjs.unix(unix)
  return d.format('YYYY')
}

const Results: React.FC<ResultshProps> = (props: ResultshProps) => {
  let { data } = props
  if (!data) {
    data = []
  }
  return (
    <List 
      className='scrollable'
      sx={{
        width: '600px',
        maxHeight: 480,
        overflowY: 'scroll',
        '& .MuiAvatar-root': {
          borderRadius: '10px'
        },
        '& .date': {
          color: '#999',
          fontSize: 11
        }
      }}>
      {
        data.length
          ? data.map((game) => (
            <>
              <ListItemButton alignItems="flex-start" sx={{py:0}}
                component={NavLink}
                to={`/games/${game.id}`}>
                <ListItemAvatar>
                  <GameCover game={game} size="tn" rounded />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <Typography sx={{
                        display: 'inline',
                        fontSize: 12,
                        marginRight: '1em'
                      }}>{game.name}</Typography>
                      <Typography className="date" component="span">
                        {formatDate(game.firstReleaseDate)}
                      </Typography>
                    </>
                  }
                  secondary={
                    game.platforms && (<PlatformsChips data={game.platforms} />)
                  }>
                </ListItemText>
              </ListItemButton>
            </>
          ))
        : (
          <ListItem alignItems="flex-start" sx={{p:0}}>
            No results
          </ListItem>
        )
      }

    </List>
  )
}

export default Results