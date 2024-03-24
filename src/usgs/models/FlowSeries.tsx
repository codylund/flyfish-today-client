import { type FlowDataPoint } from './FlowDataPoint'
import { type FlowErrors } from '../../filters/models/FlowErrors'

export interface FlowSeries {
  siteId: string
  location: string
  cfs: FlowDataPoint[]
  gaugeHt: FlowDataPoint[]
  errors: Set<FlowErrors>
}
