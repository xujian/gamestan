import React, { Card, CardActionArea, CardContent, Rating, Typography } from '@mui/material'
import { Game } from '@gamestan/models'
import GameCover from './GameCover'

type GameCardProps = {
  game: Game
}

const GameCard = ({
  game
}: GameCardProps) => {
  return (
    <Card>
      <CardActionArea sx={{ display: 'flex', flexDirection: 'row'}}>
        <GameCover game={game} />
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