import React from 'react'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import MailIcon from '@mui/icons-material/Mail'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { closeNav, selectIsNavOpen } from './layout.slice'

const navWidth = 250

const Nav: React.FC = () => {
  const isNavOpen = useAppSelector(selectIsNavOpen),
    theme = useTheme(),
    matchDownSm = useMediaQuery(theme.breakpoints.down('sm')),
    dispatch = useAppDispatch(),
    close = () => {
      dispatch(closeNav())
    }
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
      variant={ matchDownSm ? 'temporary': 'persistent' }
      anchor="left"
      open={isNavOpen}
      onClose={close}>
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