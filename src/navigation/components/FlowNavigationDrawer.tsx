import '../../App.css'
import { Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material'
import React, { type FC } from 'react'
import Drawer from '@mui/material/Drawer'
import GitHubIcon from '@mui/icons-material/GitHub'
import LogoutIcon from '@mui/icons-material/Logout'
import { SignOut } from '../../user/signout/services/SignOutService'
import SportsBarIcon from '@mui/icons-material/SportsBar'
import { useNavigate } from 'react-router-dom'

export interface FlowNavigationDrawerProps {
  open: boolean
}

export const FlowNavigationDrawer: FC<FlowNavigationDrawerProps> = ({ open }) => {
  const navigate = useNavigate()

  const onSignOut = (): void => {
    SignOut()
      .then(_ => {
        navigate('/signin')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Drawer
      anchor='left'
      elevation={0}
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
        <ListItem disablePadding>
          <ListItemButton onClick={onSignOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography variant='body1'>Logout</Typography>} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
