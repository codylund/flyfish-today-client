import axios from 'axios'

export const AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_ADDRESS
})
