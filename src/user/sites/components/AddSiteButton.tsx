import React, { type FC } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { AddSiteDialog } from './AddSiteDialog'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'

export interface AddSiteButtonProps {
  onSiteAdded: (site: string) => void
}

export const AddSiteButton: FC<AddSiteButtonProps> = ({ onSiteAdded }) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <Box>
      <Fab
        variant='extended'
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        sx={{
          alignSelf: 'end',
          marginBottom: '16px'
        }}>
        <AddIcon sx={{ mr: 1 }} />
        Add Site
      </Fab>
      <AddSiteDialog open={open} onSiteAdded={onSiteAdded} onClose={handleClose} />
    </Box>
  )
}
