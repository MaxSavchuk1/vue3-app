<script setup lang="ts">
import api from '@/api'
import UserEntity from '@/entities/User.entity'

const props = defineProps<{ id: string }>()
const user = ref<UserEntity>()

const getUserData = () => {
  return api.users.getUser(props.id, {
    onSuccess: res => {
      user.value = new UserEntity(res)
    }
  })
}

onMounted(async () => {
  try {
    await getUserData()
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="page-container user-info-container">
    <template v-if="user">
      <div class="user-info-header">
        <h2>{{ user.fullName }}, {{ user.age }}</h2>
        <el-avatar :size="75" :src="user.avatar" />
      </div>

      <el-divider />

      <el-descriptions :column="1" title="User Info" border>
        <el-descriptions-item
          v-for="item in user.info"
          :key="item.label"
          :label="item.label"
        >
          {{ item.value }}
        </el-descriptions-item>
      </el-descriptions>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.user-info-container {
  h2 {
    font-size: 2em;
  }
}
.user-info-header {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
