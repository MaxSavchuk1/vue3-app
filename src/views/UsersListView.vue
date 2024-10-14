<script setup lang="ts">
import api from '@/api'
import { User } from '@/helpers/types'
import { FETCH_LIMIT as limit } from '@/helpers/constants'

const usersList = ref<User[]>([])
const total = ref(0)
const skip = ref(0)
const search = ref('')

const setUsers = (data: { total: number; skip: number; users: User[] }) => {
  usersList.value = data.users
  total.value = data.total
  skip.value = data.skip
}

const fetchUsers = () =>
  api.getUsersPaginated(skip.value, {
    onSuccess: setUsers
  })

const searchUsers = () =>
  api.searchUsers(search.value.trim(), skip.value, {
    onSuccess: setUsers
  })

const triggerFetch = async () => {
  try {
    if (search.value) return await searchUsers()
    return await fetchUsers()
  } catch (error) {
    console.error(error)
  }
}

const pageChangeHandler = (selectedPage: number) => {
  skip.value = (selectedPage - 1) * limit
  triggerFetch()
}

watchDebounced(search, triggerFetch, { debounce: 500 })

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
    <el-input
      v-model="search"
      style="width: 400px"
      placeholder="Search users"
      clearable
    />

    <h2 style="font-size: 30px">Users</h2>

    <el-table
      :data="usersList"
      style="width: min(600px, 95%)"
      empty-text="No users found"
    >
      <el-table-column prop="id" label="id" width="60" />
      <el-table-column prop="firstName" label="First name" />
      <el-table-column prop="lastName" label="Last name" />
      <el-table-column prop="age" label="Age" width="60" />
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="limit"
      :total="total"
      :hide-on-single-page="total <= limit"
      @change="pageChangeHandler"
    />
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
