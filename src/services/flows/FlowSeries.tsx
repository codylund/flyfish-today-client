export interface FlowSeries {
  location: string
  data: FlowDataPoint[]
}

export interface FlowDataPoint {
  time: Date
  cfs: number
}
