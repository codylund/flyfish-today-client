import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, type SelectChangeEvent } from '@mui/material'
import { RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material'
import React, { type FC, useContext } from 'react'
import { Filters } from '../../models/Filters'
import { FiltersContext } from '../../context/FiltersContext'
import { TagsContext } from '../../context/TagsContext'

export const FilterMenu: FC = () => {
  // Filter values.
  const { filters, setFilters } = useContext(FiltersContext)
  const { tags, selectedTags, setSelectedTags } = useContext(TagsContext)

  const toggleFilter = (filterUpdate: Filters): void => {
    console.log(`Toggling filter: ${filterUpdate}`)
    if (filters.includes(filterUpdate)) {
      setFilters(filters.filter(filter => filter !== filterUpdate))
    } else {
      setFilters(filters.concat([filterUpdate]))
    }
  }

  const tagSelected = (event: SelectChangeEvent<typeof selectedTags>): void => {
    const {
      target: { value }
    } = event
    setSelectedTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const showFavorites = filters.includes(Filters.FAVORITES)
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'flex-start', padding: '16px 24px' }}
    >
      <Button
        sx={{ marginRight: '16px' }}
        variant='outlined'
        startIcon={showFavorites ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
        onClick={() => { toggleFilter(Filters.FAVORITES) }}>
        Favorites
      </Button>
      <FormControl sx={{ width: '200px' }}>
        <InputLabel id="filters-label">Tags</InputLabel>
        <Select
          multiple
          variant='outlined'
          value={selectedTags}
          onChange={tagSelected}
          labelId='filters-label'
          label="Tags"
          renderValue={(values) => values.join(', ')}
        >
          {tags
            .map((tag) => (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={selectedTags.includes(tag)} />
                <ListItemText primary={tag} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  )
}
