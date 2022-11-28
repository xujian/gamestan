import React, { ForwardedRef, forwardRef } from 'react'
import { Card, CardHeader, CardContent, Typography, Divider, useTheme } from '@mui/material'

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
          borderRadius: 2,
          borderColor: theme.palette.mode === 'dark'
            ? theme.palette.divider
            : theme.palette.grey,
          ':hover': {
            boxShadow: props.boxShadow
              ? props.shadow || theme.shadows[2]
              : 'inherit'
          },
          '& pre': {
            m: 0,
            p: '16px !important',
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.75rem'
          }
        }}>
        {!props.darkTitle && props.title && (
          <CardHeader
            titleTypographyProps={{ variant: 'subtitle1' }}
            title={props.title}
            action={props.secondary} />
        )}
        {props.darkTitle && props.title &&
          <CardHeader
            title={<Typography variant="h3">{props.title}</Typography>}
            action={props.secondary} />}
        {props.title && props.divider && <Divider />}
        {props.content && <CardContent>{props.children}</CardContent>}
        {!props.content && props.children}
      </Card>
    )
  })

AppCard.displayName = 'Card'

export default AppCard