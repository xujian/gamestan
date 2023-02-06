import React, { CardMedia } from '@mui/material'
import { Game } from '@gamestan/models'

type GameCoverSize = 'lg' | 'md' | 'sm' | 'xs' | 'tn'

const sizes = {
  lg: 264,
  md: 264 * 0.75,
  sm: 264 * 0.5,
  xs: 264 * 0.25,
  tn: 264 * 0.125,
}

const radiuses = {
  lg: 20,
  md: 20 * 0.75,
  sm: 20 * 0.5,
  xs: 20 * 0.25,
  tn: 20 * 0.125,
}

type GameCoverProps = {
  game: Game,
  size?: GameCoverSize,
  rounded?: boolean,
}

const GameCover = ({
  game,
  size,
  rounded
}: GameCoverProps) => {
  const width: number = size ? sizes[size] : 0
  return game.cover && (<CardMedia
    className="game-cover"
    sx={{
      width: width || '50%',
      aspectRatio: '3/4',
      objectFit: 'cover',
      ...rounded && {
        borderRadius: size ? `${radiuses[size]}px` : '20px'
      }
    }}
    component="img"
    image={game.cover.url.replace('t_thumb', 't_cover_big')}
  />)
}

export default GameCover