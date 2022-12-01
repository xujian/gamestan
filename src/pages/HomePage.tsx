import { Card, CardContent, Grid, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import NumberCard from '../components/NumberCard'
import { useHttp } from '../contexts/http/Http'

const HomePage: React.FC = () => {
  const { http } = useHttp()
  const [games, setGames] = useState<Record<string, any>>({results:[]})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    http.get('https://api.rawg.io/api/games').then(rsp => {
      setGames(rsp)
      setIsLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Dashboard</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <NumberCard title="Total Page Views" count={442236}
            percentage={59.3} extra="35,000" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <NumberCard title="Total Users" count={78250}
            percentage={70.5} extra="8,900" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <NumberCard title="Total Order" count={18800}
            percentage={27.4} color="warning" extra="1,943" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <NumberCard title="Total Sales" count={35078}
            percentage={27.4} color="warning" extra="$20,395" />
        </Grid>
      </Grid>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {games.results.map((game: any) => (
          <Grid item key={game.id} xs={12} sx={{ mb: -2.25 }}>
            <Card>
              <CardContent>
                {game.name}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default HomePage
