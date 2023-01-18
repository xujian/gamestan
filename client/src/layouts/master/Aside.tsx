import React from 'react'
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import MailIcon from '@mui/icons-material/Mail'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { closeAside, selectIsAsideOpen } from './layout.slice'

const asideWidth = 250

const Aside: React.FC = () => {
  const isAsideOpen = useAppSelector(selectIsAsideOpen),
    theme = useTheme(),
    matchDownSm = useMediaQuery(theme.breakpoints.down('sm')),
    dispatch = useAppDispatch(),
    close = () => {
      dispatch(closeAside())
    }
  return (
    <Drawer
      className="app-nav"
      sx={{
        width: isAsideOpen ? asideWidth : 0,
        flexShrink: 1,
        '& .MuiDrawer-paper': {
          width: asideWidth,
          backgroundColor: 'transparent',
          boxSizing: 'border-box',
          borderRight: 0,
        },
        '& .header': {
          height: 64
        }
      }}
      variant={ matchDownSm ? 'temporary': 'persistent' }
      anchor="left"
      open={isAsideOpen}
      onClose={close}>
      <Box className="header"></Box>
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

export default Aside