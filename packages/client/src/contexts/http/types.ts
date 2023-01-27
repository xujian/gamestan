import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ChannelConfig } from '.'

export type RequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig

export type ResponseInterceptor = (value: AxiosResponse<any, any>) => 
  AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>

export type HttpResponse =
  Record<string, any> | Record<string, any>[]

/**
 * Http client based on Axios
 */
export interface HttpClient {
  get<T> (path: string): Promise<T>,
  post<T> (path: string, body: Record<string, any>): Promise<T>,
  put<T> (path: string, body: Record<string, any>): Promise<T>,
  delete<T> (path: string): Promise<T>,
}

export interface HttpChannel {
  name: string,
  match: (url: string) => boolean,
  config: ChannelConfig,
  requestInterceptor?: RequestInterceptor,
  responseInterceptor?: ResponseInterceptor,
}