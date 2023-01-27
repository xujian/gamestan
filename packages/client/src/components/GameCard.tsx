import React, { Card, CardActionArea, CardContent, CardMedia, Rating, Typography } from '@mui/material'
import { Game } from '@gamestan/models'

type GameCardProps = {
  game: Game
}

const GameCard = ({
  game
}: GameCardProps) => {
  return (
    <Card>
      <CardActionArea sx={{ display: 'flex', flexDirection: 'row'}}>
      { game.cover && (<CardMedia
        sx={{ width: '50%' }}
        component="img"
        image={game.cover.url.replace('t_thumb', 't_cover_big')}
      />)}
      <CardContent sx={{ width: '50%'}}>
        <Typography variant="h6" component="h6"
          sx={{fontSize: 14, textDecoration: 'none'}}>
          {game.name}
        </Typography>
        <Rating name="disabled" value={game.rating}
          precision={0.5} size="small" readOnly />
      </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default GameCard