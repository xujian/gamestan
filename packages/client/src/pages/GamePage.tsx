import React, { useEffect, useState } from 'react'
import { Box, Chip, Grid, Stack, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useBus, useHttp } from '../contexts'
import { Game, Platform } from '@gamestan/models'
import PlatformsChips from '../components/PlatformChips'
import Card from '../components/Card'

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
      aspectRatio: '16/6',
      maxWidth: 1280,
      display: 'flex',
      alignItems: 'flex-end',
      px: 4,
      py: 2,
      '& h1': {
        fontSize: 60,
        lineHeight: '60px',
      },
      borderRadius: {
        lg: '20px',
        sm: 0,
      }
    }
    type Fact = {
      title: string,
      key: 'gameModes' | 'gameEngines' | 'genres' | 'keywords',
      gradient: {start: string, end: string}
    }
    const facts: Fact[] = [
      {
        title: 'Game Modes',
        key: 'gameModes',
        gradient: {start: '#0FF0B3', end: '#036ED9'}
      },
      {
        title: 'Game engines',
        key: 'gameEngines',
        gradient: {start: '#0FF0B3', end: '#036ED9'}
      },
      {
        title: 'Genres',
        key: 'genres',
        gradient: {start: '#0FF0B3', end: '#036ED9'}
      },
      {
        title: 'Keywords',
        key: 'keywords',
        gradient: {start: '#0FF0B3', end: '#036ED9'}
      },
    ]
  return game 
    ? (
      <>
        <Box className="hreo"
          sx={{
            ...heroSx,
            backgroundImage: `url(${game.screenshots[0].url.replace('thumb', 'screenshot_big_2x')})`,
          }}>
          <h1>{game.name}</h1>
          <Typography component="label">Released Date: {game.firstReleaseDate}</Typography>
        </Box>
        {game.platforms && (
          <Box sx={{py:2}}>
            <PlatformsChips data={game.platforms} size="middle" />
          </Box>
        )}
        <article className="game-page">
          <Typography component="h2" sx={{fontSize: 14}}>Storyline</Typography>
          <Typography paragraph={true}>
            {game.summary}
          </Typography>
          {game.franchises && game.franchises.length && (
            <Box className="gradient-contour" sx={{
              borderRadius: '20px',
              py: 1,
              px: 2,
            }}>
              <Typography component="label">Franchise</Typography>
              <Link to={`/franchises/${game.franchises[0].id}`}>
                <Typography sx={{fontSize: 14, fontWeight: 900}}>{game.franchises[0].name}</Typography>
              </Link>
            </Box>)
          }
          <Grid container spacing={2} sx={{my:2}}>
            { facts.map(f => (
              <Grid item xs={3} key={f.title}>
                <Card sx={{
                  p:1,
                  height: '100%',
                  background:'linear-gradient(135deg, #0FF0B3 0%,#036ED9 100%);'}}>
                  <Typography sx={{ fontSize: 14 }} gutterBottom>
                    {f.title}
                  </Typography>
                  <Box sx={{mb: -1}}>
                  { game[f.key] && game[f.key].map(s => (
                    <Chip key={s.id} label={s.name} />
                  ))}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </article>
      </>
    )
    : (<>Wait...</>)
}

export default GamePage