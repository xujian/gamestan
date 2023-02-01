import React, { CardMedia } from '@mui/material'
import { Game } from '@gamestan/models'

const GameCover = ({
  game
}: {game: Game}) => {
  return game.cover && (<CardMedia
    sx={{ width: '50%', aspectRatio: '3/4', objectFit: 'cover' }}
    component="img"
    image={game.cover.url.replace('t_thumb', 't_cover_big')}
  />)
}

export default GameCover