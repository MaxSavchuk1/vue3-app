<script setup lang="ts">
import api from '@/api'
import { User } from '@/helpers/types'

const usersList = ref<User[]>([])
const search = ref('')

const setUsers = ({ users }: { users: User[] }) => (usersList.value = users)

const fetchUsers = () =>
  api.getUsersPaginated(
    {},
    {
      onSuccess: setUsers
    }
  )

const searchUsers = () =>
  api.searchUsers(search.value.trim(), {
    onSuccess: setUsers
  })

watchDebounced(
  search,
  () => {
    if (search.value) return searchUsers()
    return fetchUsers()
  },
  { debounce: 500 }
)

onMounted(async () => {
  try {
    await fetchUsers()
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="users-list-container">
    <div class="users-list-search">
      <el-input
        v-model="search"
        style="width: 400px"
        placeholder="Search users"
        clearable
      />
    </div>

    <h2 style="font-size: 30px">Users</h2>

    <div v-if="!usersList.length">No users found</div>

    <ul class="users-list">
      <UsersListItem v-for="user in usersList" :key="user.id" :user="user" />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.users-list-container {
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding: 30px;
}
.users-list > * + * {
  margin-top: 20px;
}
</style>
