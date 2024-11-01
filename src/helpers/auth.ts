import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constants'

const setAccessToken = (token: string) => {
  useStorage(ACCESS_TOKEN_KEY, token)
}

const setRefreshToken = (token: string) => {
  useStorage(REFRESH_TOKEN_KEY, token)
}

const getAccessToken = () => {
  return useStorage(ACCESS_TOKEN_KEY, '')
}

const getRefreshToken = () => {
  return useStorage(REFRESH_TOKEN_KEY, '')
}

const clearTokens = () => {
  useStorage(ACCESS_TOKEN_KEY, '').value = null
  useStorage(REFRESH_TOKEN_KEY, '').value = null
}

export default {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
  clearTokens
}
