import MainLayout from '../layouts/MainLayout.vue'
import ProductsView from '../views/ProductsView.vue'
import UsersView from '../views/UsersView.vue'

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
        component: UsersView
      }
    ]
  }
]
