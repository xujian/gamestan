import React from 'react'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import MailIcon from '@mui/icons-material/Mail'
import { useAppSelector } from '../../store/hooks'
import { selectIsNavOpen } from './layout.slice'

const navWidth = 250

const Nav: React.FC = () => {
  const isNavOpen = useAppSelector(selectIsNavOpen)
  return (
    <Drawer
      sx={{
        width: isNavOpen ? navWidth : 0,
        flexShrink: 1,
        '& .MuiDrawer-paper': {
          width: navWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={isNavOpen}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default Nav