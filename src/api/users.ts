import api from '@/services/api-service'
import { IApiOptions } from '@/helpers/types'
import {
  USERS_FETCH_LIMIT as limit,
  USERS_SELECTED_FIELDS as select
} from '@/helpers/constants'

export default {
  getUsersPaginated: (skip: number, options: IApiOptions) =>
    api(options).get(
      `/users?limit=${limit}&skip=${skip}&select=${select.join(',')}`
    ),

  getUser: (id: string, options: IApiOptions) =>
    api(options).get(`/users/${id}`),

  searchUsers: (query: string, skip: number, options: IApiOptions) =>
    api(options).get(
      `/users/search?q=${query}&limit=${limit}&skip=${skip}&select=${select.join(',')}`
    )
}
