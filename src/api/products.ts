import api from '@/services/api-service'
import { IApiOptions, Query } from '@/helpers/types'
import {
  PRODUCTS_FETCH_LIMIT as limit,
  PRODUCTS_SELECTED_FIELDS as select
} from '@/helpers/constants'

export default {
  getProductsPaginated: (query: Query, options: IApiOptions) => {
    return api(options).get(
      `/products?${useQueryString({ limit, select, ...query })}`
    )
  },

  getProductsByCategoryPaginated: (
    category: string,
    query: Query,
    options: IApiOptions
  ) => {
    return api(options).get(
      `/products/category/${category}?${useQueryString(query)}`
    )
  },

  getSingleProduct: (id: string, options: IApiOptions) =>
    api(options).get(`/users/${id}`),

  searchProducts: (searchQuery: string, skip: number, options: IApiOptions) =>
    api(options).get(
      `/products/search?${useQueryString({ q: searchQuery, limit, skip, select })}`
    ),

  getPrpoductsCategories: (options: IApiOptions) =>
    api(options).get('/products/categories')
}
