export default [
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
  }
]
