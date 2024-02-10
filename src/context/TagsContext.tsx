import { createContext } from 'react'

export const TagsContext = createContext({
  tags: [] as string[],
  selectedTags: [] as string[],
  setSelectedTags: (tags: string[]) => {}
})
