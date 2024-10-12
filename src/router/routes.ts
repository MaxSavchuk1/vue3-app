import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import UsersView from '../views/UsersView.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
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
