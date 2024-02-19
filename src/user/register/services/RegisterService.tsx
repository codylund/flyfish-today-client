import { AxiosInstance } from '../../../common/services/AxiosInstance'

export async function RegisterUser (username: string, displayName: string, password: string): Promise<void> {
  const result = await AxiosInstance.post(
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
