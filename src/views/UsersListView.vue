<script setup lang="ts">
import api from '@/api'
import { User } from '@/helpers/types'
import { USERS_FETCH_LIMIT as limit } from '@/helpers/constants'

const { getSignal } = useAbortOnLeave()
const { skip, currentPage, total, handleChangePage } = usePagination()
const router = useRouter()

const usersList = ref<User[]>([])
const search = ref('')

const setUsers = (data: { total: number; skip: number; users: User[] }) => {
  usersList.value = data.users
  total.value = data.total
  skip.value = data.skip
}

const fetchUsers = () =>
  api.users.getUsersPaginated(skip.value, {
    onSuccess: setUsers,
    signal: getSignal()
  })

const searchUsers = () =>
  api.users.searchUsers(search.value.trim(), skip.value, {
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
  handleChangePage(selectedPage, limit, triggerFetch)
}

watchDebounced(
  search,
  () => {
    skip.value = 0
    currentPage.value = 1
    triggerFetch()
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
  <div class="users-list-container page-container">
    <h2 style="font-size: 30px">Users</h2>

    <el-input v-model="search" placeholder="Type to search users" clearable />

    <el-table
      :data="usersList"
      style="width: min(650px, 95%)"
      empty-text="No users found"
      @row-click="
        (row: User) => router.push({ name: 'User', params: { id: row.id } })
      "
    >
      <el-table-column prop="id" label="id" width="60" />
      <el-table-column prop="firstName" label="First name" />
      <el-table-column prop="lastName" label="Last name" />
      <el-table-column prop="age" label="Age" width="60" />
      <el-table-column width="75">
        <span class="show-user">Show</span>
      </el-table-column>
    </el-table>

    <base-pagination
      v-model="currentPage"
      :total="total"
      :limit="limit"
      @handle-change="pageChangeHandler"
    />
  </div>
</template>

<style lang="scss" scoped>
.users-list-container {
  display: flex;
  flex-direction: column;
  gap: 30px;

  :deep(.el-table__row) {
    cursor: pointer;
  }
  :deep(.show-user) {
    font-size: 0.9em;
    color: blue;
    text-decoration: underline;
  }
  .el-input {
    width: min(400px, 95%);
  }
}
</style>
