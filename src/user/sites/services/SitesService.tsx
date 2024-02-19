import { AxiosInstance } from '../../../common/services/AxiosInstance'
import { type Site } from '../models/Site'

export async function GetSites (): Promise<Site[]> {
  // Query the latest flows.
  const result = await AxiosInstance.get<Site[]>('/v1/sites')

  if (result.status !== 200) {
    throw new Error(`Failed to get flow data. Code: ${result.status}`)
  }

  return result.data
}

export async function AddSite (id: string, isFavorite: boolean): Promise<Site> {
  const result = await AxiosInstance.post(
    '/v1/sites/add',
    {
      site_id: id,
      is_favorite: isFavorite
    }
  )

  if (result.status !== 200) {
    throw new Error(`Failed to get flow data. Code: ${result.status}`)
  }

  return result.data
}

export async function DeleteSite (id: string): Promise<void> {
  const result = await AxiosInstance.delete(
    `/v1/sites/${id}`
  )

  if (result.status !== 200) {
    throw new Error(`Failed to delete site. Code: ${result.status}`)
  }

  return result.data
}

export async function UpdateSite (id: string, properties: any): Promise<Site> {
  const result = await AxiosInstance.patch(
    `/v1/sites/${id}`,
    properties
  )

  if (result.status !== 200) {
    throw new Error(`Failed to delete site. Code: ${result.status}`)
  }

  return result.data
}
