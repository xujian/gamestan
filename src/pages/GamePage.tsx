import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useBus, useHttp } from '../contexts'

const GamePage: React.FC = () => {
  const { id } = useParams(),
    { http } = useHttp(),
    [game, setGame] = useState<Record<string, any>>({}),
    bus = useBus()

    useEffect(() => {
      bus.emit('loading.start')
      http.get(`https://api.rawg.io/api/games/${id}`).then(rsp => {
        setGame(rsp)
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const heroSx = {
      width: '100vw',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      aspectRatio: '16/9',
      maxWidth: 1920,
      display: 'flex',
    }
  return (
    <>
      <Box className="hreo"
        sx={{
          ...heroSx,
          backgroundImage: `url(${game.background_image})`,
        }}>
        <h1>{game.name}</h1>
      </Box>
      <article className="game-page">
      </article>
    </>
  )
}

export default GamePage