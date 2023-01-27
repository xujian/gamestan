import { Game, Genre } from '@gamestan/models'
import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GameCard from '../components/GameCard'
import NumberCard from '../components/NumberCard'
import { useBus } from '../contexts/bus'
import { useHttp } from '../contexts/http/Http'

const HomePage: React.FC = () => {
  const { http } = useHttp()
  const [games, setGames] = useState<Game[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const bus = useBus()

  useEffect(() => {
    bus.emit('loading.start')
    http.get<Game[]>('/api/games').then(data => {
      setGames(data)
      // bus.emit('loading.stop')
    })
    http.get<Genre[]>('/api/genres').then(data => {
      setGenres(data)
      setIsLoading(false)
      // bus.emit('loading.stop')
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <article className="home-page">
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25, mt: 2 }}>
          <Typography variant="h5">Genres</Typography>
        </Grid>
        {genres.slice(0, 4).map((genre: any) => (
          <Grid key={genre.id} item xs={12} sm={6} md={4} lg={3}>
            <NumberCard title={genre.name} count={genre.games_count} />
          </Grid>
        ))}
      </Grid>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25, mt: 4 }}>
          <Typography variant="h5">Top Games</Typography>
        </Grid>
        {games.map((game: any) => (
          <Grid item key={game.id} xs={12} sm={6} md={3} lg={3}>
            <Link to={`/games/${game.id}`}>
              <GameCard game={game} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </article>
  )
}

export default HomePage
