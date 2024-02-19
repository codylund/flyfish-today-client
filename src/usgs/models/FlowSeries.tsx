import { type FlowDataPoint } from './FlowDataPoint'
import { type FlowErrors } from '../../filters/models/FlowErrors'

export interface FlowSeries {
  siteId: string
  location: string
  data: FlowDataPoint[]
  errors: Set<FlowErrors>
}
