import MainLayout from '@/layouts/MainLayout.vue'
import ProductsView from '@/views/ProductsView.vue'
import UsersListView from '@/views/UsersListView.vue'
import UserView from '@/views/UserView.vue'

export default [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    children: [
      {
        path: '/products',
        name: 'Products',
        component: ProductsView
      },
      {
        path: '/users',
        name: 'Users',
        component: UsersListView
      },
      {
        path: '/users/:id',
        name: 'User',
        component: UserView,
        props: true
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFoundView.vue')
  }
]
