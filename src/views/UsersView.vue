<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '../api'
import UsersListItem from '../components/UsersListItem.vue'
import { User } from '../helpers/types'

const users = ref<User[]>([])

onMounted(async () => {
  await api.getUsersPaginated({
    onSuccess: res => {
      users.value = res.users
    }
  })
})
</script>

<template>
  <ul class="users-list">
    <UsersListItem v-for="user in users" :key="user.id" :user="user" />
  </ul>
</template>

<style lang="scss" scoped></style>
