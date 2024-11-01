import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export default function (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (!useAuthStore().accessToken) {
    useAuthStore().intendedRoute = to
    return next({ name: 'Login' })
  }
  return next()
}
