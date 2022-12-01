import { AxiosRequestConfig, AxiosResponse } from 'axios'

export type RequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig

export type ResponseInterceptor = (value: AxiosResponse<any, any>) => 
  AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>

export type HttpResponse =
  Record<string, number | string | boolean | Record<string, any>>

/**
 * Http client based on Axios
 */
export interface HttpClient {
  get (path: string): Promise<HttpResponse>,
  post (path: string, body: Record<string, any>): Promise<boolean>,
  put (path: string, body: Record<string, any>): Promise<boolean>,
  delete (path: string): Promise<boolean>,
}

export interface HttpChannel {
  name: string,
  match: (url: string) => boolean,
  config: AxiosRequestConfig,
  requestInterceptor?: RequestInterceptor,
  responseInterceptor?: ResponseInterceptor,
}