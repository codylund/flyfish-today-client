import { type FlowDataPoint } from './FlowDataPoint'
import { type FlowErrors } from '../../filters/models/FlowErrors'

export interface FlowSeries {
  siteId: string
  location: string
  cfs: FlowDataPoint[]
  gaugeHt: FlowDataPoint[]
  yearlyP25: number
  yearlyP50: number
  yearlyP75: number
  errors: Set<FlowErrors>
}
