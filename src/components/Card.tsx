import { Card, CardHeader, useTheme } from '@mui/material'
import { ForwardedRef, forwardRef } from 'react'

interface CardProps {
  [key: string]: any
}

const Card = forwardRef<Card, CardProps>(
  (props: CardProps, ref: ForwardedRef<Card>) => {
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
            : theme.palette.grey.A800,
          ':hover': {
            boxShadow: props.boxShadow
              ? shadow || theme.customShadows.z1
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
            action={secondary} />}
        {props.title && props.divider && <Divider />}
        {props.content && <CardContent>{children}</CardContent>}
        {!content && children}
      </Card>
    )
  })

Card.displayName = 'Card'

export default Card