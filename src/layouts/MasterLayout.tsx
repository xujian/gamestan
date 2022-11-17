import React from 'react'
import { Stack } from '@mui/material'
import Nav from './Nav'

/**
 * Vertical splitted layout
 */
const MasterLayout: React.FC = () => {
  return (
    <Stack direction="row">
      <Nav />
    </Stack>
  )
}

export default MasterLayout