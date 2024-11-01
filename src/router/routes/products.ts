import middleware from '@/services/middleware-service'

export default [
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/ProductsListView.vue'),
    beforeEnter: middleware('auth')
  },
  {
    path: '/products/:id',
    name: 'Product',
    component: () => import('@/views/ProductView.vue'),
    props: true,
    beforeEnter: middleware('auth')
  }
]
