import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import axios, { AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse } from 'axios'
import rootConfig from './config'
import { HttpChannel, HttpClient, HttpResponse } from './types'
import rootChannel from './root.channel'
import merge from 'lodash/merge'
import channels from './channels'

const HttpContext = createContext<AxiosInstance | null>(null)
const coreChannels: HttpChannel[] = [rootChannel]

/**
 * apply channel to axios instance
 */
const applyChannel = (instance: AxiosInstance, channel: HttpChannel) => {
  instance.interceptors.request.use(channel.requestInterceptor)
  instance.interceptors.response.use(channel.responseInterceptor)
}

/**
 * provides http client
 * @returns 
 */
export const HttpProvider: React.FC<{
  children: React.ReactNode,
}> = ({
  children,
}) => {
  let config: AxiosRequestConfig = rootConfig

  coreChannels.forEach(channel => {
    config = merge(config, channel.config)
  })
  console.log('HttpProvider ....', config)

  const instance =axios.create(config),
    ref = useRef(instance)

  useEffect(() => {
    coreChannels.forEach(channel => {
      applyChannel(instance, channel)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coreChannels])

  return (
    <HttpContext.Provider value={ref.current}>
      {children}
    </HttpContext.Provider>
  )
}

/**
 * 
 * @param url 
 * @param method 
 * @param payload 
 * @returns 
 */
export const useHttp = () => {

  const contextInstance = useContext(HttpContext) || axios.create()
  const instance = useMemo(() => {
    return contextInstance
  }, [contextInstance])

  const request = async (config: AxiosRequestConfig) => {
    return new Promise<HttpResponse>((resolve, reject) => {
      instance.request(config).then((rsp: AxiosResponse<HttpResponse>) => {
        const status = rsp.status
        if (status >= 200 && status < 300) {
          resolve(rsp.data)
        } else {
          reject({
            error: rsp.status
          })
        }
      })
    })
  }

  const http: HttpClient = {
    get (url: string) {
      return request({
        url, method: 'get'
      })
    },
    post (url: string, data: Record<string, any>) {
      return request({
        url, data, method: 'post'
      })
    },
    put (url: string, data: Record<string, any>) {
      return request({
        url, data, method: 'put'
      })
    },
    delete (url: string) {
      return request({
        url, method: 'delete'
      })
    },
  }

  return { http }
}
