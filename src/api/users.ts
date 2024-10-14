import api from '@/services/api-service'
import { IApiOptions } from '@/helpers/types'
import { FETCH_LIMIT as limit } from '@/helpers/constants'

const select = ['id', 'firstName', 'lastName', 'age']

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
