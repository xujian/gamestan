import React from 'react'
import { Card as MuiCard, CardContent, SxProps, Typography, useTheme } from '@mui/material'

type CardProps = {
  title?: string,
  sx?: SxProps,
  children: React.ReactNode,
}

const Card: React.FC<CardProps> = ({title, sx, children}: CardProps) => {
    const theme = useTheme()
    return (
      <MuiCard 
        elevation={0}
        sx={{
          ...sx,
          borderColor: theme.palette.mode === 'dark'
            ? theme.palette.divider
            : theme.palette.grey[100],
          backgroundColor: theme.palette.mode === 'dark'
            ? theme.palette.primary.dark
            : theme.palette.primary.light
        }}>
        {title &&
          <Typography variant="h5" sx={{
            fontSize: 20
          }}>{title}</Typography>}
        {children && <CardContent>{children}</CardContent>}
      </MuiCard>
    )
  }

export default Card