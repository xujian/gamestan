import { Grid, Typography } from '@mui/material'
import React from 'react'
import NumberCard from '../components/NumberCard'
import { useHttp } from '../contexts/http/Http'

const HomePage: React.FC = () => {
  const { data } = useHttp('/games', 'get', {})
  
  return (
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
  )
}

export default HomePage
