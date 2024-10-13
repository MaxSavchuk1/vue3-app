import api from '../services/api-service'
import { IApiOptions } from '../helpers/types'

export default {
  getUsersPaginated: (
    options: IApiOptions,
    params?: { limit?: number; skip?: number }
  ) => {
    const limit = params?.limit || 30
    const skip = params?.skip || 0
    const select = ['id', 'firstName', 'lastName', 'age']

    return api(options).get(
      `/users?limit=${limit}&skip=${skip}&select=${select.join(',')}`
    )
  },

  getUser: (options: IApiOptions, id: string | number) =>
    api(options).get(`/users/${id}`)
}
