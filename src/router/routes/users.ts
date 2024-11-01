import middleware from '@/services/middleware-service'

export default [
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/UsersListView.vue'),
    beforeEnter: middleware('auth')
  },
  {
    path: '/users/:id',
    name: 'User',
    component: () => import('@/views/UserView.vue'),
    props: true,
    beforeEnter: middleware('auth')
  }
]
