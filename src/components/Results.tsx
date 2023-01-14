import React from 'react'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'

type ResultshProps = {
  data: Record<string, any>[]
}

const Results: React.FC<ResultshProps> = (props: ResultshProps) => {
  let { data } = props
  if (!data) {
    data = []
  }
  return (
    <List sx={{
      width: '600px',
      p:0,
    }}>
      {
        data.length
          ? data.map((game) => (
            <>
              <ListItem alignItems="flex-start" sx={{p:0}}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={game.background_image} />
                </ListItemAvatar>
                <ListItemText
                  primary={game.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {game.released}
                      </Typography>
                    </React.Fragment>
                  }/>
              </ListItem>
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