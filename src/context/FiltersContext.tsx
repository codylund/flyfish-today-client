import { type Filters } from '../models/Filters'
import { createContext } from 'react'

export const FiltersContext = createContext({
  filters: [] as Filters[],
  setFilters: (filters: Filters[]) => {}
})
