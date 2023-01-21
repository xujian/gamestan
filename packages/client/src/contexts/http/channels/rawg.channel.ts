import { AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { HttpChannel, RequestInterceptor, ResponseInterceptor } from '../types'
import merge from 'lodash/merge'
import { ChannelConfig } from '..'

const match = (url: string) => url.match(/rawg\.io/) !== null

const config: ChannelConfig = {
  baseURL: '/',
  headers: AxiosHeaders.from() as AxiosRequestHeaders
}

const requestInterceptor: RequestInterceptor = 
  (config: AxiosRequestConfig) => {
    return merge(
      config, {
      params: {
        key: process.env.RAWG_KEY
      }
    })
  }

const responseInterceptor: ResponseInterceptor =
  (value: AxiosResponse<any, any>) => {
    return value
  }

const rootChannel: HttpChannel = {
  name: 'root',
  match,
  config,
  requestInterceptor,
  responseInterceptor
}

export default rootChannel