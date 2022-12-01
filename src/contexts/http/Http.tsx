import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import axios, { AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse, CreateAxiosDefaults } from 'axios'
import rootConfig from './config'
import { HttpChannel, HttpClient, RequestInterceptor, ResponseInterceptor } from './types'
import rootChannel from './root.channel'
import merge from 'lodash/merge'
import channels from './channels'
import { channel } from 'diagnostics_channel'

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
  let config: AxiosRequestConfig = {}

  coreChannels.forEach(channel => {
    config = merge(config, channel.config)
  })

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
export const useHttp = (
  url: string, 
  method: string,
  payload: {[key: string]: any
}) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  const contextInstance = useContext(HttpContext)
  const instance = useMemo(() => {
    return contextInstance
  }, [contextInstance])

  const abort = useRef(new AbortController())
  const cancel = () => {
    abort.current.abort()
  }

  const request = (config: AxiosRequestConfig) => {
    return new Promise((resolve, reject) => {
      axios.request(config)
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

  useEffect(() => {
    (async () => {
      try {
        const response = await instance.request({
          signal: abort.current.signal,
          data: payload,
          method,
          url: `https://`,
        })
        setData(response.data)
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e.message)
        } else {
          setError('Http Error')
        }
      } finally {
        setLoaded(true);
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { http }
}
