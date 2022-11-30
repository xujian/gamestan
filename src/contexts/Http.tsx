import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import axios, { AxiosError, AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse, CreateAxiosDefaults } from 'axios'

const HttpContext = createContext<AxiosInstance | null>(null)

type RequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig
type ResponseInterceptor = (value: AxiosResponse<any, any>) => 
  AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>

/**
 * provides http client
 * @returns 
 */
export const HttpProvider: React.FC<{
  config?: CreateAxiosDefaults,
  requestInterceptors?: RequestInterceptor[],
  responseInterceptors?: ResponseInterceptor[],
  children: React.ReactNode,
}> = ({
  config = {},
  requestInterceptors = [],
  responseInterceptors = [],
  children,
}) => {
  const instanceRef = useRef(axios.create(config))

  useEffect(() => {
    requestInterceptors.forEach((interceptor) => {
      instanceRef.current.interceptors.request.use(
        interceptor
      )
    })
    responseInterceptors.forEach((interceptor) => {
      instanceRef.current.interceptors.response.use(
        interceptor
      )
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HttpContext.Provider value={instanceRef.current}>
      {children}
    </HttpContext.Provider>
  )
}

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
    return contextInstance || axios
  }, [contextInstance])
  const controllerRef = useRef(new AbortController())
  const cancel = () => {
    controllerRef.current.abort()
  }

  const tokenInterceptor: RequestInterceptor = async (config: AxiosRequestConfig) => {
    let token: string = localStorage.getItem('token') || ''
    if (!token) {
      const host = 'https://id.twitch.tv',
        clientId = 'i0299cj3gr53bpckpx7fhmadm9d429',
        clientSecret = 'f2tam42crti0lx7dtnhp5j7kv2k9np',
        url = `${host}/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
      const data: any = await axios.post(url)
      token = data['access_token']
    }
    return {
      ...config,
      token
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await instance.request({
          signal: controllerRef.current.signal,
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

  return { cancel, data, error, loaded }
}
