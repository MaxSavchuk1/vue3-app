import { RawAxiosRequestHeaders, ResponseType } from 'axios'

export interface IApiOptions {
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

type Address = {
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

export type UserFull = User & {
  maidenName: string
  gender: string
  email: string
  phone: string
  username: string
  password: string
  birthDate?: string
  image?: string
  bloodGroup?: string
  height?: number
  weight?: number
  eyeColor?: string
  hair?: {
    color: string
    type: string
  }
  ip: string
  address?: Address
  macAddress: string
  university?: string
  bank?: {
    cardExpire: string
    cardNumber: string
    cardType: string
    currency: string
    iban: string
  }
  company?: {
    department: string
    name: string
    title: string
    address: Address
  }
  ein: string
  ssn: string
  userAgent: string
  crypto?: {
    coin: string
    wallet: string
    network: string
  }
  role: 'admin' | 'moderator' | 'user'
}

export type Product = {
  id: string | number
  title: string
  price: number
  thumbnail: string
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
