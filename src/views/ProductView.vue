<script setup lang="ts">
import api from '@/api'
import { ProductFull } from '@/helpers/types'

const props = defineProps<{ id: string }>()

const product = ref<ProductFull>()

const images = computed(() => {
  return product.value?.images || []
})

const fetchProduct = () => {
  return api.products.getSingleProduct(props.id, {
    onSuccess: res => {
      product.value = res
    }
  })
}

onMounted(async () => {
  try {
    await fetchProduct()
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="page-container">
    <div class="product">
      <div class="product-general-info">
        <div class="carousel">
          <el-carousel trigger="click" height="320px" :autoplay="false">
            <el-carousel-item
              v-for="(image, i) in images"
              :key="image"
              :label="i + 1"
            >
              <BaseImage :src="image" height="320px" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="product-title">
          <h2>{{ product?.title }}</h2>
          <div class="product-tags">
            <el-tag v-for="tag in product?.tags" :key="tag">{{ tag }}</el-tag>
          </div>
          <el-rate
            v-if="product?.rating"
            v-model="product.rating"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} points"
          />
        </div>
      </div>
      <el-divider />
      <div class="product-description">
        <p>{{ product?.description }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  display: flex;

  .product {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0 auto;

    .product-general-info {
      display: flex;
      gap: 10px;
      justify-content: center;

      .carousel {
        width: 400px;
      }

      .product-title {
        h2 {
          font-weight: 700;
          font-size: 2em;
        }
        .product-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        & > * + * {
          margin-top: 10px;
        }
      }
    }

    .product-description {
      line-height: 1.5em;
    }
  }
}
</style>
