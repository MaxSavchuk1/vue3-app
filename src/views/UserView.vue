<script setup lang="ts">
import api from '@/api'
import { UserFull } from '@/helpers/types'

const props = defineProps<{ id: string }>()
const user = ref<UserFull>()

const userFullName = computed(() => {
  let fullName = `${user.value?.firstName || ''} ${user.value?.lastName || ''}`
  if (user.value?.maidenName) {
    fullName += ` (ex. ${user.value.maidenName})`
  }
  return fullName
})

const userAvatar = computed(() => {
  if (user.value?.image) {
    return user.value.image
  }
  return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

const userInfo = computed(() => {
  return [
    { label: 'Username', value: user.value?.username },
    { label: 'Gender', value: user.value?.gender },
    { label: 'Birth date', value: user.value?.birthDate },
    { label: 'Phone', value: user.value?.phone },
    { label: 'Email', value: user.value?.email },
    { label: 'City', value: user.value?.address?.city },
    { label: 'State', value: user.value?.address?.state },
    { label: 'Country', value: user.value?.address?.country },
    { label: 'Company', value: user.value?.company?.name },
    { label: 'Job title', value: user.value?.company?.title }
  ]
})

const getUserData = () => {
  return api.getUser(props.id, {
    onSuccess: res => {
      user.value = res
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
        <h2>{{ userFullName }}, {{ user?.age }}</h2>
        <el-avatar :size="75" :src="userAvatar" />
      </div>

      <el-divider />

      <el-descriptions :column="1" title="User Info" border>
        <el-descriptions-item
          v-for="item in userInfo"
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
