import { type FlowDataPoint, type FlowSeries } from './FlowSeries'
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

interface TimeSeries {
  sourceInfo: SourceInfo
  variable: Variable
  values: [{
    value: Value[]
    qualifier: Qualifier[]
    qualityControlLevel: any[]
    method: Method[]
    source: any[]
    offset: any[]
    sample: any[]
    censorCode: any[]
  }]
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

export async function LoadFlows (lookbackDays: number, sites: string[]): Promise<FlowSeries[]> {
  // Query the latest flows.
  const result = await axios.get<JSONBlob>(
    'https://waterservices.usgs.gov/nwis/iv/',
    {
      baseURL: 'https://waterservices.usgs.gov/',
      url: 'nwis/iv/',
      params: {
        format: 'json',
        sites: sites.join(','),
        // Code for cfs.
        parameterCd: '00060',
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
  result.data.value.timeSeries.forEach(series => {
    // Pull the site name for the label.
    const label = series.sourceInfo.siteName
    // Create array to hold all the data points.
    const data: FlowDataPoint[] = []
    // For each value in the series, pull the time and CFS.
    series.values[0].value.forEach(value => {
      const time: Date = new Date(value.dateTime)
      // We are in MDT. React Charts only renders in UTC time, so just subtract 6 hours
      // to make it match MDT.
      time.setHours(time.getHours() - 6)
      const cfs: number = +value.value
      data.push({ time, cfs })
    })
    flows.push({ location: label, data })
  })

  // Return the flows.
  return flows
}
