import React from 'react'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import MailIcon from '@mui/icons-material/Mail'

const sidebarWidth = 250

const Nav: React.FC = () => {
  return (
    <Drawer
      variant='permanent'
      open={true}
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        height: '100vh',
        '& .MuiDrawer-paper': {
          position: 'static',
          boxSizing: 'border-box',
        }
      }}>
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