import React, { type FC } from 'react'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import { FlowNavigationDrawer } from './FlowNavigationDrawer'
import FormControl from '@mui/material/FormControl'
import { IconButton } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import WaterIcon from '@mui/icons-material/Water'

export interface FlowAppBarProps {
  lookback: number
  onLookbackUpdated: (lookback: number) => void
}

export const FlowAppBar: FC<FlowAppBarProps> = ({ lookback, onLookbackUpdated }) => {
  const [navigationOpen, setNavigationOpen] = React.useState(false)

  const handleChange = (event: SelectChangeEvent): void => {
    const newLookback: number = +event.target.value
    onLookbackUpdated(newLookback)
  }

  const closeDrawer = () =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setNavigationOpen(false)
    }

  return (
    <Box
      sx={{ width: '100%', flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => { setNavigationOpen(true) }}>
            <WaterIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Flows
          </Typography>
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lookback.toString()}
              label=""
              variant="standard"
              displayEmpty
              disableUnderline
              onChange={handleChange}>
              <MenuItem value={1}>1d</MenuItem>
              <MenuItem value={7}>7d</MenuItem>
              <MenuItem value={14}>14d</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Box
        role="presentation"
        onClick={closeDrawer()}
        onKeyDown={closeDrawer()}>
        <FlowNavigationDrawer open={navigationOpen} />
      </Box>
    </Box>
  )
}
