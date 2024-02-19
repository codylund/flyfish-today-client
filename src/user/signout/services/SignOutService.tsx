import { AxiosInstance } from '../../../common/services/AxiosInstance'

export async function SignOut (): Promise<void> {
  const result = await AxiosInstance.post('/v1/signout')

  if (result.status !== 200) {
    throw new Error(`Failed to get sign out user. Code: ${result.status}`)
  }
}
