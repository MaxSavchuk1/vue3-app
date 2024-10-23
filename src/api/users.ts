import api from '@/services/api-service'
import { ApiOptions } from '@/helpers/types'
import {
  USERS_FETCH_LIMIT as limit,
  USERS_SELECTED_FIELDS as select
} from '@/helpers/constants'

export default {
  getUsersPaginated: (skip: number, options: ApiOptions) =>
    api(options).get(`/users?${useQueryString({ limit, select, skip })}`),

  getUser: (id: string, options: ApiOptions) =>
    api(options).get(`/users/${id}`),

  searchUsers: (searchQuery: string, skip: number, options: ApiOptions) =>
    api(options).get(
      `/users/search?${useQueryString({ q: searchQuery, limit, skip, select })}`
    )
}
