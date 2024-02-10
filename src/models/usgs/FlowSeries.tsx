import { type FlowDataPoint } from './FlowDataPoint'

export interface FlowSeries {
  siteId: string
  location: string
  data: FlowDataPoint[]
}
