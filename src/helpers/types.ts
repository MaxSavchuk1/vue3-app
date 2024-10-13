import { RawAxiosRequestHeaders, ResponseType } from 'axios'

export interface IApiOptions {
  baseURL?: string
  timeout?: number
  headers?: RawAxiosRequestHeaders
  responseType?: ResponseType
  dataOnly?: boolean
  signal?: AbortController
  onRequest?: (...args: any[]) => any
  onSuccess?: (...args: any[]) => any
  onError?: (...args: any[]) => any
  onFinally?: (...args: any[]) => any
  wrapResponse?: (...args: any[]) => any
}

export type User = {
  id: string | number
  firstName: string
  lastName: string
  age: string | number
}
