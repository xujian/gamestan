import { Game, Genre } from '@gamestan/models'
import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import GameCard from '../components/GameCard'
import NumberCard from '../components/NumberCard'
import { useHttp } from '../contexts/http/Http'

const HomePage: React.FC = () => {
  const { http } = useHttp()

  const { data: games } = useQuery({
    queryKey: ['games'],
    queryFn: () => http.get<Game[]>('/api/games')
  })

  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: () => http.get<Genre[]>('/api/genres')
  })
  
  return (
    <article className="home-page">
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25, mt: 2 }}>
          <Typography variant="h5">Genres</Typography>
        </Grid>
        {genres && genres.slice(0, 4).map((genre: any) => (
          <Grid key={genre.id} item xs={12} sm={6} md={4} lg={3}>
            <NumberCard title={genre.name} count={genre.games_count} />
          </Grid>
        ))}
      </Grid>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25, mt: 4 }}>
          <Typography variant="h5">Top Games</Typography>
        </Grid>
        {games && games.map((game: any) => (
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
