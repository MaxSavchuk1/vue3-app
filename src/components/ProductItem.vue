<script lang="ts" setup>
import { Product } from '@/helpers/types'

defineProps<{ product: Product }>()

const router = useRouter()

const loading = ref(true)

const imageLoaded = () => {
  loading.value = false
}
</script>

<template>
  <div
    class="product-item-container"
    @click="router.push({ name: 'Product', params: { id: product.id } })"
  >
    <el-skeleton v-if="loading" style="width: 100%" loading animated>
      <template #template>
        <el-skeleton-item
          variant="image"
          style="width: 100%; height: 200px; margin-bottom: 6px"
        />
        <el-skeleton-item variant="text" style="width: 100%" />
        <el-skeleton-item variant="text" style="width: 50%" />
      </template>
    </el-skeleton>
    <div v-show="!loading" class="product-item">
      <img
        @load="imageLoaded()"
        :src="product.thumbnail"
        :alt="product.title"
      />
      <h3>{{ product.title }}</h3>
      <p>$ {{ product.price }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-item-container {
  padding: 8px;
  width: 100%;
  height: 100%;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px grey;
  }

  .el-skeleton > * + *,
  .product-item > * + * {
    margin-top: 4px;
  }

  .product-item {
    h3 {
      font-weight: 700;
    }
    img {
      aspect-ratio: 1 / 1;
      width: 100%;
    }
  }
}
</style>
