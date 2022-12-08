import React, { ForwardedRef, forwardRef } from 'react'
import { Card, CardContent, Typography, useTheme } from '@mui/material'

type CardProps = {
  [key: string]: any
}

const AppCard = forwardRef<HTMLDivElement, CardProps>(
  (props: CardProps, ref: ForwardedRef<HTMLDivElement>) => {
    const theme = useTheme()
    return (
      <Card
        elevation={0}
        ref={ref}
        sx={{
          ...props.sx,
          border: props.border ? '1px solid' : 'none',
          borderRadius: 4,
          borderColor: theme.palette.mode === 'dark'
            ? theme.palette.divider
            : theme.palette.grey,
          backgroundColor: theme.palette.mode === 'dark'
            ? theme.palette.primary.dark
            : theme.palette.primary.light,
          ':hover': {
            boxShadow: props.boxShadow
              ? props.shadow || theme.shadows[2]
              : 'inherit'
          }
        }}>
        {props.title &&
          <Typography variant="h5" sx={{
            fontSize: 20
          }}>{props.title}</Typography>}
        {props.content && <CardContent>{props.children}</CardContent>}
        {!props.content && props.children}
      </Card>
    )
  })

AppCard.displayName = 'Card'

export default AppCard