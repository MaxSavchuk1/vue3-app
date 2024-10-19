<script setup lang="ts">
import api from '@/api'
import { ProductsCategory } from '@/helpers/types'

const emit = defineEmits(['updateFilter'])

const categories = ref<ProductsCategory[]>([])
const selectedCategory = ref<string | undefined>()
const sort = ref<'title' | 'price'>('title')
const order = ref<'asc' | 'desc'>('asc')

const sortOptions = ref([
  { label: 'Sort by name', value: 'title' },
  { label: 'Sort by price', value: 'price' }
])
const orderOptions = ref(['asc', 'desc'])

const fetchCategories = () => {
  return api.products.getPrpoductsCategories({
    onSuccess: res => {
      categories.value = res
    }
  })
}

watch(
  [selectedCategory, sort, order],
  () => {
    emit('updateFilter', {
      category: selectedCategory.value,
      sortBy: sort.value,
      order: order.value
    })
  },
  { immediate: true }
)

onMounted(async () => {
  try {
    await fetchCategories()
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="products-list-filter">
    <h3>Filter</h3>
    <div class="filters">
      <el-select
        v-model="selectedCategory"
        clearable
        filterable
        size="large"
        placeholder="Select category"
        style="width: 240px"
      >
        <el-option
          v-for="item in categories"
          :key="item.slug"
          :label="item.name"
          :value="item.slug"
        />
      </el-select>
      <el-select
        v-model="sort"
        size="large"
        placeholder="Select category"
        style="width: 240px"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="order"
        size="large"
        placeholder="Select category"
        style="width: 100px"
      >
        <el-option
          v-for="item in orderOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products-list-filter {
  h3 {
    font-size: 1.1em;
    margin-bottom: 8px;
  }
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>
