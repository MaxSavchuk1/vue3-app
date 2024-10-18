<script setup lang="ts">
import api from '@/api'
import { Product } from '@/helpers/types'

const products = ref<Product[]>([])
const skip = ref(0)

onMounted(() => {
  api.products.getProductsPaginated(skip.value, {
    onSuccess: res => {
      products.value = res.products
    }
  })
})
</script>

<template>
  <div class="page-container products-list-container">
    <h2 style="font-size: 30px">Products</h2>
    <div class="products-list">
      <ProductItem v-for="product in products" :key="product.id" :product />
    </div>
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: minmax(300px, auto);
  place-items: center;
}
</style>
