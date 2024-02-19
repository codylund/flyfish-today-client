import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_ADDRESS
})

export async function SignOut (): Promise<void> {
  const result = await instance.post('/v1/signout')

  if (result.status !== 200) {
    throw new Error(`Failed to get sign out user. Code: ${result.status}`)
  }
}
