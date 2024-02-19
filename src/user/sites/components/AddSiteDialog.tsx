import React, { type FC, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Link from '@mui/material/Link'
import { LoadActiveSites } from '../../../usgs/services/USGSService'
import { type SiteInfo } from '../../../usgs/models/SiteInfo'
import TextField from '@mui/material/TextField'

export interface AddSiteDialogProps {
  open: boolean
  onSiteAdded: (site: string) => void
  onClose: () => void
}

export const AddSiteDialog: FC<AddSiteDialogProps> = ({ open, onSiteAdded, onClose }) => {
  const [autoCompleteOpen, setAutoCompleteOpen] = React.useState(false)
  const [sites, setSites] = useState([] as SiteInfo[])
  const [selectedSite, setSelectedSite] = useState<SiteInfo>()
  const loading = autoCompleteOpen && sites.length === 0

  const handleClose = (): void => {
    onClose()
    setSelectedSite(undefined)
  }

  React.useEffect(() => {
    LoadActiveSites()
      .then(sites => {
        setSites(sites)
      })
      .catch(e => {
        console.error('Sites lookup failed.', e.stack)
      })
  }, [])

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add site</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Sites can be found at <Link href="https://maps.waterdata.usgs.gov/mapper/index.html" target="_blank" rel="noreferrer">maps.waterdata.usgs.gov</Link>.
        </DialogContentText>

        <Autocomplete
          id="asynchronous-demo"
          sx={{ marginTop: '16px' }}
          open={autoCompleteOpen}
          onOpen={() => {
            setAutoCompleteOpen(true)
          }}
          onClose={() => {
            setAutoCompleteOpen(false)
          }}
          onChange={(event, value) => {
            setSelectedSite((value != null) ? value : undefined)
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          options={sites}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label=""
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                )
              }}
            />
          )}
        />
      </DialogContent>
      <DialogActions sx={{ textAlign: 'right' }}>
        <Button onClick={handleClose}>Close</Button>
        <Button disabled={selectedSite == null} onClick={() => {
          if (selectedSite != null) {
            onSiteAdded(selectedSite.id)
          }
          handleClose()
        }}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}
