import { type FlowDataPoint } from './FlowDataPoint'

export interface FlowSeries {
  location: string
  data: FlowDataPoint[]
}
