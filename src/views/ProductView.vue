<script setup lang="ts">
import api from '@/api'
import { Product } from '@/helpers/types'

const props = defineProps<{ id: string }>()

const product = ref<Product>()

const fetchProduct = () => {
  return api.products.getSingleProduct(props.id, {
    onSuccess: res => {
      console.log(res)
      product.value = res
    }
  })
}

onMounted(async () => {
  console.log(props)
  try {
    await fetchProduct()
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="page-container">Product</div>
</template>

<style lang="scss" scoped></style>
