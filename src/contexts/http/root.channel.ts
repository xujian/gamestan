import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { HttpChannel, HttpResponse, RequestInterceptor, ResponseInterceptor } from './types'

const match = (url: string) => true

const config: AxiosRequestConfig = {
  baseURL: '/',
  withCredentials: false,
  params: {
    key: process.env.REACT_APP_RAWG_KEY,
  },
}

const requestInterceptor: RequestInterceptor = 
  (config: AxiosRequestConfig) => {
    return config
  }

const responseInterceptor: ResponseInterceptor =
  (value: AxiosResponse<any, any>) => {
    return value
  }

  /**
   * Http client channel for rawg.io APIs
   */
const rawgChannel: HttpChannel = {
  name: 'rawg',
  match,
  config,
  requestInterceptor,
  responseInterceptor
}

export default rawgChannel