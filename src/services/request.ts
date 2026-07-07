import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { logger } from '@/utils/logger'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    logger.debug(`Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    logger.error('Request error:', error)
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    logger.debug(`Response: ${response.status} ${response.config.url}`)
    return response.data
  },
  (error) => {
    if (error.response) {
      logger.error(`Response error: ${error.response.status} ${error.response.config.url}`)
    } else if (error.request) {
      logger.error('Network error:', error.message)
    } else {
      logger.error('Request setup error:', error.message)
    }
    return Promise.reject(error)
  },
)

export function request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
  return instance(config) as Promise<T>
}

export default instance
