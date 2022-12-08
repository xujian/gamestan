import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GameCard from '../components/GameCard'
import NumberCard from '../components/NumberCard'
import { useHttp } from '../contexts/http/Http'

const HomePage: React.FC = () => {
  const { http } = useHttp()
  const [games, setGames] = useState<Record<string, any>>({results:[]})
  const [genres, setGenres] = useState<Record<string, any>>({results:[]})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    http.get('https://api.rawg.io/api/games').then(rsp => {
      setGames(rsp)
      setIsLoading(false)
    })
    http.get('https://api.rawg.io/api/genres').then(rsp => {
      setGenres(rsp)
      setIsLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25, mt: 2 }}>
          <Typography variant="h5">Genres</Typography>
        </Grid>
        {genres.results.slice(0, 4).map((genre: any) => (
          <Grid key={genre.id} item xs={12} sm={6} md={4} lg={3}>
            <NumberCard title={genre.name} count={genre.games_count} />
          </Grid>
        ))}
      </Grid>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25, mt: 4 }}>
          <Typography variant="h5">Top Games</Typography>
        </Grid>
        {games.results.map((game: any) => (
          <Grid item key={game.id} xs={12} sm={6} md={4} lg={3}>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default HomePage
