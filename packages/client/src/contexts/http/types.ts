import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ChannelConfig } from '.'

export type RequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig

export type ResponseInterceptor = (value: AxiosResponse<any, any>) => 
  AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>

export type HttpResponse =
  Record<string, any> | Record<string, any>[]

export type HttpParams = Record<string, string>

export type HttpBody = Record<string, any> | string

/**
 * Http client based on Axios
 */
export interface HttpClient {
  get<T> (url: string, params?: HttpParams): Promise<T>,
  post<T> (url: string, body: HttpParams): Promise<T>,
  put<T> (url: string, body: HttpParams): Promise<T>,
  delete<T> (url: string): Promise<T>,
}

export interface HttpChannel {
  name: string,
  match: (url: string) => boolean,
  config: ChannelConfig,
  requestInterceptor?: RequestInterceptor,
  responseInterceptor?: ResponseInterceptor,
}