import React, { useEffect, useState } from 'react'
import { Box, Chip, Stack } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useBus, useHttp } from '../contexts'
import { Container } from '@mui/system'

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
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      aspectRatio: '16/8',
      maxWidth: 1280,
      display: 'flex',
      alignItems: 'flex-end',
      p: 1,
      '& h1': {
        fontSize: 60,
      },
      borderRadius: {
        lg: '20px',
        sm: 0,
      }
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
      {game.platforms && (
        <Stack direction="row" spacing={1} className="platforms"
          sx={{py: 2}}>
          {game.platforms.map(({platform}: any) => (
            <Chip color="secondary" key={platform.slug} label={platform.name}></Chip>
          ))}
        </Stack>
      )}
      <article className="game-page">
      </article>
    </>
  )
}

export default GamePage