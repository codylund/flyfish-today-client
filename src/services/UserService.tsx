import { type Site } from '../models/api/Site'
import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://beta.api.coloradostreamflow.com'
})

export async function Auth (username: string, password: string): Promise<void> {
  const result = await instance.post(
    '/v1/signin',
    {
      username,
      password
    }
  )

  if (result.status !== 200) {
    throw new Error(`Failed to get sign in. Code: ${result.status}`)
  }
}

export async function RegisterUser (username: string, displayName: string, password: string): Promise<void> {
  const result = await instance.post(
    '/v1/register',
    {
      username,
      displayName,
      password
    }
  )

  if (result.status !== 200) {
    throw new Error(`Failed to register new user. Code: ${result.status}`)
  }
}

export async function SignOut (): Promise<void> {
  const result = await instance.post('/v1/signout')

  if (result.status !== 200) {
    throw new Error(`Failed to get sign out user. Code: ${result.status}`)
  }
}

export async function GetSites (): Promise<Site[]> {
  // Query the latest flows.
  const result = await instance.get<Site[]>('/v1/sites')

  if (result.status !== 200) {
    throw new Error(`Failed to get flow data. Code: ${result.status}`)
  }

  return result.data
}

export async function AddSite (id: string, isFavorite: boolean): Promise<Site> {
  const result = await instance.post(
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
  const result = await instance.delete(
    `/v1/sites/${id}`
  )

  if (result.status !== 200) {
    throw new Error(`Failed to delete site. Code: ${result.status}`)
  }

  return result.data
}

export async function UpdateSite (id: string, properties: any): Promise<Site> {
  const result = await instance.patch(
    `/v1/sites/${id}`,
    properties
  )

  if (result.status !== 200) {
    throw new Error(`Failed to delete site. Code: ${result.status}`)
  }

  return result.data
}
