import api from '../services/api-service'
import { IApiOptions } from '../helpers/types'

export default {
  getUsersPaginated: (
    params: { limit?: number; skip?: number },
    options: IApiOptions
  ) => {
    const limit = params?.limit || 15
    const skip = params?.skip || 0
    const select = ['id', 'firstName', 'lastName', 'age']

    return api(options).get(
      `/users?limit=${limit}&skip=${skip}&select=${select.join(',')}`
    )
  },

  getUser: (id: string, options: IApiOptions) =>
    api(options).get(`/users/${id}`),

  searchUsers: (query: string, options: IApiOptions) =>
    api(options).get(`/users/search?q=${query}`)
}
