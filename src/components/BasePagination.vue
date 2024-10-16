<script lang="ts" setup>
type Props = {
  limit: number
  total: number
  modelValue: number
}

withDefaults(defineProps<Props>(), {
  modelValue: 1,
  limit: 0,
  total: 0
})

const emit = defineEmits(['update:modelValue', 'handleChange'])
</script>

<template>
  <el-pagination
    :current-page="modelValue"
    background
    layout="prev, pager, next"
    :page-size="limit"
    :total="total"
    :hide-on-single-page="total <= limit"
    @update:current-page="v => emit('update:modelValue', v)"
    @change="v => emit('handleChange', v)"
  />
</template>

<style lang="scss" scoped>
.el-pagination {
  margin: 0 auto;
}
</style>
