import { AxiosInstance } from '../../../common/services/AxiosInstance'

export async function Auth (username: string, password: string): Promise<void> {
  const result = await AxiosInstance.post(
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
