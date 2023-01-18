import { Container, Grid  } from '@mui/material'
import React, { useState } from 'react'

const Footer: React.FC = () => {
  return (
    <Container component="footer"
      className="app-footer"
      sx={{
        minHeight: 320,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}>
      <Grid container maxWidth="lg">
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Footer