<script setup lang="ts">
import api from '@/api'
import { User } from '@/helpers/types'

const users = ref<User[]>([])

onMounted(async () => {
  await api.getUsersPaginated(
    {},
    {
      onSuccess: res => {
        users.value = res.users
      }
    }
  )
})
</script>

<template>
  <ul class="users-list">
    <UsersListItem v-for="user in users" :key="user.id" :user="user" />
  </ul>
</template>

<style lang="scss" scoped>
.users-list {
  padding: 30px;
}
</style>
