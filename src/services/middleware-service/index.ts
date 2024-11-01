import { isUndefined } from 'lodash-es'
import type {
  NavigationGuard,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router'

async function handle(
  middlewares: any[],
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const guardsList = middlewares.slice(0)
  const nextGuard = guardsList.shift()

  if (isUndefined(nextGuard)) {
    return next()
  }

  nextGuard(to, from, (nextArg: any) => {
    if (isUndefined(nextArg)) {
      handle(guardsList, to, from, next)
      return
    }
    next(nextArg)
  })
}

async function mapMiddlewares(middlewares: string[]) {
  const modules = await Promise.all(
    middlewares.map(async mw => {
      const module = (await import(`@/middlewares/${mw}.ts`)).default
      return module
    })
  )
  return modules
}

export default function middleware(
  middlewares: string | string[]
): NavigationGuard {
  if (!Array.isArray(middlewares)) {
    middlewares = [middlewares]
  }
  return async (to, from, next) => {
    const mws = await mapMiddlewares(middlewares)
    return handle(mws, to, from, next)
  }
}
