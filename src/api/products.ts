import queryString from 'query-string'
import api from '@/services/api-service'
import { IApiOptions } from '@/helpers/types'
import {
  PRODUCTS_FETCH_LIMIT as limit,
  PRODUCTS_SELECTED_FIELDS as select
} from '@/helpers/constants'

type Query = Record<string, string | number>
const getQuery = (query: Query) =>
  queryString.stringify({ limit, select, ...query }, { arrayFormat: 'comma' })

export default {
  getProductsPaginated: (query: Query, options: IApiOptions) => {
    return api(options).get(`/products?${getQuery(query)}`)
  },

  getProductsByCategoryPaginated: (
    category: string,
    query: Query,
    options: IApiOptions
  ) => {
    return api(options).get(`/products/category/${category}?${getQuery(query)}`)
  },

  getSingleProduct: (id: string, options: IApiOptions) =>
    api(options).get(`/users/${id}`),

  searchProducts: (query: string, skip: number, options: IApiOptions) =>
    api(options).get(
      `/products/search?q=${query}&limit=${limit}&skip=${skip}&select=${select.join(',')}`
    ),

  getPrpoductsCategories: (options: IApiOptions) =>
    api(options).get('/products/categories')
}
