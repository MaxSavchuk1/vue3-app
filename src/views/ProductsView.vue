<script setup lang="ts">
import { UseImage } from '@vueuse/components'
import api from '@/api'
import { Product } from '@/helpers/types'

const products = ref<Product[]>([])
const skip = ref(0)

onMounted(() => {
  api.products.getProductsPaginated(skip.value, {
    onSuccess: res => {
      console.log('res', res)
      products.value = res.products
    }
  })
})
</script>

<template>
  <div class="page-container products-list-container">
    <h2 style="font-size: 30px">Products</h2>
    <div class="products-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <UseImage :src="product.thumbnail" :alt="product.title">
          <template #loading>
            <el-skeleton style="width: 100%" :loading="true" animated>
              <template #template>
                <el-skeleton-item
                  variant="image"
                  style="width: 100%; height: 200px"
                />
              </template>
            </el-skeleton>
          </template>
        </UseImage>

        <h3>{{ product.title }}</h3>
        <p>{{ product.price }}</p>
      </div>
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
  gap: 15px;
  place-items: center;
}
.product-item {
  border: 1px solid black;
  width: 200px;
  height: 250px;

  img {
    aspect-ratio: 1 / 1;
    width: 100%;
  }
}
</style>
