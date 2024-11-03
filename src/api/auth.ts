import api from '@/services/api-service'
import type { ApiOptions, LoginForm } from '@/helpers/types'

const accessTokenExpires = 30

export default {
  login: (form: LoginForm, options: ApiOptions) =>
    api(options).post('/auth/login', {
      ...form,
      expiresInMins: accessTokenExpires // optional, default 60
    }),
  refresh: (refreshToken: string, options: ApiOptions) =>
    api(options).post('/auth/refresh', {
      refreshToken,
      expiresInMins: accessTokenExpires // optional, default 60
    }),
  getLoggedUserData: (options: ApiOptions) =>
    api({
      ...options,
      headers: { Authorization: `Bearer ${useAuthStore().accessToken}` }
    }).get('/auth/me')
}
