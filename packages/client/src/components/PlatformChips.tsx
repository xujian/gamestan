import { Chip } from '@mui/material'
import { Platform } from '@gamestan/models'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import { platforms } from '../consts'

export type PlatformsChipsProps = {
  data: Platform[] | number[],
  size?: 'middle' | 'small'
}

const PlatformsChips: React.FC<PlatformsChipsProps> = ({data}: PlatformsChipsProps) => {
  const theme = useTheme()
  return (
    <>
      {data.map(platform => {
      const model: Platform | undefined = typeof platform === 'number'
        ? platforms.find(p => p.id == platform)
        : platforms.find(p => p.id == platform.id)
      return model && (
        <Chip key={model.id} label={model.name}
          size="small"
          color="secondary"
          variant="outlined"
          sx={{
            fontSize: 11,
            cursor: 'pointer',
            mr: 1,
            my: 0.5,
            '&.MuiChip-outlined': {
              border: `solid 1px ${theme.palette.secondary.main}`
            },
            '&.MuiChip-sizeSmall': {
              height: 21,
              lineHeight: 21,
            }
          }} />
      )
    })}
    </>
  )
}

export default PlatformsChips