<script setup lang="ts">
type Props = {
  height?: string
  src: string
  alt?: string
}
withDefaults(defineProps<Props>(), {
  height: '200px',
  alt: ''
})
const loading = ref(true)

const imageLoaded = () => {
  loading.value = false
}
</script>

<template>
  <div class="image-container">
    <el-skeleton v-if="loading" style="width: 100%" loading animated>
      <template #template>
        <el-skeleton-item variant="image" :style="{ width: '100%', height }" />
      </template>
    </el-skeleton>
    <div v-show="!loading" :style="{ height }">
      <img @load="imageLoaded()" :src :alt width="100%" height="100%" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-container {
  img {
    object-fit: contain;
  }
}
</style>
