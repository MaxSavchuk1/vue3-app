import authUtils from '@/helpers/auth'
import type { RouteLocationNormalized } from 'vue-router'
import type { LoginForm } from '@/helpers/types'

export const useAuthStore = defineStore('auth-store', () => {
  const router = useRouter()

  const accessToken = ref(authUtils.getAccessToken())
  const refreshToken = ref(authUtils.getRefreshToken())
  const intendedRoute = ref<RouteLocationNormalized | undefined>()
  const isRefreshing = ref(false)

  const setTokens = (data: { accessToken: string; refreshToken: string }) => {
    accessToken.value = data.accessToken
    refreshToken.value = data.refreshToken
  }

  const signIn = async (form: LoginForm) => {
    try {
      await useApi().auth.login(form, {
        successNotification: 'Login successful',
        onSuccess: res => {
          setTokens(res)
          authUtils.setAccessToken(res.accessToken)
          authUtils.setRefreshToken(res.refreshToken)
          if (intendedRoute.value) {
            router.push(intendedRoute.value)
          }
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
  const signOut = () => {
    accessToken.value = undefined
    refreshToken.value = undefined
    intendedRoute.value = undefined
    authUtils.clearTokens()
  }

  const refresh = async () => {
    if (!refreshToken.value) return
    isRefreshing.value = true
    try {
      await useApi().auth.refresh(refreshToken.value, {
        silent: true,
        onSuccess: res => {
          if (res) return setTokens(res)
          return router.push({ name: 'Login' })
        },
        onError: () => {
          signOut()
        },
        onFinally: () => {
          isRefreshing.value = false
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  return { accessToken, refreshToken, intendedRoute, signIn, signOut, refresh }
})
