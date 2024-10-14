<script setup lang="ts">
import { onMounted } from 'vue'
import api from '@/api'

const props = defineProps<{ id: string }>()

onMounted(async () => {
  await api.getUser(props.id, {
    onSuccess: res => {
      console.log('res', res)
    }
  })
})
</script>

<template>
  <div>User {{ id }}</div>
</template>
