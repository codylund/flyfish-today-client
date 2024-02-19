import 'chartjs-adapter-moment'
import { Alert, Box, Divider, IconButton, Stack } from '@mui/material'
import {
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Title,
  Tooltip
} from 'chart.js'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import React, { type FC } from 'react'
import { EditMenu } from './EditMenu'
import ErrorIcon from '@mui/icons-material/Error'
import { FlowErrors } from '../../filters/models/FlowErrors'
import { type FlowSeries } from '../models/FlowSeries'
import { Line } from 'react-chartjs-2'

import { type Site } from '../../user/sites/models/Site'
import { Tags } from './Tags'

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
)

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

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    plugins: {
      title: {
        display: false,
        text: flow.location
      }
    },
    elements: {
      point: {
        radius: 0
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day' as const
        },
        title: {
          display: true,
          text: 'Time' as const
        },
        grid: {
          drawBorder: true,
          lineWidth: 1,
          color: '#333333'
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'CFS' as const
        },
        grid: {
          drawBorder: true,
          lineWidth: 1,
          color: '#333333'
        }
      }
    }
  }

  const labels = flow.data.map(datum => datum.time)
  const data = {
    labels,
    datasets: [
      {
        label: 'CFS',
        data: flow.data.map(datum => datum.cfs),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y'
      }
    ]
  }

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
      {
        Array.from(flow.errors).map((error) => {
          let msg: string
          if (error === FlowErrors.INVALID_DATA) {
            msg = 'Chart may contain invalid data.'
          } else {
            msg = 'unknown'
          }
          return (
            <Box key={error}>
              <Alert severity='warning' sx={{ paddingLeft: '24px' }}>
                {msg}
              </Alert>
            </Box>
          )
        })
      }
      <div style={{ height: '400px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '24px' }}>
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
            : (<Box sx={{ height: '100%' }}>
              <Line options={options} data={data} />
            </Box>)
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
