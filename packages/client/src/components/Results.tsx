import React from 'react'
import { Avatar, List, ListItem, ListItemAvatar, 
  ListItemButton, ListItemText, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

type ResultshProps = {
  data: Record<string, any>[]
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
                  <Avatar alt="Remy Sharp" src={game.background_image}
                    sx={{borderRadius: 10}} />
                </ListItemAvatar>
                <ListItemText
                  primary={game.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        color="text.info"
                        component="span"
                        variant="body2"
                      >
                        {game.released}
                      </Typography>
                    </React.Fragment>
                  }/>
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