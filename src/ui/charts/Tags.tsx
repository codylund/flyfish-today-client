import { Chip, List, ListItem, TextField } from '@mui/material'
import React, { type FC } from 'react'
import { Add } from '@mui/icons-material'
import { type Site } from '../../models/api/Site'

interface TagsProps {
  site: Site
  onTagsUpdated: (tags: string[]) => void
}

export const Tags: FC<TagsProps> = ({ site, onTagsUpdated }) => {
  const [tags, setTags] = React.useState(site.tags ?? [])
  const [isAddingTag, setAddingTag] = React.useState(false)
  const [newTag, setNewTag] = React.useState('')

  return (
    <List
      sx={{
        width: 'fit-content',
        display: 'flex',
        flex: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '8px'
      }}>
      {tags.map((tag) => {
        return (
          <ListItem
            sx={{
              flex: 'auto',
              flexBasis: 'fit-content',
              flexGrow: '0',
              paddingRight: '4px',
              paddingLeft: '4px'
            }}
            key={tag}>
            <Chip
              size='small'
              label={tag}
              onDelete={() => {
                const updatedTags = tags.filter(existingTag => existingTag !== tag)
                setTags(updatedTags)
                onTagsUpdated(updatedTags)
              }}
            />
          </ListItem>
        )
      })}
      <ListItem
        sx={{
          flex: 'auto',
          flexBasis: 'fit-content',
          flexGrow: '0',
          paddingRight: '4px',
          paddingLeft: '4px'
        }}
        key={'New'}>
        {
          !isAddingTag
            ? (
              <Chip
                variant='outlined'
                size='small'
                label='New'
                icon={<Add/>}
                onClick={() => { setAddingTag(true) }} />)
            : (
              <TextField
                value={newTag}
                size='small'
                InputProps={{
                  sx: {
                    fontSize: '0.8125rem',
                    borderRadius: '16px',
                    height: '24px',
                    padding: '0',
                    margin: '0'
                  }
                }}
                variant='outlined'
                onChange={(event) => { setNewTag(event.target.value) }}
                autoFocus={isAddingTag}
                onBlur={() => {
                  setAddingTag(false)
                  setNewTag('')
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const newTags = tags.concat([newTag])
                    setTags(newTags)
                    setAddingTag(false)
                    setNewTag('')
                    onTagsUpdated(newTags)
                  }
                }} />)
        }
      </ListItem>
    </List>
  )
}
