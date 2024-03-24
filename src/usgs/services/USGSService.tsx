import { type FlowDataPoint } from '../models/FlowDataPoint'
import { FlowErrors } from '../../filters/models/FlowErrors'
import { type FlowSeries } from '../models/FlowSeries'
import { type Site } from '../../user/sites/models/Site'
import { type SiteInfo } from '../models/SiteInfo'
import axios from 'axios'

interface QueryCriteria {
  locationParam: string
  variableParam: string
  parameter: any[]
}

interface QueryNote {
  value: string
  title: string
}

interface QueryInfo {
  queryURL: string
  criteria: QueryCriteria
  note: QueryNote[]
}

interface TimeZone {
  zoneOffset: string
  zoneAbbreviation: string
}

interface TimeZoneInfo {
  defaultTimeZone: TimeZone
  daylightSavingsTimeZone: TimeZone
  siteUsesDaylightSavingsTime: boolean
}

interface GeoLocation {
  geogLocation: {
    srs: string
    latitude: number
    longitude: number
  }
  localSiteXY: any[]
}

interface SiteCode {
  value: string
  network: string
  agencyCode: string
}

interface SiteProperty {
  value: string
  name: string
}

interface SourceInfo {
  siteName: string
  siteCode: SiteCode[]
  timeZoneInfo: TimeZoneInfo
  geoLocation: GeoLocation
  note: any[]
  siteType: any[]
  siteProperty: SiteProperty[]
}

interface VariableCode {
  value: string
  network: string
  vocabulary: string
  variableID: number
  default: boolean
}

interface Unit {
  unitCode: string
}

interface Option {
  name: string
  optionCode: string
}

interface Variable {
  variableCode: VariableCode[]
  variableName: string
  variableDescription: string
  valueType: string
  unit: Unit
  options: {
    option: Option[]
  }
  note: any[]
  noDataValue: number
  variableProperty: any[]
  oid: string
}

interface Value {
  value: string
  qualifiers: string[]
  dateTime: string
}

interface Qualifier {
  qualifierCode: string
  qualifierDescription: string
  qualifierID: number
  network: string
  vocabulary: string
}

interface Method {
  methodDescription: string
  methodID: number
}

interface TimeSeriesValues {
  value: Value[]
  qualifier: Qualifier[]
  qualityControlLevel: any[]
  method: Method[]
  source: any[]
  offset: any[]
  sample: any[]
  censorCode: any[]
}

interface TimeSeries {
  sourceInfo: SourceInfo
  variable: Variable
  values: TimeSeriesValues[]
  name: string
}

interface JSONBlob {
  name: string
  declaredType: string
  scope: string
  value: {
    queryInfo: QueryInfo
    timeSeries: TimeSeries[]
  }
}

export async function LoadFlows (lookbackDays: number, sites: Site[]): Promise<FlowSeries[]> {
  // Query the latest flows.
  const result = await axios.get<JSONBlob>(
    'https://waterservices.usgs.gov/nwis/iv/',
    {
      params: {
        format: 'json',
        sites: sites.map(site => site.site_id).join(','),
        // Code for cfs.
        parameterCd: '00060,00065',
        siteStatus: 'all',
        period: `P${lookbackDays}D`
      }
    }
  )

  if (result.status !== 200) {
    throw new Error(`Failed to get flow data. Code: ${result.status}`)
  }

  // Create array to hold the simplified data series.
  const flows: FlowSeries[] = []

  // For each series in the response.
  sites.forEach(site => {
    const timeSeries = result.data.value.timeSeries.filter(series => {
      const siteId = series.sourceInfo.siteCode[0].value
      return site.site_id === siteId
    })

    // Pull the site name for the label.
    const label = timeSeries[0].sourceInfo.siteName

    // Create array to hold all the data points.
    const cfs: FlowDataPoint[] = []
    const gaugeHt: FlowDataPoint[] = []

    // Create set to hold any errors.
    const errors = new Set<FlowErrors>()

    timeSeries.forEach(timeSeries => {
      const variableCode = timeSeries.variable.variableCode[0].value
      timeSeries.values[0].value.forEach(value => {
        const time: Date = new Date(value.dateTime)
        const datum: number = +value.value
        if (datum < 0) {
          console.log(`Site ${site.site_id} has invalid value ${datum}`)
          errors.add(FlowErrors.INVALID_DATA)
        }
        if (variableCode === '00060') {
          cfs.push({ time, datum })
        } else if (variableCode === '00065') {
          gaugeHt.push({ time, datum })
        } else {
          console.log(`Uknown variable code: ${variableCode}`)
        }
      })
    })

    if (errors.size > 0) {
      console.log(`Site ${site.site_id} has errors`)
    }

    flows.push({
      siteId: site.site_id,
      location: label,
      cfs,
      gaugeHt,
      errors
    })
  })

  // Return the flows.
  return flows
}

export async function LoadActiveSites (): Promise<SiteInfo[]> {
  const result = await axios.get<JSONBlob>(
    'https://waterservices.usgs.gov/nwis/dv/',
    {
      params: {
        format: 'json',
        // Colorado only
        stateCd: 'co',
        // Active streams
        siteType: 'ST',
        siteStatus: 'active',
        // Code for cfs.
        parameterCd: '00060',
        // Include sites that have reported data in the past 7 days
        period: 'P7D'
      }
    }
  )

  if (result.status !== 200) {
    throw new Error(`Failed to get flow data. Code: ${result.status}`)
  }

  return result.data.value.timeSeries.filter((series) => {
    // The USGS API may return sites that aren't reporting live flow data...
    // If there are no data points, filter out the site.
    return series.values[0].value.length > 0
  }).map((series) => {
    const geogLocation = series.sourceInfo.geoLocation.geogLocation
    const sourceInfo = series.sourceInfo
    return {
      name: sourceInfo.siteName,
      id: sourceInfo.siteCode[0].value,
      lat: geogLocation.latitude,
      lon: geogLocation.longitude
    }
  }).filter((obj, index, array) =>
    array.findIndex(o =>
      o.id === obj.id
    ) === index
  ).sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
}
