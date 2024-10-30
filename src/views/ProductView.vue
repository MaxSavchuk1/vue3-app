<script setup lang="ts">
import api from '@/api'
import ProductEntity from '@/entites/Product.entity'

const props = defineProps<{ id: string }>()

const product = ref<ProductEntity>()

const fetchProduct = () => {
  return api.products.getSingleProduct(props.id, {
    onSuccess: res => {
      product.value = new ProductEntity(res)
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
            <el-carousel-item v-for="image in product?.images" :key="image">
              <BaseImage :src="image" height="320px" />
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="product-title">
          <h2>{{ product?.title }}</h2>

          <h3>{{ product?.formattedPrice }}</h3>

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

        :deep(.el-carousel__indicator) {
          padding: 0;
        }

        :deep(.el-carousel__button) {
          padding: 0;
          background-color: unset;
          margin: 0 6px;
          background-color: lightgray;
          border: 1px solid white;
          width: 10px;
          height: 10px;
          line-height: 1.4em;
          border-radius: 50%;
        }
      }

      .product-title {
        h2 {
          font-weight: 700;
          font-size: 2em;
        }
        h3 {
          font-size: 1.3em;
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
