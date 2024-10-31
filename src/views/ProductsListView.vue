<script setup lang="ts">
import { omit } from 'lodash-es'
import api from '@/api'
import { PRODUCTS_FETCH_LIMIT as limit } from '@/helpers/constants'
import type { Product, ProductFilter } from '@/helpers/types'

const productsList = ref<Product[]>([])
const category = ref<string | undefined>()
const filter = ref<ProductFilter>({})

const { skip, currentPage, total, handleChangePage } = usePagination()

const setProducts = (data: {
  total: number
  skip: number
  products: Product[]
}) => {
  productsList.value = data.products
  total.value = data.total
  skip.value = data.skip
}

const fetchProducts = () => {
  const options = {
    onSuccess: (res: any) => {
      setProducts(res)
    }
  }
  if (category.value) {
    return api.products.getProductsByCategoryPaginated(
      category.value,
      filter.value,
      options
    )
  }
  return api.products.getProductsPaginated(
    { skip: skip.value, ...filter.value },
    options
  )
}

const pageChangeHandler = (selectedPage: number) => {
  handleChangePage(selectedPage, limit, fetchProducts)
}

const updateFilter = (data: any) => {
  category.value = data.category
  filter.value = omit(data, 'category')
}

watch([category, filter], async () => {
  skip.value = 0
  currentPage.value = 1
  await fetchProducts()
})

onMounted(async () => {
  try {
    await fetchProducts()
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="page-container products-list-container">
    <h2 style="font-size: 30px">Products</h2>

    <ProductsFilter @updateFilter="updateFilter" />

    <div class="products-list">
      <ProductItem v-for="product in productsList" :key="product.id" :product />
    </div>

    <base-pagination
      v-model="currentPage"
      :total="total"
      :limit="limit"
      @handle-change="pageChangeHandler"
    />
  </div>
</template>

<style lang="scss" scoped>
.products-list-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-auto-rows: minmax(300px, auto);
  place-items: center;
}
</style>
