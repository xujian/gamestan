import React, { Chip, Grid, Typography } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import Card from './Card'

type NumberCardProps = {
  count: number,
  percentage?: number,
  title?: string,
  extra?: string,
  color?:  'default' | 'secondary' | 'primary' | 'error' | 'info' | 'success' | 'warning' | undefined
}

const NumberCard = ({
  count,
  percentage,
  color,
  title,
  extra
}: NumberCardProps) => {
  return (
    <Card sx={{p: 2.5 }} title={title} extra={extra}>
      <Grid container>
        <Grid item>
          <Typography variant='h4' color='inherit'>
            {count}
          </Typography>
        </Grid>
        {percentage && (
          <Grid item>
            <Chip
              variant='filled'
              color={color}
              icon={
                <>
                  {percentage >= 0 && <ArrowUpwardIcon />}
                  {percentage < 0 && <ArrowDownwardIcon />}
                </>
              }
              label={`${percentage}%`}
              sx={{ ml: 1.25, pl: 1 }}
              size='small'
            />
          </Grid>
        )}
      </Grid>
    </Card>
  )
}

export default NumberCard