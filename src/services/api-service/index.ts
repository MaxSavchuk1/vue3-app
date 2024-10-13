import Api from './Api'
import { IApiOptions } from '../../helpers/types'
import { DUMMYJSON_BASE_URL } from '../../helpers/constants'

const api = (options: IApiOptions) =>
  new Api({ baseURL: DUMMYJSON_BASE_URL, ...options })

export default api
