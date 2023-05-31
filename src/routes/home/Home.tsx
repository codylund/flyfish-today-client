import React, { type FC } from 'react'
import { AddSiteButton } from '../../components/AddSiteButton'
import Box from '@mui/material/Box'
import { FlowAppBar } from '../../components/FlowAppBar'
import { FlowChart } from '../../components/FlowChart'
import { type FlowSeries } from '../../services/flows/FlowSeries'
import Grid from '@mui/material/Grid'
import { LoadFlows } from '../../services/flows/FlowService'
import Paper from '@mui/material/Paper'
import { isMobile } from 'react-device-detect'
import { useSearchParams } from 'react-router-dom'

export const Home: FC = () => {
  const defaultFlows: FlowSeries[] = []
  const [flows, setFlows]: [FlowSeries[], (posts: FlowSeries[]) => void] = React.useState(defaultFlows)
  const [lookback, setLookback]: [number, (lookback: number) => void] = React.useState(7)
  const [searchParams, setSearchParams] = useSearchParams()

  // Init sites from latest URL query params.
  const sites = searchParams.getAll('site')

  React.useEffect(() => {
    if (sites.length > 0) {
      void LoadFlows(lookback, sites)
        .then(flows => {
          setFlows(flows)
        })
        .catch(e => {
          console.error('Flow lookup failed.', e.stack)
        })
    }
  }, [lookback, searchParams])

  const onSiteAdded = (site: string): void => {
    searchParams.append('site', site)
    setSearchParams(new URLSearchParams(searchParams.toString()))
  }

  let columns = 12
  if (isMobile) { columns = 1 }

  return (
    <Box sx={{ width: '100%' }}>
      <FlowAppBar lookback={lookback} onLookbackUpdated={setLookback} />
      <Grid container columns={columns} sx={{ flexGrow: 1 }} spacing={2} style={{ padding: '16px' }}>
        {flows.map((flow) => {
          return (
            <Grid key={flow.location} item xs={6}>
              <Paper elevation={2}>
                <h1 style={{ fontSize: '18px', paddingTop: '16px' }}>{flow.location}</h1>
                <div style={{ height: '400px' }}>
                  <FlowChart flow={flow} />
                </div>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
      <AddSiteButton onSiteAdded={onSiteAdded} />
    </Box>
  )
}
