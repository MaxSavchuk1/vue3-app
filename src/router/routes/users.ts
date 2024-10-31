export default [
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
