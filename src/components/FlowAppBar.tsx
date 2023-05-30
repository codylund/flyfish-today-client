import React, { type FC } from 'react'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export interface FlowAppBarProps {
  lookback: number
  onLookbackUpdated: (lookback: number) => void
}

export const FlowAppBar: FC<FlowAppBarProps> = ({ lookback, onLookbackUpdated }) => {
  const handleChange = (event: SelectChangeEvent): void => {
    const newLookback: number = +event.target.value
    onLookbackUpdated(newLookback)
  }

  return (
    <Box sx={{ width: '100%', flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
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
    </Box>
  )
}
