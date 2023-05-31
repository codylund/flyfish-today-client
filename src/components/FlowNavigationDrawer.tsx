import '../App.css'
import { Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material'
import React, { type FC } from 'react'
import Drawer from '@mui/material/Drawer'
import GitHubIcon from '@mui/icons-material/GitHub'
import SportsBarIcon from '@mui/icons-material/SportsBar'

export interface FlowNavigationDrawerProps {
  open: boolean
}

export const FlowNavigationDrawer: FC<FlowNavigationDrawerProps> = ({ open }) => {
  return (
    <Drawer
      anchor='left'
      open={open}>
      <List subheader={<ListSubheader sx={{ background: 'transparent' }}>Links</ListSubheader>}>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href="https://github.com/codylund/stream-flows" target="_blank" rel="noreferrer">
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography variant='body1'>Github</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href="https://www.buymeacoffee.com/codylund" target="_blank" rel="noreferrer">
            <ListItemIcon>
              <SportsBarIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography variant='body1'>Buy me a beer</Typography>} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
