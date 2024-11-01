import users from './routes/users'
import products from './routes/products'
import type { RouteRecordRaw } from 'vue-router'
import middleware from '@/services/middleware-service'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    beforeEnter: middleware('auth')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      layout: 'BlankLayout'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      layout: 'BlankLayout'
    }
  },
  ...users,
  ...products
]

export default routes
