<script lang="ts" setup>
import { Product } from '@/helpers/types'

defineProps<{ product: Product }>()

const router = useRouter()
</script>

<template>
  <div
    class="product-item-container"
    @click="router.push({ name: 'Product', params: { id: product.id } })"
  >
    <BaseImage :src="product.thumbnail" :alt="product.title" />
    <h3>{{ product.title }}</h3>
    <p>$ {{ product.price }}</p>
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

  & > * + * {
    margin-top: 4px;
  }

  h3 {
    font-weight: 700;
  }
}
</style>
