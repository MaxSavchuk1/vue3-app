<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '@/api'
import UsersListItem from '@/components/UsersListItem.vue'
import { User } from '@/helpers/types'

const users = ref<User[]>([])
const isLoading = ref(false)

onMounted(async () => {
  await api.getUsersPaginated(
    {},
    {
      onRequest: () => {
        isLoading.value = true
      },
      onSuccess: res => {
        users.value = res.users
      },
      onFinally: () => {
        isLoading.value = false
      }
    }
  )
})
</script>

<template>
  <ul class="users-list">
    <div v-if="isLoading" class="loader"></div>
    <template v-else>
      <UsersListItem v-for="user in users" :key="user.id" :user="user" />
    </template>
  </ul>
</template>

<style lang="scss" scoped>
.users-list {
  padding: 30px;
}
</style>
