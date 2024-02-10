import { type AxisOptions, Chart } from 'react-charts'
import { Box, Divider, IconButton, Stack } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import React, { type FC } from 'react'
import { EditMenu } from './EditMenu'
import ErrorIcon from '@mui/icons-material/Error'
import { type FlowDataPoint } from '../../models/usgs/FlowDataPoint'
import { type FlowSeries } from '../../models/usgs/FlowSeries'
import { type Site } from '../../models/api/Site'
import { Tags } from './Tags'

interface FlowChartProps {
  flow: FlowSeries
  site: Site
  onDeleteSite: (id: string) => void
  onSetFavorite: (id: string, isFavorite: boolean) => void
  onTagsUpdated: (id: string, tags: string[]) => void
}

// you can choose annotate the return type so an error is raised if you accidentally return some other type
export const FlowChart: FC<FlowChartProps> = ({
  flow,
  site,
  onDeleteSite,
  onSetFavorite,
  onTagsUpdated
}) => {
  const [isFavorite, setFavorite] = React.useState(site.is_favorite)

  const primaryAxis = React.useMemo(
    (): AxisOptions<FlowDataPoint> => ({
      getValue: datum => datum.time,
      // Use local time, not UTC time.
      scaleType: 'localTime'
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
    <div>
      <Box sx={{ display: 'flex', p: 1 }}>
        <Box sx={{ flexGrow: 1, paddingLeft: '16px', paddingBottom: '0' }}>
          <h1 style={{ fontSize: '18px', textAlign: 'left' }}>{flow.location}</h1>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton onClick={() => {
            onSetFavorite(site._id, !isFavorite)
            setFavorite(!isFavorite)
          }}>
            { isFavorite ? (<Favorite />) : (<FavoriteBorder />) }
          </IconButton>
        </Box>
        <EditMenu id={site._id} onDelete={onDeleteSite}/>
      </Box>
      <Divider />
      <div style={{ height: '400px' }}>
        {
          flow.data.length <= 0
            ? (
              <Stack>
                <ErrorIcon
                  fontSize="large"
                  color="secondary"
                  style={{ alignSelf: 'center' }}/>
                <h2 style={{ fontSize: '14px', paddingTop: '4px' }}>No data available for this site.</h2>
              </Stack>)
            : (
              <Chart
                options={{
                  data,
                  primaryAxis,
                  secondaryAxes,
                  dark: true,
                  padding: 24,
                  tooltip: false
                }} />)
        }
      </div>
      <Divider />
      <Tags
        site={site}
        onTagsUpdated={(tags) => {
          onTagsUpdated(site._id, tags)
        }}
      />
    </div>
  )
}
