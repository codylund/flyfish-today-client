import { type AxisOptions, Chart } from 'react-charts'
import { type FlowDataPoint, type FlowSeries } from '../services/flows/FlowSeries'
import React, { type FC } from 'react'

interface FlowChartProps {
  flow: FlowSeries
}

// you can choose annotate the return type so an error is raised if you accidentally return some other type
export const FlowChart: FC<FlowChartProps> = ({ flow }) => {
  const primaryAxis = React.useMemo(
    (): AxisOptions<FlowDataPoint> => ({
      getValue: datum => datum.time
    }),
    []
  )

  const secondaryAxes = React.useMemo(
    (): Array<AxisOptions<FlowDataPoint>> => [
      {
        getValue: datum => datum.cfs
      }
    ],
    []
  )

  const data = [
    {
      label: flow.location,
      data: flow.data
    }
  ]

  return (
    <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
        dark: true,
        padding: 24
      }}
    />
  )
}
