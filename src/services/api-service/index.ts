import Api from './Api'
import { ApiOptions } from '@/helpers/types'
import { DUMMYJSON_BASE_URL } from '@/helpers/constants'

const api = (options: ApiOptions) =>
  new Api({ baseURL: DUMMYJSON_BASE_URL, ...options })

export default api
