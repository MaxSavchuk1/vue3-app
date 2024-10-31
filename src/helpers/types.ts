import type { RawAxiosRequestHeaders, ResponseType } from 'axios'

export type ApiOptions = {
  baseURL?: string
  timeout?: number
  headers?: RawAxiosRequestHeaders
  responseType?: ResponseType
  dataOnly?: boolean
  signal?: AbortSignal
  silent?: boolean
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

export type Address = {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  coordinates: {
    lat: number
    lng: number
  }
  country: string
}

export type Company = {
  department: string
  name: string
  title: string
  address: Address
}

export type Product = {
  id: string | number
  title: string
  price: number
  thumbnail: string
}

export type Review = {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export type ProductsCategory = {
  slug: string
  name: string
  url: string
}

export type ProductFilter = {
  sortBy?: string
  order?: string
}

export type Query = Record<string, string | number | string[] | undefined>
