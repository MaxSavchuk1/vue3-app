import api from '@/services/api-service'
import {
  PRODUCTS_FETCH_LIMIT as limit,
  PRODUCTS_SELECTED_FIELDS as select
} from '@/helpers/constants'
import type { ApiOptions, Query } from '@/helpers/types'

export default {
  getProductsPaginated: (query: Query, options: ApiOptions) => {
    return api(options).get(
      `/products?${useQueryString({ limit, select, ...query })}`
    )
  },

  getProductsByCategoryPaginated: (
    category: string,
    query: Query,
    options: ApiOptions
  ) => {
    return api(options).get(
      `/products/category/${category}?${useQueryString(query)}`
    )
  },

  getSingleProduct: (id: string, options: ApiOptions) =>
    api(options).get(`/products/${id}`),

  searchProducts: (searchQuery: string, skip: number, options: ApiOptions) =>
    api(options).get(
      `/products/search?${useQueryString({ q: searchQuery, limit, skip, select })}`
    ),

  getPrpoductsCategories: (options: ApiOptions) =>
    api(options).get('/products/categories')
}
