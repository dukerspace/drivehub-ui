import axios from 'axios'
export const baseApi = import.meta.env.VITE_APP_API

export const ApiClient = () => {
  const instance = axios.create({
    baseURL: baseApi,
    timeout: 40000,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json; charset=utf-8'
    }
  })

  return instance
}
