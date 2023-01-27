import React, { useEffect, useState } from 'react'
import { Box, Chip, Stack } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useBus, useHttp } from '../contexts'
import { Game, Platform } from '@gamestan/models'

const GamePage: React.FC = () => {
  const { id } = useParams(),
    { http } = useHttp(),
    [game, setGame] = useState<Game | null>(null),
    bus = useBus()

    useEffect(() => {
      bus.emit('loading.start')
      http.get<Game>(`/api/games/${id}`).then(game => {
        console.log('dddd', game)
        setGame(game)
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
  return game 
    ? (
      <>
        <Box className="hreo"
          sx={{
            ...heroSx,
            backgroundImage: `url(${game.screenshots[0].url.replace('thumb', 'screenshot_big_2x')})`,
          }}>
          <h1>{game.name}</h1>
        </Box>
        {game.platforms && (
          <Stack direction="row" spacing={1} className="platforms"
            sx={{py: 2}}>
            {game.platforms.map((platform: Platform) => (
              <Chip color="secondary" key={platform.slug} label={platform.name}></Chip>
            ))}
          </Stack>
        )}
        <article className="game-page">
        </article>
      </>
    )
    : (<>Wait...</>)
}

export default GamePage