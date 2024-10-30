import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/ProductsListView.vue')
  },
  {
    path: '/products/:id',
    name: 'Product',
    component: () => import('@/views/ProductView.vue'),
    props: true
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/UsersListView.vue')
  },
  {
    path: '/users/:id',
    name: 'User',
    component: () => import('@/views/UserView.vue'),
    props: true
  }
]

export default routes
