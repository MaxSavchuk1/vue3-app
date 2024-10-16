import api from '@/services/api-service'
import { IApiOptions } from '@/helpers/types'
import {
  PRODUCTS_FETCH_LIMIT as limit,
  PRODUCTS_SELECTED_FIELDS as select
} from '@/helpers/constants'

export default {
  getProductsPaginated: (skip: number, options: IApiOptions) =>
    api(options).get(
      `/products?limit=${limit}&skip=${skip}&select=${select.join(',')}`
    ),

  getProductsByCategoryPaginated: (
    category: string,
    skip: number,
    options: IApiOptions
  ) =>
    api(options).get(
      `/products/category/${category}?limit=${limit}&skip=${skip}&select=${select.join(',')}`
    ),

  getSingleProduct: (id: string, options: IApiOptions) =>
    api(options).get(`/users/${id}`),

  searchProducts: (query: string, skip: number, options: IApiOptions) =>
    api(options).get(
      `/products/search?q=${query}&limit=${limit}&skip=${skip}&select=${select.join(',')}`
    )
}
