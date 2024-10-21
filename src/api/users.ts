import api from '@/services/api-service'
import { IApiOptions } from '@/helpers/types'
import {
  USERS_FETCH_LIMIT as limit,
  USERS_SELECTED_FIELDS as select
} from '@/helpers/constants'

export default {
  getUsersPaginated: (skip: number, options: IApiOptions) =>
    api(options).get(`/users?${useQueryString({ limit, select, skip })}`),

  getUser: (id: string, options: IApiOptions) =>
    api(options).get(`/users/${id}`),

  searchUsers: (searchQuery: string, skip: number, options: IApiOptions) =>
    api(options).get(
      `/users/search?${useQueryString({ q: searchQuery, limit, skip, select })}`
    )
}
