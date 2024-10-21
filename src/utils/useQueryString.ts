import queryString from 'query-string'
import { Query } from '@/helpers/types'

export const useQueryString = (query: Query) => {
  return queryString.stringify(query, { arrayFormat: 'comma' })
}
