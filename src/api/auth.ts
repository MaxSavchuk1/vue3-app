import api from '@/services/api-service'
import type { ApiOptions } from '@/helpers/types'

export default {
  login: (form: { username: string; password: string }, options: ApiOptions) =>
    api(options).post('/auth/login', {
      ...form,
      expiresInMins: 30 // optional, default 60
    })
}
