import React, { useEffect, useState } from 'react'
import { Drawer } from '@mui/material'

const sidebarWidth = 250

const Nav: React.FC = () => {
  return (
    <Drawer container={window.document.body}
    variant='permanent'
    open={true}
    sx={{
      width: sidebarWidth,
      height: '100vh',
      '& > div': { borderRight: 'none' }
    }}>
      
    </Drawer>
  )
}

export default Nav